import { useState, useEffect, useCallback } from 'react'
import { adminCall } from '../lib/supabase'

/* ─────────────────────────  Constantes de style  ───────────────────────── */
const OR = '#C9A84C'
const PALETTE = ['#C9A84C', '#E8D5A0', '#8C6D2E', '#B8B0A0', '#6B5B2E', '#D9B85C', '#4E4222', '#F0E4C0']
const CATEGORIES = ['Costumerie', 'Festival', 'Cérémonie', 'Accessoires']

const card = {
  background: '#111111',
  border: '1px solid rgba(201,168,76,0.14)',
  borderRadius: '18px',
  padding: '1.5rem',
}
const label = {
  display: 'block', fontFamily: 'Jost, sans-serif', fontWeight: 500,
  fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
  color: OR, marginBottom: '0.5rem',
}
const input = {
  width: '100%', background: '#0A0A0A', border: '1px solid rgba(201,168,76,0.25)',
  borderRadius: '10px', padding: '0.7rem 0.9rem', color: '#F5F0E8',
  fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.92rem', outline: 'none',
}
const btn = (bg = OR, color = '#0A0A0A') => ({
  background: bg, color, border: 'none', borderRadius: '9999px',
  padding: '0.6rem 1.4rem', fontFamily: 'Jost, sans-serif', fontWeight: 600,
  fontSize: '0.82rem', cursor: 'pointer', transition: 'opacity 0.2s',
})
const h3 = { fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#F5F0E8', letterSpacing: '0.01em' }

/* ─────────────────────────  Graphiques  ───────────────────────── */
function Donut({ data, size = 150 }) {
  const total = data.reduce((s, d) => s + d.count, 0)
  const R = 58, C = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg width={size} height={size} viewBox="0 0 150 150" style={{ flexShrink: 0 }}>
        <circle cx="75" cy="75" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
        {total > 0 && data.map((d, i) => {
          const dash = (d.count / total) * C
          const seg = (
            <circle key={i} cx="75" cy="75" r={R} fill="none"
              stroke={PALETTE[i % PALETTE.length]} strokeWidth="18"
              strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-offset}
              transform="rotate(-90 75 75)" strokeLinecap="butt" />
          )
          offset += dash
          return seg
        })}
        <text x="75" y="70" textAnchor="middle" fill="#F5F0E8" fontSize="24" fontFamily="Jost" fontWeight="700">{total}</text>
        <text x="75" y="88" textAnchor="middle" fill="#787068" fontSize="9" fontFamily="Jost" letterSpacing="1.5">TOTAL</text>
      </svg>
      <div className="flex flex-col gap-2 min-w-0">
        {data.length === 0 && <span style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune donnée</span>}
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span style={{ width: 11, height: 11, borderRadius: 3, background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
            <span style={{ fontFamily: 'Jost', fontSize: '0.82rem', color: '#F5F0E8', whiteSpace: 'nowrap' }}>{d.label}</span>
            <span style={{ fontFamily: 'Jost', fontSize: '0.78rem', color: '#787068' }}>
              {d.count} · {total > 0 ? Math.round((d.count / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AreaChart({ daily }) {
  const W = 720, H = 250, padL = 32, padB = 26, padT = 14, padR = 12
  const n = Math.max(daily.length, 2)
  const maxV = Math.max(4, ...daily.map(d => Math.max(d.visits, d.clicks)))
  const iw = W - padL - padR, ih = H - padT - padB
  const x = (i) => padL + (i * iw) / (n - 1)
  const y = (v) => padT + ih * (1 - v / maxV)
  const visitsPts = daily.map((d, i) => `${x(i)},${y(d.visits)}`).join(' ')
  const clicksPts = daily.map((d, i) => `${x(i)},${y(d.clicks)}`).join(' ')
  const area = `M ${padL},${y(0)} L ${daily.map((d, i) => `${x(i)},${y(d.visits)}`).join(' L ')} L ${x(n - 1)},${y(0)} Z`
  const steps = 4
  const gridVals = Array.from({ length: steps + 1 }, (_, k) => Math.round((maxV / steps) * k))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(201,168,76,0.42)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0)" />
        </linearGradient>
      </defs>
      {gridVals.map((v, k) => (
        <g key={k}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x={padL - 6} y={y(v) + 3} textAnchor="end" fill="#5f574c" fontSize="9" fontFamily="Jost">{v}</text>
        </g>
      ))}
      <path d={area} fill="url(#areaGold)" />
      <polyline points={visitsPts} fill="none" stroke={OR} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={clicksPts} fill="none" stroke="#8FB8A8" strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" strokeLinecap="round" />
      {daily.map((d, i) => (
        (i % 2 === 0 || i === n - 1) ? (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fill="#5f574c" fontSize="8.5" fontFamily="Jost">
            {d.date.slice(8)}/{d.date.slice(5, 7)}
          </text>
        ) : null
      ))}
    </svg>
  )
}

function StatTile({ value, label: l, sub, subColor }) {
  return (
    <div style={{ ...card, padding: '1.2rem 1.4rem' }}>
      <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginBottom: '0.5rem' }}>{l}</p>
      <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '1.9rem', color: '#F5F0E8', lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: '0.72rem', color: subColor || OR, marginTop: '0.5rem' }}>{sub}</p>}
    </div>
  )
}

/* ─────────────────────────  Utilitaires  ───────────────────────── */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = reject
    r.readAsDataURL(file)
  })
}

/* ─────────────────────────  Connexion (PIN)  ───────────────────────── */
function PinGate({ onOk }) {
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setErr('')
    const res = await adminCall(pin, 'verify')
    setLoading(false)
    if (res.ok) onOk(pin)
    else setErr('Code incorrect')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0A0A0A' }}>
      <form onSubmit={submit} style={{ ...card, width: '100%', maxWidth: 380, padding: '2.5rem' }}>
        <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '0.3rem' }}>
          Tableau de bord
        </p>
        <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.9rem', color: '#B8B0A0', marginBottom: '1.8rem' }}>
          Senan Concept · Espace administrateur
        </p>
        <label style={label}>Code d'accès</label>
        <input
          type="password" value={pin} autoFocus autoCapitalize="none" autoCorrect="off"
          onChange={e => setPin(e.target.value)}
          style={{ ...input, letterSpacing: '0.2em', textAlign: 'center', fontSize: '1.1rem' }}
        />
        {err && <p style={{ color: '#E27B7B', fontFamily: 'Jost', fontSize: '0.8rem', marginTop: '0.7rem' }}>{err}</p>}
        <button type="submit" disabled={loading} style={{ ...btn(), width: '100%', marginTop: '1.5rem', padding: '0.8rem', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Vérification…' : 'Entrer'}
        </button>
      </form>
    </div>
  )
}

/* ─────────────────────────  Onglet Analytics  ───────────────────────── */
function Analytics({ analytics, onRefresh, refreshing }) {
  if (!analytics) return <p style={{ color: '#B8B0A0', fontFamily: 'Jost' }}>Chargement…</p>
  const { totals, daily, byDevice, byElement } = analytics
  const today = daily[daily.length - 1] || { visits: 0, clicks: 0 }

  return (
    <div className="flex flex-col gap-6">
      {/* En-tête */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#F5F0E8', letterSpacing: '0.01em' }}>Tableau de bord</h2>
          <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.82rem', color: '#787068', marginTop: '0.2rem' }}>Audience & interactions</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2" style={{ fontFamily: 'Jost', fontSize: '0.72rem', color: '#8FB8A8' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#8FB8A8', display: 'inline-block' }} />
            Données en direct
          </span>
          <button onClick={onRefresh} disabled={refreshing} style={{ ...btn('transparent', OR), border: '1px solid rgba(201,168,76,0.3)', opacity: refreshing ? 0.5 : 1 }}>
            {refreshing ? '…' : '↻ Actualiser'}
          </button>
        </div>
      </div>

      {/* Tuiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile value={totals.visits} label="Visites totales" sub={`+${today.visits} aujourd'hui`} />
        <StatTile value={totals.clicks} label="Clics totaux" sub={`+${today.clicks} aujourd'hui`} />
        <StatTile value={totals.unique} label="Visiteurs uniques" sub="sessions distinctes" subColor="#787068" />
        <StatTile value={totals.visits7} label="Visites (7 jours)" sub="semaine en cours" subColor="#787068" />
      </div>

      {/* Fréquentation */}
      <div style={card}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <h3 style={h3}>Fréquentation</h3>
            <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.78rem', color: '#787068', marginTop: '0.2rem' }}>Visites et clics sur les 14 derniers jours</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2" style={{ fontFamily: 'Jost', fontSize: '0.72rem', color: '#B8B0A0' }}>
              <span style={{ width: 12, height: 3, background: OR, display: 'inline-block', borderRadius: 2 }} /> Visites
            </span>
            <span className="flex items-center gap-2" style={{ fontFamily: 'Jost', fontSize: '0.72rem', color: '#B8B0A0' }}>
              <span style={{ width: 12, height: 3, background: '#8FB8A8', display: 'inline-block', borderRadius: 2 }} /> Clics
            </span>
          </div>
        </div>
        <AreaChart daily={daily} />
      </div>

      {/* Donuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div style={card}>
          <h3 style={h3}>Par appareil</h3>
          <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.78rem', color: '#787068', margin: '0.2rem 0 1.2rem' }}>Répartition des visites</p>
          <Donut data={byDevice} />
        </div>
        <div style={card}>
          <h3 style={h3}>Clics par élément</h3>
          <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.78rem', color: '#787068', margin: '0.2rem 0 1.2rem' }}>Boutons & liens les plus cliqués</p>
          <Donut data={byElement} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────  Onglet Galeries (collections)  ───────────────────────── */
function CollectionManager({ pin, collection, reload }) {
  const [form, setForm] = useState({ titre: collection.titre, tag: collection.tag || '', description: collection.description || '' })
  const [coverFile, setCoverFile] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState('')
  const ch = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const photos = collection.photos || []

  const saveInfos = async (e) => {
    e.preventDefault()
    setBusy('infos'); setMsg('')
    let imageBase64, filename, contentType
    if (coverFile) { imageBase64 = await fileToBase64(coverFile); filename = coverFile.name; contentType = coverFile.type }
    const res = await adminCall(pin, 'update_collection', { id: collection.id, ...form, imageBase64, filename, contentType })
    setBusy('')
    if (res.ok) { setMsg('Enregistré ✓'); setCoverFile(null); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const addPhoto = async (e) => {
    e.preventDefault()
    if (!photoFile) return
    setBusy('photo'); setMsg('')
    const imageBase64 = await fileToBase64(photoFile)
    const res = await adminCall(pin, 'add_collection_photo', { collection_id: collection.id, imageBase64, filename: photoFile.name, contentType: photoFile.type })
    setBusy('')
    if (res.ok) { setPhotoFile(null); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const delPhoto = async (p) => {
    if (!confirm('Supprimer cette photo ?')) return
    await adminCall(pin, 'delete_collection_photo', { id: p.id, image_url: p.image_url })
    reload()
  }

  return (
    <div style={{ ...card, borderColor: 'rgba(201,168,76,0.3)' }} className="flex flex-col gap-5">
      <form onSubmit={saveInfos} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label style={label}>Titre</label><input value={form.titre} onChange={ch('titre')} style={input} /></div>
          <div><label style={label}>Tag</label><input value={form.tag} onChange={ch('tag')} style={input} /></div>
        </div>
        <div><label style={label}>Description</label><textarea rows={3} value={form.description} onChange={ch('description')} style={{ ...input, resize: 'vertical' }} /></div>
        <div><label style={label}>Changer la couverture (optionnel)</label><input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} /></div>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={busy === 'infos'} style={{ ...btn(), opacity: busy === 'infos' ? 0.6 : 1 }}>{busy === 'infos' ? 'Enregistrement…' : 'Enregistrer les infos'}</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>

      <form onSubmit={addPhoto} className="flex items-end gap-4 flex-wrap pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
        <div className="flex-1" style={{ minWidth: 200 }}>
          <label style={label}>Ajouter une photo à cette galerie</label>
          <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} />
        </div>
        <button type="submit" disabled={busy === 'photo' || !photoFile} style={{ ...btn(), opacity: busy === 'photo' || !photoFile ? 0.6 : 1 }}>{busy === 'photo' ? 'Envoi…' : 'Ajouter la photo'}</button>
      </form>

      <div>
        <p style={{ fontFamily: 'Jost', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginBottom: '0.9rem' }}>Photos ({photos.length})</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {photos.map(p => (
            <div key={p.id} className="relative overflow-hidden" style={{ borderRadius: 10, aspectRatio: '1/1', background: '#1A1A1A' }}>
              <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => delPhoto(p)} style={{ position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: '50%', background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(226,123,123,0.6)', color: '#E27B7B', cursor: 'pointer', fontSize: '0.75rem' }}>✕</button>
            </div>
          ))}
          {photos.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune photo dans cette galerie.</p>}
        </div>
      </div>
    </div>
  )
}

function CollectionsTab({ pin, collections, reload }) {
  const [form, setForm] = useState({ titre: '', tag: '', description: '' })
  const [coverFile, setCoverFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [openId, setOpenId] = useState(null)
  const ch = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const add = async (e) => {
    e.preventDefault()
    if (!form.titre) return
    setBusy(true); setMsg('')
    let imageBase64, filename, contentType
    if (coverFile) { imageBase64 = await fileToBase64(coverFile); filename = coverFile.name; contentType = coverFile.type }
    const res = await adminCall(pin, 'add_collection', { ...form, imageBase64, filename, contentType })
    setBusy(false)
    if (res.ok) { setForm({ titre: '', tag: '', description: '' }); setCoverFile(null); setMsg('Galerie créée ✓'); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const del = async (c) => {
    if (!confirm(`Supprimer la galerie « ${c.titre} » et toutes ses photos ?`)) return
    if (openId === c.id) setOpenId(null)
    await adminCall(pin, 'delete_collection', { id: c.id, cover_url: c.cover_url })
    reload()
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 style={{ ...h3, fontSize: '1.2rem' }}>Galeries</h2>

      <form onSubmit={add} style={card}>
        <h3 style={{ ...h3, fontSize: '1rem', marginBottom: '1.2rem' }}>Créer une galerie / un événement</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div><label style={label}>Titre</label><input value={form.titre} onChange={ch('titre')} required placeholder="Ex : Vodun Days" style={input} /></div>
          <div><label style={label}>Tag</label><input value={form.tag} onChange={ch('tag')} placeholder="Ex : Festival culturel" style={input} /></div>
        </div>
        <label style={label}>Description</label>
        <textarea rows={3} value={form.description} onChange={ch('description')} style={{ ...input, resize: 'vertical' }} />
        <label style={{ ...label, marginTop: '1rem' }}>Photo de couverture</label>
        <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} />
        <div className="flex items-center gap-4 mt-4">
          <button type="submit" disabled={busy} style={{ ...btn(), opacity: busy ? 0.6 : 1 }}>{busy ? 'Création…' : 'Créer la galerie'}</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map(c => (
          <div key={c.id} className="flex flex-col overflow-hidden" style={{ ...card, padding: 0 }}>
            <div style={{ aspectRatio: '4/3', background: '#1A1A1A' }}>
              {c.cover_url && <img src={c.cover_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div className="flex flex-col flex-1" style={{ padding: '1rem 1.1rem' }}>
              <p style={{ fontFamily: 'Jost', fontWeight: 600, fontSize: '0.98rem', color: '#F5F0E8' }}>{c.titre}</p>
              <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.72rem', color: OR, marginTop: '0.15rem' }}>{c.tag} · {(c.photos || []).length} photo(s)</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setOpenId(openId === c.id ? null : c.id)} style={{ ...btn(openId === c.id ? OR : 'transparent', openId === c.id ? '#0A0A0A' : OR), border: '1px solid rgba(201,168,76,0.4)', fontSize: '0.76rem', padding: '0.45rem 1rem' }}>
                  {openId === c.id ? 'Fermer' : 'Gérer'}
                </button>
                <button onClick={() => del(c)} style={{ ...btn('transparent', '#E27B7B'), border: '1px solid rgba(226,123,123,0.5)', fontSize: '0.76rem', padding: '0.45rem 1rem' }}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
        {collections.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune galerie. Créez-en une ci-dessus.</p>}
      </div>

      {openId && collections.find(c => c.id === openId) && (
        <CollectionManager pin={pin} collection={collections.find(c => c.id === openId)} reload={reload} />
      )}
    </div>
  )
}

/* ─────────────────────────  Onglet Événementiel  ───────────────────────── */
const STATUTS = [{ v: 'a_venir', l: 'À venir' }, { v: 'passe', l: 'Passé' }]

function EvenementManager({ pin, evenement, reload }) {
  const [form, setForm] = useState({
    nom: evenement.nom || '', theme: evenement.theme || '', sous_titre: evenement.sous_titre || '',
    date_texte: evenement.date_texte || '', date_iso: evenement.date_iso || '', lieu: evenement.lieu || '',
    statut: evenement.statut || 'a_venir', description: evenement.description || '',
  })
  const [coverFile, setCoverFile] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState('')
  const ch = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const photos = evenement.photos || []

  const saveInfos = async (e) => {
    e.preventDefault()
    setBusy('infos'); setMsg('')
    let imageBase64, filename, contentType
    if (coverFile) { imageBase64 = await fileToBase64(coverFile); filename = coverFile.name; contentType = coverFile.type }
    const res = await adminCall(pin, 'update_evenement', { id: evenement.id, ...form, imageBase64, filename, contentType })
    setBusy('')
    if (res.ok) { setMsg('Enregistré ✓'); setCoverFile(null); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const addPhoto = async (e) => {
    e.preventDefault()
    if (!photoFile) return
    setBusy('photo'); setMsg('')
    const imageBase64 = await fileToBase64(photoFile)
    const res = await adminCall(pin, 'add_evenement_photo', { evenement_id: evenement.id, imageBase64, filename: photoFile.name, contentType: photoFile.type })
    setBusy('')
    if (res.ok) { setPhotoFile(null); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const delPhoto = async (p) => {
    if (!confirm('Supprimer cette photo ?')) return
    await adminCall(pin, 'delete_evenement_photo', { id: p.id, image_url: p.image_url })
    reload()
  }

  return (
    <div style={{ ...card, borderColor: 'rgba(201,168,76,0.3)' }} className="flex flex-col gap-5">
      <form onSubmit={saveInfos} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label style={label}>Nom de l'événement</label><input value={form.nom} onChange={ch('nom')} style={input} /></div>
          <div><label style={label}>Thème de l'édition</label><input value={form.theme} onChange={ch('theme')} style={input} /></div>
        </div>
        <div><label style={label}>Sous-titre / accroche</label><input value={form.sous_titre} onChange={ch('sous_titre')} style={input} /></div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label style={label}>Date (texte)</label><input value={form.date_texte} onChange={ch('date_texte')} placeholder="Ex : Janvier 2027" style={input} /></div>
          <div><label style={label}>Date exacte (option — compte à rebours)</label><input type="date" value={form.date_iso || ''} onChange={ch('date_iso')} style={input} /></div>
          <div><label style={label}>Statut</label><select value={form.statut} onChange={ch('statut')} style={input}>{STATUTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}</select></div>
        </div>
        <div><label style={label}>Lieu (optionnel)</label><input value={form.lieu} onChange={ch('lieu')} style={input} /></div>
        <div><label style={label}>Description</label><textarea rows={4} value={form.description} onChange={ch('description')} style={{ ...input, resize: 'vertical' }} /></div>
        <div><label style={label}>Changer la couverture (optionnel)</label><input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} /></div>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={busy === 'infos'} style={{ ...btn(), opacity: busy === 'infos' ? 0.6 : 1 }}>{busy === 'infos' ? 'Enregistrement…' : 'Enregistrer les infos'}</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>

      <form onSubmit={addPhoto} className="flex items-end gap-4 flex-wrap pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}>
        <div className="flex-1" style={{ minWidth: 200 }}>
          <label style={label}>Ajouter une photo à cette édition</label>
          <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} />
        </div>
        <button type="submit" disabled={busy === 'photo' || !photoFile} style={{ ...btn(), opacity: busy === 'photo' || !photoFile ? 0.6 : 1 }}>{busy === 'photo' ? 'Envoi…' : 'Ajouter la photo'}</button>
      </form>

      <div>
        <p style={{ fontFamily: 'Jost', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginBottom: '0.9rem' }}>Photos ({photos.length})</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {photos.map(p => (
            <div key={p.id} className="relative overflow-hidden" style={{ borderRadius: 10, aspectRatio: '1/1', background: '#1A1A1A' }}>
              <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => delPhoto(p)} style={{ position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: '50%', background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(226,123,123,0.6)', color: '#E27B7B', cursor: 'pointer', fontSize: '0.75rem' }}>✕</button>
            </div>
          ))}
          {photos.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune photo pour cette édition.</p>}
        </div>
      </div>
    </div>
  )
}

function EvenementsTab({ pin, evenements, reload }) {
  const [form, setForm] = useState({ nom: '', theme: '', sous_titre: '', date_texte: '', date_iso: '', lieu: '', statut: 'a_venir', description: '' })
  const [coverFile, setCoverFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [openId, setOpenId] = useState(null)
  const ch = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const add = async (e) => {
    e.preventDefault()
    if (!form.nom) return
    setBusy(true); setMsg('')
    let imageBase64, filename, contentType
    if (coverFile) { imageBase64 = await fileToBase64(coverFile); filename = coverFile.name; contentType = coverFile.type }
    const res = await adminCall(pin, 'add_evenement', { ...form, imageBase64, filename, contentType })
    setBusy(false)
    if (res.ok) { setForm({ nom: '', theme: '', sous_titre: '', date_texte: '', date_iso: '', lieu: '', statut: 'a_venir', description: '' }); setCoverFile(null); setMsg('Édition créée ✓'); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const del = async (ev) => {
    if (!confirm(`Supprimer l'édition « ${ev.theme || ev.nom} » et toutes ses photos ?`)) return
    if (openId === ev.id) setOpenId(null)
    await adminCall(pin, 'delete_evenement', { id: ev.id, cover_url: ev.cover_url })
    reload()
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 style={{ ...h3, fontSize: '1.2rem' }}>Événementiel</h2>

      <form onSubmit={add} style={card}>
        <h3 style={{ ...h3, fontSize: '1rem', marginBottom: '1.2rem' }}>Créer une édition</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div><label style={label}>Nom de l'événement</label><input value={form.nom} onChange={ch('nom')} required placeholder="Ex : IFA" style={input} /></div>
          <div><label style={label}>Thème de l'édition</label><input value={form.theme} onChange={ch('theme')} placeholder="Ex : OFFIN" style={input} /></div>
        </div>
        <label style={label}>Sous-titre / accroche</label>
        <input value={form.sous_titre} onChange={ch('sous_titre')} style={input} />
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div><label style={label}>Date (texte)</label><input value={form.date_texte} onChange={ch('date_texte')} placeholder="Ex : Janvier 2027" style={input} /></div>
          <div><label style={label}>Date exacte (option)</label><input type="date" value={form.date_iso} onChange={ch('date_iso')} style={input} /></div>
          <div><label style={label}>Statut</label><select value={form.statut} onChange={ch('statut')} style={input}>{STATUTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}</select></div>
        </div>
        <label style={{ ...label, marginTop: '1rem' }}>Lieu (optionnel)</label>
        <input value={form.lieu} onChange={ch('lieu')} style={input} />
        <label style={{ ...label, marginTop: '1rem' }}>Description</label>
        <textarea rows={3} value={form.description} onChange={ch('description')} style={{ ...input, resize: 'vertical' }} />
        <label style={{ ...label, marginTop: '1rem' }}>Photo de couverture (optionnel)</label>
        <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} />
        <div className="flex items-center gap-4 mt-4">
          <button type="submit" disabled={busy} style={{ ...btn(), opacity: busy ? 0.6 : 1 }}>{busy ? 'Création…' : 'Créer l’édition'}</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {evenements.map(ev => (
          <div key={ev.id} className="flex flex-col overflow-hidden" style={{ ...card, padding: 0 }}>
            <div className="flex items-center justify-center" style={{ aspectRatio: '16/9', background: ev.cover_url ? '#1A1A1A' : 'radial-gradient(circle at 30% 25%, #1C1810, #0E0E0E)' }}>
              {ev.cover_url
                ? <img src={ev.cover_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: OR }}>{ev.theme || ev.nom}</span>}
            </div>
            <div className="flex flex-col flex-1" style={{ padding: '1rem 1.1rem' }}>
              <p style={{ fontFamily: 'Jost', fontWeight: 600, fontSize: '0.98rem', color: '#F5F0E8' }}>{ev.nom} <span style={{ color: OR, fontWeight: 400 }}>· {ev.theme}</span></p>
              <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.72rem', color: '#787068', marginTop: '0.15rem' }}>
                {ev.statut === 'passe' ? 'Passé' : 'À venir'} · {ev.date_texte || '—'} · {(ev.photos || []).length} photo(s)
              </p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setOpenId(openId === ev.id ? null : ev.id)} style={{ ...btn(openId === ev.id ? OR : 'transparent', openId === ev.id ? '#0A0A0A' : OR), border: '1px solid rgba(201,168,76,0.4)', fontSize: '0.76rem', padding: '0.45rem 1rem' }}>
                  {openId === ev.id ? 'Fermer' : 'Gérer'}
                </button>
                <button onClick={() => del(ev)} style={{ ...btn('transparent', '#E27B7B'), border: '1px solid rgba(226,123,123,0.5)', fontSize: '0.76rem', padding: '0.45rem 1rem' }}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
        {evenements.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune édition. Créez-en une ci-dessus.</p>}
      </div>

      {openId && evenements.find(ev => ev.id === openId) && (
        <EvenementManager pin={pin} evenement={evenements.find(ev => ev.id === openId)} reload={reload} />
      )}
    </div>
  )
}

/* ─────────────────────────  Onglet Témoignages  ───────────────────────── */
function TestimonialsTab({ pin, testimonials, reload }) {
  const [form, setForm] = useState({ nom: '', titre: '', tag: '', texte: '' })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const ch = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const add = async (e) => {
    e.preventDefault()
    setBusy(true); setMsg('')
    const res = await adminCall(pin, 'add_testimonial', form)
    setBusy(false)
    if (res.ok) { setForm({ nom: '', titre: '', tag: '', texte: '' }); setMsg('Témoignage ajouté ✓'); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const remove = async (t) => {
    if (!confirm('Supprimer ce témoignage ?')) return
    await adminCall(pin, 'delete_testimonial', { id: t.id })
    reload()
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 style={{ ...h3, fontSize: '1.2rem' }}>Témoignages</h2>
      <form onSubmit={add} style={card}>
        <h3 style={{ ...h3, fontSize: '1rem', marginBottom: '1.2rem' }}>Ajouter un témoignage</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div><label style={label}>Nom</label><input value={form.nom} onChange={ch('nom')} required style={input} /></div>
          <div><label style={label}>Titre / rôle</label><input value={form.titre} onChange={ch('titre')} style={input} /></div>
          <div><label style={label}>Tag</label><input value={form.tag} onChange={ch('tag')} placeholder="Ex : Costumerie" style={input} /></div>
        </div>
        <label style={label}>Témoignage</label>
        <textarea value={form.texte} onChange={ch('texte')} required rows={4} style={{ ...input, resize: 'vertical' }} />
        <div className="flex items-center gap-4 mt-4">
          <button type="submit" disabled={busy} style={{ ...btn(), opacity: busy ? 0.6 : 1 }}>{busy ? 'Envoi…' : 'Ajouter'}</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>
      <div className="flex flex-col gap-3">
        <p style={{ fontFamily: 'Jost', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0' }}>Témoignages ajoutés ({testimonials.length})</p>
        {testimonials.map(t => (
          <div key={t.id} style={{ ...card, padding: '1.2rem 1.4rem' }} className="flex items-start justify-between gap-4">
            <div>
              <p style={{ fontFamily: 'Jost', fontWeight: 600, fontSize: '0.95rem', color: '#F5F0E8' }}>{t.nom} <span style={{ color: OR, fontWeight: 400, fontSize: '0.8rem' }}>· {t.titre}</span></p>
              <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.85rem', color: '#B8B0A0', marginTop: '0.3rem', fontStyle: 'italic' }}>“{t.texte}”</p>
            </div>
            <button onClick={() => remove(t)} style={{ ...btn('transparent', '#E27B7B'), border: '1px solid rgba(226,123,123,0.5)', flexShrink: 0 }}>Supprimer</button>
          </div>
        ))}
        {testimonials.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucun témoignage ajouté.</p>}
      </div>
    </div>
  )
}

/* ─────────────────────────  Onglet Réalisations  ───────────────────────── */
function RealisationsTab({ pin, realisations, reload }) {
  const [form, setForm] = useState({ titre: '', sous_titre: '', tag: '' })
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const ch = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const add = async (e) => {
    e.preventDefault()
    setBusy(true); setMsg('')
    let imageBase64, filename, contentType
    if (file) { imageBase64 = await fileToBase64(file); filename = file.name; contentType = file.type }
    const res = await adminCall(pin, 'add_realisation', { ...form, imageBase64, filename, contentType })
    setBusy(false)
    if (res.ok) { setForm({ titre: '', sous_titre: '', tag: '' }); setFile(null); setMsg('Réalisation ajoutée ✓'); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const remove = async (r) => {
    if (!confirm('Supprimer cette réalisation ?')) return
    await adminCall(pin, 'delete_realisation', { id: r.id, image_url: r.image_url })
    reload()
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 style={{ ...h3, fontSize: '1.2rem' }}>Réalisations</h2>
      <form onSubmit={add} style={card}>
        <h3 style={{ ...h3, fontSize: '1rem', marginBottom: '1.2rem' }}>Ajouter une réalisation</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div><label style={label}>Titre</label><input value={form.titre} onChange={ch('titre')} required style={input} /></div>
          <div><label style={label}>Sous-titre</label><input value={form.sous_titre} onChange={ch('sous_titre')} style={input} /></div>
          <div><label style={label}>Tag</label><input value={form.tag} onChange={ch('tag')} placeholder="Ex : Festival culturel" style={input} /></div>
        </div>
        <label style={label}>Image</label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} />
        <div className="flex items-center gap-4 mt-4">
          <button type="submit" disabled={busy} style={{ ...btn(), opacity: busy ? 0.6 : 1 }}>{busy ? 'Envoi…' : 'Ajouter'}</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {realisations.map(r => (
          <div key={r.id} className="relative overflow-hidden" style={{ borderRadius: 14, aspectRatio: '3/4', background: '#1A1A1A' }}>
            {r.image_url ? <img src={r.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%' }} />}
            <button onClick={() => remove(r)} style={{ position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: '50%', background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(226,123,123,0.6)', color: '#E27B7B', cursor: 'pointer' }}>✕</button>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.7rem', background: 'linear-gradient(to top, rgba(10,10,10,0.95), transparent)' }}>
              <p style={{ fontFamily: 'Jost', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: OR }}>{r.tag}</p>
              <p style={{ fontFamily: 'Jost', fontWeight: 600, fontSize: '0.9rem', color: '#F5F0E8' }}>{r.titre}</p>
            </div>
          </div>
        ))}
        {realisations.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune réalisation ajoutée.</p>}
      </div>
    </div>
  )
}

/* ─────────────────────────  Onglet Réglages  ───────────────────────── */
function SettingsTab({ pin, onPinChange }) {
  const [newPin, setNewPin] = useState('')
  const [msg, setMsg] = useState('')
  const save = async (e) => {
    e.preventDefault(); setMsg('')
    const res = await adminCall(pin, 'change_pin', { newPin })
    if (res.ok) { setMsg('Code mis à jour ✓'); onPinChange(newPin); setNewPin('') }
    else setMsg('Erreur : ' + (res.error === 'pin_too_short' ? '4 caractères minimum' : res.error))
  }
  return (
    <div className="flex flex-col gap-6">
      <h2 style={{ ...h3, fontSize: '1.2rem' }}>Réglages</h2>
      <form onSubmit={save} style={{ ...card, maxWidth: 420 }}>
        <h3 style={{ ...h3, fontSize: '1rem', marginBottom: '1.2rem' }}>Modifier le code d'accès</h3>
        <label style={label}>Nouveau code (min. 4 caractères)</label>
        <input type="password" value={newPin} autoCapitalize="none" autoCorrect="off" onChange={e => setNewPin(e.target.value)} required style={input} />
        <div className="flex items-center gap-4 mt-4">
          <button type="submit" style={btn()}>Enregistrer</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>
    </div>
  )
}

/* ─────────────────────────  Sidebar  ───────────────────────── */
const TABS = ['Analytics', 'Galeries', 'Événementiel', 'Témoignages', 'Réglages']
const ICONS = { Analytics: '▤', Galeries: '▦', 'Événementiel': '✦', 'Témoignages': '❝', 'Réglages': '⚙' }

function Sidebar({ tab, setTab, logout, open, setOpen }) {
  return (
    <>
      {open && <div onClick={() => setOpen(false)} className="md:hidden" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 30 }} />}
      <aside
        className="admin-sidebar flex flex-col"
        data-open={open ? '1' : '0'}
        style={{
          position: 'fixed', top: 0, bottom: 0, left: 0, width: '250px', zIndex: 40,
          background: '#0E0E0E', borderRight: '1px solid rgba(201,168,76,0.14)',
          padding: '1.5rem 1.1rem', transition: 'transform 0.3s ease',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div className="flex items-center gap-3 mb-8 px-1">
          <span className="flex items-center justify-center shrink-0" style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(150deg,#C9A84C,#9A7A32)', color: '#0A0A0A', fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '0.75rem' }}>SC</span>
          <div>
            <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '0.82rem', color: '#F5F0E8' }}>Senan</p>
            <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.66rem', color: '#787068', letterSpacing: '0.1em' }}>ADMINISTRATION</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setOpen(false) }}
              className="flex items-center gap-3 text-left transition-all duration-200"
              style={{
                fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer',
                padding: '0.7rem 0.9rem', borderRadius: '12px',
                background: tab === t ? 'rgba(201,168,76,0.14)' : 'transparent',
                color: tab === t ? OR : '#B8B0A0',
                border: tab === t ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent',
              }}
            >
              <span style={{ width: 18, textAlign: 'center', opacity: 0.9 }}>{ICONS[t]}</span>
              {t}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-2 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <a href="/" style={{ fontFamily: 'Jost', fontSize: '0.82rem', color: '#B8B0A0', textDecoration: 'none', padding: '0.5rem 0.9rem' }}>↗ Voir le site</a>
          <button onClick={logout} style={{ ...btn('transparent', OR), border: '1px solid rgba(201,168,76,0.3)', textAlign: 'center' }}>Déconnexion</button>
        </div>
      </aside>
    </>
  )
}

/* ─────────────────────────  Page principale  ───────────────────────── */
export default function AdminPage() {
  const [pin, setPin] = useState(() => sessionStorage.getItem('sc_admin_pin') || '')
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('Analytics')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState({ testimonials: [], collections: [], evenements: [] })
  const [analytics, setAnalytics] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const load = useCallback(async (p) => {
    const key = p || pin
    setRefreshing(true)
    const [list, cols, evs, ana] = await Promise.all([
      adminCall(key, 'list'),
      adminCall(key, 'list_collections'),
      adminCall(key, 'list_evenements'),
      adminCall(key, 'analytics'),
    ])
    if (list.ok) setData(d => ({ ...d, testimonials: list.testimonials }))
    if (cols.ok) setData(d => ({ ...d, collections: cols.collections || [] }))
    if (evs.ok) setData(d => ({ ...d, evenements: evs.evenements || [] }))
    if (ana.ok) setAnalytics(ana)
    setRefreshing(false)
  }, [pin])

  useEffect(() => {
    if (pin && !authed) {
      adminCall(pin, 'verify').then(r => { if (r.ok) { setAuthed(true); load(pin) } })
    }
  }, [pin, authed, load])

  const onOk = (p) => { setPin(p); sessionStorage.setItem('sc_admin_pin', p); setAuthed(true); load(p) }
  const logout = () => { sessionStorage.removeItem('sc_admin_pin'); setPin(''); setAuthed(false) }

  if (!authed) return <PinGate onOk={onOk} />

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      {/* Sidebar visible en permanence ≥ md, en tiroir sur mobile */}
      <style>{`
        @media (min-width: 768px){
          .admin-sidebar{ transform: translateX(0) !important; }
          .admin-main{ margin-left: 250px; }
        }
      `}</style>

      <Sidebar tab={tab} setTab={setTab} logout={logout} open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="admin-main" style={{ minHeight: '100vh' }}>
        {/* Barre supérieure mobile */}
        <div className="md:hidden flex items-center justify-between px-5 h-16" style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(8px)', zIndex: 20 }}>
          <button onClick={() => setSidebarOpen(true)} aria-label="Menu" className="flex flex-col gap-1.5 p-2">
            <span style={{ display: 'block', height: 2, width: 22, background: OR }} />
            <span style={{ display: 'block', height: 2, width: 22, background: OR }} />
            <span style={{ display: 'block', height: 2, width: 22, background: OR }} />
          </button>
          <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#F5F0E8' }}>{tab}</p>
          <span style={{ width: 38 }} />
        </div>

        <div className="px-5 md:px-8 lg:px-10 py-8" style={{ maxWidth: '1120px' }}>
          {tab === 'Analytics' && <Analytics analytics={analytics} onRefresh={() => load()} refreshing={refreshing} />}
          {tab === 'Galeries' && <CollectionsTab pin={pin} collections={data.collections} reload={() => load()} />}
          {tab === 'Événementiel' && <EvenementsTab pin={pin} evenements={data.evenements} reload={() => load()} />}
          {tab === 'Témoignages' && <TestimonialsTab pin={pin} testimonials={data.testimonials} reload={() => load()} />}
          {tab === 'Réglages' && <SettingsTab pin={pin} onPinChange={(p) => { setPin(p); sessionStorage.setItem('sc_admin_pin', p) }} />}

          <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.72rem', color: '#5f574c', textAlign: 'center', marginTop: '3rem' }}>
            Senan Concept · Tableau de bord alimenté par Supabase
          </p>
        </div>
      </main>
    </div>
  )
}
