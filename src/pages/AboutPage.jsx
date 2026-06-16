import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut', delay },
})

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>
}

function Divider() {
  return <div className="divider" />
}

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#0A0A0A' }}>

      {/* ─── HERO ─── */}
      <section className="min-h-[60vh] flex items-end px-6 lg:px-12 pb-20 pt-32"
        style={{ background: 'linear-gradient(to bottom, #111111, #0A0A0A)' }}>
        <div className="max-w-7xl mx-auto w-full">
          <motion.div {...fadeUp(0.1)}>
            <SectionLabel>Qui sommes-nous</SectionLabel>
          </motion.div>
          <motion.h1
            {...fadeUp(0.25)}
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 'clamp(2.2rem, 6vw, 5rem)', color: '#F5F0E8', lineHeight: 1.1, maxWidth: '800px' }}
          >
            L'âme d'un peuple,<br />
            la main d'une <span style={{ color: '#C9A84C' }}>artiste</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.4)}
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1rem', color: '#B8B0A0', lineHeight: 1.9, maxWidth: '580px', marginTop: '1.5rem' }}
          >
            Senan Concept est bien plus qu'une maison de mode. C'est un engagement, une passion, un hommage au patrimoine culturel du Bénin.
          </motion.p>
        </div>
      </section>

      {/* ─── PRÉSENTATION ENTREPRISE ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <motion.div {...fadeUp(0)}>
            <SectionLabel>Notre histoire</SectionLabel>
            <h2 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F5F0E8', lineHeight: 1.2 }}>
              Née d'une passion,<br />
              forgée par la <span style={{ color: '#C9A84C' }}>tradition</span>
            </h2>
            <Divider />
            <div className="space-y-5">
              {[
                "Senan Concept est née à Porto Novo, au cœur du Bénin, de la vision singulière de Christelle FASSINOU, une créatrice dont le regard sur la culture africaine a toujours été celui de la valorisation, de la beauté et du respect.",
                "Depuis sa création, la maison s'est imposée comme une référence incontournable dans le domaine de la costumerie artistique et de la décoration artisanale au Bénin et au-delà. Chaque pièce que nous créons est un dialogue entre le passé et le présent.",
                "De la cour du Trône de Béhanzin aux scènes des plus grands festivals du Bénin (Festival des Masques, Vodouns Days), nos créations ont habillé les moments les plus sacrés et les plus festifs de la culture béninoise.",
                "Aujourd'hui, Senan Concept continue de croître, portée par une équipe d'artisans passionnés et une clientèle qui fait confiance à notre savoir-faire exceptionnel pour les moments qui comptent vraiment.",
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.9 }}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            {/* Stats visuelles */}
            <div className="grid grid-cols-2 gap-px mb-4" style={{ background: 'rgba(201,168,76,0.15)' }}>
              {[
                { v: '8+', l: "Années d'expérience" },
                { v: '100%', l: 'Fait à la main' },
                { v: '3', l: 'Festivals majeurs' },
                { v: '∞', l: 'Passion & dévouement' },
              ].map((s, i) => (
                <div key={i} className="p-8" style={{ background: '#1A1A1A' }}>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '2.5rem', color: '#C9A84C', lineHeight: 1 }}>{s.v}</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8B0A0', marginTop: '0.4rem' }}>{s.l}</p>
                </div>
              ))}
            </div>
            {/* Localisation */}
            <div className="p-6 flex items-start gap-4" style={{ background: '#1A1A1A', border: '1px solid rgba(201,168,76,0.12)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C9A84C', marginTop: '6px', flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.3rem' }}>Siège</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#F5F0E8' }}>Porto Novo, République du Bénin, Afrique de l'Ouest</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FONDATRICE ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-16 text-center">
            <SectionLabel>La fondatrice</SectionLabel>
            <h2 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: '#F5F0E8' }}>
              Christelle FASSINOU, <span style={{ color: '#C9A84C' }}>Senan Concept</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Portrait SVG */}
            <motion.div {...fadeUp(0.1)} className="relative" style={{ height: '520px', background: '#111111', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="220" height="340" viewBox="0 0 220 340" fill="none" style={{ opacity: 0.08 }}>
                  <ellipse cx="110" cy="70" rx="35" ry="42" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M75 108 C60 140 55 185 60 230 L160 230 C165 185 160 140 145 108 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                  <path d="M60 230 C42 268 36 305 40 330 L180 330 C184 305 178 268 160 230 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                  <path d="M75 120 C55 138 45 168 48 196" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M145 120 C165 138 175 168 172 196" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M90 45 L95 28 L105 38 L110 22 L115 38 L125 28 L130 45 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                  <path d="M80 260 Q110 250 140 260" stroke="#C9A84C" strokeWidth="1" strokeDasharray="5 3" />
                  <path d="M76 278 Q110 266 144 278" stroke="#C9A84C" strokeWidth="1" strokeDasharray="5 3" />
                  <path d="M74 296 Q110 283 146 296" stroke="#C9A84C" strokeWidth="1" strokeDasharray="5 3" />
                </svg>
              </div>
              {/* Stats flottantes */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <div className="px-4 py-3 text-right" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.25)' }}>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#C9A84C', lineHeight: 1 }}>+10</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginTop: '0.25rem' }}>Événements</p>
                </div>
                <div className="px-4 py-3 text-right" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.25)' }}>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#C9A84C', lineHeight: 1 }}>2ème</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginTop: '0.25rem' }}>Trophée Afrique</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-8 py-5"
                style={{ borderTop: '1px solid rgba(201,168,76,0.15)', background: 'linear-gradient(to top, rgba(10,10,10,0.98), transparent)' }}>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#F5F0E8' }}>Christelle FASSINOU</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: '#C9A84C', marginTop: '0.2rem', letterSpacing: '0.08em' }}>Fondatrice Senan Concept · Porto Novo, Bénin</p>
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div {...fadeUp(0.15)}>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.6rem', color: '#C9A84C', marginBottom: '0.3rem' }}>Christelle FASSINOU</p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginBottom: '1.5rem' }}>Fondatrice Senan Concept · Styliste · Accessoiriste · Décoratrice</p>
              <div className="divider" />
              <div className="space-y-5 mb-8">
                {[
                  "Christelle FASSINOU, de nationalité béninoise, résidant à Porto-Novo, incarne la fusion parfaite entre tradition et modernité. Passionnée par l'art sous toutes ses formes, elle s'est imposée comme une figure incontournable de la mode afro-contemporaine.",
                  "En tant que fondatrice de Senan Concept, elle explore les matières, les textures et les couleurs pour créer des pièces uniques qui racontent une histoire. Son expertise s'étend de la création d'accessoires minutieux à la décoration d'intérieur, en passant par le costume de scène.",
                  "Sa maîtrise des techniques artisanales traditionnelles, alliée à une vision contemporaine et audacieuse, lui a permis de collaborer avec les plus grandes figures de la culture béninoise : artistes, musiciens, familles royales et organisateurs de festivals.",
                ].map((p, i) => (
                  <p key={i} style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#B8B0A0', lineHeight: 1.9 }}>{p}</p>
                ))}
              </div>

              {/* Distinctions */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-start gap-4 p-4" style={{ background: '#111111', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div style={{ flexShrink: 0, width: '40px', height: '40px', border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#C9A84C' }}>+10</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#F5F0E8' }}>Événements majeurs</p>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: '#B8B0A0', marginTop: '0.15rem' }}>Participation à des défilés de mode majeurs à travers l'Afrique</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4" style={{ background: '#111111', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div style={{ flexShrink: 0, width: '40px', height: '40px', border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '0.7rem', color: '#C9A84C', textAlign: 'center', lineHeight: 1.2 }}>2ème</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#F5F0E8' }}>Trophée meilleur accessoiriste d'Afrique</p>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.8rem', color: '#B8B0A0', marginTop: '0.15rem' }}>2ème place, Côte d'Ivoire</p>
                  </div>
                </div>
              </div>

              <blockquote className="pl-5" style={{ borderLeftWidth: '3px', borderLeftStyle: 'solid', borderLeftColor: '#C9A84C' }}>
                <p style={{ fontFamily: 'Jost, sans-serif', fontStyle: 'italic', fontWeight: 300, fontSize: '1.05rem', color: '#E8D5A0', lineHeight: 1.7 }}>
                  "Je ne crée pas des vêtements. Je crée des histoires que les corps racontent."
                </p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.78rem', color: '#C9A84C', marginTop: '0.6rem', letterSpacing: '0.1em' }}>Christelle FASSINOU, Fondatrice de Senan Concept</p>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MISSION VISION VALEURS ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-16">
            <SectionLabel>Notre ADN</SectionLabel>
            <h2 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: '#F5F0E8' }}>
              Mission, Vision & <span style={{ color: '#C9A84C' }}>Valeurs</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(201,168,76,0.1)' }}>

            {/* Mission */}
            <motion.div {...fadeUp(0)} className="p-10" style={{ background: '#111111' }}>
              <div className="mb-6">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
                  <circle cx="22" cy="22" r="16" />
                  <circle cx="22" cy="22" r="8" />
                  <circle cx="22" cy="22" r="3" fill="#C9A84C" />
                  <path d="M22 6 L22 2 M22 42 L22 38 M38 22 L42 22 M6 22 L2 22" />
                </svg>
              </div>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1rem' }}>Mission</p>
              <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1rem', lineHeight: 1.3 }}>
                Valoriser le patrimoine culturel africain
              </h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#B8B0A0', lineHeight: 1.9 }}>
                Créer des tenues, décors et objets artisanaux qui honorent les traditions du Bénin et d'Afrique, en mêlant authenticité ancestrale et excellence contemporaine. Chaque création est un acte de mémoire et de fierté culturelle.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div {...fadeUp(0.1)} className="p-10" style={{ background: '#111111' }}>
              <div className="mb-6">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M4 22 Q22 6 40 22 Q22 38 4 22 Z" />
                  <circle cx="22" cy="22" r="6" />
                  <path d="M22 4 L22 8 M22 36 L22 40 M4 22 L8 22 M36 22 L40 22" />
                </svg>
              </div>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1rem' }}>Vision</p>
              <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1rem', lineHeight: 1.3 }}>
                Devenir la référence mondiale de l'artisanat africain
              </h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#B8B0A0', lineHeight: 1.9 }}>
                Faire rayonner Senan Concept au-delà des frontières du Bénin pour que l'artisanat béninois soit reconnu, respecté et célébré sur la scène internationale. Porter la culture africaine au rang du luxe mondial.
              </p>
            </motion.div>

            {/* Valeurs */}
            <motion.div {...fadeUp(0.2)} className="p-10" style={{ background: '#111111' }}>
              <div className="mb-6">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M22 4 L26 14 L38 14 L28 22 L32 34 L22 26 L12 34 L16 22 L6 14 L18 14 Z" />
                </svg>
              </div>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1rem' }}>Valeurs</p>
              <h3 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1rem', lineHeight: 1.3 }}>
                Ce qui guide chacune de nos créations
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { v: 'Excellence', d: 'Aucun compromis sur la qualité' },
                  { v: 'Authenticité', d: 'Fidélité aux traditions africaines' },
                  { v: 'Transmission', d: 'Préserver et partager le savoir-faire' },
                  { v: 'Innovation', d: 'Réinventer sans trahir' },
                ].map((val, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C', marginTop: '7px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#F5F0E8' }}>{val.v}</span>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.82rem', color: '#B8B0A0' }}> : {val.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VISION GLOBALE ─── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>Vision globale</SectionLabel>
            <h2 style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', color: '#F5F0E8', marginBottom: '2rem' }}>
              L'artisanat béninois,<br />
              <span style={{ color: '#C9A84C' }}>ambassadeur d'une culture</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="space-y-5 mb-12">
            {[
              "Dans un monde en pleine mutation, où la globalisation tend à lisser les identités culturelles, Senan Concept choisit de résister par la beauté. Nous croyons que la mode africaine est l'un des véhicules les plus puissants de la mémoire collective.",
              "Notre vision est celle d'un Bénin fier de son héritage, où chaque costume porté lors d'un festival, chaque décoration d'intérieur et d'événement, chaque formation transmise, raconte une histoire. Une histoire d'Afrique, de fierté, de transmission.",
              "À travers nos créations, nous tissons des ponts entre les générations, entre les anciens qui ont construit les codes esthétiques de notre culture et les jeunes qui portent cette culture vers l'avenir. Senan Concept est cette passerelle.",
              "Nous rêvons d'un Senan Concept international, présent dans les grands événements culturels africains et mondiaux, portant avec élégance et conviction le message que l'artisanat africain est une forme d'art à part entière, inestimable et universel.",
            ].map((p, i) => (
              <p key={i} style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.98rem', color: '#B8B0A0', lineHeight: 1.95 }}>{p}</p>
            ))}
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <RouterLink
              to="/"
              style={{
                display: 'inline-block',
                background: '#C9A84C', color: '#0A0A0A',
                fontFamily: 'Jost, sans-serif', fontWeight: 600, fontSize: '0.88rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                borderRadius: '9999px', padding: '0.8rem 2rem',
                textDecoration: 'none', transition: 'background 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#E8D5A0'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A84C'}
            >
              Voir nos réalisations
            </RouterLink>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
