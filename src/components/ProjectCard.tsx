import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { GalleryCardItem, SectionTab } from '../lib/gallery-data'
import type { InlineDetailId } from '../lib/inline-detail-pages'
import {
  CARD_DRIFT_PX,
  CARD_ENTER_EASE,
  CARD_EXIT_EASE,
  CARD_FADE_DURATION,
  CARD_OPACITY_DURATION,
  getCardGridPlacement,
  getCardMotionDelays,
} from '../lib/cardGridMotion'
import styles from './ProjectCard.module.css'

/** Set true to restore title/meta footer + bottom bars under each card. */
const SHOW_CARD_FOOTER = false

function CardMedia({ item, mediaKey }: { item: GalleryCardItem; mediaKey: string }) {
  const fitClass = item.imageBackground ? ` ${styles.cardImageOnBackground}` : ''

  if (item.video) {
    return (
      <video
        key={mediaKey}
        className={styles.cardMedia + fitClass}
        src={item.thumbnailVideo ?? item.video}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
      />
    )
  }

  return (
    <img
      key={mediaKey}
      src={item.image}
      alt=""
      loading="lazy"
      decoding="async"
      className={styles.cardImage + fitClass}
    />
  )
}

function ProjectCardBody({
  item,
  mediaKey,
}: {
  item: GalleryCardItem
  mediaKey: string
}) {
  return (
    <>
      <div
        className={styles.cardMediaWrap}
        style={item.imageBackground ? { background: item.imageBackground } : undefined}
      >
        <CardMedia item={item} mediaKey={mediaKey} />
        <span className={styles.cardOverlay} aria-hidden />
        <div className={styles.cardCaption}>
          <span className={styles.cardTitleMark} aria-hidden />
          <div className={styles.cardCaptionTitleRow}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
          </div>
          <p className={styles.cardMeta}>{item.meta}</p>
        </div>
      </div>
      {SHOW_CARD_FOOTER ? (
        <>
          <div className={styles.cardFooter}>
            <div className={styles.cardFooterInfo}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardMeta}>{item.meta}</p>
            </div>
          </div>
          <div className={styles.cardBottomBars} aria-hidden>
            <span className={styles.cardBottomBarYellow} />
            <span className={styles.cardBottomBarBlack} />
          </div>
        </>
      ) : null}
    </>
  )
}

type ProjectCardProps = {
  item: GalleryCardItem
  cardKey: string
  gridIndex: number
  totalCards: number
  cardsPerRow: number
  onOpen?: (tab: SectionTab, index: number) => void
  onOpenDetail?: (id: InlineDetailId) => void
  tab: SectionTab
  index: number
}

export default function ProjectCard({
  item,
  cardKey,
  gridIndex,
  totalCards,
  cardsPerRow,
  onOpen,
  onOpenDetail,
  tab,
  index,
}: ProjectCardProps) {
  const { enter } = getCardMotionDelays(gridIndex, totalCards, cardsPerRow)
  const gridPlacement = getCardGridPlacement(gridIndex, totalCards, cardsPerRow)

  const body = <ProjectCardBody item={item} mediaKey={cardKey} />

  let card: ReactNode
  if (item.detailId) {
    card = (
      <button
        type="button"
        className={styles.card}
        onClick={() => onOpenDetail?.(item.detailId!)}
        aria-label={`${item.title}, ${item.meta}`}
      >
        {body}
      </button>
    )
  } else if (item.href) {
    const external = item.href.startsWith('http')
    const linkProps =
      external && item.openInNewTab !== false
        ? { target: '_blank' as const, rel: 'noopener noreferrer' }
        : {}

    card = (
      <a
        href={item.href}
        className={styles.card}
        aria-label={`${item.title}, ${item.meta}`}
        {...linkProps}
      >
        {body}
      </a>
    )
  } else {
    card = (
      <button
        type="button"
        className={styles.card}
        onClick={() => onOpen?.(tab, index)}
        aria-label={`${item.title}, ${item.meta}`}
      >
        {body}
      </button>
    )
  }

  return (
    <motion.div
      className={styles.cardMotionCell}
      style={gridPlacement}
      initial={{ opacity: 0, x: -CARD_DRIFT_PX }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          opacity: {
            duration: CARD_OPACITY_DURATION,
            ease: CARD_ENTER_EASE,
            delay: enter,
          },
          x: {
            duration: CARD_FADE_DURATION,
            ease: CARD_ENTER_EASE,
            delay: enter,
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
            delay: enter,
          },
          x: {
            duration: CARD_FADE_DURATION,
            ease: CARD_EXIT_EASE,
            delay: enter,
          },
        },
      }}
    >
      {card}
    </motion.div>
  )
}
