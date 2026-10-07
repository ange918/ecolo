import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE, openMailto } from '../lib/site'
import { trackClick } from '../lib/supabase'
import { Reveal } from './Reveal'

const TYPES = [
  { value: 'tenue', label: 'Tenue artistique' },
  { value: 'deco', label: "Décoration d'intérieure" },
  { value: 'formation', label: 'Formation' },
  { value: 'festival', label: 'Événement & Festival' },
  { value: 'autre', label: 'Autre' },
]

const empty = { nom: '', email: '', telephone: '', type: 'tenue', message: '' }

export function ContactForm({ id = 'formulaire' }) {
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const typeLabel = TYPES.find(t => t.value === form.type)?.label || form.type
    openMailto({
      subject: `Demande Senan Concept — ${typeLabel}`,
      body: `Nom : ${form.nom}\nEmail : ${form.email}\nTéléphone : ${form.telephone || '—'}\nType de projet : ${typeLabel}\n\n${form.message}`,
    })
    setSent(true)
    setForm(empty)
  }

  if (sent) {
    return (
      <div>
        <h3 style={{ fontSize: 28, marginBottom: 10 }}>Message préparé</h3>
        <p className="muted">Votre demande est prête dans votre messagerie, à destination de {SITE.email}. Nous répondons sous 1 à 2 jours ouvrés.</p>
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 18 }} onClick={() => setSent(false)}>
          Nouvelle demande
        </button>
      </div>
    )
  }

  return (
    <form className="form" id={id} onSubmit={onSubmit}>
      <div className="row2">
        <div className="field">
          <label htmlFor="nom">Votre nom</label>
          <input id="nom" name="nom" value={form.nom} onChange={onChange} required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="telephone">Téléphone</label>
          <input id="telephone" name="telephone" value={form.telephone} onChange={onChange} autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="type">Type de projet</label>
          <select id="type" name="type" value={form.type} onChange={onChange}>
            {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={form.message} onChange={onChange} required />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-gold" type="submit">Envoyer ma demande</button>
        <a className="btn btn-ghost" href={SITE.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackClick('cta:whatsapp')}>
          WhatsApp · {SITE.phoneDisplay}
        </a>
      </div>
      <p className="muted" style={{ fontSize: 12.5 }}>Réponse sous 1 à 2 jours ouvrés.</p>
    </form>
  )
}

export function ContactInfos() {
  return (
    <div className="contact-mini">
      <div><strong>Localisation</strong><span>{SITE.cityLong}</span></div>
      <div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
      <div><strong>Téléphone</strong><a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></div>
      <div><strong>Disponibilité</strong><span>{SITE.hours}</span></div>
      <div><strong>Fondatrice</strong><span>{SITE.founder}</span></div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" style={{ paddingBottom: 8 }}>
      <div className="wrap">
        <Reveal>
        <div className="cta-band">
          <div>
            <p className="eyebrow">Travaillons ensemble</p>
            <h2>Concrétisez<br />votre projet</h2>
            <p className="muted">
              Que vous rêviez d'un costume d'exception, d'un espace décoré avec âme ou d'une formation de qualité dans nos domaines d'intervention, nous sommes à votre écoute pour donner vie à votre vision.
            </p>
            <div className="actions">
              <Link to="/contact" className="btn btn-gold" onClick={() => trackClick('cta:envoyer-demande')}>Envoyer une demande</Link>
              <a className="btn btn-ghost" href={SITE.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackClick('cta:whatsapp')}>
                WhatsApp · {SITE.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="contact-mini">
            <div><strong>Localisation</strong><span>{SITE.city}</span></div>
            <div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
            <div><strong>Téléphone</strong><a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></div>
            <div><strong>Disponibilité</strong><span>{SITE.hoursShort}</span></div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
