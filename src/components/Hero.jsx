import { Link } from 'react-router-dom'
import { trackClick } from '../lib/supabase'

export default function Hero() {
  return (
    <section className="hero" id="hero">
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
        <div className="hero-visual">
          <div className="main">
            <img src="/gallery/img18.jpg" alt="Création artistique Senan Concept" />
          </div>
          <div className="float-card fc-left">
            <img src="/gallery/img17.jpg" alt="" />
            <div className="row">
              <div>
                <h4>Créations sur mesure</h4>
                <p>Des tenues artistiques uniques, façonnées à la main pour sublimer chaque occasion.</p>
              </div>
              <Link to="/services#tenues" className="btn-icon" aria-label="Voir les tenues artistiques">→</Link>
            </div>
          </div>
          <div className="float-card fc-right">
            <img src="/gallery/img12.jpg" alt="" />
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
    </section>
  )
}
