import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase, trackVisit } from '../lib/supabase'
import { COLLECTION_META, FALLBACK_COLLECTIONS, FALLBACK_PHOTOS, photoCaption, useCollections } from '../lib/collections'
import { Reveal, useStagger } from '../components/Reveal'

export default function CollectionPage() {
  const { slug } = useParams()
  const all = useCollections()
  const fallback = FALLBACK_COLLECTIONS.find(c => c.slug === slug) || null
  const [collection, setCollection] = useState(fallback)
  const [photos, setPhotos] = useState(() => (FALLBACK_PHOTOS[slug] || []).map(src => ({ image_url: src })))
  const [checked, setChecked] = useState(Boolean(fallback))
  const [lightbox, setLightbox] = useState(null)
  const gallery = useStagger(0.05)
  const othersMotion = useStagger(0.08)

  useEffect(() => { trackVisit('galerie:' + slug) }, [slug])

  useEffect(() => {
    const local = FALLBACK_COLLECTIONS.find(c => c.slug === slug) || null
    setCollection(local)
    setPhotos((FALLBACK_PHOTOS[slug] || []).map(src => ({ image_url: src })))
    setChecked(Boolean(local))
    let active = true
    ;(async () => {
      const { data: col } = await supabase
        .from('collections')
        .select('id, slug, titre, description, cover_url, tag')
        .eq('slug', slug)
        .maybeSingle()
      if (!active) return
      if (col) {
        setCollection(col)
        const { data: ph } = await supabase
          .from('collection_photos')
          .select('image_url, position')
          .eq('collection_id', col.id)
          .order('position', { ascending: true })
          .order('created_at', { ascending: true })
        if (active && ph && ph.length) setPhotos(ph)
      } else if (!local) {
        setCollection(null)
      }
      if (active) setChecked(true)
    })()
    return () => { active = false }
  }, [slug])

  if (!checked) {
    return <div className="section"><div className="wrap"><p className="muted">Chargement de la galerie…</p></div></div>
  }

  if (!collection) {
    return (
      <div className="section">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Galerie introuvable</h1>
          <Link to="/realisations" className="btn btn-outline-gold btn-sm">← Retour aux réalisations</Link>
        </div>
      </div>
    )
  }

  const meta = COLLECTION_META[collection.slug] || {}
  const others = all.filter(c => c.slug !== collection.slug).slice(0, 4)

  return (
    <div>
      <section
        className="page-hero"
        style={{
          minHeight: collection.cover_url ? 340 : undefined,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: collection.cover_url
            ? `linear-gradient(180deg, rgba(10,10,10,.45), #0a0a0a), url('${collection.cover_url}') center/cover`
            : undefined,
          paddingBottom: 36,
        }}
      >
        <div className="wrap">
          <p className="crumb"><Link to="/realisations">← Réalisations</Link></p>
          {collection.tag && <p className="eyebrow">{collection.tag}</p>}
          <h1>{collection.titre}</h1>
          <p style={{ color: 'rgba(245,240,232,.85)' }}>{collection.description}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20, paddingBottom: 12 }}>
        <div className="wrap">
          <div className="meta-row">
            {meta.lieu && <div><strong>Lieu</strong> · {meta.lieu}</div>}
            {meta.role && <div><strong>Rôle</strong> · {meta.role}</div>}
            {collection.tag && <div><strong>Type</strong> · {collection.tag}</div>}
            <div><strong>Photos</strong> · {photos.length}</div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 48 }}>
        <div className="wrap">
          {photos.length === 0 ? (
            <p className="muted">Les photos de cette galerie seront bientôt disponibles.</p>
          ) : (
            <gallery.Grid className="gal-grid" {...gallery.gridProps}>
              {photos.map((p, i) => (
                <gallery.Item key={p.image_url + i} {...gallery.itemProps} className={i === 0 ? 'span2' : undefined}>
                <figure className={i === 0 ? 'gal-item span2' : 'gal-item'}>
                  <button type="button" onClick={() => setLightbox({ src: p.image_url, caption: photoCaption(collection.titre, i) })}>
                    <img src={p.image_url} alt={photoCaption(collection.titre, i)} />
                  </button>
                  <figcaption>{photoCaption(collection.titre, i)}</figcaption>
                </figure>
                </gallery.Item>
              ))}
            </gallery.Grid>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">Autres projets</p>
                <h2>Continuer l'exploration</h2>
              </div>
            </div>
            </Reveal>
            <othersMotion.Grid className="grid-4" {...othersMotion.gridProps}>
              {others.map(item => (
                <othersMotion.Item key={item.slug} {...othersMotion.itemProps} style={{ height: '100%' }}>
                <Link to={`/galerie/${item.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="ph">
                    {item.cover_url
                      ? <img src={item.cover_url} alt="" />
                      : <div style={{ height: '100%', background: '#14120e' }} />}
                  </div>
                  <div className="body">
                    <h3 style={{ fontSize: 16 }}>{item.titre}</h3>
                    <span className="tag">Voir la galerie →</span>
                  </div>
                </Link>
                </othersMotion.Item>
              ))}
            </othersMotion.Grid>
          </div>
        </section>
      )}

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label={lightbox.caption}>
          <img src={lightbox.src} alt={lightbox.caption} />
          <button type="button" onClick={() => setLightbox(null)} aria-label="Fermer">✕</button>
        </div>
      )}
    </div>
  )
}
