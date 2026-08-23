import { useRef, useState, type ReactNode } from 'react'

type AccordionItemProps = {
  id: string
  question: string
  children: ReactNode
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ id, question, children, isOpen, onToggle }: AccordionItemProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <div className="rounded-lg bg-white/40 ring-1 ring-ink/10">
      <h3>
        <button
          type="button"
          id={`accordion-trigger-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-panel-${id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-start font-body text-lg font-semibold text-brown transition-colors hover:bg-ink/5"
        >
          <span>{question}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`h-5 w-5 shrink-0 text-olive transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
        ref={panelRef}
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
        }}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 font-body text-ink/80">{children}</div>
        </div>
      </div>
    </div>
  )
}

type AccordionProps = {
  items: { id: string; question: string; content: ReactNode }[]
  defaultOpenId?: string
  className?: string
}

/** Single-open accordion with a smooth grid-rows expand/collapse. */
export default function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)

  return (
    <div className={`space-y-3 ${className ?? ''}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
