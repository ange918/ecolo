import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { trackVisit } from '../lib/supabase'
import { useCollections } from '../lib/collections'
import { RealCard } from '../components/Realisations'

export default function RealisationsPage() {
  const items = useCollections()
  const [filter, setFilter] = useState('Tous')
  useEffect(() => { trackVisit('realisations') }, [])

  const tags = useMemo(() => ['Tous', ...Array.from(new Set(items.map(i => i.tag).filter(Boolean)))], [items])
  const shown = filter === 'Tous' ? items : items.filter(i => i.tag === filter)

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">← Accueil</Link></p>
          <p className="eyebrow">Portfolio</p>
          <h1>Nos réalisations<br /><span className="gold">emblématiques</span></h1>
          <p>De la cour royale de Béhanzin aux festivals sacrés — explorez chaque univers en images.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="clients" style={{ justifyContent: 'flex-start' }}>
            {tags.map(tag => (
              <button key={tag} type="button" className={filter === tag ? 'client-pill on' : 'client-pill'} onClick={() => setFilter(tag)}>
                {tag}
              </button>
            ))}
          </div>
          <div className="real-grid">
            {shown.map((item, i) => (
              <RealCard key={item.slug} item={item} wide={filter === 'Tous' && i === 0} />
            ))}
          </div>
          {shown.length === 0 && <p className="muted">Aucune réalisation dans cette catégorie.</p>}
        </div>
      </section>
    </>
  )
}
