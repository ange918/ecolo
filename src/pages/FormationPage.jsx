import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { trackVisit } from '../lib/supabase'
import { FORMATION_PARCOURS } from '../lib/offerings'
import { SITE, openMailto } from '../lib/site'
import { Reveal, useStagger } from '../components/Reveal'

const empty = { nom: '', email: '', parcours: FORMATION_PARCOURS[0].label, message: '' }

export default function FormationPage() {
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)
  useEffect(() => { trackVisit('formation') }, [])
  const s = useStagger(0.08)
  const { Grid, Item } = s

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    openMailto({
      subject: `Formation Senan Concept — ${form.parcours}`,
      body: `Nom : ${form.nom}\nEmail : ${form.email}\nParcours : ${form.parcours}\n\n${form.message}`,
    })
    setSent(true)
    setForm(empty)
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/services">← Services</Link></p>
          <p className="eyebrow">Formations</p>
          <h1>Transmettre<br />l'<span className="gold">excellence</span></h1>
          <p>Formations professionnelles pour perpétuer le savoir-faire artisanal béninois — mode africaine, accessoires, décoration.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: 40 }}>
            <Reveal>
            <div className="photo-frame">
              <img src="/gallery/img10.jpg" alt="Savoir-faire de l'atelier Senan Concept" style={{ objectPosition: 'center 16%' }} />
            </div>
            </Reveal>
            <Reveal delay={0.08}>
            <div>
              <p className="eyebrow">Parcours</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', margin: '12px 0 16px' }}>Ce que couvrent les formations</h2>
              <p className="muted" style={{ marginBottom: 16 }}>
                La maison transmet l'excellence du geste dans ses domaines d'intervention. Les sessions se tiennent à l'atelier de Porto-Novo, sur rendez-vous avec Christelle FASSINOU.
              </p>
              <div style={{ display: 'grid', gap: 12 }}>
                {FORMATION_PARCOURS.filter(p => p.id !== 'complet').map((p, i) => (
                  <div key={p.id} className="card" style={{ padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span className="gold" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
          </div>

          <Grid className="grid-3" style={{ marginBottom: 36 }} {...s.gridProps}>
            <Item {...s.itemProps} style={{ height: '100%' }}><article className="why"><div className="pt">Lieu</div><h3 style={{ fontSize: 16 }}>Atelier Senan Concept · Porto-Novo</h3></article></Item>
            <Item {...s.itemProps} style={{ height: '100%' }}><article className="why"><div className="pt">Domaines</div><h3 style={{ fontSize: 16 }}>Mode, accessoires, décoration</h3></article></Item>
            <Item {...s.itemProps} style={{ height: '100%' }}><article className="why"><div className="pt">Contact</div><h3 style={{ fontSize: 16 }}>{SITE.email}</h3></article></Item>
          </Grid>

          <Reveal>
          <div className="card" style={{ padding: '28px 22px' }}>
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div>
                <p className="eyebrow">Inscription d'intérêt</p>
                <h2 style={{ fontSize: 28, margin: '10px 0 12px' }}>Manifestez votre intérêt</h2>
                <p className="muted">Nous vous recontactons pour les prochaines sessions. Cette demande ouvre un e-mail vers la maison.</p>
              </div>
              {sent ? (
                <div>
                  <h3 style={{ fontSize: 24, marginBottom: 8 }}>Demande préparée</h3>
                  <p className="muted">Votre message est prêt dans votre messagerie, adressé à {SITE.email}.</p>
                  <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 16 }} onClick={() => setSent(false)}>Nouvelle demande</button>
                </div>
              ) : (
                <form className="form" onSubmit={onSubmit}>
                  <div className="row2">
                    <div className="field">
                      <label htmlFor="fnom">Nom complet</label>
                      <input id="fnom" name="nom" value={form.nom} onChange={onChange} required autoComplete="name" />
                    </div>
                    <div className="field">
                      <label htmlFor="femail">Email</label>
                      <input id="femail" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="parcours">Parcours souhaité</label>
                    <select id="parcours" name="parcours" value={form.parcours} onChange={onChange}>
                      {FORMATION_PARCOURS.map(p => <option key={p.id}>{p.label}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="fmessage">Message</label>
                    <textarea id="fmessage" name="message" value={form.message} onChange={onChange} required />
                  </div>
                  <button className="btn btn-gold" type="submit">Envoyer ma manifestation</button>
                </form>
              )}
            </div>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
