import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { SectionTab } from '../lib/gallery-data'
import type { InlineDetailId } from '../lib/inline-detail-pages'
import styles from './Sidebar.module.css'

const GITHUB_PROFILE_URL = 'https://github.com/AceConcept'

/** About-rail hatch tint per open project detail */
const ABOUT_RAIL_COLOR_BY_DETAIL: Partial<Record<InlineDetailId, string>> = {
  'korn-ferry': '#2E6351',
}
const ABOUT_RAIL_COLOR_DEFAULT = '#D9D9D9'

const SIDE_NAV_ICONS = [
  {
    id: 'contact',
    label: 'Contact',
    src: '/assets/right-side-bar/contact.svg',
    ariaLabel: 'Contact',
  },
  {
    id: 'github',
    href: GITHUB_PROFILE_URL,
    label: 'Github',
    src: '/assets/right-side-bar/github.svg',
    ariaLabel: 'GitHub',
  },
  {
    id: 'resume',
    href: '/home/Asar%20Morris%20Resume.pdf',
    label: 'Resume',
    src: '/assets/right-side-bar/resume.svg',
    ariaLabel: 'Resume',
  },
] as const

const SLOT_TABS: { id: SectionTab; label: string; hash: string }[] = [
  { id: 'gallery', label: 'Designs', hash: 'gallery' },
  { id: 'waypoint', label: 'Waypoints', hash: 'waypoint' },
  { id: 'development', label: 'Development', hash: 'development' },
  { id: 'design', label: 'Past Work', hash: 'design' },
]

type SidebarProps = {
  activeTab: SectionTab
  onNavClick: (tab: SectionTab, hash: string) => void
  onContactClick?: () => void
  activeInlineDetail?: InlineDetailId | null
}

function SideNavIconStack({ onContactClick }: { onContactClick?: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const sync = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      if (mobileQuery.matches) {
        wrap.style.top = ''
        return
      }
      const sep = document.querySelector<HTMLElement>('[data-main-separator]')
      if (!sep) return
      wrap.style.top = `${sep.getBoundingClientRect().top}px`
    }

    sync()
    window.addEventListener('resize', sync)
    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', sync)
    } else {
      mobileQuery.addListener(sync)
    }
    void document.fonts?.ready.then(sync)
    return () => {
      window.removeEventListener('resize', sync)
      if (typeof mobileQuery.removeEventListener === 'function') {
        mobileQuery.removeEventListener('change', sync)
      } else {
        mobileQuery.removeListener(sync)
      }
    }
  }, [])

  return (
    <div ref={wrapRef} className={styles.sideNavIconWrap}>
      <div className={styles.sideNavIconStack}>
        {SIDE_NAV_ICONS.map((item) => {
          const content = (
            <>
              <span className={styles.sideNavIconLabel}>
                <span className={styles.sideNavIconTick} aria-hidden />
                {item.label}
              </span>
              <span className={styles.sideNavIconMark} aria-hidden>
                <img src={item.src} alt="" className={styles.sideNavIconImage} />
              </span>
            </>
          )

          if (item.id === 'contact') {
            return (
              <button
                key={item.id}
                type="button"
                className={styles.sideNavIconButton}
                aria-label={item.ariaLabel}
                onClick={onContactClick}
              >
                {content}
              </button>
            )
          }

          return (
            <a
              key={item.id}
              href={item.href}
              className={styles.sideNavIconButton}
              target={
                item.href.startsWith('http') || item.href.endsWith('.pdf')
                  ? '_blank'
                  : undefined
              }
              rel={
                item.href.startsWith('http') || item.href.endsWith('.pdf')
                  ? 'noopener noreferrer'
                  : undefined
              }
              aria-label={item.ariaLabel}
            >
              {content}
            </a>
          )
        })}
      </div>
    </div>
  )
}

function SlotTab({
  label,
  active,
  onSelect,
}: {
  label: string
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={
        styles.navItemSlotGroup +
        (active ? ` ${styles.navItemSlotGroupActive}` : ` ${styles.navItemSlotGroupInactive}`)
      }
      aria-pressed={active}
      aria-current={active ? 'page' : undefined}
      onClick={onSelect}
    >
      <img
        src="/assets/Sidebar/hor-connc.png"
        alt=""
        className={styles.navItemSlotHorConn}
      />
      <div className={styles.navItemSlotStack}>
        <div className={styles.navItemSlot}>
          <img
            src="/assets/Sidebar/line-connector.png"
            alt=""
            className={styles.navItemSlotConnector}
          />
          <div className={styles.navItemSlotBodyWrap}>
            <img
              src="/assets/Sidebar/tab%20top%20body.png"
              alt=""
              className={styles.navItemSlotBody}
            />
            <img
              src="/assets/Sidebar/chip-icn.svg"
              alt=""
              className={styles.navItemSlotChip}
            />
          </div>
        </div>
        <div className={styles.navItemSlot}>
          <img
            src="/assets/Sidebar/line-connector.png"
            alt=""
            className={styles.navItemSlotConnector}
          />
          <div className={styles.navItemSlotBodyPlain}>
            <span className={styles.navItemSlotBodyLabel}>{label}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function Sidebar({
  activeTab,
  onNavClick,
  onContactClick,
  activeInlineDetail = null,
}: SidebarProps) {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutCollapsed, setAboutCollapsed] = useState(false)
  const sideNavRef = useRef<HTMLElement>(null)
  const aboutRailColor =
    (activeInlineDetail && ABOUT_RAIL_COLOR_BY_DETAIL[activeInlineDetail]) ||
    ABOUT_RAIL_COLOR_DEFAULT
  const activeLabel =
    SLOT_TABS.find((tab) => tab.id === activeTab)?.label ?? 'Menu'

  const isDesktopViewport = () =>
    window.matchMedia('(min-width: 1280px)').matches

  const toggleAboutCollapsed = () => {
    if (!isDesktopViewport()) return
    setAboutCollapsed((collapsed) => !collapsed)
  }

  const collapseAbout = () => {
    if (!isDesktopViewport()) return
    setAboutCollapsed(true)
  }

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useLayoutEffect(() => {
    const el = sideNavRef.current
    if (!el) return

    const syncRailOrigin = () => {
      const left = el.getBoundingClientRect().left
      el.style.setProperty('--slot-rail-origin', `${Math.max(0, left)}px`)
    }

    syncRailOrigin()
    window.addEventListener('resize', syncRailOrigin)
    return () => window.removeEventListener('resize', syncRailOrigin)
  }, [])

  useLayoutEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      const el = sideNavRef.current
      if (!el) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  useLayoutEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const onChange = () => {
      if (!mobileQuery.matches) setMenuOpen(false)
    }
    onChange()
    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', onChange)
      return () => mobileQuery.removeEventListener('change', onChange)
    }
    mobileQuery.addListener(onChange)
    return () => mobileQuery.removeListener(onChange)
  }, [])

  useLayoutEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1280px)')
    const onChange = () => {
      if (!desktopQuery.matches) setAboutCollapsed(false)
    }
    onChange()
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', onChange)
      return () => desktopQuery.removeEventListener('change', onChange)
    }
    desktopQuery.addListener(onChange)
    return () => desktopQuery.removeListener(onChange)
  }, [])

  return (
    <nav
      ref={sideNavRef}
      className={
        styles.sideNav +
        (menuOpen ? ` ${styles.sideNavMenuOpen}` : '') +
        (aboutCollapsed ? ` ${styles.sideNavAboutCollapsed}` : '')
      }
      aria-label="Section menu"
    >
      <div className={styles.sideNavRailBack} aria-hidden />
      <div className={styles.sideNavRail} aria-hidden />
      <div className={styles.sideNavTop}>
        <img
          src="/assets/Sidebar/atencium-icon.svg"
          alt="atencium-ui"
          className={styles.sideNavBrand}
        />
        <span className={styles.sideNavActiveLabel}>{activeLabel}</span>
        <button
          type="button"
          className={styles.sideNavMenuToggle}
          aria-label={menuOpen ? 'Close section menu' : 'Open section menu'}
          aria-expanded={menuOpen}
          aria-controls="section-menu-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.sideNavMenuToggleBars} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
        <div id="section-menu-panel" className={styles.sideNavCards}>
          {SLOT_TABS.map((tab) => (
            <SlotTab
              key={tab.id}
              label={tab.label}
              active={activeTab === tab.id}
              onSelect={() => {
                onNavClick(tab.id, tab.hash)
                setMenuOpen(false)
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.sideNavAbout}>
        <div className={styles.sideNavAboutTabRow}>
          <button
            type="button"
            className={styles.sideNavAboutTab}
            aria-expanded={!aboutCollapsed}
            aria-controls="about-panel"
            onClick={toggleAboutCollapsed}
          >
            <span className={styles.sideNavAboutTabLabel}>ABOUT</span>
            <svg
              className={styles.sideNavAboutTabIcon}
              viewBox="0 0 12 12"
              aria-hidden
            >
              <circle cx="6" cy="3.5" r="2.25" fill="currentColor" />
              <path
                fill="currentColor"
                d="M1.5 11c0-2.485 2.015-4 4.5-4s4.5 1.515 4.5 4H1.5z"
              />
            </svg>
          </button>
          <span
            className={styles.sideNavAboutTabRail}
            style={{ backgroundColor: aboutRailColor }}
            aria-hidden
          />
        </div>
        <div
          id="about-panel"
          className={styles.sideNavAboutPanel}
          role="region"
          aria-label="About"
          onClick={collapseAbout}
        >
          <div className={styles.sideNavAboutRow}>
            <div className={styles.sideNavAboutCopy}>
              <h2 className={styles.sideNavAboutTitle}>
                Asar Morris - Product Designer
              </h2>
              <div className={styles.sideNavAboutRule} aria-hidden />
              <p className={styles.sideNavAboutBody}>
                Hello, nice to meet you! I am Asar Morris a designer based in New
                York who enjoys solving problems and thinking outside the box.
              </p>
            </div>
            <div className={styles.sideNavAboutAccent} aria-hidden />
          </div>
        </div>
      </div>

      {mounted
        ? createPortal(
            <SideNavIconStack onContactClick={onContactClick} />,
            document.body,
          )
        : null}
    </nav>
  )
}
