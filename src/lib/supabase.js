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

// Enregistre une visite de page (best-effort, silencieux en cas d'échec)
export async function trackVisit(page = 'accueil') {
  try {
    await fetch(`${FN_BASE}/track-visit`, {
      method: 'POST',
      headers: fnHeaders,
      body: JSON.stringify({ page }),
      keepalive: true,
    })
  } catch (_e) {
    // ignore
  }
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
