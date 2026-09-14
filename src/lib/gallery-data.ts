import type { InlineDetailId } from './inline-detail-pages'

export type GalleryCardItem = {
  title: string
  meta: string
  image: string
  video?: string
  thumbnailVideo?: string
  href?: string
  openInNewTab?: boolean
  imageBackground?: string
  /** Opens inline text/media detail panel when set */
  detailId?: InlineDetailId
}

export type SectionTab = 'gallery' | 'waypoint' | 'development' | 'design'

const NODE_MENU_CARD: GalleryCardItem = {
  title: 'Node Menu',
  meta: 'Node Based Integration Flow',
  image: '/Gallery/node-menu/Port-card.png',
  href: 'https://wp-origin.guildconcept.workers.dev/node-menu#1',
  openInNewTab: false,
}

export const galleryItems: GalleryCardItem[] = [
  {
    title: 'Waypoint Origin',
    meta: 'Live implementation flows',
    image: '/Gallery/waypoint-manager/wp-origin.png',
    href: 'https://wp-origin.guildconcept.workers.dev/steps-waypoint#1',
    openInNewTab: false,
  },
  { title: 'GRN - Wallet Balance', meta: 'Finance', image: '/Gallery/grn.jpeg' },
  { title: 'AI Chat Auto Fill', meta: 'Chat Prompt', image: '/Gallery/ai-chat.png' },
  {
    title: 'Integration Manual',
    meta: 'Documentation',
    image: '/Gallery/integration-manual.mp4',
    video: '/Gallery/integration-manual.mp4',
    thumbnailVideo: '/Gallery/integration-manual_small.mp4',
  },
  {
    title: 'Integrations Screen',
    meta: 'Software Dev',
    image: '/Gallery/design-add/wave%202/Integrations%20Screen.png',
  },
  NODE_MENU_CARD,
  {
    title: 'Luna',
    meta: 'Code Editor',
    image: '/Gallery/luna_small.mp4',
    video: '/Gallery/luna_small.mp4',
    thumbnailVideo: '/Gallery/luna_small.mp4',
    href: 'https://wp-origin.guildconcept.workers.dev/luna-base#1',
    openInNewTab: false,
  },
  {
    title: 'Polar Systems',
    meta: ' Cyber Security',
    image: '/Gallery/polar-systems/polar-systems-new-1.png',
    href: 'https://wp-origin.guildconcept.workers.dev/polar-systems#1',
  },
  {
    title: 'Valentia',
    meta: 'Crypto Concept',
    image: '/Gallery/Valentia/Valentia2.png',
    href: 'https://valentia-waypoint-v2.guildconcept.workers.dev/#2',
    openInNewTab: false,
  },
  {
    title: 'Social Media Analytics',
    meta: 'Analytics',
    image: '/Gallery/design-add/wave%202/Marketing.png',
  },
  {
    title: 'DB Performance Metrics',
    meta: 'Databases',
    image: '/Gallery/design-add/Database%20Screen.png',
  },
  {
    title: 'Eva',
    meta: 'Config Management',
    image: '/Gallery/Eva/Eva.mp4',
    video: '/Gallery/Eva/Eva.mp4',
    thumbnailVideo: '/Gallery/Eva/Eva_small.mp4',
    detailId: 'eva',
  },
  { title: 'Roga', meta: 'Finance', image: '/Gallery/Roga.png', detailId: 'roga' },
  {
    title: 'Performance Graphs',
    meta: 'Analytics',
    image: '/Gallery/design-add/wave%202/Performance%20Graphs.png',
  },
  { title: 'Code Editor', meta: 'Software Dev', image: '/Gallery/code-editor.jpeg' },
  {
    title: 'Balance Chart',
    meta: 'Animation',
    image: '/Gallery/balance-chart.mp4',
    video: '/Gallery/balance-chart.mp4',
    thumbnailVideo: '/Gallery/balance-chart_small.mp4',
  },
]

export const designItems: GalleryCardItem[] = [
  {
    title: 'Arena Physica',
    meta: 'Product Design',
    image: '/Work/ArenaPhysica/arena-physica.png',
    detailId: 'arena-physica',
  },
  {
    title: 'Korn Ferry',
    meta: 'Product Design',
    image: '/Work/KornFerry/korn-ferry.png',
    detailId: 'korn-ferry',
  },
  {
    title: 'MCM',
    meta: 'Shopping Cart Redesign UI/UX',
    image: '/Work/MCM.avif',
    detailId: 'mcm',
  },
  {
    title: 'SLAI',
    meta: 'Web and Product',
    image: '/Work/SLAI.avif',
    detailId: 'slai',
  },
  {
    title: 'The Trade Desk',
    meta: 'Design Systems',
    image: '/Work/TheTradeDesk/theTradedesk.webp',
    detailId: 'the-trade-desk',
  },
  {
    title: 'Novo',
    meta: 'App Design',
    image: '/Work/Novo.avif',
    detailId: 'novo',
  },
  {
    title: 'Dribbble',
    meta: 'More Designs',
    image: '/Work/Dribbble.png',
    href: 'https://dribbble.com/atencium-ui',
  },
]

export const waypointItems: GalleryCardItem[] = [
  NODE_MENU_CARD,
  {
    title: 'Luna',
    meta: 'Code Editor',
    image: '/Gallery/luna_small.mp4',
    video: '/Gallery/luna_small.mp4',
    thumbnailVideo: '/Gallery/luna_small.mp4',
    href: 'https://wp-origin.guildconcept.workers.dev/luna-base#1',
    openInNewTab: false,
  },
  {
    title: 'Polar Systems',
    meta: 'Cyber Security',
    image: '/Gallery/polar-systems/polar-systems-new-1.png',
    href: 'https://wp-origin.guildconcept.workers.dev/polar-systems#1',
  },
  {
    title: 'Waypoint Origin',
    meta: 'Live implementation flows',
    image: '/Gallery/waypoint-manager/wp-origin.png',
    href: 'https://wp-origin.guildconcept.workers.dev/steps-waypoint#1',
    openInNewTab: false,
  },
]

export const developmentItems: GalleryCardItem[] = [
  NODE_MENU_CARD,
  {
    title: 'Valentia',
    meta: 'Crypto Concept',
    image: '/Gallery/Valentia/Valentia2.png',
    href: 'https://valentia-waypoint-v2.guildconcept.workers.dev/#2',
    openInNewTab: false,
  },
  {
    title: 'Luna',
    meta: 'Code Editor',
    image: '/Gallery/luna_small.mp4',
    video: '/Gallery/luna_small.mp4',
    thumbnailVideo: '/Gallery/luna_small.mp4',
    href: 'https://wp-origin.guildconcept.workers.dev/luna-base#1',
    openInNewTab: false,
  },
  {
    title: 'Polar Systems',
    meta: ' Cyber Security',
    image: '/Gallery/polar-systems/polar-systems-new-1.png',
    href: 'https://wp-origin.guildconcept.workers.dev/polar-systems#1',
  },
  {
    title: 'Waypoint Origin',
    meta: 'Live implementation flows',
    image: '/Gallery/waypoint-manager/wp-origin.png',
    href: 'https://wp-origin.guildconcept.workers.dev/steps-waypoint#1',
    openInNewTab: false,
  },
  {
    title: 'LuminosJP',
    meta: 'Japanese Study Assistant',
    image: '/DevProjects/0O5LO5dmIfiZVzgBnuuXlbZHEU.webp',
    href: 'https://luminos-jp.vercel.app/',
  },
  {
    title: 'Pomodash',
    meta: 'Pomodoro time tracker',
    image: '/DevProjects/y6uSycd7e8u2Bvc9EXBTZugNI.avif',
    href: 'https://pomodash.app/',
  },
]

export const TAB_ITEMS: Record<SectionTab, GalleryCardItem[]> = {
  gallery: galleryItems,
  development: developmentItems,
  waypoint: waypointItems,
  design: designItems,
}

export type NavIndicatorColors = {
  top: string
  mid: string
  bottom: string
}

export const NAV_ITEMS: {
  id: SectionTab
  label: string
  title: string
  subtitle: string
  background: string
  hash: string
  headerIcon: string
  indicator: NavIndicatorColors
}[] = [
  {
    id: 'gallery',
    label: 'design gallery',
    title: 'Design Gallery',
    subtitle: '//Various personal designs and projects',
    background: '/sidebar-content/design-tab.png',
    hash: 'gallery',
    headerIcon: '/home/home-icons/design-gal.svg',
    indicator: { top: '#262626', mid: '#FF4545', bottom: '#FFE83C' },
  },
  {
    id: 'waypoint',
    label: 'waypoint',
    title: 'Waypoint',
    subtitle: '//Live implementation flows and demos',
    background: '/sidebar-content/waypoint-tab.png',
    hash: 'waypoint',
    headerIcon: '/home/tab-icons/waypoint-icon.svg',
    indicator: { top: '#1A1A1A', mid: '#FFE83C', bottom: '#FFF3A0' },
  },
  {
    id: 'development',
    label: 'development',
    title: 'Development',
    subtitle: '//Shipped apps and interactive builds',
    background: '/sidebar-content/dev-tab.png',
    hash: 'development',
    headerIcon: '/home/tab-icons/dev-icon.svg',
    indicator: { top: '#1A2B1F', mid: '#3D9A5F', bottom: '#B8F5A0' },
  },
  {
    id: 'design',
    label: 'past work',
    title: 'Past Work',
    subtitle: '//Old Designs',
    background: '/sidebar-content/past-work.png',
    hash: 'design',
    headerIcon: '/home/tab-icons/pw-icon.svg',
    indicator: { top: '#1A2433', mid: '#3D7CFF', bottom: '#B8D4FF' },
  },
]
