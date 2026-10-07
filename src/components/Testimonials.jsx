import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Reveal, useStagger } from './Reveal'

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
  { nom: 'EFAMBE', titre: 'Créateur de contenu', tag: 'Tenue artistique', texte: "Senan Concept a transformé ma vision artistique en réalité. Les tenues créées pour ma performance étaient d'une précision et d'une beauté à couper le souffle. Christelle FASSINOU a su capturer l'essence de mon univers." },
  { nom: 'Pepe Oleka', titre: 'Artiste musical', tag: 'Accessoires & Décors', texte: "Pour mon dernier clip, j'avais besoin d'accessoires et de décors qui parlent d'Afrique sans clichés. Senan Concept a répondu au-delà de mes espérances : des pièces modernes, ancrées dans la tradition. Un travail d'orfèvre." },
  { nom: 'Sagbohan Danialou', titre: 'Musicien traditionnel', tag: 'Accessoires & Décors', texte: "Les accessoires et décors réalisés pour mes prestations scéniques incarnent parfaitement la fierté culturelle du Bénin. Senan Concept comprend la profondeur de notre héritage et sait le magnifier avec talent et respect." },
  { nom: 'Stéphanie MONTCHO', titre: 'Animatrice', tag: 'Événementiel', texte: "J'ai fait appel à Senan Concept pour un événement haut de gamme. La qualité est irréprochable, les délais respectés. C'est ma référence absolue pour la costumerie au Bénin." },
  { nom: 'Maeva Gomez', titre: 'Créatrice de contenus & entrepreneur', tag: 'Mode artisanale', texte: "En tant que professionnelle du secteur, je suis exigeante. Senan Concept m'a impressionnée par la finesse de ses finitions et surtout par la créativité débordante de Christelle FASSINOU. Un talent rare." },
  { nom: 'Trône de Béhanzin', titre: 'Comédie musicale', tag: 'Costumerie de scène', texte: "Les costumes réalisés par Senan Concept honorent dignement notre production. Chaque pièce témoigne d'une connaissance profonde et d'un respect sincère pour notre histoire millénaire." },
  { nom: 'Festival des Masques', titre: 'Direction artistique', tag: 'Festival culturel', texte: "Depuis notre collaboration avec Senan Concept, nos participants se présentent avec des tenues qui racontent une histoire. L'authenticité des créations contribue à l'âme même de notre festival." },
  { nom: 'Vision Days', titre: 'Festival culturel et spirituel', tag: 'Cérémonie spirituelle', texte: "Les parures et tenues cérémonielles créées pour Vision Days ont élevé notre célébration à un niveau de beauté et de sacralité inédit. Christelle FASSINOU comprend le spirituel autant que l'esthétique." },
]

const initials = (name) => {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Testimonials() {
  const [dbItems, setDbItems] = useState([])
  const s = useStagger(0.06)
  const { Grid, Item } = s

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

  return (
    <section className="section section-alt" id="temoignages">
      <div className="wrap">
        <Reveal>
          <div className="section-head center">
            <p className="eyebrow">Témoignages</p>
            <h2>Ce que disent nos clients</h2>
            <p style={{ marginTop: 8 }}>Nous avons déjà collaboré avec</p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="clients">
            {collaborators.map(c => (
              <span key={c.nom} className="client-pill" title={c.role}>{c.nom}</span>
            ))}
          </div>
        </Reveal>
        <Grid className="grid-3" {...s.gridProps}>
          {all.map((t, i) => (
            <Item key={`${t.nom}-${i}`} {...s.itemProps} style={{ height: '100%' }}>
            <article className="tcard">
              <div className="q">"</div>
              <p className="quote">{t.texte}</p>
              <div className="who">
                <div className="av" aria-hidden="true">{initials(t.nom)}</div>
                <div className="meta">
                  <strong>{t.nom}</strong>
                  <span>{t.titre}</span>
                  {t.tag && <div className="tag">{t.tag}</div>}
                </div>
              </div>
            </article>
            </Item>
          ))}
        </Grid>
      </div>
    </section>
  )
}
