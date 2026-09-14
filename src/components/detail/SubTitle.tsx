import type { ReactNode } from 'react'
import styles from './SubTitle.module.css'

export default function SubTitle({ children }: { children: ReactNode }) {
  return <h3 className={styles.subtitle}>{children}</h3>
}
