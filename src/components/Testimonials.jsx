import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const collaborators = [
  { nom: 'EFAMBE', role: 'Créateur de contenu' },
  { nom: 'Pepe Oleka', role: 'Artiste musical' },
  { nom: 'Sagbohan Danialou', role: 'Musicien traditionnel' },
  { nom: 'Stéphanie MONTCHO', role: 'Animatrice' },
  { nom: 'Maeva Gomez', role: 'Créatrice de contenus & entrepreneur' },
  { nom: 'Trône de Béhanzin', role: 'Comédie musicale' },
  { nom: 'Festival des Masques', role: 'Festival culturel' },
  { nom: 'Vision Days', role: 'Festival culturel et spirituel' },
]

const testimonials = [
  {
    nom: 'EFAMBE',
    titre: 'Créateur de contenu',
    tag: 'Tenue artistique',
    texte: "Senan Concept a transformé ma vision artistique en réalité. Les tenues créées pour ma performance étaient d'une précision et d'une beauté à couper le souffle. Christelle FASSINOU a su capturer l'essence de mon univers.",
  },
  {
    nom: 'Pepe Oleka',
    titre: 'Artiste musical',
    tag: 'Accessoires & Décors',
    texte: "Pour mon dernier clip, j'avais besoin d'accessoires et de décors qui parlent d'Afrique sans clichés. Senan Concept a répondu au-delà de mes espérances : des pièces modernes, ancrées dans la tradition. Un travail d'orfèvre.",
  },
  {
    nom: 'Sagbohan Danialou',
    titre: 'Musicien traditionnel',
    tag: 'Accessoires & Décors',
    texte: "Les accessoires et décors réalisés pour mes prestations scéniques incarnent parfaitement la fierté culturelle du Bénin. Senan Concept comprend la profondeur de notre héritage et sait le magnifier avec talent et respect.",
  },
  {
    nom: 'Stéphanie MONTCHO',
    titre: 'Animatrice',
    tag: 'Événementiel',
    texte: "J'ai fait appel à Senan Concept pour un événement haut de gamme. La qualité est irréprochable, les délais respectés. C'est ma référence absolue pour la costumerie au Bénin.",
  },
  {
    nom: 'Maeva Gomez',
    titre: 'Créatrice de contenus & entrepreneur',
    tag: 'Mode artisanale',
    texte: "En tant que professionnelle du secteur, je suis exigeante. Senan Concept m'a impressionnée par la finesse de ses finitions et surtout par la créativité débordante de Christelle FASSINOU. Un talent rare.",
  },
  {
    nom: 'Trône de Béhanzin',
    titre: 'Comédie musicale',
    tag: 'Costumerie de scène',
    texte: "Les costumes réalisés par Senan Concept honorent dignement notre production. Chaque pièce témoigne d'une connaissance profonde et d'un respect sincère pour notre histoire millénaire.",
  },
  {
    nom: 'Festival des Masques',
    titre: 'Direction artistique',
    tag: 'Festival culturel',
    texte: "Depuis notre collaboration avec Senan Concept, nos participants se présentent avec des tenues qui racontent une histoire. L'authenticité des créations contribue à l'âme même de notre festival.",
  },
  {
    nom: 'Vision Days',
    titre: 'Festival culturel et spirituel',
    tag: 'Cérémonie spirituelle',
    texte: "Les parures et tenues cérémonielles créées pour Vision Days ont élevé notre célébration à un niveau de beauté et de sacralité inédit. Christelle FASSINOU comprend le spirituel autant que l'esthétique.",
  },
]

function TestimonialCard({ t, isActive = true }) {
  return (
    <div
      className="flex flex-col justify-between"
      style={{
        padding: '2rem',
        background: isActive ? '#1A1A1A' : 'rgba(26,26,26,0.4)',
        border: `1px solid ${isActive ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
        borderRadius: '20px',
        width: 'min(360px, 84vw)',
        minHeight: '260px',
        whiteSpace: 'normal',
      }}
    >
      {/* Quote top */}
      <div>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '3.5rem',
          color: isActive ? 'rgba(201,168,76,0.25)' : 'rgba(201,168,76,0.1)',
          lineHeight: 0.8,
          marginBottom: '0.8rem',
          transition: 'color 0.3s',
        }}>"</p>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          fontSize: '0.88rem',
          color: isActive ? '#D0C8B8' : '#787068',
          lineHeight: 1.85,
          fontStyle: 'italic',
          transition: 'color 0.3s',
        }}>
          {t.texte}
        </p>
      </div>

      {/* Footer card */}
      <div className="flex items-end justify-between gap-3 mt-5 pt-4"
        style={{ borderTop: `1px solid ${isActive ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.07)'}` }}>
        <div>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.92rem', color: isActive ? '#F5F0E8' : '#787068', transition: 'color 0.3s' }}>
            {t.nom}
          </p>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.72rem', color: '#B8B0A0', marginTop: '0.15rem' }}>
            {t.titre}
          </p>
        </div>
        <span style={{
          flexShrink: 0,
          fontFamily: 'Jost, sans-serif',
          fontWeight: 400,
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.35)',
          border: `1px solid ${isActive ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.12)'}`,
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
          transition: 'all 0.3s',
          whiteSpace: 'nowrap',
        }}>
          {t.tag}
        </span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [dbItems, setDbItems] = useState([])

  useEffect(() => {
    let active = true
    supabase
      .from('testimonials')
      .select('nom, titre, tag, texte')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (active && data) setDbItems(data) })
    return () => { active = false }
  }, [])

  const all = [...dbItems, ...testimonials]
  const mid = Math.ceil(all.length / 2)
  const rowTop = all.slice(0, mid)
  const rowBottom = all.slice(mid)

  return (
    <section id="temoignages" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label">Témoignages</p>
          <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Ce que disent <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>nos clients</span>
          </h2>
        </motion.div>

        {/* ─── Collaborateurs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 p-8"
          style={{ background: '#111111', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '24px' }}
        >
          <p style={{
            fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.7rem',
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
            marginBottom: '1.5rem',
          }}>
            Nous avons déjà collaboré avec
          </p>
          <div className="flex flex-wrap gap-3">
            {collaborators.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex flex-col"
                style={{
                  padding: '0.6rem 1.2rem',
                  background: '#1A1A1A',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '12px',
                }}
              >
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#F5F0E8' }}>
                  {c.nom}
                </span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.68rem', color: '#C9A84C', marginTop: '0.1rem' }}>
                  {c.role}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Bandes roulantes de témoignages ─── */}
        <div className="-mx-6 lg:-mx-12 flex flex-col gap-4">
          {/* Ligne du haut : défile de gauche à droite */}
          <div className="marquee-viewport">
            <div className="marquee-track to-right marquee-hover-pause" style={{ '--marquee-dur': '48s' }}>
              {[...rowTop, ...rowTop].map((t, i) => (
                <div key={i} className="shrink-0" style={{ marginRight: '1rem' }}>
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Ligne du bas : défile de droite à gauche */}
          <div className="marquee-viewport">
            <div className="marquee-track to-left marquee-hover-pause" style={{ '--marquee-dur': '48s' }}>
              {[...rowBottom, ...rowBottom].map((t, i) => (
                <div key={i} className="shrink-0" style={{ marginRight: '1rem' }}>
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
