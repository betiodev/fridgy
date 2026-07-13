import { nomZone } from '../data/zones.js'
import { formaterDate } from '../utils/dates.js'
import PastilleStatut from './PastilleStatut.jsx'

/*
  Liste d'inventaire : tous les aliments possédés, avec leur statut de
  fraîcheur, leur zone de rangement et leur date limite.
  Un appui sur une ligne ouvre la fiche détaillée (modification / retrait).
*/
export default function ListeInventaire({ inventaire, onOuvrirAliment }) {
  if (inventaire.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-stone-300 bg-white/60 p-6 text-center text-stone-500">
        <p className="text-3xl" aria-hidden="true">🧺</p>
        <p className="mt-2 font-medium">Votre inventaire est vide.</p>
        <p className="mt-1 text-sm">
          Utilisez la barre de recherche ci-dessus pour ajouter vos premiers aliments.
        </p>
      </div>
    )
  }

  // Tri : les plus urgents d'abord (date limite la plus proche)
  const tries = [...inventaire].sort((a, b) => a.dateLimite.localeCompare(b.dateLimite))

  return (
    <ul className="space-y-2">
      {tries.map((aliment) => (
        <li key={aliment.id}>
          <button
            type="button"
            onClick={() => onOuvrirAliment(aliment)}
            className="w-full rounded-2xl border border-stone-200 bg-white p-3 text-left shadow-sm active:bg-stone-50"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{aliment.nom}</span>
              <PastilleStatut dateLimite={aliment.dateLimite} />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
              <span>📍 {nomZone(aliment.emplacement)}</span>
              <span>🗓️ limite : {formaterDate(aliment.dateLimite)}</span>
              <span>➕ ajouté le {formaterDate(aliment.dateAjout)}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
