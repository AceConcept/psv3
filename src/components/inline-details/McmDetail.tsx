import TitleDescription from '../detail/TitleDescription'
import MultipleImage from '../detail/MultipleImage'

export default function McmDetail() {
  return (
    <>
      <TitleDescription
        leftSubtitle="Shopping cart redesign for MCM International, a luxury fashion brand from Munich, known for its iconic backpacks and accessories."
        rightSubtitle={`While working at the First Principle design agency, MCM approached us with the task of redesigning their cart flow. I was put in-charge of this project to build a new checkout system utilizing the best industry standards of the time.

The desktop experience was designed to provide a comprehensive overview of the cart contents while maintaining easy access to key actions. The layout uses additional screen space to display more information without overwhelming the user.

For the mobile interface, we focused on creating a streamlined experience that would work seamlessly across different device sizes. The design prioritizes the most important information while maintaining easy access to all features.`}
      />
      <MultipleImage
        enableOverlay
        images={[
          {
            src: '/Work/MCM/Desktop%20EXP/IlEXPJMeDwFytoaEOcRuYy6K4.webp',
            alt: 'MCM Desktop EXP view 1',
          },
          {
            src: '/Work/MCM/Desktop%20EXP/JsitGWUwAQhLc3lTxpNkUWbX3Yo.webp',
            alt: 'MCM Desktop EXP view 2',
          },
          {
            src: '/Work/MCM/Desktop%20EXP/KUDnnF2HdZu0kABaDMSZUiEn0M.webp',
            alt: 'MCM Desktop EXP view 3',
          },
          {
            src: '/Work/MCM/Desktop%20EXP/O4379Pusl16Yamxr4qepmKLbw.webp',
            alt: 'MCM Desktop EXP view 4',
          },
          {
            src: '/Work/MCM/Mobile%20EXP/enN7enptmuKQqlxfMNMOX41PAg.webp',
            alt: 'MCM Mobile EXP view 1',
          },
          {
            src: '/Work/MCM/Mobile%20EXP/oARLhdksYB7IIlyNalrI3k4SK6w.webp',
            alt: 'MCM Mobile EXP view 2',
          },
          {
            src: '/Work/MCM/Mobile%20EXP/TVDosVtWpbtgnj6Effi7vg230Q.webp',
            alt: 'MCM Mobile EXP view 3',
          },
          {
            src: '/Work/MCM/Mobile%20EXP/wBfNTalo5uUR7iblkY9xtYUrA.webp',
            alt: 'MCM Mobile EXP view 4',
          },
        ]}
      />
    </>
  )
}
