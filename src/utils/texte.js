/*
  Utilitaires de texte : recherche tolérante aux accents et à la casse.
*/

/**
 * Normalise une chaîne pour la recherche :
 * minuscules + suppression des accents (é → e, ç → c, …).
 */
export function normaliser(texte) {
  return (texte ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .trim()
}

/** Vérifie si `texte` contient `recherche` (insensible aux accents et à la casse). */
export function contient(texte, recherche) {
  return normaliser(texte).includes(normaliser(recherche))
}
