import { useEffect, useState } from 'react'

/*
  Hook de persistance : synchronise un état React avec localStorage.
  Toute l'application repose dessus (inventaire + type de frigo),
  ce qui garantit que les données survivent au rechargement de la page.
*/
export function useLocalStorage(cle, valeurInitiale) {
  const [valeur, setValeur] = useState(() => {
    try {
      const brut = window.localStorage.getItem(cle)
      return brut !== null ? JSON.parse(brut) : valeurInitiale
    } catch {
      // Donnée corrompue ou stockage indisponible : on repart de la valeur initiale
      return valeurInitiale
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(cle, JSON.stringify(valeur))
    } catch {
      // Stockage plein ou indisponible : l'app continue de fonctionner en mémoire
    }
  }, [cle, valeur])

  return [valeur, setValeur]
}
