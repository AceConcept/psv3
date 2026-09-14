import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
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
}

export default function MultipleImage({
  images,
  enableOverlay = false,
}: MultipleImageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!enableOverlay || openIndex == null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enableOverlay, openIndex])

  const openImage = useMemo(() => {
    if (openIndex == null) return null
    return images[openIndex] ?? null
  }, [images, openIndex])

  const overlayEl =
    enableOverlay && openImage && mounted
      ? createPortal(
          <div
            className={styles.overlayBackdrop}
            role="button"
            tabIndex={0}
            aria-label="Close image overlay"
            onClick={() => setOpenIndex(null)}
            onKeyDown={(e) => e.key === 'Escape' && setOpenIndex(null)}
          >
            <div
              className={styles.overlayContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.overlayInner}>
                {openImage.mediaType === 'video' ? (
                  <video
                    className={styles.overlayMedia}
                    src={openImage.src}
                    aria-label={openImage.alt}
                    playsInline
                    muted
                    loop
                    autoPlay
                    controls
                  />
                ) : (
                  <img
                    src={openImage.src}
                    alt={openImage.alt}
                    className={styles.overlayMedia}
                  />
                )}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

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
                <div className={styles.frame}>
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
              <div className={styles.frame}>
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
