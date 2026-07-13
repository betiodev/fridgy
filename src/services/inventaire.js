/*
  SERVICE INVENTAIRE — point d'accès "métier" à l'inventaire de l'utilisateur.

  C'est ICI que le futur module de suggestions de recettes (v2) viendra se
  brancher : il n'a besoin que de la liste des aliments disponibles, exposée
  proprement par les fonctions ci-dessous, sans dépendre des composants React.
*/

import { statutFraicheur } from '../utils/dates.js'

// Clés localStorage centralisées (utilisées par App.jsx via useLocalStorage)
export const CLE_INVENTAIRE = 'fridgy.inventaire'
export const CLE_TYPE_FRIGO = 'fridgy.typeFrigo'

/**
 * Crée une entrée d'inventaire à partir d'une fiche aliment (base ou saisie libre).
 * La date d'ajout est automatiquement la date du jour, et la date limite est
 * calculée à partir de la durée de conservation estimée.
 */
export function creerEntree(fiche, { dateAjout, dateLimite }) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nom: fiche.nom,
    categorie: fiche.categorie,
    emplacement: fiche.emplacement,
    conseil: fiche.conseil,
    dureeJours: fiche.dureeJours,
    ethylene: fiche.ethylene ?? null,
    dateAjout,
    dateLimite,
  }
}

/**
 * Retourne les aliments encore consommables de l'inventaire (statut vert ou orange).
 * C'est la fonction que le module recettes v2 utilisera comme source de vérité.
 */
export function alimentsDisponibles(inventaire) {
  return inventaire.filter((a) => statutFraicheur(a.dateLimite) !== 'perime')
}

/**
 * Retourne les aliments urgents (orange + rouge), triés du plus urgent au moins urgent.
 * Utilisé par la vue "À consommer bientôt / À jeter".
 */
export function alimentsUrgents(inventaire) {
  return inventaire
    .filter((a) => statutFraicheur(a.dateLimite) !== 'ok')
    .sort((a, b) => a.dateLimite.localeCompare(b.dateLimite))
}

/*
  ────────────────────────────────────────────────────────────────────
  TODO v2 — MODULE DE SUGGESTIONS DE RECETTES
  ────────────────────────────────────────────────────────────────────
  Emplacement prévu pour la v2. Signature envisagée :

    export function suggererRecettes(inventaire) {
      const disponibles = alimentsDisponibles(inventaire)
      // Croiser `disponibles` (noms + catégories) avec une base de recettes
      // (ex. src/data/recettes.js) et prioriser les aliments urgents
      // (alimentsUrgents) pour lutter contre le gaspillage.
    }

  La structure des entrées d'inventaire (nom, categorie, dateLimite, …)
  et la base src/data/aliments.js sont déjà pensées pour ça.
  ────────────────────────────────────────────────────────────────────
*/
