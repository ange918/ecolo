# Senan Concept — Site Vitrine

## Overview
Site vitrine professionnel pour **Senan Concept**, maison artisanale basée à Cotonou (Bénin) spécialisée en tenues artistiques, décoration d'intérieure et fabrication de poufs artisanaux.

## Palette de Couleurs
- **Or** : `#C9A84C`
- **Or clair** : `#E8D5A0`
- **Or pâle** : `#F5EDD8`
- **Noir profond** : `#0A0A0A`
- **Noir 2** : `#111111`
- **Noir 3** : `#1A1A1A`
- **Blanc cassé** : `#F5F0E8`
- **Texte** : `#B8B0A0`

## Typographie
- **Titres** : Cormorant Garamond (Google Fonts) — poids 300 et 600
- **Corps** : Jost (Google Fonts) — poids 300, 400, 500

## Structure du Projet
```
src/
├── App.jsx
├── main.jsx
├── index.css
└── components/
    ├── Navbar.jsx       # Navbar fixe avec scroll effect
    ├── Hero.jsx         # Section héro plein écran
    ├── About.jsx        # Identité + stats
    ├── Services.jsx     # 3 domaines de création
    ├── Realisations.jsx # Portfolio (Béhanzin, Masques, Vodouns)
    ├── Contact.jsx      # Formulaire + infos contact
    └── Footer.jsx       # Footer minimal
```

## Technologies
- **Framework** : React 19 + Vite 7
- **Styling** : Tailwind CSS 3.4 (couleurs personnalisées)
- **Animations** : Framer Motion
- **Navigation** : React Scroll (scroll fluide vers ancres)
- **Icônes** : SVG inline + Lucide React

## Configuration
- **Port** : 5000
- **Host** : 0.0.0.0

## Développement
```bash
npm start    # Lance le dev server sur port 5000
npm run build  # Build production
```

## User Preferences
- Texte en français
- Aucune librairie UI externe (pas Shadcn, pas MUI)
- SVG inline pour les visuels placeholder (pas d'images externes)
- Design sombre avec accents dorés
