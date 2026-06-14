import { useState } from 'react'
import { motion } from 'framer-motion'

const contactInfos = [
  { label: 'Localisation', value: 'Cotonou, Bénin' },
  { label: 'Email', value: 'contact@senanconcept.com' },
  { label: 'Téléphone', value: '+229 XX XX XX XX' },
  { label: 'Disponibilité', value: 'Lun – Ven, 8h – 18h' },
]

const inputStyle = {
  display: 'block',
  width: '100%',
  background: 'transparent',
  borderBottom: '1px solid rgba(201,168,76,0.25)',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  padding: '0.7rem 0',
  color: '#F5F0E8',
  fontFamily: 'Jost, sans-serif',
  fontWeight: 300,
  fontSize: '0.9rem',
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontSize: '0.68rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#C9A84C',
  marginBottom: '0.5rem',
  fontFamily: 'Jost, sans-serif',
}

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', type: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Demande envoyée :', form)
    setSent(true)
    setForm({ nom: '', email: '', type: '', message: '' })
  }

  const focusStyle = (field) => ({
    ...inputStyle,
    borderBottomColor: focused === field ? '#C9A84C' : 'rgba(201,168,76,0.25)',
    transition: 'border-color 0.3s ease',
  })

  return (
    <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Colonne gauche */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="section-label">Travaillons ensemble</p>
          <h2
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F5F0E8', lineHeight: 1.15 }}
          >
            Concrétisez<br />votre projet
          </h2>
          <div className="divider" />
          <p
            className="mb-10"
            style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#B8B0A0', lineHeight: 1.9 }}
          >
            Que vous rêviez d'un costume d'exception, d'un espace décoré avec âme ou d'un pouf artisanal unique, nous sommes à votre écoute pour donner vie à votre vision.
          </p>

          <div className="space-y-6">
            {contactInfos.map((info, i) => (
              <div key={i} className="flex items-start gap-4">
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C', marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.2rem' }}>
                    {info.label}
                  </p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#F5F0E8' }}>
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Colonne droite — Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          {sent ? (
            <div className="flex flex-col items-start justify-center h-full gap-4">
              <div style={{ width: '40px', height: '1px', background: '#C9A84C' }} />
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: '2rem', color: '#F5F0E8' }}>
                Message envoyé
              </p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '0.9rem', color: '#B8B0A0', lineHeight: 1.8 }}>
                Merci pour votre demande. Nous vous répondrons dans les meilleurs délais.
              </p>
              <button
                onClick={() => setSent(false)}
                style={{ marginTop: '1rem', color: '#C9A84C', fontFamily: 'Jost', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Envoyer une autre demande →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <label style={labelStyle}>Votre nom</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  onFocus={() => setFocused('nom')}
                  onBlur={() => setFocused('')}
                  required
                  style={focusStyle('nom')}
                  placeholder=""
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  required
                  style={focusStyle('email')}
                />
              </div>
              <div>
                <label style={labelStyle}>Type de projet</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  onFocus={() => setFocused('type')}
                  onBlur={() => setFocused('')}
                  required
                  style={{ ...focusStyle('type'), appearance: 'none', WebkitAppearance: 'none' }}
                >
                  <option value="" style={{ background: '#0A0A0A' }}>— Sélectionner —</option>
                  <option value="tenue" style={{ background: '#0A0A0A' }}>Tenue artistique</option>
                  <option value="deco" style={{ background: '#0A0A0A' }}>Décoration d'intérieure</option>
                  <option value="pouf" style={{ background: '#0A0A0A' }}>Réalisation de poufs</option>
                  <option value="festival" style={{ background: '#0A0A0A' }}>Événement & Festival</option>
                  <option value="autre" style={{ background: '#0A0A0A' }}>Autre</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  required
                  rows={4}
                  style={{ ...focusStyle('message'), resize: 'none' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: '#C9A84C',
                  color: '#0A0A0A',
                  padding: '0.9rem',
                  width: '100%',
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8D5A0' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C' }}
              >
                Envoyer ma demande
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}
