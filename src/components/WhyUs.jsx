import { motion } from 'framer-motion'

const reasons = [
  {
    num: '01',
    tag: 'Tradition',
    titre: 'Savoir-faire ancestral',
    desc: "Chaque création puise dans des techniques transmises de génération en génération, garantissant une authenticité et une qualité irréprochables.",
  },
  {
    num: '02',
    tag: 'Sur-mesure',
    titre: 'Créations 100% sur-mesure',
    desc: "Nous n'utilisons aucun patron standard. Chaque pièce est pensée, discutée et façonnée exclusivement pour vous, selon vos besoins et votre vision.",
  },
  {
    num: '03',
    tag: 'Légitimité',
    titre: 'Référence culturelle reconnue',
    desc: "Nos réalisations pour le Trône de Béhanzin, le Festival des Masques et les Vodouns Days témoignent de notre légitimité au cœur du patrimoine béninois.",
  },
  {
    num: '04',
    tag: 'Fiabilité',
    titre: 'Délais respectés',
    desc: "Que ce soit pour un festival, une cérémonie royale ou un événement privé, nous livrons dans les délais convenus, sans jamais sacrifier la qualité.",
  },
  {
    num: '05',
    tag: 'Proximité',
    titre: 'Accompagnement personnalisé',
    desc: "De la première consultation à la livraison finale, Christelle FASSINOU et son équipe vous accompagnent à chaque étape pour une expérience unique et mémorable.",
  },
  {
    num: '06',
    tag: 'Qualité',
    titre: 'Matières nobles & durables',
    desc: "Nous sélectionnons rigoureusement des tissus de qualité, des fils brodés et des matériaux durables pour des créations qui traversent le temps.",
  },
]

function StackCard({ r, i, total }) {
  return (
    <div
      className="stack-card"
      style={{ '--stick-top': `calc(84px + ${i * 16}px)`, '--indent': `${i * 2.1}rem`, zIndex: i + 1 }}
    >
      <div
        className="flex flex-col sm:flex-row overflow-hidden"
        style={{
          background: '#141414', border: '1px solid rgba(201,168,76,0.18)', borderRadius: '18px',
          minHeight: '180px', boxShadow: '0 -8px 44px -14px rgba(0,0,0,0.7)',
        }}
      >
        {/* Tuile numéro */}
        <div
          className="relative flex flex-col justify-between shrink-0 sm:w-[180px]"
          style={{
            background: 'linear-gradient(150deg, #C9A84C 0%, #9A7A32 100%)',
            padding: '1.3rem 1.5rem',
          }}
        >
          <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.55)' }}>
            Point
          </span>
          <span style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '2.8rem', lineHeight: 1, color: '#0A0A0A' }}>
            {r.num}
          </span>
          <div style={{ height: '3px', background: 'rgba(10,10,10,0.18)', borderRadius: '9999px', marginTop: '0.6rem', minWidth: '96px' }}>
            <div style={{ height: '100%', width: `${Math.round(((i + 1) / total) * 100)}%`, background: '#0A0A0A', borderRadius: '9999px' }} />
          </div>
        </div>

        {/* Texte */}
        <div className="flex-1 flex flex-col justify-center" style={{ padding: '1.5rem 1.7rem' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.6rem' }}>
            ● {r.tag}
          </p>
          <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '1.2rem', color: '#F5F0E8', marginBottom: '0.5rem', letterSpacing: '0.01em' }}>
            {r.titre}
          </h3>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: '#B8B0A0', lineHeight: 1.8 }}>
            {r.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WhyUs() {
  return (
    <section id="pourquoi-nous" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-16 items-end mb-14"
        >
          <div>
            <p className="section-label">Pourquoi nous choisir</p>
            <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: 'clamp(1.55rem, 5vw, 3.6rem)', color: '#F5F0E8', lineHeight: 1.14, letterSpacing: '-0.01em' }}>
              Ce qui nous rend <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>uniques</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.85, maxWidth: '360px' }}>
            Depuis plus de 5 ans, Senan Concept s'est imposée comme la maison de mode
            de référence pour les créations culturelles au Bénin.
          </p>
        </motion.div>

        {/* Barre d'en-tête */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8 pb-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center shrink-0" style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '0.7rem' }}>SC</span>
            <div>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F5F0E8' }}>Le savoir-faire Senan</p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#787068' }}>Excellence artisanale</p>
            </div>
          </div>
          <span className="flex items-center gap-2" style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '9999px', padding: '0.35rem 0.9rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
            Maison d'exception
          </span>
        </div>

        {/* Cartes empilées au scroll */}
        <div className="relative">
          {reasons.map((r, i) => (
            <StackCard key={i} r={r} i={i} total={reasons.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
