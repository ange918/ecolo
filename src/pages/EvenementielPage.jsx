import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, trackVisit, trackClick } from '../lib/supabase'
import { FALLBACK_EVENEMENTS } from '../lib/evenements'

const OR = '#C9A84C'

/* Compte à rebours (affiché seulement si une date précise est renseignée) */
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
    <div className="flex gap-3 flex-wrap" style={{ marginTop: '1.6rem' }}>
      {cells.map((c, i) => (
        <div key={i} style={{ minWidth: 78, textAlign: 'center', background: '#0E0E0E', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '14px', padding: '0.8rem 0.6rem' }}>
          <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#F5F0E8', lineHeight: 1 }}>{String(c.v).padStart(2, '0')}</p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#787068', marginTop: '0.4rem' }}>{c.l}</p>
        </div>
      ))}
    </div>
  )
}

function EditionCard({ ev, onOpenPhoto }) {
  const photos = ev.photos || []
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.18)', borderRadius: '22px', overflow: 'hidden' }}
    >
      {ev.cover_url && (
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <img src={ev.cover_url} alt={ev.theme || ev.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,20,20,0.9), transparent 60%)' }} />
        </div>
      )}
      <div style={{ padding: '2rem 1.8rem 2.2rem' }}>
        <div className="flex items-center gap-3 flex-wrap">
          {ev.theme && (
            <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0A0A0A', background: OR, padding: '0.32rem 0.8rem', borderRadius: '9999px' }}>
              {ev.theme}
            </span>
          )}
          <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.06em', color: OR }}>{ev.date_texte}</span>
          {ev.lieu && <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: '#787068' }}>· {ev.lieu}</span>}
        </div>

        <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)', color: '#F5F0E8', lineHeight: 1.16, letterSpacing: '-0.01em', margin: '1rem 0 1rem', overflowWrap: 'break-word' }}>
          {ev.theme || ev.nom}
        </h2>

        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1rem', color: '#B8B0A0', lineHeight: 1.85, maxWidth: '680px' }}>
          {ev.description}
        </p>

        <Countdown dateIso={ev.date_iso} />

        <div className="flex flex-wrap gap-3" style={{ marginTop: '1.8rem' }}>
          <RouterLink
            to="/#contact"
            onClick={() => trackClick('evenementiel:contact')}
            className="inline-flex items-center gap-2 transition-all duration-300"
            style={{ background: OR, color: '#0A0A0A', fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.85rem', borderRadius: '9999px', padding: '0.7rem 1.6rem', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Nous contacter →
          </RouterLink>
        </div>

        {/* Galerie de l'édition */}
        <div style={{ marginTop: '2.2rem', borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '1.6rem' }}>
          {photos.length === 0 ? (
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#787068' }}>
              Visuels bientôt disponibles.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos.map((p, i) => (
                <button
                  key={p.id || i}
                  onClick={() => onOpenPhoto(p.image_url)}
                  className="overflow-hidden"
                  style={{ aspectRatio: '3/4', borderRadius: '12px', cursor: 'pointer', border: 'none', padding: 0, background: '#1A1A1A' }}
                >
                  <img src={p.image_url} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function EvenementielPage() {
  const [evenements, setEvenements] = useState(FALLBACK_EVENEMENTS)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => { window.scrollTo(0, 0); trackVisit('evenementiel') }, [])

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
      for (const p of (photos || [])) { (byEv[p.evenement_id] ||= []).push(p) }
      setEvenements(evs.map(e => ({ ...e, photos: byEv[e.id] || [] })))
    })()
    return () => { active = false }
  }, [])

  const branche = evenements[0] || FALLBACK_EVENEMENTS[0]
  const aVenir = evenements.filter(e => e.statut !== 'passe')
  const passees = evenements.filter(e => e.statut === 'passe')

  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* En-tête de branche */}
      <section className="relative px-6 lg:px-12 pt-28 pb-14 lg:pt-32 lg:pb-16 overflow-hidden">
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(120% 80% at 80% 0%, rgba(201,168,76,0.10), transparent 55%)' }} />
        <div className="max-w-5xl mx-auto relative" style={{ zIndex: 1 }}>
          <RouterLink to="/" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: '#B8B0A0', textDecoration: 'none' }}>
            ← Accueil
          </RouterLink>
          <p className="section-label" style={{ marginTop: '1.5rem' }}>Branche événementielle</p>
          <h1 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: 'clamp(2.2rem, 9vw, 5rem)', color: '#F5F0E8', lineHeight: 1.08, letterSpacing: '0.02em', margin: '0.4rem 0 1.2rem' }}>
            {branche.nom}
          </h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#B8B0A0', lineHeight: 1.7, maxWidth: '620px', fontStyle: 'italic' }}>
            {branche.sous_titre}
          </p>
        </div>
      </section>

      {/* Éditions à venir */}
      <section className="px-6 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#787068' }}>
            {passees.length > 0 ? 'Prochaine édition' : 'Première édition'}
          </p>
          {aVenir.length === 0 ? (
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, color: '#787068' }}>Aucune édition annoncée pour le moment.</p>
          ) : (
            aVenir.map(ev => <EditionCard key={ev.id} ev={ev} onOpenPhoto={setLightbox} />)
          )}
        </div>
      </section>

      {/* Éditions passées */}
      {passees.length > 0 && (
        <section className="px-6 lg:px-12 pb-24 lg:pb-32">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#787068' }}>
              Éditions passées
            </p>
            {passees.map(ev => <EditionCard key={ev.id} ev={ev} onOpenPhoto={setLightbox} />)}
          </div>
        </section>
      )}

      <div style={{ height: passees.length > 0 ? 0 : 40 }} />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,5,5,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', cursor: 'zoom-out' }}
          >
            <motion.img
              initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }}
              src={lightbox} alt=""
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '10px' }}
            />
            <button onClick={() => setLightbox(null)} aria-label="Fermer"
              style={{ position: 'fixed', top: 20, right: 24, width: 44, height: 44, borderRadius: '50%', background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(201,168,76,0.4)', color: OR, fontSize: '1.2rem', cursor: 'pointer' }}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
