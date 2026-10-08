import { useEffect, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import styles from './MediaOverlay.module.css'

export type MediaOverlayProps = {
  src: string
  alt: string
  mediaType?: 'image' | 'video'
  onClose: () => void
}

export default function MediaOverlay({
  src,
  alt,
  mediaType = 'image',
  onClose,
}: MediaOverlayProps) {
  const [ratio, setRatio] = useState(16 / 9)

  useEffect(() => {
    /* Capture + stop so Escape closes only the overlay, not the detail page behind it */
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      onClose()
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [onClose])

  const mediaStyle = { '--media-ratio': ratio } as CSSProperties

  return createPortal(
    <div
      className={styles.overlayBackdrop}
      role="button"
      tabIndex={0}
      aria-label="Close media overlay"
      onClick={onClose}
    >
      {mediaType === 'video' ? (
        <video
          className={styles.overlayMedia}
          style={mediaStyle}
          src={src}
          aria-label={alt}
          playsInline
          muted
          loop
          autoPlay
          controls
          onClick={(e) => e.stopPropagation()}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget
            if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight)
          }}
        />
      ) : (
        <img
          className={styles.overlayMedia}
          style={mediaStyle}
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          onLoad={(e) => {
            const img = e.currentTarget
            if (img.naturalWidth && img.naturalHeight) {
              setRatio(img.naturalWidth / img.naturalHeight)
            }
          }}
        />
      )}
    </div>,
    document.body,
  )
}
