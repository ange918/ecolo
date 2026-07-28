import { useState, useEffect, useCallback } from 'react'
import { adminCall } from '../lib/supabase'

/* ─────────────────────────  Constantes de style  ───────────────────────── */
const OR = '#C9A84C'
const PALETTE = ['#C9A84C', '#E8D5A0', '#8C6D2E', '#B8B0A0', '#6B5B2E', '#F5EDD8']
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

/* ─────────────────────────  Graphiques SVG  ───────────────────────── */
function Donut({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0)
  const R = 60, C = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="flex flex-wrap items-center gap-8">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" />
        {total > 0 && data.map((d, i) => {
          const frac = d.count / total
          const dash = frac * C
          const seg = (
            <circle key={i} cx="80" cy="80" r={R} fill="none"
              stroke={PALETTE[i % PALETTE.length]} strokeWidth="20"
              strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-offset}
              transform="rotate(-90 80 80)" />
          )
          offset += dash
          return seg
        })}
        <text x="80" y="74" textAnchor="middle" fill="#F5F0E8" fontSize="26" fontFamily="Jost" fontWeight="700">{total}</text>
        <text x="80" y="94" textAnchor="middle" fill="#B8B0A0" fontSize="10" fontFamily="Jost" letterSpacing="1.5">TOTAL</text>
      </svg>
      <div className="flex flex-col gap-2">
        {data.length === 0 && <span style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune donnée pour l'instant</span>}
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span style={{ width: 12, height: 12, borderRadius: 3, background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
            <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: '#F5F0E8' }}>{d.label}</span>
            <span style={{ fontFamily: 'Jost', fontSize: '0.8rem', color: '#B8B0A0' }}>
              {d.count} · {total > 0 ? Math.round((d.count / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Bars({ data }) {
  const max = Math.max(1, ...data.map(d => d.count))
  return (
    <div className="flex items-end gap-2" style={{ height: 140 }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-2" style={{ flex: 1 }}>
          <span style={{ fontFamily: 'Jost', fontSize: '0.7rem', color: '#B8B0A0' }}>{d.count}</span>
          <div style={{
            width: '100%', maxWidth: 42, height: `${(d.count / max) * 100}%`, minHeight: 3,
            background: `linear-gradient(to top, ${OR}, #E8D5A0)`, borderRadius: '6px 6px 0 0',
          }} />
          <span style={{ fontFamily: 'Jost', fontSize: '0.62rem', color: '#787068' }}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

function StatTile({ value, label: l }) {
  return (
    <div style={{ ...card, padding: '1.2rem 1.4rem' }}>
      <p style={{ fontFamily: 'Jost', fontWeight: 700, fontSize: '2rem', color: OR, lineHeight: 1 }}>{value}</p>
      <p style={{ fontFamily: 'Jost', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginTop: '0.4rem' }}>{l}</p>
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

/* ─────────────────────────  Écran de connexion (PIN)  ───────────────────────── */
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
        <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '2rem', color: '#F5F0E8', marginBottom: '0.3rem' }}>
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
function Analytics({ analytics }) {
  if (!analytics) return <p style={{ color: '#B8B0A0', fontFamily: 'Jost' }}>Chargement…</p>
  const { totals, visitsByPage, daily } = analytics
  const pageData = (visitsByPage || []).map(v => ({ label: v.page, count: v.count }))
  const dayData = (daily || []).map(d => ({ label: d.date.slice(5), count: d.count }))
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile value={totals.visits} label="Visites totales" />
        <StatTile value={totals.photos} label="Photos" />
        <StatTile value={totals.testimonials} label="Témoignages" />
        <StatTile value={totals.realisations ?? 0} label="Réalisations" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div style={card}>
          <h3 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1.2rem' }}>Visites par page</h3>
          <Donut data={pageData} />
        </div>
        <div style={card}>
          <h3 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1.2rem' }}>Visites · 7 derniers jours</h3>
          <Bars data={dayData} />
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
      <form onSubmit={add} style={card}>
        <h3 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1.2rem' }}>Ajouter une photo</h3>
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
          <button type="submit" disabled={busy || !file} style={{ ...btn(), opacity: busy || !file ? 0.6 : 1 }}>
            {busy ? 'Envoi…' : 'Ajouter'}
          </button>
          {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
        </div>
      </form>

      <div>
        <p style={{ fontFamily: 'Jost', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0', marginBottom: '1rem' }}>
          Photos ajoutées ({photos.length})
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map(p => (
            <div key={p.id} className="relative overflow-hidden" style={{ borderRadius: 12, aspectRatio: '3/4', background: '#1A1A1A' }}>
              <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => remove(p)} title="Supprimer" style={{
                position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(226,123,123,0.6)', color: '#E27B7B', cursor: 'pointer', fontSize: '0.9rem',
              }}>✕</button>
              <span style={{ position: 'absolute', bottom: 6, left: 6, fontFamily: 'Jost', fontSize: '0.62rem', color: '#F5F0E8', background: 'rgba(10,10,10,0.7)', padding: '2px 8px', borderRadius: 9999 }}>{p.category}</span>
            </div>
          ))}
          {photos.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune photo ajoutée depuis le tableau de bord.</p>}
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
      <form onSubmit={add} style={card}>
        <h3 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1.2rem' }}>Ajouter un témoignage</h3>
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
        <p style={{ fontFamily: 'Jost', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8B0A0' }}>
          Témoignages ajoutés ({testimonials.length})
        </p>
        {testimonials.map(t => (
          <div key={t.id} style={{ ...card, padding: '1.2rem 1.4rem' }} className="flex items-start justify-between gap-4">
            <div>
              <p style={{ fontFamily: 'Jost', fontWeight: 600, fontSize: '0.95rem', color: '#F5F0E8' }}>{t.nom} <span style={{ color: OR, fontWeight: 400, fontSize: '0.8rem' }}>· {t.titre}</span></p>
              <p style={{ fontFamily: 'Jost', fontWeight: 300, fontSize: '0.85rem', color: '#B8B0A0', marginTop: '0.3rem', fontStyle: 'italic' }}>“{t.texte}”</p>
            </div>
            <button onClick={() => remove(t)} style={{ ...btn('transparent', '#E27B7B'), border: '1px solid rgba(226,123,123,0.5)', flexShrink: 0 }}>Supprimer</button>
          </div>
        ))}
        {testimonials.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucun témoignage ajouté depuis le tableau de bord.</p>}
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
      <form onSubmit={add} style={card}>
        <h3 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1.2rem' }}>Ajouter une réalisation</h3>
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
        {realisations.length === 0 && <p style={{ color: '#787068', fontFamily: 'Jost', fontSize: '0.85rem' }}>Aucune réalisation ajoutée depuis le tableau de bord.</p>}
      </div>
    </div>
  )
}

/* ─────────────────────────  Onglet Réglages (PIN)  ───────────────────────── */
function SettingsTab({ pin, onPinChange }) {
  const [newPin, setNewPin] = useState('')
  const [msg, setMsg] = useState('')
  const save = async (e) => {
    e.preventDefault()
    setMsg('')
    const res = await adminCall(pin, 'change_pin', { newPin })
    if (res.ok) { setMsg('Code mis à jour ✓'); onPinChange(newPin); setNewPin('') }
    else setMsg('Erreur : ' + (res.error === 'pin_too_short' ? '4 caractères minimum' : res.error))
  }
  return (
    <form onSubmit={save} style={{ ...card, maxWidth: 420 }}>
      <h3 style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#F5F0E8', marginBottom: '1.2rem' }}>Modifier le code d'accès</h3>
      <label style={label}>Nouveau code (min. 4 caractères)</label>
      <input type="password" value={newPin} autoCapitalize="none" autoCorrect="off" onChange={e => setNewPin(e.target.value)} required style={input} />
      <div className="flex items-center gap-4 mt-4">
        <button type="submit" style={btn()}>Enregistrer</button>
        {msg && <span style={{ fontFamily: 'Jost', fontSize: '0.85rem', color: msg.startsWith('Erreur') ? '#E27B7B' : OR }}>{msg}</span>}
      </div>
    </form>
  )
}

/* ─────────────────────────  Page principale  ───────────────────────── */
const TABS = ['Analytics', 'Galerie', 'Témoignages', 'Réalisations', 'Réglages']

export default function AdminPage() {
  const [pin, setPin] = useState(() => sessionStorage.getItem('sc_admin_pin') || '')
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('Analytics')
  const [data, setData] = useState({ photos: [], testimonials: [], realisations: [] })
  const [analytics, setAnalytics] = useState(null)

  const load = useCallback(async (p) => {
    const key = p || pin
    const [list, ana] = await Promise.all([
      adminCall(key, 'list'),
      adminCall(key, 'analytics'),
    ])
    if (list.ok) setData({ photos: list.photos, testimonials: list.testimonials, realisations: list.realisations || [] })
    if (ana.ok) setAnalytics(ana)
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
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Barre supérieure */}
      <div className="flex items-center justify-between px-5 lg:px-10 h-16" style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(8px)', zIndex: 20 }}>
        <p style={{ fontFamily: 'Syncopate, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#F5F0E8' }}>
          Senan <span style={{ color: OR, fontStyle: 'italic' }}>Admin</span>
        </p>
        <div className="flex items-center gap-3">
          <a href="/" style={{ fontFamily: 'Jost', fontSize: '0.82rem', color: '#B8B0A0', textDecoration: 'none' }}>Voir le site ↗</a>
          <button onClick={logout} style={btn('transparent', OR)}>Déconnexion</button>
        </div>
      </div>

      {/* Onglets */}
      <div className="px-5 lg:px-10 pt-6 flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontFamily: 'Jost', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
            padding: '0.5rem 1.2rem', borderRadius: 9999, transition: 'all 0.2s',
            border: `1px solid ${tab === t ? OR : 'rgba(201,168,76,0.2)'}`,
            background: tab === t ? OR : 'transparent', color: tab === t ? '#0A0A0A' : '#B8B0A0',
          }}>{t}</button>
        ))}
      </div>

      {/* Contenu */}
      <div className="px-5 lg:px-10 py-8 max-w-6xl">
        {tab === 'Analytics' && <Analytics analytics={analytics} />}
        {tab === 'Galerie' && <GalleryTab pin={pin} photos={data.photos} reload={() => load()} />}
        {tab === 'Témoignages' && <TestimonialsTab pin={pin} testimonials={data.testimonials} reload={() => load()} />}
        {tab === 'Réalisations' && <RealisationsTab pin={pin} realisations={data.realisations} reload={() => load()} />}
        {tab === 'Réglages' && <SettingsTab pin={pin} onPinChange={(p) => { setPin(p); sessionStorage.setItem('sc_admin_pin', p) }} />}
      </div>
    </div>
  )
}
