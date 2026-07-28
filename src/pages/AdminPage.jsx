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

/* ─────────────────────────  Onglet Galerie  ───────────────────────── */
function GalleryTab({ pin, photos, reload }) {
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('Costumerie')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const add = async (e) => {
    e.preventDefault()
    if (!file) return
    setBusy(true); setMsg('')
    const imageBase64 = await fileToBase64(file)
    const res = await adminCall(pin, 'add_photo', { imageBase64, filename: file.name, contentType: file.type, category })
    setBusy(false)
    if (res.ok) { setFile(null); setMsg('Photo ajoutée ✓'); reload() }
    else setMsg('Erreur : ' + (res.error || 'inconnue'))
  }
  const remove = async (p) => {
    if (!confirm('Supprimer cette photo ?')) return
    await adminCall(pin, 'delete_photo', { id: p.id, image_url: p.image_url })
    reload()
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 style={{ ...h3, fontSize: '1.2rem' }}>Galerie</h2>
      <form onSubmit={add} style={card}>
        <h3 style={{ ...h3, fontSize: '1rem', marginBottom: '1.2rem' }}>Ajouter une photo</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={label}>Image</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} style={{ ...input, padding: '0.5rem' }} />
          </div>
          <div>
            <label style={label}>Catégorie</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={input}>
              {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#0A0A0A' }}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button type="submit" disabled={busy || !file} style={{ ...btn(), opacity: busy || !file ? 0.6 : 1 }}>{busy ? 'Envoi…' : 'Ajouter'}</button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>
      <div>
        <p style={{ fontFamily: 'Jost', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginBottom: '1rem' }}>Photos ajoutées ({photos.length})</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map(p => (
            <div key={p.id} className="relative overflow-hidden" style={{ borderRadius: 12, aspectRatio: '3/4', background: '#1A1A1A' }}>
              <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => remove(p)} style={{ position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: '50%', background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(226,123,123,0.6)', color: '#E27B7B', cursor: 'pointer' }}>✕</button>
              <span style={{ position: 'absolute', bottom: 6, left: 6, fontFamily: 'Jost', fontSize: '0.62rem', color: '#F5F0E8', background: 'rgba(10,10,10,0.7)', padding: '2px 8px', borderRadius: 9999 }}>{p.category}</span>
            </div>
          ))}
          {photos.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune photo ajoutée.</p>}
        </div>
      </div>
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
const TABS = ['Analytics', 'Galerie', 'Témoignages', 'Réalisations', 'Réglages']
const ICONS = { Analytics: '▤', Galerie: '▦', 'Témoignages': '❝', 'Réalisations': '✦', 'Réglages': '⚙' }

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
  const [data, setData] = useState({ photos: [], testimonials: [], realisations: [] })
  const [analytics, setAnalytics] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const load = useCallback(async (p) => {
    const key = p || pin
    setRefreshing(true)
    const [list, ana] = await Promise.all([
      adminCall(key, 'list'),
      adminCall(key, 'analytics'),
    ])
    if (list.ok) setData({ photos: list.photos, testimonials: list.testimonials, realisations: list.realisations || [] })
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
          {tab === 'Galerie' && <GalleryTab pin={pin} photos={data.photos} reload={() => load()} />}
          {tab === 'Témoignages' && <TestimonialsTab pin={pin} testimonials={data.testimonials} reload={() => load()} />}
          {tab === 'Réalisations' && <RealisationsTab pin={pin} realisations={data.realisations} reload={() => load()} />}
          {tab === 'Réglages' && <SettingsTab pin={pin} onPinChange={(p) => { setPin(p); sessionStorage.setItem('sc_admin_pin', p) }} />}

          <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.72rem', color: '#5f574c', textAlign: 'center', marginTop: '3rem' }}>
            Senan Concept · Tableau de bord alimenté par Supabase
          </p>
        </div>
      </main>
    </div>
  )
}
