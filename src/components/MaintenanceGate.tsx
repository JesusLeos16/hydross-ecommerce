import { ArrowRight, Droplets } from 'lucide-react'
import { useEffect } from 'react'
import { brandCopy } from '../content/brandCopy'

export function MaintenanceGate({ onEnter }: { onEnter: () => void }) {
  useEffect(() => {
    document.title = 'Hydross · en desarrollo'
  }, [])

  return (
    <main className="maintenance-screen" aria-labelledby="maintenance-title">
      <div className="maintenance-grid">
        <section className="maintenance-copy">
          <div className="maintenance-topline"><span className="maintenance-logo-frame"><img src="/brand/hydross-logo.png" alt="hydross. skincare" /></span><span>01 / 01</span></div>
          <div className="maintenance-copy-body">
            <p className="eyebrow">{brandCopy.maintenance.eyebrow}</p>
            <h1 id="maintenance-title">{brandCopy.maintenance.title}</h1>
            <p className="maintenance-description">{brandCopy.maintenance.description}</p>
            <button className="button button-pink maintenance-cta" onClick={onEnter}>{brandCopy.maintenance.cta} <ArrowRight size={16} /></button>
          </div>
          <div className="maintenance-bottomline"><span>{brandCopy.maintenance.note}</span><span>hydross / skincare</span></div>
        </section>
        <section className="maintenance-art" aria-hidden="true">
          <div className="maintenance-art-label"><span>estado actual</span><strong>{brandCopy.maintenance.status}</strong></div>
          <div className="maintenance-drop"><Droplets size={76} strokeWidth={.8} /></div>
          <div className="maintenance-ring maintenance-ring-one" />
          <div className="maintenance-ring maintenance-ring-two" />
          <div className="maintenance-ring maintenance-ring-three" />
          <span className="maintenance-coordinate maintenance-coordinate-one">19° 25′ N</span>
          <span className="maintenance-coordinate maintenance-coordinate-two">99° 08′ O</span>
          <span className="maintenance-mark">h.</span>
        </section>
      </div>
      <footer className="maintenance-footer"><span>Hydross skincare</span><span>La colección llegará cuando esté lista.</span></footer>
    </main>
  )
}
