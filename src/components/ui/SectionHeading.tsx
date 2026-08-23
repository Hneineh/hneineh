import { useInView } from '../../hooks/useInView'

type SectionHeadingProps = {
  title: string
  light?: boolean
  className?: string
}

function Dot({ isInView, delayMs }: { isInView: boolean; delayMs: number }) {
  return (
    <span
      aria-hidden="true"
      className={`h-1.5 w-1.5 shrink-0 rounded-full bg-olive transition-all duration-500 ease-out ${
        isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    />
  )
}

/** Section title with a fade/slide-up entrance, flanked by two small dots. */
export default function SectionHeading({ title, light, className }: SectionHeadingProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`flex items-center justify-center gap-4 ${className ?? ''}`}>
      <Dot isInView={isInView} delayMs={150} />
      <h2
        className={`font-display text-center text-3xl transition-all duration-700 ease-out sm:text-4xl ${
          light ? 'text-greige' : 'text-brown'
        } ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        {title}
      </h2>
      <Dot isInView={isInView} delayMs={150} />
    </div>
  )
}
