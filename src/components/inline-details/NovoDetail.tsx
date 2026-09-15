import TitleDescription from '../detail/TitleDescription'
import MultipleImage from '../detail/MultipleImage'

export default function NovoDetail() {
  return (
    <>
      <TitleDescription
        leftSubtitle="NOVO is an app built for small business owners, entrepreneurs, and freelancers. I led the UI/UX design in taking this project from an early rough draft to a complete project shipped to the app store."
        rightSubtitle={`When I first joined Novo it was a very early stage startup running out of the Barclays Bank Startup accelerator. I was hired as the sole UI designer to take the research done and the early stage project they had and make it something shippable to the app store.

The goal was to make the app look modern with a modular feel, that allowed room for future features to be added later on.

The dashboard was designed as the primary user touchpoint, focusing on modularity and intuitive user experience. Key features were strategically placed for easy access:

• Account Balance / Recent Transactions / Send Money / Fund Your Novo Account

The onboarding process was carefully structured, requiring users to complete two key steps: approval from Novo's partner bank and an initial $50 deposit to unlock full functionality. Special dashboard states were implemented to guide users through this process seamlessly.

The payment system was engineered to be frictionless, with particular attention to the user experience when adding payees and transferring money.`}
      />
      <MultipleImage
        enableOverlay
        images={[
          { src: '/Work/Novo/novo-1.png', alt: 'Novo view 1' },
          { src: '/Work/Novo/novo-2.png', alt: 'Novo view 2' },
          { src: '/Work/Novo/novo-4.png', alt: 'Novo view 4' },
          { src: '/Work/Novo/novo-5.png', alt: 'Novo view 5' },
        ]}
      />
    </>
  )
}
