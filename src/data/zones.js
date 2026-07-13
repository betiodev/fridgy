/*
  Définition des zones de rangement.
  Chaque zone a une description et une température qui dépendent du TYPE de frigo :
  - "statique" : froid statique classique → zones de température différenciées
    (le plus froid en haut, la porte est la zone la plus chaude).
  - "ventile"  : froid ventilé / brassé → température homogène (~4 °C partout),
    le rangement dépend surtout de l'hygiène et de la séparation cru / cuit.
*/

export const TYPES_FRIGO = {
  STATIQUE: 'statique',
  VENTILE: 'ventile',
}

export const LIBELLES_TYPE_FRIGO = {
  [TYPES_FRIGO.STATIQUE]: 'Froid statique',
  [TYPES_FRIGO.VENTILE]: 'Froid ventilé / brassé',
}

// Identifiants des emplacements (utilisés dans la base d'aliments et l'inventaire)
export const EMPLACEMENTS = {
  HAUT: 'haut',
  MILIEU: 'milieu',
  BAS: 'bas',
  BAC: 'bac',
  PORTE: 'porte',
  PLACARD: 'placard',
  AMBIANT: 'ambiant',
  CONGELATEUR: 'congelateur',
}

// Zones situées DANS le réfrigérateur (ordre d'affichage = de haut en bas)
export const ZONES_FRIGO = [
  {
    id: EMPLACEMENTS.HAUT,
    nom: 'Étagère du haut',
    emoji: '🥩',
    couleur: 'bg-sky-100 border-sky-300',
    temperature: {
      statique: '0–4 °C (la plus froide)',
      ventile: '≈ 4 °C',
    },
    description: {
      statique:
        'Zone la plus froide : viandes et poissons crus, charcuterie, produits très périssables, décongélation en cours.',
      ventile:
        'Température homogène : réservez cette étagère aux viandes et poissons crus, bien emballés, jamais au-dessus d’aliments prêts à consommer.',
    },
  },
  {
    id: EMPLACEMENTS.MILIEU,
    nom: 'Étagère du milieu',
    emoji: '🧀',
    couleur: 'bg-blue-50 border-blue-200',
    temperature: {
      statique: '4–6 °C',
      ventile: '≈ 4 °C',
    },
    description: {
      statique:
        'Produits laitiers : yaourts, fromages frais, crèmes, desserts lactés.',
      ventile:
        'Produits laitiers et desserts. Gardez les produits entamés bien fermés.',
    },
  },
  {
    id: EMPLACEMENTS.BAS,
    nom: 'Étagère du bas',
    emoji: '🍲',
    couleur: 'bg-indigo-50 border-indigo-200',
    temperature: {
      statique: '4–6 °C',
      ventile: '≈ 4 °C',
    },
    description: {
      statique:
        'Viandes et poissons cuits, plats préparés, restes couverts, pâtisseries.',
      ventile:
        'Plats cuisinés et restes couverts, toujours séparés des produits crus (jamais en dessous d’eux).',
    },
  },
  {
    id: EMPLACEMENTS.BAC,
    nom: 'Bac à légumes',
    emoji: '🥕',
    couleur: 'bg-emerald-50 border-emerald-300',
    temperature: {
      statique: '8–10 °C',
      ventile: '≈ 4–6 °C',
    },
    description: {
      statique:
        'Fruits et légumes qui supportent le froid. Séparez les producteurs d’éthylène des végétaux sensibles.',
      ventile:
        'Fruits et légumes. Le froid ventilé assèche : emballez-les ou utilisez la zone hygro si présente.',
    },
  },
  {
    id: EMPLACEMENTS.PORTE,
    nom: 'Porte',
    emoji: '🧴',
    couleur: 'bg-amber-50 border-amber-300',
    temperature: {
      statique: '6–8 °C (la plus chaude)',
      ventile: '≈ 6 °C (légèrement plus chaude)',
    },
    description: {
      statique:
        'Zone la plus chaude : œufs, beurre, boissons, sauces, condiments, jus ouverts.',
      ventile:
        'Œufs, beurre, boissons, condiments. La porte reste la zone la plus exposée aux ouvertures.',
    },
  },
]

// Zones HORS du réfrigérateur
export const ZONES_HORS_FRIGO = [
  {
    id: EMPLACEMENTS.PLACARD,
    nom: 'Placard',
    emoji: '🚪',
    couleur: 'bg-orange-50 border-orange-300',
    temperature: { statique: 'Sombre, sec, aéré', ventile: 'Sombre, sec, aéré' },
    description: {
      statique:
        'Pommes de terre, oignons, ail (séparés les uns des autres), épicerie sèche, conserves, huiles.',
      ventile:
        'Pommes de terre, oignons, ail (séparés les uns des autres), épicerie sèche, conserves, huiles.',
    },
  },
  {
    id: EMPLACEMENTS.AMBIANT,
    nom: 'Température ambiante',
    emoji: '🧺',
    couleur: 'bg-yellow-50 border-yellow-300',
    temperature: { statique: '18–22 °C (corbeille)', ventile: '18–22 °C (corbeille)' },
    description: {
      statique:
        'Tomates, bananes, avocats non mûrs, agrumes, pain, basilic : le froid dégrade leur goût ou leur texture.',
      ventile:
        'Tomates, bananes, avocats non mûrs, agrumes, pain, basilic : le froid dégrade leur goût ou leur texture.',
    },
  },
  {
    id: EMPLACEMENTS.CONGELATEUR,
    nom: 'Congélateur',
    emoji: '❄️',
    couleur: 'bg-cyan-50 border-cyan-300',
    temperature: { statique: '−18 °C', ventile: '−18 °C' },
    description: {
      statique: 'Surgelés et aliments congelés. Ne jamais recongeler un produit décongelé.',
      ventile: 'Surgelés et aliments congelés. Ne jamais recongeler un produit décongelé.',
    },
  },
]

// Toutes les zones (frigo + hors frigo), pratique pour les listes déroulantes
export const TOUTES_LES_ZONES = [...ZONES_FRIGO, ...ZONES_HORS_FRIGO]

/** Retourne l'objet zone correspondant à un identifiant d'emplacement. */
export function trouverZone(idEmplacement) {
  return TOUTES_LES_ZONES.find((zone) => zone.id === idEmplacement) ?? null
}

/** Nom lisible d'un emplacement (ex. "Bac à légumes"). */
export function nomZone(idEmplacement) {
  return trouverZone(idEmplacement)?.nom ?? 'Emplacement inconnu'
}
