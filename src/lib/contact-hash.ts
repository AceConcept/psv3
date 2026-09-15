export const CONTACT_HASH = 'contact'

export function isContactHash(hash: string): boolean {
  const raw = hash.replace(/^#/, '').trim().split('/')[0]
  return raw === CONTACT_HASH
}

export function buildContactHash(): string {
  return CONTACT_HASH
}
