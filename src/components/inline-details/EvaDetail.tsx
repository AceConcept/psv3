import TitleDescription from '../detail/TitleDescription'
import SingleImage from '../detail/SingleImage'
import MultipleImage from '../detail/MultipleImage'

export default function EvaDetail() {
  return (
    <>
      <TitleDescription
        leftSubtitle="Project Eva is a specialized framework designed to streamline how complex systems are built, deployed, and maintained."
        rightSubtitle={`The Marketing team is about to launch a major holiday promotional email blast, and Sarah needs to scale up the primary user-facing application, the API-Users service, to handle a huge surge in traffic. Specifically, she needs to increase the maximum number of instances (replicas) the service can run from 16 to 32.

She sees the current configuration (4 / 16) and confirms the service is currently running version api-v3.0.12. She notes the current setting is too low for the expected load. She clicks the checkbox next to the -API-Users row, and the "Edit Selected" button becomes active. She then clicks "Edit Selected."

She quickly confirms that the only change is the Max Replicas from 16 to 32. She ignores the Min Replicas input but deletes the 16 in the Max Replicas input field and types in 32. The cell immediately highlights to indicate a staged change.

Sarah clicks confirm changes and deploys the change. The system displays a successful message confirming the change to the live infrastructure.`}
      />
      <SingleImage
        src="/Gallery/Eva/EVA1.mp4"
        alt="Eva video 1"
        mediaType="video"
      />
      <MultipleImage
        enableOverlay
        images={[
          {
            src: '/Gallery/Eva/EVA1.mp4',
            thumbnailSrc: '/Gallery/Eva/EVA1_small.mp4',
            alt: 'Eva video 1',
            mediaType: 'video',
          },
          {
            src: '/Gallery/Eva/EVA2.mp4',
            thumbnailSrc: '/Gallery/Eva/EVA2_small.mp4',
            alt: 'Eva video 2',
            mediaType: 'video',
          },
          {
            src: '/Gallery/Eva/EVA3.mp4',
            thumbnailSrc: '/Gallery/Eva/EVA3_small.mp4',
            alt: 'Eva video 3',
            mediaType: 'video',
          },
        ]}
      />
    </>
  )
}
