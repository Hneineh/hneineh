import type { ReactElement } from 'react'
import type { SocialPlatform } from '../../content/types'

export type SocialIconFactory = (props: { className?: string }) => ReactElement

export const socialIconPaths: Record<SocialPlatform, SocialIconFactory> = {
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93v-1.9c0-.86.24-1.44 1.47-1.44h1.57V4.44A21 21 0 0 0 14.4 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.24H8.14v2.96h2.56V21z" />
    </svg>
  ),
  pinterest: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.02 0C5.4 0 .03 5.37.03 11.99c0 5.08 3.16 9.42 7.62 11.16-.1-.95-.2-2.4.04-3.44.22-.94 1.41-5.96 1.41-5.96s-.36-.72-.36-1.78c0-1.66.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.65 2.57-.99 4-.29 1.19.6 2.16 1.78 2.16 2.13 0 3.77-2.24 3.77-5.48 0-2.87-2.06-4.87-5.01-4.87-3.41 0-5.41 2.56-5.41 5.2 0 1.03.39 2.14.89 2.74.1.12.11.22.08.34-.09.38-.29 1.2-.33 1.36-.05.23-.17.27-.4.16-1.5-.69-2.43-2.87-2.43-4.65 0-3.78 2.75-7.25 7.92-7.25 4.16 0 7.4 2.97 7.4 6.93 0 4.13-2.61 7.46-6.23 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A11.99 11.99 0 1 0 12.02 0" />
    </svg>
  ),
  instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.9-.79-1.44-1.9-1.5-3.14h-3.02v12.86c0 1.4-1.14 2.54-2.55 2.54a2.55 2.55 0 0 1-2.55-2.55c0-1.53 1.4-2.7 2.94-2.44V9.98c-3.15-.42-5.92 2.03-5.92 5.16 0 3.05 2.53 5.22 5.21 5.22 2.87 0 5.21-2.33 5.21-5.22V8.7a7.5 7.5 0 0 0 4.4 1.4V7.06s-1.71.08-2.22-1.24Z" />
    </svg>
  ),
}
