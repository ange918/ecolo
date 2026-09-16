// Données de repli (utilisées si Supabase est vide/indisponible).
// Le contenu réel est géré depuis le tableau de bord (/andychris) → onglet Galeries.

export const FALLBACK_COLLECTIONS = [
  {
    slug: 'vodun-days',
    titre: 'Vodun Days',
    tag: 'Cérémonie spirituelle',
    cover_url: '/gallery/vodun/cover.jpg',
    description:
      "Célébration internationale des religions endogènes et de la spiritualité vodun à Ouidah. Senan Concept y signe parures et tenues cérémonielles qui honorent le sacré.",
  },
  {
    slug: 'festival-des-masques',
    titre: 'Festival des Masques',
    tag: 'Festival culturel',
    cover_url: '/gallery/img5.jpg',
    description:
      "Grand rendez-vous des masques sacrés et des traditions rituelles du Bénin. Nous habillons les participants de costumes qui racontent une histoire.",
  },
  {
    slug: 'gaani',
    titre: 'Gaani',
    tag: 'Fête traditionnelle',
    cover_url: '/gallery/img20.jpg',
    description:
      "La Gaani, fête emblématique du royaume de Nikki (Borgou), rythmée par les cavaliers et les parures royales. Créations et ornements dédiés à l'éclat de l'événement.",
  },
  {
    slug: 'trone-de-behanzin',
    titre: 'Trône de Béhanzin',
    tag: 'Comédie musicale',
    cover_url: '/gallery/img16.jpg',
    description:
      "Hommage au roi Béhanzin du Dahomey : costumes et décors de scène pour une production célébrant la mémoire royale.",
  },
  {
    slug: 'collaborations-diverses',
    titre: 'Collaborations diverses',
    tag: 'Sur mesure',
    cover_url: '/gallery/img17.jpg',
    description:
      "Créations hors festivals : tenues et accessoires pour artistes, personnalités et clients particuliers. Un mélange de projets sur mesure.",
  },
]

// Quelques photos de repli par événement (placeholders, en attendant l'upload réel)
export const FALLBACK_PHOTOS = {
  'vodun-days': ['/gallery/vodun/1.jpg', '/gallery/vodun/2.jpg', '/gallery/vodun/3.jpg', '/gallery/vodun/4.jpg', '/gallery/vodun/5.jpg', '/gallery/vodun/6.jpg', '/gallery/vodun/7.jpg'],
  'festival-des-masques': ['/gallery/img5.jpg', '/gallery/img1.jpg', '/gallery/img2.jpg', '/gallery/img20.jpg'],
  'gaani': ['/gallery/img20.jpg', '/gallery/img1.jpg', '/gallery/img5.jpg', '/gallery/img2.jpg'],
  'trone-de-behanzin': ['/gallery/img16.jpg', '/gallery/img17.jpg', '/gallery/img15.jpg', '/gallery/img6.jpg'],
  'collaborations-diverses': ['/gallery/img9.jpg', '/gallery/img12.jpg', '/gallery/img13.jpg', '/gallery/img14.jpg', '/gallery/img19.jpg'],
}
