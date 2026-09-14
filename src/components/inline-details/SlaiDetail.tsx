import TitleDescription from '../detail/TitleDescription'
import MultipleImage from '../detail/MultipleImage'

export default function SlaiDetail() {
  return (
    <>
      <TitleDescription
        title="Slai.io - Rebranded to Bolt.io"
        leftSubtitle="Slai makes it easy to get models into production. No server, no configuration, no headaches. The founders approached me to help give their vision more substance and get their designs out the door quickly."
        rightSubtitle={`Made initial design for the webpage, the code editor, and the dashboard. The code editor features a streamlined interface for deploying code without complications. It includes essential functionality found in standard code editors while maintaining flexibility for future enhancements and integration with the product pipeline.

        The dashboard serves as a central hub for storing and managing deployed code models. Users can select existing models, build new ones from templates, and monitor their uptime and platform usage after deployment. During the design phase, I created concepts for both a credits-based system and a monthly subscription model.`}
      />
      <MultipleImage
        enableOverlay
        images={[
          { src: '/Work/Slai/WebDesign/web-1.png', alt: 'Slai view 1' },
          {
            src: '/Work/Slai/Code%20Editor/code-editor-1.png',
            alt: 'Slai view 3',
          },
          { src: '/Work/Slai/Dashboard/dashboard-2.png', alt: 'Slai view 6' },
          { src: '/Work/Slai/Dashboard/dashboard-1.png', alt: 'Slai view 8' },
          {
            src: '/Work/Slai/Code%20Editor/code-editor-2.png',
            alt: 'Slai view 4',
          },
          { src: '/Work/Slai/Dashboard/dashboard-3.png', alt: 'Slai view 7' },
        ]}
      />
    </>
  )
}
