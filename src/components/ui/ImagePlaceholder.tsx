type ImagePlaceholderProps = {
  label: string
  className?: string
  ratio?: 'square' | 'video' | 'portrait'
}

const ratioClass: Record<NonNullable<ImagePlaceholderProps['ratio']>, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
}

/** Consistent stand-in for pending photography — never a broken <img>. */
export default function ImagePlaceholder({
  label,
  className,
  ratio = 'video',
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex ${ratioClass[ratio]} w-full flex-col items-center justify-center gap-2 rounded-lg bg-tan/50 p-4 text-center ring-1 ring-inset ring-ink/10 ${className ?? ''}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-8 w-8 text-brown/50"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m4 17 5-5 3.5 3.5L17 11l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-body text-xs text-ink/50">{label}</p>
    </div>
  )
}
