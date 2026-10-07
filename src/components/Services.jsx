import { Link } from 'react-router-dom'
import { CREATIONS, DOMAINES } from '../lib/offerings'
import { Reveal, useStagger } from './Reveal'

export function Creations() {
  const s = useStagger(0.09)
  const { Grid, Item } = s
  return (
    <section className="section" id="services" style={{ paddingTop: 48 }}>
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Ce que nous créons</h2>
            </div>
            <p>Quatre domaines d'excellence pour habiller, décorer, transmettre et scénographier.</p>
          </div>
        </Reveal>
        <Grid className="grid-4" {...s.gridProps}>
          {CREATIONS.map(item => (
            <Item key={item.id} {...s.itemProps} style={{ height: '100%' }}>
              <Link to={item.href} className="card">
                <div className="ph">
                  <img src={item.img} alt={item.alt} style={{ objectPosition: item.focus }} />
                </div>
                <div className="body">
                  <div className="num">{item.num}</div>
                  <h3>{item.titre}</h3>
                  <p>{item.short}</p>
                </div>
              </Link>
            </Item>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export function Domaines() {
  const s = useStagger(0.1)
  const { Grid, Item } = s
  return (
    <section className="section" id="domaines">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">Domaines</p>
              <h2>Nos domaines de création</h2>
            </div>
          </div>
        </Reveal>
        <Grid className="grid-3" {...s.gridProps}>
          {DOMAINES.map(item => (
            <Item key={item.id} {...s.itemProps} style={{ height: '100%' }}>
              <article className="card pad">
                <div className="num">{item.num}</div>
                <h3 style={{ fontSize: 24, margin: '8px 0 12px' }}>{item.titre}</h3>
                <p>{item.desc}</p>
              </article>
            </Item>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <Creations />
      <Domaines />
    </>
  )
}
