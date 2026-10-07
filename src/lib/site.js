export const SITE = {
  name: 'Senan Concept',
  email: 'contacts@senanconcept.com',
  phoneDisplay: '+229 01 61 79 16 27',
  phoneTel: '+2290161791627',
  whatsapp: 'https://wa.me/2290161791627',
  city: 'Porto-Novo, Bénin',
  cityLong: 'Porto-Novo, République du Bénin',
  hours: 'Lun – Ven · 8h – 18h',
  hoursShort: 'Lun – Ven, 8h – 18h',
  founder: 'Christelle FASSINOU',
}

export function openMailto({ subject, body }) {
  const url = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = url
}
