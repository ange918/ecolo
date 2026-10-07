import { Link } from 'react-router-dom'
import { useCollections } from '../lib/collections'
import { Reveal, useStagger } from './Reveal'

export function RealCard({ item, wide = false }) {
  return (
    <Link to={`/galerie/${item.slug}`} className={wide ? 'real wide' : 'real'}>
      {item.cover_url
        ? <img src={item.cover_url} alt={item.titre} />
        : <div className="fallback" />}
      <div className="overlay">
        {item.tag && <div className="cat">{item.tag}</div>}
        <h3>{item.titre}</h3>
        {item.description && (
          <p>{item.description.length > 140 ? item.description.slice(0, 140).trimEnd() + '…' : item.description}</p>
        )}
        <span className="more">Voir la galerie →</span>
      </div>
    </Link>
  )
}

export default function Realisations({ limit, showHeading = true }) {
  const items = useCollections()
  const shown = typeof limit === 'number' ? items.slice(0, limit) : items
  const s = useStagger(0.08)
  const { Grid, Item } = s

  return (
    <section className="section" id="realisations">
      <div className="wrap">
        {showHeading && (
          <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">Portfolio</p>
                <h2>Nos réalisations emblématiques</h2>
              </div>
              <Link to="/realisations" className="btn btn-ghost btn-sm">Voir tout →</Link>
            </div>
          </Reveal>
        )}
        <Grid className="real-grid" {...s.gridProps}>
          {shown.map((item, i) => (
            <Item key={item.slug} {...s.itemProps} className={i === 0 ? 'wide' : undefined} style={{ height: '100%' }}>
              <RealCard item={item} wide={i === 0} />
            </Item>
          ))}
        </Grid>
      </div>
    </section>
  )
}
