import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, trackVisit, trackClick } from '../lib/supabase'
import { FALLBACK_EVENEMENTS } from '../lib/evenements'
import { SITE } from '../lib/site'
import { Reveal, useStagger } from '../components/Reveal'

function useCountdown(dateIso) {
  const [left, setLeft] = useState(null)
  useEffect(() => {
    if (!dateIso) { setLeft(null); return }
    const target = new Date(dateIso + 'T00:00:00').getTime()
    if (Number.isNaN(target)) { setLeft(null); return }
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setLeft(null); return }
      setLeft({
        jours: Math.floor(diff / 86400000),
        heures: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
      })
    }
    tick()
    const t = setInterval(tick, 30000)
    return () => clearInterval(t)
  }, [dateIso])
  return left
}

function Countdown({ dateIso }) {
  const left = useCountdown(dateIso)
  if (!left) return null
  const cells = [
    { v: left.jours, l: 'Jours' },
    { v: left.heures, l: 'Heures' },
    { v: left.minutes, l: 'Min' },
  ]
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
      {cells.map(c => (
        <div key={c.l} className="stat" style={{ minWidth: 84, padding: '14px 10px' }}>
          <strong style={{ fontSize: 28 }}>{String(c.v).padStart(2, '0')}</strong>
          <span>{c.l}</span>
        </div>
      ))}
    </div>
  )
}

export default function EvenementielPage() {
  const [evenements, setEvenements] = useState(FALLBACK_EVENEMENTS)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => { trackVisit('evenementiel') }, [])

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data: evs } = await supabase
        .from('evenements')
        .select('id, nom, theme, sous_titre, date_texte, date_iso, lieu, description, cover_url, statut, position')
        .order('position', { ascending: true })
      if (!active || !evs || !evs.length) return
      const ids = evs.map(e => e.id)
      const { data: photos } = await supabase
        .from('evenement_photos')
        .select('id, evenement_id, image_url, position')
        .in('evenement_id', ids)
        .order('position', { ascending: true })
      if (!active) return
      const byEv = {}
      for (const p of (photos || [])) (byEv[p.evenement_id] ||= []).push(p)
      setEvenements(evs.map(e => ({ ...e, photos: byEv[e.id] || [] })))
    })()
    return () => { active = false }
  }, [])

  const branche = evenements[0] || FALLBACK_EVENEMENTS[0]
  const upcoming = evenements.filter(e => e.statut !== 'passe')
  const passed = evenements.filter(e => e.statut === 'passe')
  const focus = upcoming[0] || branche
  const visual = focus.cover_url || '/gallery/img18.jpg'
  const s = useStagger(0.06)
  const { Grid, Item } = s

  return (
    <>
      <section className="page-hero" style={{ minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'radial-gradient(ellipse at 70% 0%, rgba(201,168,76,.16), transparent 58%)' }}>
        <div className="wrap">
          <p className="crumb"><Link to="/">← Accueil</Link></p>
          <p className="eyebrow">Branche événementielle</p>
          <h1 style={{ fontSize: 'clamp(4rem, 12vw, 7rem)', letterSpacing: '0.06em', marginBottom: 8 }}>{branche.nom}</h1>
          {branche.sous_titre && (
            <p style={{ fontSize: 18, fontStyle: 'italic', color: 'var(--ink)', maxWidth: 560, marginBottom: 16 }}>{branche.sous_titre}</p>
          )}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="client-pill" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>
              {passed.length ? 'Prochaine édition' : 'Première édition'}
            </span>
            {focus.theme && <span className="client-pill">{focus.theme}{focus.date_texte ? ` · ${focus.date_texte}` : ''}</span>}
            <span className="client-pill">{focus.lieu || SITE.city}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <Reveal>
            <div>
              <p className="eyebrow">Le projet</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.25rem)', margin: '12px 0 16px' }}>
                {focus.theme || focus.nom}
              </h2>
              <p style={{ marginBottom: 14 }}>{focus.description}</p>
              <p className="muted">Direction artistique : {SITE.founder}. Production : Senan Concept.</p>
              <Countdown dateIso={focus.date_iso} />
              <div style={{ marginTop: 22 }}>
                <Link to="/contact" className="btn btn-gold" onClick={() => trackClick('evenementiel:contact')}>Nous contacter →</Link>
              </div>
            </div>
            </Reveal>
            <Reveal delay={0.08}>
            <div className="photo-frame">
              <img src={visual} alt={focus.cover_url ? (focus.theme || focus.nom) : 'Création Senan Concept'} />
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {evenements.filter(ev => (ev.photos || []).length > 0).map(ev => (
        <section key={ev.id} className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">{ev.theme || ev.nom}</p>
                <h2>Visuels {ev.date_texte || ''}</h2>
              </div>
            </div>
            </Reveal>
            <Grid className="gal-grid" {...s.gridProps}>
              {ev.photos.map((p, i) => (
                <Item key={p.id || i} {...s.itemProps}>
                <figure className="gal-item">
                  <button type="button" onClick={() => setLightbox(p.image_url)}>
                    <img src={p.image_url} alt={`${ev.theme || ev.nom} · création ${String(i + 1).padStart(2, '0')}`} />
                  </button>
                  <figcaption>{ev.theme || ev.nom} · création {String(i + 1).padStart(2, '0')}</figcaption>
                </figure>
                </Item>
              ))}
            </Grid>
          </div>
        </section>
      ))}

      <div className="wrap">
        <Reveal>
        <div className="cta-band">
          <div>
            <p className="eyebrow">Contact IFA</p>
            <h2>Écrivons la<br />première édition</h2>
            <p className="muted">Pour partenariats, casting et presse : {SITE.email}</p>
            <div className="actions">
              <Link to="/contact" className="btn btn-gold" onClick={() => trackClick('evenementiel:contact')}>Contacter l'équipe IFA</Link>
            </div>
          </div>
          <div className="contact-mini">
            <div><strong>Édition</strong><span>{[focus.theme, focus.date_texte].filter(Boolean).join(' · ') || branche.nom}</span></div>
            <div><strong>Lieu</strong><span>{focus.lieu || SITE.city}</span></div>
            <div><strong>WhatsApp</strong><a href={SITE.whatsapp} target="_blank" rel="noreferrer">{SITE.phoneDisplay}</a></div>
          </div>
        </div>
        </Reveal>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" />
          <button type="button" aria-label="Fermer" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}
    </>
  )
}
