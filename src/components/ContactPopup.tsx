import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './ContactPopup.module.css'

const CONTACT_EMAIL = 'guildconcept@gmail.com'
const CONTACT_PHONE = '(929) 396-8610'
const CALENDLY_URL = 'https://calendly.com/ace-concept/recruiter-call'
const COPY_STATUS_DURATION_MS = 2000

type ContactPopupProps = {
  onClose: () => void
}

export default function ContactPopup({ onClose }: ContactPopupProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const copyTimeoutRef = useRef<number | null>(null)
  const [copyStatus, setCopyStatus] = useState<string | null>(null)

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus('Copied to clipboard')
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current)
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopyStatus(null)
        copyTimeoutRef.current = null
      }, COPY_STATUS_DURATION_MS)
    } catch {
      setCopyStatus(null)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  useEffect(() => {
    panelRef.current?.focus()
  }, [])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-popup-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close contact popup"
          onClick={onClose}
        >
          <svg
            className={styles.closeIcon}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect
              className={styles.closeCircle}
              x="0.5"
              y="0.5"
              width="27"
              height="27"
              rx="13.5"
            />
            <rect
              className={styles.closeX}
              x="20.9257"
              y="20.0078"
              width="1"
              height="19"
              rx="0.5"
              transform="rotate(135 20.9257 20.0078)"
            />
            <rect
              className={styles.closeX}
              x="7.49023"
              y="21.4218"
              width="1"
              height="19"
              rx="0.5"
              transform="rotate(-135 7.49023 21.4218)"
            />
          </svg>
        </button>

        <div className={styles.body}>
          <div className={styles.contactContent}>
            <div className={styles.contactHeader}>
              <img
                src="/home/contact-popin/contact-logo.png"
                alt=""
                className={styles.titleLogo}
                aria-hidden
              />
              <div className={styles.contactDetails}>
                <h2 id="contact-popup-title" className={styles.title}>
                  Get In Contact
                </h2>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Email</span>
                  <button
                    type="button"
                    className={styles.contactValue}
                    onClick={() => handleCopy(CONTACT_EMAIL)}
                  >
                    <span className={styles.contactValueText}>
                      {CONTACT_EMAIL}
                    </span>
                    <img
                      src="/home/contact-popin/copy-icn.svg"
                      alt=""
                      className={styles.contactCopyIcon}
                      aria-hidden
                    />
                  </button>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Phone</span>
                  <button
                    type="button"
                    className={styles.contactValue}
                    onClick={() => handleCopy(CONTACT_PHONE)}
                  >
                    <span className={styles.contactValueText}>
                      {CONTACT_PHONE}
                    </span>
                    <img
                      src="/home/contact-popin/copy-icn.svg"
                      alt=""
                      className={styles.contactCopyIcon}
                      aria-hidden
                    />
                  </button>
                </div>
              </div>
            </div>
            <img
              src="/home/contact-popin/sep-grphc.png"
              alt=""
              className={styles.sepGraphic}
              aria-hidden
            />
            <div className={styles.bookCallSection}>
              <div className={styles.bookCallLead}>
                <div className={styles.bookCallIconWrap} aria-hidden>
                  <img
                    src="/home/sidebar-icons/contact-icn.svg"
                    alt=""
                    className={styles.bookCallIcon}
                  />
                </div>
                <div className={styles.bookCallText}>
                  <p className={styles.bookCallTitle}>Book a Call</p>
                  <p className={styles.bookCallSubtitle}>
                    Schedule a call w/ Calendly
                  </p>
                </div>
              </div>
              <a
                className={styles.bookCallButton}
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Calendly
              </a>
            </div>
          </div>
        </div>
      </div>
      {copyStatus ? (
        <p className={styles.copyStatus} role="status" aria-live="polite">
          {copyStatus}
        </p>
      ) : null}
    </div>
  )
}
