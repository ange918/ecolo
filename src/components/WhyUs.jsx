import { motion } from 'framer-motion'

const reasons = [
  {
    num: '01',
    titre: 'Savoir-faire ancestral',
    desc: "Chaque création puise dans des techniques transmises de génération en génération, garantissant une authenticité et une qualité irréprochables.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
        <path d="M20 4 L24 14 L35 14 L26 21 L29 32 L20 25 L11 32 L14 21 L5 14 L16 14 Z" />
      </svg>
    ),
  },
  {
    num: '02',
    titre: 'Créations 100% sur-mesure',
    desc: "Nous n'utilisons aucun patron standard. Chaque pièce est pensée, discutée et façonnée exclusivement pour vous, selon vos besoins et votre vision.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
        <path d="M8 32 L32 8" /><path d="M14 8 L32 8 L32 26" />
        <circle cx="10" cy="30" r="4" /><circle cx="30" cy="10" r="4" />
      </svg>
    ),
  },
  {
    num: '03',
    titre: 'Référence culturelle reconnue',
    desc: "Nos réalisations pour le Trône de Béhanzin, le Festival des Masques et les Vodouns Days témoignent de notre légitimité au cœur du patrimoine béninois.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
        <path d="M20 4 L22 10 L28 10 L23 14 L25 20 L20 16 L15 20 L17 14 L12 10 L18 10 Z" />
        <path d="M10 28 L30 28 L32 36 L8 36 Z" /><path d="M14 28 L14 22 M20 28 L20 20 M26 28 L26 22" />
      </svg>
    ),
  },
  {
    num: '04',
    titre: 'Délais respectés',
    desc: "Que ce soit pour un festival, une cérémonie royale ou un événement privé, nous livrons dans les délais convenus, sans jamais sacrifier la qualité.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 10 L20 20 L27 24" />
        <path d="M20 6 L20 4 M34 20 L36 20 M20 34 L20 36 M6 20 L4 20" />
      </svg>
    ),
  },
  {
    num: '05',
    titre: 'Accompagnement personnalisé',
    desc: "De la première consultation à la livraison finale, Christelle FASSINOU et son équipe vous accompagnent à chaque étape pour une expérience unique et mémorable.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="16" cy="12" r="5" /><circle cx="28" cy="16" r="4" />
        <path d="M6 34 C6 26 10 22 16 22 C22 22 26 26 26 34" />
        <path d="M28 22 C32 22 35 25 35 30" />
      </svg>
    ),
  },
  {
    num: '06',
    titre: 'Matières nobles & durables',
    desc: "Nous sélectionnons rigoureusement des tissus de qualité, des fils brodés et des matériaux durables pour des créations qui traversent le temps.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
        <path d="M8 20 Q14 8 20 20 Q26 32 32 20" />
        <path d="M8 28 Q14 16 20 28 Q26 40 32 28" />
        <path d="M8 12 Q14 0 20 12 Q26 24 32 12" />
      </svg>
    ),
  },
]

export default function WhyUs() {
  return (
    <section id="pourquoi-nous" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="section-label">Pourquoi nous choisir</p>
          <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
            Ce qui nous rend <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>uniques</span>
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.85, marginTop: '1rem' }}>
            Depuis plus de 5 ans, Senan Concept s'est imposée comme la maison de mode de référence pour les créations culturelles au Bénin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(201,168,76,0.1)', borderRadius: '24px', overflow: 'hidden' }}>
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-8 transition-colors duration-300"
              style={{ background: '#0A0A0A' }}
              onMouseEnter={e => e.currentTarget.style.background = '#111111'}
              onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
            >
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.5)', marginBottom: '1.2rem', fontFamily: 'Jost' }}>{r.num}</p>
              <div style={{ marginBottom: '1.2rem' }}>{r.icon}</div>
              <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '1.05rem', color: '#F5F0E8', marginBottom: '0.6rem' }}>{r.titre}</h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.87rem', color: '#B8B0A0', lineHeight: 1.85 }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
