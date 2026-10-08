import { useEffect, useMemo, useState } from 'react'
import MediaOverlay from './MediaOverlay'
import styles from './MultipleImage.module.css'

export type ImageItem = {
  src: string
  thumbnailSrc?: string
  alt: string
  mediaType?: 'image' | 'video'
}

export type MultipleImageProps = {
  images: ImageItem[]
  enableOverlay?: boolean
  /** Locks every tile to this ratio (e.g. '1920 / 1080') and crops to fill */
  aspectRatio?: string
}

export default function MultipleImage({
  images,
  enableOverlay = false,
  aspectRatio,
}: MultipleImageProps) {
  const frameClass = aspectRatio
    ? `${styles.frame} ${styles.frameFixed}`
    : styles.frame
  const frameStyle = aspectRatio ? { aspectRatio } : undefined
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const openImage = useMemo(() => {
    if (openIndex == null) return null
    return images[openIndex] ?? null
  }, [images, openIndex])

  const overlayEl =
    enableOverlay && openImage && mounted ? (
      <MediaOverlay
        src={openImage.src}
        alt={openImage.alt}
        mediaType={openImage.mediaType}
        onClose={() => setOpenIndex(null)}
      />
    ) : null

  return (
    <>
      <div className={styles.grid} role="list">
        {images.map((img, i) => (
          <figure key={`${img.src}-${i}`} className={styles.item} role="listitem">
            {enableOverlay ? (
              <button
                type="button"
                className={styles.button}
                onClick={() => setOpenIndex(i)}
                aria-label={`Open image: ${img.alt}`}
              >
                <div className={frameClass} style={frameStyle}>
                  {img.mediaType === 'video' ? (
                    <video
                      className={styles.media}
                      src={img.thumbnailSrc ?? img.src}
                      aria-label={img.alt}
                      playsInline
                      muted
                      loop
                      autoPlay
                      preload="metadata"
                    />
                  ) : (
                    <img
                      className={styles.media}
                      src={img.thumbnailSrc ?? img.src}
                      alt={img.alt}
                    />
                  )}
                </div>
              </button>
            ) : (
              <div className={frameClass} style={frameStyle}>
                {img.mediaType === 'video' ? (
                  <video
                    className={styles.media}
                    src={img.thumbnailSrc ?? img.src}
                    aria-label={img.alt}
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="metadata"
                  />
                ) : (
                  <img
                    className={styles.media}
                    src={img.thumbnailSrc ?? img.src}
                    alt={img.alt}
                  />
                )}
              </div>
            )}
          </figure>
        ))}
      </div>
      {overlayEl}
    </>
  )
}
