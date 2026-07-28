import { createClient } from '@supabase/supabase-js'

// URL et clé publique (publishable) — destinées au navigateur, non secrètes.
export const SUPABASE_URL = 'https://gangiingzqvioyygptnt.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_Mr32rTarK-S9iCdaoGp_UQ_jrCb-J4r'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const FN_BASE = `${SUPABASE_URL}/functions/v1`

const fnHeaders = {
  'Content-Type': 'application/json',
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

// Identifiant de session (visiteur) persistant
function getSessionId() {
  try {
    let id = localStorage.getItem('sc_session_id')
    if (!id) {
      id = (crypto?.randomUUID?.() || String(Date.now()) + Math.random().toString(36).slice(2))
      localStorage.setItem('sc_session_id', id)
    }
    return id
  } catch (_e) {
    return null
  }
}

function getDevice() {
  if (typeof window === 'undefined') return 'Inconnu'
  return window.innerWidth < 768 ? 'Mobile' : 'Ordinateur'
}

// Enregistre un événement (visite ou clic), best-effort
export async function trackEvent({ type = 'visit', page = 'accueil', label = null }) {
  try {
    await fetch(`${FN_BASE}/track-visit`, {
      method: 'POST',
      headers: fnHeaders,
      body: JSON.stringify({ type, page, label, device: getDevice(), session_id: getSessionId() }),
      keepalive: true,
    })
  } catch (_e) {
    // ignore
  }
}

export function trackVisit(page = 'accueil') {
  return trackEvent({ type: 'visit', page })
}

export function trackClick(label, page = 'accueil') {
  return trackEvent({ type: 'click', page, label })
}

// Appel authentifié par PIN vers la fonction "admin"
export async function adminCall(pin, action, payload = {}) {
  try {
    const res = await fetch(`${FN_BASE}/admin`, {
      method: 'POST',
      headers: fnHeaders,
      body: JSON.stringify({ pin, action, payload }),
    })
    return await res.json()
  } catch (e) {
    return { ok: false, error: String(e?.message || e) }
  }
}
