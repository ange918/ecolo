import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { trackVisit } from '../lib/supabase'
import { Reveal, useStagger } from '../components/Reveal'

const stats = [
  { v: '8+', l: "Années d'expérience" },
  { v: '100%', l: 'Fait à la main' },
  { v: '3', l: 'Festivals majeurs' },
  { v: '∞', l: 'Passion & dévouement' },
]

const valeurs = [
  { v: 'Excellence', d: 'Aucun compromis sur la qualité' },
  { v: 'Authenticité', d: 'Fidélité aux traditions africaines' },
  { v: 'Transmission', d: 'Préserver et partager le savoir-faire' },
  { v: 'Innovation', d: 'Réinventer sans trahir' },
]

export default function AboutPage() {
  useEffect(() => { trackVisit('qui-sommes-nous') }, [])
  const statsMotion = useStagger(0.08)
  const valuesMotion = useStagger(0.1)

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">← Accueil</Link></p>
          <p className="eyebrow">Qui sommes-nous</p>
          <h1>L'âme d'un peuple,<br />la main d'une <span className="gold">artiste</span></h1>
          <p>Senan Concept est bien plus qu'une maison de mode. C'est un engagement, une passion, un hommage au patrimoine culturel du Bénin.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <Reveal>
            <div>
              <p className="eyebrow">Notre histoire</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.25rem)', margin: '12px 0 18px' }}>
                Née d'une passion,<br />forgée par la <span className="gold">tradition</span>
              </h2>
              <p style={{ marginBottom: 14 }}>
                Senan Concept est née à Porto-Novo, au cœur du Bénin, de la vision singulière de <strong>Christelle FASSINOU</strong>, une créatrice dont le regard sur la culture africaine a toujours été celui de la valorisation, de la beauté et du respect.
              </p>
              <p className="muted" style={{ marginBottom: 14 }}>
                Depuis sa création, la maison s'est imposée comme une référence incontournable dans le domaine de la costumerie artistique et de la décoration artisanale au Bénin et au-delà. Chaque pièce que nous créons est un dialogue entre le passé et le présent.
              </p>
              <p className="muted">
                De la cour du Trône de Béhanzin aux scènes des plus grands festivals du Bénin (Festival des Masques, Vodouns Days), nos créations ont habillé les moments les plus sacrés et les plus festifs de la culture béninoise.
              </p>
            </div>
            </Reveal>
            <Reveal delay={0.08}>
            <div className="photo-frame">
              <img src="/gallery/img6.jpg" alt="Création textile Senan Concept" />
            </div>
            </Reveal>
          </div>
          <statsMotion.Grid className="grid-4" style={{ marginTop: 36 }} {...statsMotion.gridProps}>
            {stats.map(s => (
              <statsMotion.Item key={s.l} {...statsMotion.itemProps}>
              <div className="stat">
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
              </statsMotion.Item>
            ))}
          </statsMotion.Grid>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <Reveal>
          <p className="eyebrow" style={{ textAlign: 'center' }}>La fondatrice</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textAlign: 'center', margin: '12px auto 36px', maxWidth: 800 }}>
            Christelle FASSINOU,<br /><span className="gold">Senan Concept</span>
          </h2>
          </Reveal>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <Reveal>
            <div className="founder-wrap">
              <div className="arch">
                <img src="/gallery/img18.jpg" alt="Création portée, maison Senan Concept" />
              </div>
              <div className="founder-badges">
                <div className="badge"><strong>+10</strong><span>Événements majeurs</span></div>
                <div className="badge"><strong>2ème</strong><span>Trophée accessoiriste d'Afrique</span></div>
              </div>
            </div>
            </Reveal>
            <Reveal delay={0.08}>
            <div>
              <p className="muted" style={{ marginBottom: 8 }}>Fondatrice · Styliste · Accessoiriste · Décoratrice</p>
              <p style={{ marginBottom: 14 }}>
                Christelle FASSINOU, de nationalité béninoise, résidant à Porto-Novo, incarne la fusion parfaite entre tradition et modernité. Passionnée par l'art sous toutes ses formes, elle s'est imposée comme une figure incontournable de la mode afro-contemporaine.
              </p>
              <p className="muted" style={{ marginBottom: 14 }}>
                En tant que fondatrice de Senan Concept, elle explore les matières, les textures et les couleurs pour créer des pièces uniques qui racontent une histoire. Son expertise s'étend de la création d'accessoires minutieux à la décoration d'intérieur, en passant par le costume de scène.
              </p>
              <p className="muted">
                Sa maîtrise des techniques artisanales traditionnelles, alliée à une vision contemporaine et audacieuse, lui a permis de collaborer avec artistes, musiciens, familles royales et organisateurs de festivals.
              </p>
              <blockquote className="quote">
                <p>« Je ne crée pas des vêtements. Je crée des histoires que les corps racontent. »</p>
                <span className="muted" style={{ fontSize: 13 }}>— Christelle FASSINOU, Fondatrice</span>
              </blockquote>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">Notre ADN</p>
              <h2>Mission, Vision & Valeurs</h2>
            </div>
          </div>
          </Reveal>
          <valuesMotion.Grid className="grid-3" {...valuesMotion.gridProps}>
            <valuesMotion.Item {...valuesMotion.itemProps} style={{ height: '100%' }}>
            <article className="card pad">
              <p className="eyebrow">Mission</p>
              <h3 style={{ fontSize: 22, margin: '12px 0' }}>Valoriser le patrimoine culturel africain</h3>
              <p>Créer des tenues, décors et objets artisanaux qui honorent les traditions du Bénin et d'Afrique, en mêlant authenticité ancestrale et excellence contemporaine. Chaque création est un acte de mémoire et de fierté culturelle.</p>
            </article>
            </valuesMotion.Item>
            <valuesMotion.Item {...valuesMotion.itemProps} style={{ height: '100%' }}>
            <article className="card pad">
              <p className="eyebrow">Vision</p>
              <h3 style={{ fontSize: 22, margin: '12px 0' }}>Devenir la référence mondiale de l'artisanat africain</h3>
              <p>Faire rayonner Senan Concept au-delà des frontières du Bénin pour que l'artisanat béninois soit reconnu, respecté et célébré sur la scène internationale.</p>
            </article>
            </valuesMotion.Item>
            <valuesMotion.Item {...valuesMotion.itemProps} style={{ height: '100%' }}>
            <article className="card pad">
              <p className="eyebrow">Valeurs</p>
              <h3 style={{ fontSize: 22, margin: '12px 0' }}>Ce qui guide chacune de nos créations</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {valeurs.map(val => (
                  <p key={val.v}><strong style={{ color: 'var(--ink)' }}>{val.v}</strong> <span className="muted">— {val.d}</span></p>
                ))}
              </div>
            </article>
            </valuesMotion.Item>
          </valuesMotion.Grid>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <Reveal>
            <div>
              <p className="eyebrow">Vision globale</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.25rem)', margin: '12px 0 18px' }}>
                L'artisanat béninois,<br />ambassadeur d'une <span className="gold">culture</span>
              </h2>
              <p className="muted" style={{ marginBottom: 14 }}>
                Dans un monde en pleine mutation, où la globalisation tend à lisser les identités culturelles, Senan Concept choisit de résister par la beauté. Nous croyons que la mode africaine est l'un des véhicules les plus puissants de la mémoire collective.
              </p>
              <p className="muted" style={{ marginBottom: 14 }}>
                À travers nos créations, nous tissons des ponts entre les générations. Nous rêvons d'un Senan Concept international, portant le message que l'artisanat africain est une forme d'art à part entière.
              </p>
              <Link to="/realisations" className="btn btn-gold">Voir nos réalisations →</Link>
            </div>
            </Reveal>
            <Reveal delay={0.08}>
            <div className="photo-frame">
              <img src="/gallery/behanzin/cover.jpg" alt="Costume de scène, Trône de Béhanzin" />
            </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
