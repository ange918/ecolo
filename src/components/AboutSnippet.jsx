import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

export default function AboutSnippet() {
  return (
    <section className="section section-alt" id="about">
      <div className="wrap">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <Reveal>
            <div className="arch">
              <img src="/gallery/img16.jpg" alt="Création de la maison Senan Concept" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">À propos</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '12px 0 16px' }}>
                Maison<br />Senan<br /><span className="gold">Concept</span>
              </h2>
            </Reveal>
            <p className="ink-reveal" style={{ marginBottom: 14 }}>
              Mode artistique, costumerie & décoration d'exception — Porto-Novo, Bénin
            </p>
            <p className="ink-reveal" style={{ marginBottom: 14 }}>
              Fondée à Porto-Novo, <strong>Senan Concept</strong> est une maison de mode d'exception dédiée à la valorisation du patrimoine culturel béninois. Nos créations habillent les plus grandes cérémonies, de la royauté aux festivals culturels et sacrés.
            </p>
            <p className="ink-reveal" style={{ marginBottom: 22 }}>
              Sous la direction de sa fondatrice <strong>Christelle FASSINOU</strong>, chaque pièce est une œuvre unique, mêlant tradition et savoir-faire contemporain.
            </p>
            <Reveal delay={0.08}>
              <Link to="/qui-sommes-nous" className="btn btn-outline-gold btn-sm">Découvrir notre histoire →</Link>
              <div className="badge-stack">
                <div className="badge"><strong>8+</strong><span>Années d'expérience</span></div>
                <div className="badge"><strong>100%</strong><span>Fait à la main</span></div>
                <div className="badge"><strong>N°01</strong><span>Édition Héritage · Christelle FASSINOU</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
