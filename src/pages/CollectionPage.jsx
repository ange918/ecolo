import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, trackVisit } from '../lib/supabase'
import { FALLBACK_COLLECTIONS, FALLBACK_PHOTOS } from '../lib/collections'

export default function CollectionPage() {
  const { slug } = useParams()
  const [collection, setCollection] = useState(() => FALLBACK_COLLECTIONS.find(c => c.slug === slug) || null)
  const [photos, setPhotos] = useState(() => (FALLBACK_PHOTOS[slug] || []).map(src => ({ image_url: src })))
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => { window.scrollTo(0, 0); trackVisit('galerie:' + slug) }, [slug])

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data: col } = await supabase
        .from('collections')
        .select('id, slug, titre, description, cover_url, tag')
        .eq('slug', slug)
        .maybeSingle()
      if (!active) return
      if (col) {
        setCollection(col)
        const { data: ph } = await supabase
          .from('collection_photos')
          .select('image_url')
          .eq('collection_id', col.id)
          .order('position', { ascending: true })
          .order('created_at', { ascending: true })
        if (active && ph && ph.length) setPhotos(ph)
      }
    })()
    return () => { active = false }
  }, [slug])

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6" style={{ background: '#0A0A0A' }}>
        <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '1.4rem', color: '#F5F0E8', textAlign: 'center' }}>Galerie introuvable</p>
        <RouterLink to="/#realisations" style={{ fontFamily: 'Jost', color: '#C9A84C', textDecoration: 'none' }}>← Retour aux réalisations</RouterLink>
      </div>
    )
  }

  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* En-tête */}
      <section className="relative px-6 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {collection.cover_url && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src={collection.cover_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.55), #0A0A0A)' }} />
          </div>
        )}
        <div className="max-w-5xl mx-auto relative" style={{ zIndex: 1 }}>
          <RouterLink to="/#realisations" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.82rem', color: '#B8B0A0', textDecoration: 'none' }}>
            ← Réalisations
          </RouterLink>
          {collection.tag && <p className="section-label" style={{ marginTop: '1.5rem' }}>{collection.tag}</p>}
          <h1 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 5.5vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.14, letterSpacing: '-0.01em', margin: '0.4rem 0 1.2rem' }}>
            {collection.titre}
          </h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1rem', color: '#B8B0A0', lineHeight: 1.85, maxWidth: '640px' }}>
            {collection.description}
          </p>
        </div>
      </section>

      {/* Grille de photos */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          {photos.length === 0 ? (
            <p style={{ fontFamily: 'Jost', fontWeight: 300, color: '#787068' }}>Les photos de cette galerie seront bientôt disponibles.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos.map((p, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  onClick={() => setLightbox(p.image_url)}
                  className="overflow-hidden"
                  style={{ aspectRatio: '3/4', borderRadius: '14px', cursor: 'pointer', border: 'none', padding: 0, background: '#1A1A1A' }}
                >
                  <img src={p.image_url} alt="" loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

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
              style={{ position: 'fixed', top: 20, right: 24, width: 44, height: 44, borderRadius: '50%', background: 'rgba(10,10,10,0.7)', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', fontSize: '1.2rem', cursor: 'pointer' }}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
