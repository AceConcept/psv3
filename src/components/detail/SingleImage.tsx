import styles from './SingleImage.module.css'

export type SingleImageProps = {
  src: string
  alt: string
  mediaType?: 'image' | 'video'
  caption?: string
  /** `cover` fills a 16:9 frame; `natural` renders the asset as-is */
  fit?: 'cover' | 'natural'
  className?: string
}

export default function SingleImage({
  src,
  alt,
  mediaType = 'image',
  caption,
  fit = 'cover',
  className = '',
}: SingleImageProps) {
  const natural = fit === 'natural'
  const figureClass = `${styles.figure}${className ? ` ${className}` : ''}`.trim()

  return (
    <figure className={figureClass}>
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
      {caption != null ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}
