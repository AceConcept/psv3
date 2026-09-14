import type { ComponentType } from 'react'
import type { InlineDetailId } from '../../lib/inline-detail-pages'
import EvaDetail from './EvaDetail'
import RogaDetail from './RogaDetail'
import KornFerryDetail from './KornFerryDetail'
import ArenaPhysicaDetail from './ArenaPhysicaDetail'
import McmDetail from './McmDetail'
import NovoDetail from './NovoDetail'
import SlaiDetail from './SlaiDetail'
import TheTradeDeskDetail from './TheTradeDeskDetail'

const INLINE_DETAIL_COMPONENTS: Record<InlineDetailId, ComponentType> = {
  eva: EvaDetail,
  roga: RogaDetail,
  'korn-ferry': KornFerryDetail,
  'arena-physica': ArenaPhysicaDetail,
  mcm: McmDetail,
  novo: NovoDetail,
  slai: SlaiDetail,
  'the-trade-desk': TheTradeDeskDetail,
}

export default function InlineDetailView({ id }: { id: InlineDetailId }) {
  const Detail = INLINE_DETAIL_COMPONENTS[id]
  return <Detail />
}
