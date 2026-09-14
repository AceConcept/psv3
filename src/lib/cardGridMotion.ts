/** Arknights-style opacity wave: left column leads enter and exit */
export const CARD_FADE_DURATION = 0.28
export const CARD_OPACITY_SPEED = 1.6
export const CARD_OPACITY_DURATION = CARD_FADE_DURATION / CARD_OPACITY_SPEED
export const CARD_COL_STAGGER = 0.05
export const CARD_DRIFT_PX = 14
export const CARDS_PER_ROW = 3
export const CARD_ENTER_EASE = 'easeOut' as const
export const CARD_EXIT_EASE = 'easeIn' as const

export function getCardGridColumn(
  index: number,
  _totalCards: number,
  cardsPerRow: number,
): number {
  const posInRow = index % cardsPerRow
  return posInRow + 1
}

export function getCardGridPlacement(
  index: number,
  totalCards: number,
  cardsPerRow: number,
) {
  return {
    gridRow: Math.floor(index / cardsPerRow) + 1,
    gridColumn: getCardGridColumn(index, totalCards, cardsPerRow),
  }
}

export function getCardMotionDelays(
  index: number,
  _totalCards: number,
  cardsPerRow: number,
) {
  const posInRow = index % cardsPerRow
  const delay = posInRow * CARD_COL_STAGGER

  return {
    enter: delay,
    exit: delay,
  }
}
