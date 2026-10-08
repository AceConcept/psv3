import { useState } from 'react'
import MediaOverlay from './MediaOverlay'
import styles from './SingleImage.module.css'

export type SingleImageProps = {
  src: string
  alt: string
  mediaType?: 'image' | 'video'
  caption?: string
  /** `cover` fills a 16:9 frame; `natural` renders the asset as-is */
  fit?: 'cover' | 'natural'
  enableOverlay?: boolean
  className?: string
}

export default function SingleImage({
  src,
  alt,
  mediaType = 'image',
  caption,
  fit = 'cover',
  enableOverlay = false,
  className = '',
}: SingleImageProps) {
  const [open, setOpen] = useState(false)
  const natural = fit === 'natural'
  const figureClass = `${styles.figure}${className ? ` ${className}` : ''}`.trim()

  const frame = (
    <div className={natural ? styles.frameNatural : styles.frame}>
      {mediaType === 'video' ? (
        <video
          className={natural ? styles.mediaNatural : styles.media}
          src={src}
          aria-label={alt}
          playsInline
          muted
          loop
          autoPlay
        />
      ) : (
        <img
          className={natural ? styles.mediaNatural : styles.media}
          src={src}
          alt={alt}
        />
      )}
    </div>
  )

  return (
    <figure className={figureClass}>
      {enableOverlay ? (
        <button
          type="button"
          className={styles.button}
          onClick={() => setOpen(true)}
          aria-label={`Expand: ${alt}`}
        >
          {frame}
        </button>
      ) : (
        frame
      )}
      {caption != null ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
      {enableOverlay && open ? (
        <MediaOverlay
          src={src}
          alt={alt}
          mediaType={mediaType}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </figure>
  )
}
