import TitleDescription from '../detail/TitleDescription'
import SubTitle from '../detail/SubTitle'
import MultipleImage from '../detail/MultipleImage'

export default function RogaDetail() {
  return (
    <>
      <TitleDescription
        leftSubtitle="Roga is a banking app designed to simplify everyday money management. It removes the frustration from common banking tasks—letting you track balances, manage payments, and reach financial goals with clarity and ease."
        rightSubtitle={`Roga’s homepage is built with a modular design, giving each banking tool its own clear, flexible space. This makes it easier for users to focus on what matters—whether that’s checking their balance, tracking goals, or reviewing recent activity—without the screen feeling cluttered or overwhelming.

        Manage your money with a dashboard that transforms your Balance + Score into a clear picture of your financial health. By pairing a visual breakdown of your Transactions Info with progress tracking for your Custom Goals, the app turns daily spending into purposeful growth. To top it off, you’ll receive tailored Suggested Actions—smart nudges that help you build better habits and reach your milestones even faster.`}
      />
      <MultipleImage
        enableOverlay
        images={[
          { src: '/Gallery/Roga/1.avif', alt: 'Roga view 1' },
          { src: '/Gallery/Roga/2.webp', alt: 'Roga view 3' },
          { src: '/Gallery/Roga/7.webp', alt: 'Roga view 7' },
          { src: '/Gallery/Roga/8.webp', alt: 'Roga view 8' },
          { src: '/Gallery/Roga/9.webp', alt: 'Roga view 9' },
          { src: '/Gallery/Roga/10.webp', alt: 'Roga view 10' },
        ]}
      />
      <SubTitle>components</SubTitle>
      <MultipleImage
        enableOverlay
        images={[
          { src: '/Gallery/Roga/3.webp', alt: 'Roga components 1' },
          { src: '/Gallery/Roga/4.webp', alt: 'Roga components 2' },
          { src: '/Gallery/Roga/5.webp', alt: 'Roga components 3' },
          { src: '/Gallery/Roga/6.webp', alt: 'Roga components 4' },
        ]}
      />
    </>
  )
}
