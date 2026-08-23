import type { SocialLink } from '../../content/types'
import { socialIconPaths } from './socialIconPaths'

type SocialIconsProps = {
  links: SocialLink[]
  className?: string
  iconClassName?: string
  /** 'light' = dark icon on a light circle (light backgrounds, e.g. the nav).
   *  'dark' = light icon on a translucent circle (dark backgrounds, e.g. the footer). */
  variant?: 'light' | 'dark'
}

const variantClasses: Record<NonNullable<SocialIconsProps['variant']>, string> = {
  light: 'bg-ink/5 text-ink hover:bg-olive hover:text-greige',
  dark: 'bg-greige/10 text-greige hover:bg-olive hover:text-greige',
}

export default function SocialIcons({ links, className, iconClassName, variant = 'light' }: SocialIconsProps) {
  return (
    <ul className={`flex items-center gap-3 ${className ?? ''}`}>
      {links.map((link) => {
        const Icon = socialIconPaths[link.id]
        return (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.label}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-105 ${variantClasses[variant]}`}
            >
              <Icon className={iconClassName ?? 'h-4 w-4'} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
