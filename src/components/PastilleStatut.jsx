import { libelleJoursRestants, statutFraicheur } from '../utils/dates.js'

/*
  Pastille de statut de fraîcheur d'un aliment :
  vert = OK, orange = à consommer bientôt, rouge = périmé / à jeter.
*/

// Styles et libellés par statut, centralisés pour toute l'application
export const STYLES_STATUT = {
  ok: {
    libelle: 'OK',
    pastille: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    point: 'bg-emerald-500',
  },
  bientot: {
    libelle: 'À consommer bientôt',
    pastille: 'bg-orange-100 text-orange-800 border-orange-300',
    point: 'bg-orange-500',
  },
  perime: {
    libelle: 'Périmé — à jeter',
    pastille: 'bg-red-100 text-red-800 border-red-300',
    point: 'bg-red-500',
  },
}

export default function PastilleStatut({ dateLimite, detaille = false }) {
  const statut = statutFraicheur(dateLimite)
  const style = STYLES_STATUT[statut]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style.pastille}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${style.point}`} />
      {detaille ? `${style.libelle} · ${libelleJoursRestants(dateLimite)}` : libelleJoursRestants(dateLimite)}
    </span>
  )
}
