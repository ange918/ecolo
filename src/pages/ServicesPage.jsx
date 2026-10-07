import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { trackVisit } from '../lib/supabase'
import { CREATIONS } from '../lib/offerings'
import { SITE } from '../lib/site'
import { Reveal } from '../components/Reveal'

export default function ServicesPage() {
  useEffect(() => { trackVisit('services') }, [])

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">← Accueil</Link></p>
          <p className="eyebrow">Services</p>
          <h1>Nos domaines<br />de <span className="gold">création</span></h1>
          <p>Quatre piliers pour habiller le sacré, décorer l'intime, transmettre le geste et scénographier l'événement.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="wrap">
          {CREATIONS.map((item, i) => (
            <Reveal key={item.id}>
            <article id={item.id} className={i % 2 ? 'service-block reverse' : 'service-block'}>
              <div className="photo-frame">
                <img src={item.img} alt={item.alt} style={{ objectPosition: item.focus }} />
              </div>
              <div className="copy">
                <div className="num" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: 12 }}>{item.num}</div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.25rem)', marginBottom: 14 }}>{item.titre}</h2>
                <p className="muted" style={{ marginBottom: 4 }}>{item.desc}</p>
                <div className="chips">
                  {item.tags.map(tag => <span key={tag} className="client-pill">{tag}</span>)}
                </div>
                <Link to={item.id === 'formations' ? '/formation' : '/contact'} className="btn btn-outline-gold btn-sm">
                  {item.id === 'formations' ? 'Voir les formations →' : 'Demander un devis →'}
                </Link>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="wrap">
        <Reveal>
        <div className="cta-band">
          <div>
            <p className="eyebrow">Un projet en tête ?</p>
            <h2>Parlons de votre<br />création</h2>
            <p className="muted">Consultation initiale sous 1 à 2 jours. Réponse personnalisée par Christelle FASSINOU ou son équipe.</p>
            <div className="actions">
              <Link to="/contact" className="btn btn-gold">Contactez-nous</Link>
            </div>
          </div>
          <div className="contact-mini">
            <div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
            <div><strong>WhatsApp</strong><a href={SITE.whatsapp} target="_blank" rel="noreferrer">{SITE.phoneDisplay}</a></div>
          </div>
        </div>
        </Reveal>
      </div>
    </>
  )
}
