import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { trackVisit } from '../lib/supabase'
import { SITE } from '../lib/site'
import { ContactForm, ContactInfos } from '../components/Contact'
import { Reveal } from '../components/Reveal'

export default function ContactPage() {
  useEffect(() => { trackVisit('contact') }, [])

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">← Accueil</Link></p>
          <p className="eyebrow">Contact</p>
          <h1>Concrétisez<br />votre <span className="gold">projet</span></h1>
          <p>Que vous rêviez d'un costume d'exception, d'un espace décoré avec âme ou d'une formation — nous sommes à votre écoute.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <Reveal>
            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 24, marginBottom: 18 }}>Envoyer une demande</h2>
              <ContactForm />
            </div>
            </Reveal>
            <Reveal delay={0.08}>
            <div>
              <ContactInfos />
              <div className="card" style={{ padding: 22, marginTop: 16 }}>
                <h3 style={{ marginBottom: 12 }}>Réseaux</h3>
                <div className="social" style={{ marginTop: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp — {SITE.phoneDisplay}</a>
                  <a href={`mailto:${SITE.email}`}>Email — {SITE.email}</a>
                </div>
              </div>
              <div className="photo-frame" style={{ height: 220, marginTop: 16, position: 'relative' }}>
                <img src="/gallery/img10.jpg" alt="Atelier Senan Concept" style={{ opacity: 0.72 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 18, background: 'linear-gradient(transparent, rgba(0,0,0,.72))' }}>
                  <div>
                    <p className="eyebrow">Atelier</p>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18 }}>Visite sur rendez-vous · Porto-Novo</div>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
