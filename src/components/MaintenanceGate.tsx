import { LockKeyhole } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { brandCopy } from '../content/brandCopy'

export function MaintenanceGate({ children }: { children: ReactNode }) {
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Hydross · en construcción'
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    appRef.current?.setAttribute('inert', '')

    return () => {
      document.body.style.overflow = previousOverflow
      appRef.current?.removeAttribute('inert')
    }
  }, [])

  return (
    <div className="maintenance-shell">
      <div ref={appRef} className="maintenance-app" aria-hidden="true">
        {children}
      </div>
      <main className="maintenance-overlay" aria-labelledby="maintenance-title">
        <section className="maintenance-card" role="dialog" aria-modal="true">
          <div className="maintenance-lock" aria-hidden="true">
            <LockKeyhole size={31} strokeWidth={1.25} />
          </div>
          <p className="eyebrow">{brandCopy.maintenance.eyebrow}</p>
          <h1 id="maintenance-title">
            {brandCopy.maintenance.title}<br />
            <em>{brandCopy.maintenance.accent}</em>
          </h1>
          <p className="maintenance-message">{brandCopy.maintenance.description}</p>
          <div className="maintenance-status">
            <span>{brandCopy.maintenance.statusLabel}</span>
            <strong>{brandCopy.maintenance.status}</strong>
          </div>
          <div className="maintenance-rule" />
          <p className="maintenance-note">{brandCopy.maintenance.note}</p>
        </section>
      </main>
    </div>
  )
}
