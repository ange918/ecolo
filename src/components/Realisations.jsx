import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FALLBACK_COLLECTIONS } from '../lib/collections'

function Card({ item, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="flex flex-col overflow-hidden"
      style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.16)', borderRadius: '20px' }}
    >
      {/* Visuel */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/3' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item.cover_url
          ? <img src={item.cover_url} alt={item.titre} loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
          : <div style={{ width: '100%', height: '100%', background: '#1A1A1A' }} />}
        {item.tag && (
          <span style={{
            position: 'absolute', top: 12, left: 12, fontFamily: 'Jost, sans-serif', fontWeight: 500,
            fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0A0A0A',
            background: '#C9A84C', padding: '0.3rem 0.7rem', borderRadius: '9999px',
          }}>{item.tag}</span>
        )}
      </div>

      {/* Texte */}
      <div className="flex flex-col flex-1" style={{ padding: '1.5rem 1.6rem' }}>
        <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '1.2rem', color: '#F5F0E8', marginBottom: '0.6rem' }}>
          {item.titre}
        </h3>
        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: '#B8B0A0', lineHeight: 1.75, marginBottom: '1.4rem', flex: 1 }}>
          {item.description?.length > 150 ? item.description.slice(0, 150).trimEnd() + '…' : item.description}
        </p>
        <RouterLink
          to={`/galerie/${item.slug}`}
          className="inline-flex items-center gap-2 self-start transition-all duration-300"
          style={{
            border: '1.5px solid #C9A84C', color: '#C9A84C',
            fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.82rem',
            borderRadius: '9999px', padding: '0.55rem 1.4rem', textDecoration: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#0A0A0A' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C' }}
        >
          Voir la galerie →
        </RouterLink>
      </div>
    </motion.div>
  )
}

export default function Realisations() {
  const [items, setItems] = useState(FALLBACK_COLLECTIONS)

  useEffect(() => {
    let active = true
    supabase
      .from('collections')
      .select('slug, titre, description, cover_url, tag, position')
      .order('position', { ascending: true })
      .then(({ data }) => {
        if (active && data && data.length) setItems(data)
      })
    return () => { active = false }
  }, [])

  return (
    <section id="realisations" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Portfolio</p>
          <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: 'clamp(1.55rem, 5vw, 3.6rem)', color: '#F5F0E8', marginBottom: '1rem', lineHeight: 1.14, letterSpacing: '-0.01em' }}>
            Nos réalisations <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>emblématiques</span>
          </h2>
          <p className="max-w-2xl mb-14" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.8 }}>
            De la cour royale de Béhanzin aux festivals sacrés, nos créations ont marqué les plus
            grands évènements culturels du Bénin. Explorez chaque univers en images.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Card key={item.slug} item={item} delay={(i % 3) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
