import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import Sidebar from './Sidebar'
import ProjectCard from './ProjectCard'
import InlineDetailView from './inline-details/InlineDetailView'
import DetailBackButton from './detail/DetailBackButton'
import ContactPopup from './ContactPopup'
import {
  NAV_ITEMS,
  TAB_ITEMS,
  galleryItems,
  waypointItems,
  type GalleryCardItem,
  type SectionTab,
} from '../lib/gallery-data'
import {
  buildSectionHash,
  parseSectionHash,
  INLINE_DETAIL_TAB,
  INLINE_DETAIL_TITLE,
  type InlineDetailId,
} from '../lib/inline-detail-pages'
import {
  buildContactHash,
  isContactHash,
} from '../lib/contact-hash'
import {
  CARD_DRIFT_PX,
  CARD_ENTER_EASE,
  CARD_EXIT_EASE,
  CARD_FADE_DURATION,
  CARD_OPACITY_DURATION,
  CARDS_PER_ROW,
} from '../lib/cardGridMotion'
import styles from './PortfolioShell.module.css'

const CARD_BATCH_SIZE = CARDS_PER_ROW * 4
const RAIL_SLIDE_HEIGHT_REM = 4.9375 /* 79px */
const RAIL_SLIDE_GAP_REM = 0.625 /* 10px */
const RAIL_SLIDE_STEP_REM = RAIL_SLIDE_HEIGHT_REM + RAIL_SLIDE_GAP_REM
const RAIL_AUTOPLAY_MS = 3000

const RAIL_SLIDE_ITEMS = galleryItems.filter(
  (item) => !item.video && !item.image.endsWith('.mp4'),
)

const WAYPOINT_SLIDE_TITLES = new Set(waypointItems.map((item) => item.title))

/** Custom square scrollbar — native bar stays fully hidden. */
function ScrollRail({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLDivElement | null>
}) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; startY: number; startTop: number } | null>(
    null,
  )

  const metrics = useCallback(() => {
    const el = scrollRef.current
    const track = trackRef.current
    if (!el || !track) return null
    const { scrollTop, scrollHeight, clientHeight } = el
    const trackH = track.clientHeight
    if (scrollHeight <= clientHeight + 1 || trackH <= 0) return null
    const thumbH = Math.max(24, (clientHeight / scrollHeight) * trackH)
    const maxTop = Math.max(0, trackH - thumbH)
    const top =
      maxTop === 0
        ? 0
        : (scrollTop / (scrollHeight - clientHeight)) * maxTop
    return { scrollTop, scrollHeight, clientHeight, thumbH, maxTop, top }
  }, [scrollRef])

  const update = useCallback(() => {
    const thumb = thumbRef.current
    const track = trackRef.current
    if (!thumb || !track) return
    const m = metrics()
    if (!m) {
      track.hidden = true
      return
    }
    track.hidden = false
    thumb.style.height = `${m.thumbH}px`
    thumb.style.transform = `translateY(${m.top}px)`
  }, [metrics])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [scrollRef, update])

  const scrollFromThumbTop = useCallback(
    (thumbTop: number) => {
      const el = scrollRef.current
      const m = metrics()
      if (!el || !m || m.maxTop <= 0) return
      const ratio = Math.min(1, Math.max(0, thumbTop / m.maxTop))
      el.scrollTop = ratio * (m.scrollHeight - m.clientHeight)
    },
    [metrics, scrollRef],
  )

  const onThumbPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const thumb = thumbRef.current
    if (!thumb) return
    e.preventDefault()
    e.stopPropagation()
    const m = metrics()
    if (!m) return
    thumb.setPointerCapture(e.pointerId)
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      startTop: m.top,
    }
  }

  const onThumbPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const m = metrics()
    if (!m) return
    const nextTop = Math.min(
      m.maxTop,
      Math.max(0, drag.startTop + (e.clientY - drag.startY)),
    )
    scrollFromThumbTop(nextTop)
  }

  const onThumbPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    dragRef.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }

  const onTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current) return
    const m = metrics()
    const track = trackRef.current
    if (!m || !track) return
    const rect = track.getBoundingClientRect()
    const y = e.clientY - rect.top - m.thumbH / 2
    scrollFromThumbTop(Math.min(m.maxTop, Math.max(0, y)))
  }

  return (
    <div
      ref={trackRef}
      className={styles.scrollRail}
      aria-hidden
      onPointerDown={onTrackPointerDown}
    >
      <div
        ref={thumbRef}
        className={styles.scrollRailThumb}
        onPointerDown={onThumbPointerDown}
        onPointerMove={onThumbPointerMove}
        onPointerUp={onThumbPointerUp}
        onPointerCancel={onThumbPointerUp}
      />
    </div>
  )
}

type RailPatternSliderProps = {
  onOpenDetail: (id: InlineDetailId) => void
  onOpenMedia: (item: GalleryCardItem) => void
  onGoToWaypoint: () => void
}

function RailPatternSlider({
  onOpenDetail,
  onOpenMedia,
  onGoToWaypoint,
}: RailPatternSliderProps) {
  const slideCount = RAIL_SLIDE_ITEMS.length
  /* Track holds three copies; index stays in the middle copy between moves */
  const [index, setIndex] = useState(slideCount)
  const [instant, setInstant] = useState(false)
  const [paused, setPaused] = useState(false)
  const [preferReducedMotion, setPreferReducedMotion] = useState(false)
  const trackItems = useMemo(
    () => [...RAIL_SLIDE_ITEMS, ...RAIL_SLIDE_ITEMS, ...RAIL_SLIDE_ITEMS],
    [],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPreferReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const goNext = useCallback(() => {
    if (slideCount === 0) return
    setInstant(false)
    setIndex((current) => Math.min(current + 1, slideCount * 3 - 1))
  }, [slideCount])

  const goPrev = useCallback(() => {
    if (slideCount === 0) return
    setInstant(false)
    setIndex((current) => Math.max(current - 1, 0))
  }, [slideCount])

  useEffect(() => {
    if (paused || preferReducedMotion || slideCount < 2) return
    const id = window.setTimeout(goNext, RAIL_AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, preferReducedMotion, slideCount, goNext])

  const openItem = useCallback(
    (item: GalleryCardItem) => {
      /* Slider-only: waypoint cards switch to the Waypoints tab */
      if (WAYPOINT_SLIDE_TITLES.has(item.title)) {
        onGoToWaypoint()
        return
      }
      if (item.detailId) {
        onOpenDetail(item.detailId)
        return
      }
      if (item.href) {
        const external = item.href.startsWith('http')
        if (external && item.openInNewTab !== false) {
          window.open(item.href, '_blank', 'noopener,noreferrer')
        } else {
          window.location.href = item.href
        }
        return
      }
      onOpenMedia(item)
    },
    [onGoToWaypoint, onOpenDetail, onOpenMedia],
  )

  return (
    <div
      className={styles.railSlider}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <button
        type="button"
        className={`${styles.railSliderRing} ${styles.railSliderRingUp}`}
        aria-label="Previous slide"
        onClick={goPrev}
      >
        <img
          src="/assets/Sidebar/About-Section/slider-arrow.svg"
          alt=""
          className={styles.railSliderArrow}
          draggable={false}
        />
      </button>
      <button
        type="button"
        className={`${styles.railSliderRing} ${styles.railSliderRingDown}`}
        aria-label="Next slide"
        onClick={goNext}
      >
        <img
          src="/assets/Sidebar/About-Section/slider-arrow.svg"
          alt=""
          className={`${styles.railSliderArrow} ${styles.railSliderArrowDown}`}
          draggable={false}
        />
      </button>
      <div className={styles.railSliderViewport}>
        <motion.div
          className={styles.railSliderTrack}
          initial={false}
          animate={{ y: `${-index * RAIL_SLIDE_STEP_REM}rem` }}
          transition={
            preferReducedMotion || instant
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.4, 0, 0.2, 1] }
          }
          onAnimationComplete={() => {
            /* Drifted into an outer copy — re-center on the identical middle slide */
            if (index >= slideCount * 2) {
              setInstant(true)
              setIndex(index - slideCount)
            } else if (index < slideCount) {
              setInstant(true)
              setIndex(index + slideCount)
            }
          }}
        >
          {trackItems.map((item, i) => (
            <button
              key={`${item.title}-${i}`}
              type="button"
              className={styles.railSliderSlide}
              onClick={() => openItem(item)}
              aria-label={`${item.title}, ${item.meta}`}
            >
              <img
                src={item.image}
                alt=""
                className={styles.railSliderImage}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function PortfolioShell() {
  const [activeTab, setActiveTab] = useState<SectionTab>('gallery')
  const [tabSession, setTabSession] = useState(0)
  const [visibleCount, setVisibleCount] = useState(CARD_BATCH_SIZE)
  const [openProject, setOpenProject] = useState<GalleryCardItem | null>(null)
  const [contentMode, setContentMode] = useState<'grid' | 'detail'>('grid')
  const [activeInlineDetail, setActiveInlineDetail] =
    useState<InlineDetailId | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const detailScrollRef = useRef<HTMLDivElement>(null)
  /* State (not a ref) so the observer re-attaches when the grid mounts after a tab swap */
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null)
  const activeTabRef = useRef(activeTab)
  activeTabRef.current = activeTab

  useEffect(() => {
    setMounted(true)
  }, [])

  const resetCardFeed = useCallback(() => {
    setVisibleCount(CARD_BATCH_SIZE)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [])

  const syncHash = useCallback(
    (
      tab: SectionTab,
      detailId: InlineDetailId | null,
      mode: 'push' | 'replace' = 'replace',
    ) => {
      const next = `/#${buildSectionHash(tab, detailId)}`
      if (mode === 'push') window.history.pushState(null, '', next)
      else window.history.replaceState(null, '', next)
    },
    [],
  )

  const openInlineDetail = useCallback(
    (id: InlineDetailId) => {
      const tab = INLINE_DETAIL_TAB[id]
      setActiveTab(tab)
      setActiveInlineDetail(id)
      setContentMode('detail')
      if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0
      syncHash(tab, id, 'push')
    },
    [syncHash],
  )

  const closeInlineDetail = useCallback(() => {
    const tab = activeTabRef.current
    setContentMode('grid')
    setActiveInlineDetail(null)
    setTabSession((n) => n + 1)
    resetCardFeed()
    syncHash(tab, null, 'replace')
  }, [resetCardFeed, syncHash])

  const openContact = useCallback(() => {
    setContactOpen(true)
    window.history.pushState(null, '', `/#${buildContactHash()}`)
  }, [])

  const closeContact = useCallback(() => {
    setContactOpen(false)
    const tab = activeTabRef.current
    const detailId = activeInlineDetail
    window.history.replaceState(
      null,
      '',
      `/#${buildSectionHash(tab, detailId)}`,
    )
  }, [activeInlineDetail])

  const applyHash = useCallback(() => {
    const hash = window.location.hash ?? ''
    if (isContactHash(hash)) {
      setContactOpen(true)
      return
    }
    setContactOpen(false)

    const { tab, detailId } = parseSectionHash(hash)
    if (!tab) return
    setActiveTab(tab)
    setTabSession((n) => n + 1)
    resetCardFeed()
    if (detailId) {
      setActiveInlineDetail(detailId)
      setContentMode('detail')
    } else {
      setActiveInlineDetail(null)
      setContentMode('grid')
    }
  }, [resetCardFeed])

  useEffect(() => {
    applyHash()
    window.addEventListener('hashchange', applyHash)
    window.addEventListener('popstate', applyHash)
    return () => {
      window.removeEventListener('hashchange', applyHash)
      window.removeEventListener('popstate', applyHash)
    }
  }, [applyHash])

  const handleNavClick = (tab: SectionTab, hash: string) => {
    setActiveTab(tab)
    setTabSession((n) => n + 1)
    resetCardFeed()
    setContentMode('grid')
    setActiveInlineDetail(null)
    window.history.replaceState(null, '', `/#${hash}`)
  }

  const activeNav = NAV_ITEMS.find((item) => item.id === activeTab) ?? NAV_ITEMS[0]
  const panelTitle =
    contentMode === 'detail' && activeInlineDetail
      ? INLINE_DETAIL_TITLE[activeInlineDetail]
      : activeNav.title
  const tabItems = TAB_ITEMS[activeTab]
  const visibleItems = useMemo(
    () => tabItems.slice(0, visibleCount),
    [tabItems, visibleCount],
  )
  const hasMore = visibleCount < tabItems.length

  useEffect(() => {
    if (contentMode !== 'grid') return
    const root = scrollRef.current
    if (!root || !sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setVisibleCount((count) =>
          Math.min(count + CARD_BATCH_SIZE, tabItems.length),
        )
      },
      { root, rootMargin: '240px 0px', threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [sentinel, hasMore, tabItems.length, activeTab, tabSession, visibleCount, contentMode])

  useEffect(() => {
    if (contentMode !== 'detail') return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeInlineDetail()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [contentMode, closeInlineDetail])

  const overlayEl =
    openProject && mounted
      ? createPortal(
          <div
            className={styles.overlayBackdrop}
            onClick={() => setOpenProject(null)}
            role="button"
            tabIndex={0}
            aria-label="Close overlay"
            onKeyDown={(e) => e.key === 'Escape' && setOpenProject(null)}
          >
            <div
              className={styles.overlayContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.overlayInner}>
                {openProject.video ? (
                  <video
                    className={styles.overlayVideo}
                    src={openProject.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls
                  />
                ) : (
                  <img
                    src={openProject.image}
                    alt=""
                    className={styles.overlayImage}
                  />
                )}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <section className={styles.section}>
      <div className={styles.pageFrame}>
        <div className={styles.artboard}>
          <div className={styles.contentLeft} aria-hidden />
          <div className={styles.contentArea} data-content-area>
            <div className={styles.contentReveal}>
              <div className={styles.mainLayout}>
                <div className={styles.sideColumn}>
                  <Sidebar
                    activeTab={activeTab}
                    onNavClick={handleNavClick}
                    activeInlineDetail={activeInlineDetail}
                    onContactClick={openContact}
                  />
                </div>

                <div className={styles.sideNavRailPattern} aria-hidden />
                <RailPatternSlider
                  onOpenDetail={openInlineDetail}
                  onOpenMedia={setOpenProject}
                  onGoToWaypoint={() => handleNavClick('waypoint', 'waypoint')}
                />

                <div className={styles.mainPanelWrap}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`header-${activeTab}-${tabSession}-${contentMode}`}
                      className={styles.contentHeader}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          opacity: {
                            duration: CARD_OPACITY_DURATION,
                            ease: CARD_ENTER_EASE,
                          },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          opacity: {
                            duration: CARD_OPACITY_DURATION,
                            ease: CARD_EXIT_EASE,
                          },
                        },
                      }}
                    >
                      <div className={styles.contentTitleBlock}>
                        {contentMode === 'detail' ? (
                          <DetailBackButton onClick={closeInlineDetail} />
                        ) : null}
                        <div className={styles.contentTitleRow}>
                          <h1 className={styles.contentTitle}>{panelTitle}</h1>
                          {contentMode === 'grid' ? (
                            <span
                              className={styles.contentTitleAccent}
                              aria-hidden
                            />
                          ) : activeInlineDetail === 'korn-ferry' ? (
                            <img
                              className={styles.contentTitleAccessory}
                              src="/assets/korn-ferry/product-button.png"
                              alt="Product Design"
                            />
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <img
                    className={styles.contentSeparator}
                    src="/assets/main-panel/seperator.svg"
                    alt=""
                    aria-hidden
                    data-main-separator
                  />

                  <div className={styles.contentBody}>
                    <AnimatePresence mode="wait" initial={false}>
                      {contentMode === 'grid' ? (
                        <motion.div
                          key={`grid-${activeTab}-${tabSession}`}
                          className={styles.cardGridScrollShell}
                          initial={{ opacity: 0, x: -CARD_DRIFT_PX }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              opacity: {
                                duration: CARD_OPACITY_DURATION,
                                ease: CARD_ENTER_EASE,
                              },
                              x: {
                                duration: CARD_FADE_DURATION,
                                ease: CARD_ENTER_EASE,
                              },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            x: CARD_DRIFT_PX,
                            transition: {
                              opacity: {
                                duration: CARD_OPACITY_DURATION,
                                ease: CARD_EXIT_EASE,
                              },
                              x: {
                                duration: CARD_FADE_DURATION,
                                ease: CARD_EXIT_EASE,
                              },
                            },
                          }}
                        >
                          <div
                            ref={scrollRef}
                            className={styles.cardGridScroll}
                          >
                            <div className={styles.cardGrid}>
                              {visibleItems.map((item, i) => {
                                const cardKey = `${activeTab}-${tabSession}-${i}`
                                return (
                                  <ProjectCard
                                    key={cardKey}
                                    cardKey={cardKey}
                                    item={item}
                                    index={i}
                                    tab={activeTab}
                                    gridIndex={i}
                                    totalCards={visibleItems.length}
                                    cardsPerRow={CARDS_PER_ROW}
                                    onOpenDetail={openInlineDetail}
                                    onOpen={(_tab, index) => {
                                      setOpenProject(
                                        TAB_ITEMS[_tab][index] ?? null,
                                      )
                                    }}
                                  />
                                )
                              })}
                            </div>
                            {hasMore ? (
                              <div
                                ref={setSentinel}
                                className={styles.cardGridSentinel}
                                aria-hidden
                              />
                            ) : null}
                          </div>
                          <ScrollRail scrollRef={scrollRef} />
                        </motion.div>
                      ) : (
                        activeInlineDetail && (
                          <motion.div
                            key={`detail-shell-${activeInlineDetail}-${tabSession}`}
                            className={styles.detailScrollShell}
                            initial={{ opacity: 0, x: -CARD_DRIFT_PX }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              transition: {
                                opacity: {
                                  duration: CARD_OPACITY_DURATION,
                                  ease: CARD_ENTER_EASE,
                                },
                                x: {
                                  duration: CARD_FADE_DURATION,
                                  ease: CARD_ENTER_EASE,
                                },
                              },
                            }}
                            exit={{
                              opacity: 0,
                              x: CARD_DRIFT_PX,
                              transition: {
                                opacity: {
                                  duration: CARD_OPACITY_DURATION,
                                  ease: CARD_EXIT_EASE,
                                },
                                x: {
                                  duration: CARD_FADE_DURATION,
                                  ease: CARD_EXIT_EASE,
                                },
                              },
                            }}
                          >
                            <div
                              ref={detailScrollRef}
                              className={styles.detailScroll}
                            >
                              <div className={styles.detailPanel}>
                                <InlineDetailView id={activeInlineDetail} />
                              </div>
                            </div>
                            <ScrollRail scrollRef={detailScrollRef} />
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contentRight} aria-hidden />
        </div>
      </div>
      {overlayEl}
      {contactOpen && mounted
        ? createPortal(<ContactPopup onClose={closeContact} />, document.body)
        : null}
    </section>
  )
}
