/*
  Utilitaires de dates + calcul du statut de fraîcheur.
  Toutes les dates sont stockées au format ISO court "AAAA-MM-JJ"
  (compatible avec <input type="date"> et trivial à sérialiser).
*/

// Seuil (en jours restants) sous lequel un aliment passe en "à consommer bientôt"
export const SEUIL_BIENTOT = 2

/** Date du jour au format "AAAA-MM-JJ" (heure locale). */
export function aujourdHui() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Ajoute `n` jours à une date ISO et retourne une date ISO. */
export function ajouterJours(dateISO, n) {
  const d = new Date(`${dateISO}T12:00:00`) // midi pour éviter les surprises de fuseau
  d.setDate(d.getDate() + n)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Nombre de jours entre aujourd'hui et `dateISO` (négatif si dépassée). */
export function joursRestants(dateISO) {
  const cible = new Date(`${dateISO}T12:00:00`)
  const auj = new Date(`${aujourdHui()}T12:00:00`)
  return Math.round((cible - auj) / (1000 * 60 * 60 * 24))
}

/**
 * Statut de fraîcheur d'un aliment de l'inventaire :
 * - 'ok'      → vert   : encore plusieurs jours
 * - 'bientot' → orange : ≤ SEUIL_BIENTOT jours restants
 * - 'perime'  → rouge  : date limite dépassée
 */
export function statutFraicheur(dateLimiteISO) {
  const restants = joursRestants(dateLimiteISO)
  if (restants < 0) return 'perime'
  if (restants <= SEUIL_BIENTOT) return 'bientot'
  return 'ok'
}

/** Formate une date ISO en français court, ex. "13 juil. 2026". */
export function formaterDate(dateISO) {
  return new Date(`${dateISO}T12:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** Phrase lisible sur les jours restants, ex. "encore 3 j", "dernier jour", "dépassé de 2 j". */
export function libelleJoursRestants(dateLimiteISO) {
  const restants = joursRestants(dateLimiteISO)
  if (restants > 1) return `encore ${restants} j`
  if (restants === 1) return 'encore 1 j'
  if (restants === 0) return 'dernier jour !'
  if (restants === -1) return 'dépassé d’1 j'
  return `dépassé de ${Math.abs(restants)} j`
}
