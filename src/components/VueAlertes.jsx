import { alimentsUrgents } from '../services/inventaire.js'
import { nomZone } from '../data/zones.js'
import { formaterDate, statutFraicheur } from '../utils/dates.js'
import PastilleStatut from './PastilleStatut.jsx'

/*
  Vue "À consommer bientôt / À jeter" :
  regroupe les aliments orange (bientôt) et rouges (périmés),
  triés du plus urgent au moins urgent, avec un bouton de retrait rapide.
*/
export default function VueAlertes({ inventaire, onOuvrirAliment, onRetirer }) {
  const urgents = alimentsUrgents(inventaire)
  const perimes = urgents.filter((a) => statutFraicheur(a.dateLimite) === 'perime')
  const bientot = urgents.filter((a) => statutFraicheur(a.dateLimite) === 'bientot')

  if (urgents.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-3xl" aria-hidden="true">✅</p>
        <p className="mt-2 font-semibold text-emerald-800">Tout va bien !</p>
        <p className="mt-1 text-sm text-emerald-700">
          Aucun aliment à consommer d’urgence ni à jeter.
        </p>
      </div>
    )
  }

  function Ligne({ aliment }) {
    return (
      <li className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => onOuvrirAliment(aliment)}
          className="min-h-[56px] flex-1 rounded-2xl border border-stone-200 bg-white p-3 text-left shadow-sm active:bg-stone-50"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">{aliment.nom}</span>
            <PastilleStatut dateLimite={aliment.dateLimite} />
          </div>
          <p className="mt-1 text-xs text-stone-500">
            📍 {nomZone(aliment.emplacement)} · limite : {formaterDate(aliment.dateLimite)}
          </p>
        </button>
        <button
          type="button"
          onClick={() => onRetirer(aliment.id)}
          className="min-w-[56px] rounded-2xl border border-stone-200 bg-white text-xs font-semibold text-stone-600 shadow-sm active:bg-stone-100"
          aria-label={`Retirer ${aliment.nom} (consommé ou jeté)`}
        >
          Retirer
        </button>
      </li>
    )
  }

  return (
    <div className="space-y-5">
      {perimes.length > 0 && (
        <section>
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-red-700">
            🗑️ À jeter ({perimes.length})
          </h2>
          <ul className="space-y-2">
            {perimes.map((a) => (
              <Ligne key={a.id} aliment={a} />
            ))}
          </ul>
        </section>
      )}

      {bientot.length > 0 && (
        <section>
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-orange-700">
            ⏳ À consommer bientôt ({bientot.length})
          </h2>
          <ul className="space-y-2">
            {bientot.map((a) => (
              <Ligne key={a.id} aliment={a} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
