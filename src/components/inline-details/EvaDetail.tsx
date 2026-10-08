import TitleDescription from '../detail/TitleDescription'
import SingleImage from '../detail/SingleImage'
import MultipleImage from '../detail/MultipleImage'

export default function EvaDetail() {
  return (
    <>
      <TitleDescription
        leftSubtitle="Project Eva is a configuration management tool that lets engineers scale live services with confidence—reviewing current settings, staging edits inline, and confirming every change before it reaches production."
        rightSubtitle={`Ahead of a major holiday email campaign, Sarah needs to scale the API-Users service to handle a surge in traffic by raising its max replicas from 16 to 32.

She checks the current setting (4 / 16, api-v3.0.12), selects the API-Users row, and clicks "Edit Selected." She changes Max Replicas to 32, and the cell highlights as a staged change.

She confirms the change, and Eva deploys it to live infrastructure with a success message.`}
      />
      <SingleImage
        src="/Work/EVA/edit006.mp4"
        alt="Eva edit flow"
        mediaType="video"
        enableOverlay
      />
      <MultipleImage
        enableOverlay
        aspectRatio="1920 / 1080"
        images={[
          {
            src: '/Work/EVA/%E5%9F%BA%E6%9C%AC.png',
            alt: 'Eva cluster overview',
          },
          {
            src: '/Work/EVA/Zoom.png',
            alt: 'Eva inline replica edit',
          },
          {
            src: '/Work/EVA/pop-in.png',
            alt: 'Eva edit confirmation panel',
          },
        ]}
      />
    </>
  )
}
