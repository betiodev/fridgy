import { useState } from 'react'
import { incompatibilites } from '../data/aliments.js'
import { TOUTES_LES_ZONES, trouverZone } from '../data/zones.js'
import { ajouterJours, formaterDate, joursRestants } from '../utils/dates.js'
import PastilleStatut from './PastilleStatut.jsx'

/*
  Fiche détaillée d'un aliment de l'inventaire (modale) :
  - zone conseillée + conseil de conservation + incompatibilités éthylène ;
  - modification de la DATE LIMITE (si la vraie date de péremption est connue)
    ou de la DURÉE de conservation (recalcule la date limite) ;
  - changement d'emplacement ;
  - bouton "Consommé / Jeté" pour retirer l'aliment.
*/
export default function ModalAliment({ aliment, typeFrigo, onModifier, onRetirer, onFermer }) {
  const [dateLimite, setDateLimite] = useState(aliment.dateLimite)
  const [emplacement, setEmplacement] = useState(aliment.emplacement)
  const zone = trouverZone(emplacement)
  const alerteEthylene = incompatibilites(aliment)

  function enregistrer() {
    onModifier(aliment.id, {
      dateLimite,
      emplacement,
      // On garde la durée cohérente avec la nouvelle date limite
      dureeJours: Math.max(0, joursRestants(dateLimite) + jourDepuisAjout()),
    })
    onFermer()
  }

  // Nombre de jours écoulés depuis l'ajout (pour recalculer la durée totale)
  function jourDepuisAjout() {
    return Math.max(0, -joursRestants(aliment.dateAjout))
  }

  /** Modifie la durée totale (en jours) → recalcule la date limite depuis la date d'ajout. */
  function changerDuree(duree) {
    const n = Number.parseInt(duree, 10)
    if (Number.isFinite(n) && n >= 0) {
      setDateLimite(ajouterJours(aliment.dateAjout, n))
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Fiche de ${aliment.nom}`}
      onClick={onFermer}
    >
      <div
        className="animation-apparition max-h-[90vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{aliment.nom}</h2>
            <p className="mt-0.5 text-xs text-stone-500">
              {aliment.categorie} · ajouté le {formaterDate(aliment.dateAjout)}
            </p>
          </div>
          <PastilleStatut dateLimite={dateLimite} />
        </header>

        {/* Recommandation de rangement */}
        <section className="mt-4 rounded-2xl bg-amber-50 p-3">
          <h3 className="text-sm font-bold text-amber-900">
            📍 Rangement conseillé : {zone?.nom}
          </h3>
          {zone && (
            <p className="mt-0.5 text-xs text-amber-800">
              {zone.temperature[typeFrigo]} — {zone.description[typeFrigo]}
            </p>
          )}
          <p className="mt-2 text-sm text-stone-700">💡 {aliment.conseil}</p>
          {alerteEthylene && (
            <p className="mt-2 rounded-xl border border-orange-300 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-800">
              ⚠️ {alerteEthylene}
            </p>
          )}
        </section>

        {/* Modification de la conservation */}
        <section className="mt-4 space-y-3">
          <div>
            <label htmlFor="date-limite" className="block text-sm font-semibold">
              Date limite (modifiez-la si l’emballage indique une vraie date)
            </label>
            <input
              id="date-limite"
              type="date"
              className="mt-1 min-h-[48px] w-full rounded-xl border-2 border-stone-200 bg-white px-3 text-base focus:border-amber-500 focus:outline-none"
              value={dateLimite}
              onChange={(e) => e.target.value && setDateLimite(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="duree" className="block text-sm font-semibold">
              Ou durée totale de conservation (jours depuis l’ajout)
            </label>
            <input
              id="duree"
              type="number"
              min="0"
              inputMode="numeric"
              className="mt-1 min-h-[48px] w-full rounded-xl border-2 border-stone-200 bg-white px-3 text-base focus:border-amber-500 focus:outline-none"
              defaultValue={aliment.dureeJours}
              onChange={(e) => changerDuree(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="emplacement" className="block text-sm font-semibold">
              Emplacement
            </label>
            <select
              id="emplacement"
              className="mt-1 min-h-[48px] w-full rounded-xl border-2 border-stone-200 bg-white px-3 text-base focus:border-amber-500 focus:outline-none"
              value={emplacement}
              onChange={(e) => setEmplacement(e.target.value)}
            >
              {TOUTES_LES_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.emoji} {z.nom}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Actions */}
        <footer className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={enregistrer}
            className="min-h-[48px] rounded-2xl bg-amber-500 px-4 font-bold text-white shadow-sm active:bg-amber-600"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={() => {
              onRetirer(aliment.id)
              onFermer()
            }}
            className="min-h-[48px] rounded-2xl border-2 border-red-200 bg-red-50 px-4 font-bold text-red-700 active:bg-red-100"
          >
            Consommé / Jeté
          </button>
          <button
            type="button"
            onClick={onFermer}
            className="min-h-[48px] rounded-2xl border-2 border-stone-200 bg-white px-4 font-semibold text-stone-600 active:bg-stone-50"
          >
            Fermer
          </button>
        </footer>
      </div>
    </div>
  )
}
