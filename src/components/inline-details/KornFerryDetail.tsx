import TitleDescription from '../detail/TitleDescription'
import SingleImage from '../detail/SingleImage'
import styles from './KornFerryDetail.module.css'

export default function KornFerryDetail() {
  return (
    <div className={styles.header}>
      <SingleImage
        src="/assets/korn-ferry/kf-banner.png"
        alt="Korn Ferry project preview"
        fit="natural"
        className={styles.banner}
      />
      <TitleDescription
        leftSubtitle="Designed B2B software products for hiring processes, including AI-powered features and data visualization."
        rightSubtitle={`During my year at Korn Ferry, I designed multiple B2B software products in a fast-paced agile environment, focusing on mass and specialized hiring processes.

        Working closely with the development team, I created features ranging from AI-powered automatic account and website creation to comprehensive hiring process data visualization.

        Due to an NDA (Non-Disclosure Agreement), I cannot share the product screens.`}
      />
    </div>
  )
}
