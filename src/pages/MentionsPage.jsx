import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { trackVisit } from '../lib/supabase'
import { SITE } from '../lib/site'

export default function MentionsPage() {
  useEffect(() => { trackVisit('mentions-legales') }, [])

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">← Accueil</Link></p>
          <p className="eyebrow">Légal</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)' }}>Mentions légales</h1>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="card" style={{ padding: '28px 24px' }}>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>Éditeur</h2>
            <p className="muted" style={{ marginBottom: 24 }}>
              Senan Concept — Maison de mode, costumerie & décoration<br />
              {SITE.cityLong}<br />
              Fondatrice : {SITE.founder}<br />
              Email : <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
              Tél. : <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
            </p>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>Hébergement</h2>
            <p className="muted" style={{ marginBottom: 24 }}>
              Le site senaconcept.com est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>Propriété intellectuelle</h2>
            <p className="muted" style={{ marginBottom: 24 }}>
              L'ensemble des contenus (textes, photographies de créations, identité visuelle) est protégé. Toute reproduction non autorisée est interdite.
            </p>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>Données personnelles</h2>
            <p className="muted">
              Les informations transmises via les formulaires de contact et de formation sont destinées exclusivement au traitement de votre demande par Senan Concept. Le site enregistre aussi, de façon agrégée, des visites et des clics pour comprendre l'usage des pages. Ces traitements respectent la législation béninoise applicable.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
