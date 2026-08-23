/** Sections short enough that a top-aligned scroll leaves them feeling off-screen. */
const CENTERED_SECTION_IDS = new Set(['reviews', 'contact', 'faq'])

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: CENTERED_SECTION_IDS.has(id) ? 'center' : 'start',
  })
}
