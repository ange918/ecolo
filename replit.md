# ÉCO-MAT Portugal - Site Web Écologique

## Overview
Site web complet pour le projet ÉCO-MAT Portugal, une initiative de recyclage et d'économie circulaire. Le site présente le projet, ses objectifs, et permet aux utilisateurs de contribuer financièrement via PayPal.

## Palette de Couleurs
- **Vert nature**: #2E8B57 (vert principal)
- **Bleu océan**: #1E90FF (boutons secondaires)
- **Jaune solaire**: #FFD700 (accents)
- **Vert profond**: #1B4D3E (footer, sections sombres)
- **Fond clair**: #F8F9FA (backgrounds)
- **Texte gris**: #333333 (texte principal)
- **Vert hover**: #3CB371 (états hover)

## Polices
- **Titres**: Poppins (Google Fonts)
- **Texte**: Montserrat (Google Fonts)

## Structure du Projet
```
src/
├── main.jsx                 # Point d'entrée React
├── App.jsx                  # Router principal
├── index.css                # Styles Tailwind et globaux
├── components/
│   ├── Header.jsx          # Header avec menu burger
│   └── Footer.jsx          # Footer réutilisable
└── pages/
    ├── Home.jsx            # Page d'accueil avec slider
    ├── About.jsx           # Page À propos
    ├── Project.jsx         # Page Projet détaillé
    ├── Contribute.jsx      # Page Contribution PayPal
    └── Contact.jsx         # Page Contact avec formulaire
```

## Pages
1. **Accueil** (`/`)
   - Slider héro automatique (3 slides)
   - Section Nos Objectifs (4 cards)
   - Section À propos (résumé)
   - Section Problèmes résolus
   - Call to Action

2. **À propos** (`/about`)
   - Hero section
   - Histoire du projet (idée, mission, vision)
   - Nos objectifs
   - Avantages du projet
   - Limites reconnues
   - Solutions proposées
   - Galerie automatique (6 images)

3. **Projet** (`/project`)
   - Présentation générale
   - Problématique environnementale
   - Processus de production (4 étapes)
   - Ressources humaines (tableau)
   - Budget prévisionnel (1.2M€)
   - Calendrier de mise en œuvre

4. **Contribuer** (`/contribute`)
   - 8 paliers de contribution (50€ à 100,000€)
   - Intégration PayPal
   - Section transparence
   - Témoignages

5. **Contact** (`/contact`)
   - Informations de contact
   - Carte Google Maps (Lisbonne)
   - Formulaire de contact
   - Réseaux sociaux

## Technologies
- **Framework**: React 19.2.0 + Vite 7.1.12
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 7.9.5
- **Slider**: React Slick 0.31.0
- **Paiements**: PayPal React SDK 8.9.2
- **Animations**: Framer Motion 12.23.24

## Configuration Replit
- **Port**: 5000 (obligatoire pour webview)
- **Host**: 0.0.0.0 (binding pour proxy)
- **Build**: Vite
- **Dev Server**: Vite avec HMR

## Images Générées
10 images professionnelles générées par IA:
1. Usine écologique avec nature
2. Tri de plastiques recyclés
3. Processus industriel de tri
4. Main plantant un arbre
5. Paysage portugais
6. Équipe de recyclage
7. Équipement de lavage plastique
8. Granules plastiques recyclés
9. Production textile recyclée
10. Camion de collecte

## Déploiement
- **Type**: Autoscale (stateless)
- **Build**: `npm run build` (génère dist/)
- **Run**: `npx serve -s dist -l 5000`
- **Production**: Les images sont dans public/

## Development
```bash
npm start        # Lance Vite dev server sur port 5000
npm run build    # Build production dans dist/
npm run preview  # Preview du build
```

## Fonctionnalités
✅ Design 100% responsive (mobile, tablet, desktop)
✅ Menu burger animé sur mobile
✅ Slider automatique sur la page d'accueil
✅ Galerie automatique sur la page À propos
✅ Intégration PayPal pour les contributions
✅ Formulaire de contact fonctionnel
✅ Carte Google Maps intégrée
✅ Animations smooth (transitions CSS)
✅ SEO-friendly (meta tags, alt texts)
✅ Accessibilité (aria-labels)

## Recent Changes
- 2025-10-31: Migration et modernisation complète du projet
  - Migration de Create React App vers Vite
  - Installation et configuration de Tailwind CSS v3
  - Création de 5 pages complètes selon spécifications
  - Génération de 10 images professionnelles
  - Création des composants Header, Footer, Card, et PartnerBand
  - Remplacement de tous les emojis fonctionnels par des Boxicons
  - Intégration Boxicons pour tous les icônes fonctionnels
  - Création composant Card réutilisable avec support Boxicons
  - Création composant PartnerBand avec défilement automatique et Boxicons
  - Mise à jour des polices : Poppins (titres) et Montserrat (texte)
  - Intégration React Router
  - Intégration PayPal SDK (8 paliers de contribution)
  - Intégration Google Maps sur page Contact
  - Configuration du déploiement Autoscale
  - Tests de toutes les pages et vérification de la responsivité
