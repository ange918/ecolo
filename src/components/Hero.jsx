import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { trackClick } from '../lib/supabase'

export default function Hero() {
  const copyRef = useRef(null)
  const [copyH, setCopyH] = useState(0)

  useLayoutEffect(() => {
    const el = copyRef.current
    if (!el) return
    const apply = () => setCopyH(el.offsetHeight)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="hero-pin" id="hero">
      <div className="hero hero-pin-copy" ref={copyRef}>
        <div className="wrap">
          <p className="eyebrow">Art · Costume · Décoration</p>
          <h1>
            Transformez votre vision<br />
            en <span className="script">artisanat africain</span>
          </h1>
          <p className="lead">
            Senan Concept crée des tenues artistiques sur mesure, des accessoires de déco et des décors d'événements uniques. Au service de la royauté, des festivals culturels et sacrés.
          </p>
          <div className="hero-cta">
            <Link to="/realisations" className="btn btn-gold" onClick={() => trackClick('cta:decouvrir-la-collection')}>
              Découvrir la collection →
            </Link>
            <Link to="/contact" className="btn btn-ghost" onClick={() => trackClick('cta:prendre-contact')}>
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-pin-cover" style={copyH ? { minHeight: copyH } : undefined}>
        <div className="wrap hero-cover-inner">
          <div className="hero-visual">
            <div className="main">
              <img src="/gallery/img18.jpg" alt="Création artistique Senan Concept" />
            </div>
            <div className="float-card fc-left">
              <img src="/gallery/img17.jpg" alt="" style={{ objectPosition: 'center 12%' }} />
              <div className="row">
                <div>
                  <h4>Créations sur mesure</h4>
                  <p>Des tenues artistiques uniques, façonnées à la main pour sublimer chaque occasion.</p>
                </div>
                <Link to="/services#tenues" className="btn-icon" aria-label="Voir les tenues artistiques">→</Link>
              </div>
            </div>
            <div className="float-card fc-right">
              <img src="/gallery/img12.jpg" alt="" style={{ objectPosition: 'center 10%' }} />
              <div className="row">
                <div>
                  <h4>Décor & accessoires</h4>
                  <p>Chaque pièce enrichit votre univers avec harmonie et sophistication.</p>
                </div>
                <Link to="/services#decoration" className="btn-icon" aria-label="Voir la décoration">→</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
