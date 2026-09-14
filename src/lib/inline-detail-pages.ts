import type { SectionTab } from './gallery-data'

export type InlineDetailId =
  | 'eva'
  | 'roga'
  | 'korn-ferry'
  | 'arena-physica'
  | 'mcm'
  | 'novo'
  | 'slai'
  | 'the-trade-desk'

/** Home tab for each inline detail panel */
export const INLINE_DETAIL_TAB: Record<InlineDetailId, SectionTab> = {
  eva: 'gallery',
  roga: 'gallery',
  'korn-ferry': 'design',
  'arena-physica': 'design',
  mcm: 'design',
  novo: 'design',
  slai: 'design',
  'the-trade-desk': 'design',
}

const INLINE_DETAIL_IDS = new Set<string>(Object.keys(INLINE_DETAIL_TAB))

export function isInlineDetailId(id: string): id is InlineDetailId {
  return INLINE_DETAIL_IDS.has(id)
}

export function buildSectionHash(
  tab: SectionTab,
  detailId?: InlineDetailId | null,
): string {
  if (detailId) return `${tab}/${detailId}`
  return tab
}

export function parseSectionHash(hash: string): {
  tab: SectionTab | null
  detailId: InlineDetailId | null
} {
  const raw = hash.replace(/^#/, '').trim()
  if (!raw) return { tab: null, detailId: null }

  const parts = raw.split('/').filter(Boolean)
  if (parts.length === 1) {
    const [segment] = parts
    if (isInlineDetailId(segment)) {
      return { tab: INLINE_DETAIL_TAB[segment], detailId: segment }
    }
    const tabMap: Record<string, SectionTab> = {
      gallery: 'gallery',
      development: 'development',
      waypoint: 'waypoint',
      design: 'design',
      'past-work': 'design',
    }
    return { tab: tabMap[segment] ?? null, detailId: null }
  }

  const detailId = isInlineDetailId(parts[1]) ? parts[1] : null
  if (detailId) {
    return { tab: INLINE_DETAIL_TAB[detailId], detailId }
  }

  const tabMap: Record<string, SectionTab> = {
    gallery: 'gallery',
    development: 'development',
    waypoint: 'waypoint',
    design: 'design',
  }
  return { tab: tabMap[parts[0]] ?? null, detailId: null }
}
