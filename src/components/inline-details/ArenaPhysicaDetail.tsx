import TitleDescription from '../detail/TitleDescription'
import SingleImage from '../detail/SingleImage'

export default function ArenaPhysicaDetail() {
  return (
    <>
      <TitleDescription
        title="Arena Physica"
        leftSubtitle="Powered by Atlas, Arena Physica Labs accelerates the hardware development cycle from concept to tapeout"
        rightSubtitle="At Arena Physica I provided design thinking to develop features for their main product Atlas. I also created interactive prototypes for their clients using Figma."
        rightSubtitlePreviewLength={0}
      />
      <SingleImage
        src="/Work/ArenaPhysica/arena-physica.png"
        alt="Arena Physica brand preview"
      />
    </>
  )
}
