// Textes réels de la maison — repris du site et des composants existants.
export const CREATIONS = [
  {
    id: 'tenues',
    num: '01',
    titre: 'Tenues artistiques',
    short: 'Costumes royaux, tenues de cérémonie et créations scéniques en matières nobles.',
    desc: 'Costumes royaux, tenues de cérémonie et créations scéniques conçus avec des matières nobles et un soin du détail exceptionnel. Chaque pièce est une œuvre unique, façonnée à la main.',
    img: '/gallery/img17.jpg',
    alt: 'Tenue artistique Senan Concept',
    tags: ['Sur-mesure', 'Essayage', 'Finitions'],
    href: '/services#tenues',
  },
  {
    id: 'decoration',
    num: '02',
    titre: "Décoration d'intérieure",
    short: "Espaces réinventés avec des pièces artisanales à l'esthétique africaine contemporaine.",
    desc: "Des espaces réinventés avec des pièces artisanales uniques, alliant l'esthétique africaine contemporaine à une élégance intemporelle.",
    img: '/gallery/img12.jpg',
    alt: 'Décoration et accessoires Senan Concept',
    tags: ['Conseil', 'Création', 'Installation'],
    href: '/services#decoration',
  },
  {
    id: 'formations',
    num: '03',
    titre: 'Formations',
    short: 'Transmission du savoir-faire artisanal béninois — mode, accessoires, décoration.',
    desc: "Formations professionnelles dans nos domaines d'intervention : mode africaine, accessoires, décoration. Un centre de formation pour transmettre et perpétuer l'excellence du savoir-faire béninois.",
    img: '/gallery/img10.jpg',
    alt: 'Savoir-faire artisanal Senan Concept',
    tags: ['Mode africaine', 'Accessoires', 'Décoration'],
    href: '/formation',
  },
  {
    id: 'evenements',
    num: '04',
    titre: "Décors d'événements",
    short: 'Scénographies immersives pour festivals, cérémonies et célébrations sacrées.',
    desc: "Des scénographies immersives pour festivals, cérémonies royales, productions scéniques et célébrations sacrées. De la conception à l'installation.",
    img: '/gallery/img5.jpg',
    alt: "Décor d'événement Senan Concept",
    tags: ['Direction artistique', 'Production'],
    href: '/services#evenements',
  },
]

export const DOMAINES = CREATIONS.slice(0, 3)

export const FORMATION_PARCOURS = [
  { id: 'mode', label: 'Mode africaine' },
  { id: 'accessoires', label: 'Accessoires' },
  { id: 'decoration', label: 'Décoration' },
  { id: 'complet', label: 'Les trois domaines' },
]
