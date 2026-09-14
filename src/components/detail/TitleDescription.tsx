import { useState, type ReactNode } from 'react'
import styles from './TitleDescription.module.css'

const DEFAULT_RIGHT_PREVIEW_LENGTH = 150

export type TitleDescriptionProps = {
  title: string
  description?: string
  leftSubtitle?: string
  rightSubtitle?: string
  rightSubtitlePreviewLength?: number
  /** Rendered 14px to the right of the title */
  titleAccessory?: ReactNode
}

export default function TitleDescription({
  title,
  description,
  leftSubtitle,
  rightSubtitle,
  rightSubtitlePreviewLength = DEFAULT_RIGHT_PREVIEW_LENGTH,
  titleAccessory,
}: TitleDescriptionProps) {
  const [rightExpanded, setRightExpanded] = useState(false)
  const hasTwoColumnSubtitles = Boolean(leftSubtitle || rightSubtitle)
  const rightIsExpandable =
    rightSubtitle != null &&
    rightSubtitlePreviewLength > 0 &&
    rightSubtitle.length > rightSubtitlePreviewLength

  return (
    <section className={styles.titleBlock} aria-labelledby="title-desc-title">
      <div className={styles.titleRow}>
        <h2 id="title-desc-title" className={styles.title}>
          {title}
        </h2>
        {titleAccessory ? (
          <div className={styles.titleAccessory}>{titleAccessory}</div>
        ) : null}
      </div>

      {hasTwoColumnSubtitles ? (
        <div className={styles.subtitleRow}>
          {leftSubtitle ? (
            <p className={styles.subtitleLeft}>{leftSubtitle}</p>
          ) : null}
          {rightSubtitle ? (
            <div className={styles.subtitleRightWrap}>
              {rightIsExpandable ? (
                <>
                  <div
                    className={`${styles.subtitleRightExpandable}${
                      rightExpanded ? ` ${styles.subtitleRightExpandableOpen}` : ''
                    }`}
                  >
                    <p className={styles.subtitleRight}>{rightSubtitle}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.readMore}
                    onClick={() => setRightExpanded((open) => !open)}
                    aria-expanded={rightExpanded}
                  >
                    {rightExpanded ? '− read less' : '+ read more'}
                  </button>
                </>
              ) : (
                <p className={styles.subtitleRight}>{rightSubtitle}</p>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        description && <p className={styles.description}>{description}</p>
      )}
    </section>
  )
}
