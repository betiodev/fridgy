import { ZONES_FRIGO, ZONES_HORS_FRIGO } from '../data/zones.js'
import { statutFraicheur } from '../utils/dates.js'
import { STYLES_STATUT } from './PastilleStatut.jsx'

/*
  Schéma visuel du frigo découpé en zones + zones "hors frigo"
  (placard, température ambiante, congélateur).
  - La légende de température s'adapte au type de frigo (statique / ventilé).
  - Les aliments de l'inventaire apparaissent en badges dans leur zone.
  - Un avertissement s'affiche si des producteurs d'éthylène côtoient des
    aliments sensibles dans la même zone.
*/

/** Badge d'un aliment dans une zone (cliquable pour ouvrir sa fiche). */
function BadgeAliment({ aliment, onOuvrir }) {
  const style = STYLES_STATUT[statutFraicheur(aliment.dateLimite)]
  return (
    <button
      type="button"
      onClick={() => onOuvrir(aliment)}
      className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border bg-white/80 px-3 py-1.5 text-sm font-medium shadow-sm active:scale-95 ${style.pastille}`}
    >
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${style.point}`} />
      {aliment.nom}
    </button>
  )
}

/** Une zone du schéma : en-tête (nom + température) + badges des aliments. */
function Zone({ zone, typeFrigo, aliments, onOuvrir }) {
  // Détection d'un conflit éthylène DANS cette zone
  const producteurs = aliments.filter((a) => a.ethylene === 'producteur')
  const sensibles = aliments.filter((a) => a.ethylene === 'sensible')
  const conflit = producteurs.length > 0 && sensibles.length > 0

  return (
    <section className={`rounded-2xl border-2 p-3 ${zone.couleur}`}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-2">
        <h3 className="font-bold">
          <span aria-hidden="true" className="mr-1">{zone.emoji}</span>
          {zone.nom}
        </h3>
        <span className="text-xs font-semibold text-stone-500">
          {zone.temperature[typeFrigo]}
        </span>
      </header>
      <p className="mt-1 text-xs leading-relaxed text-stone-600">
        {zone.description[typeFrigo]}
      </p>

      {conflit && (
        <p
          role="alert"
          className="mt-2 rounded-xl border border-orange-300 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-800"
        >
          ⚠️ Éloignez {producteurs.map((a) => a.nom).join(', ')} (éthylène) de{' '}
          {sensibles.map((a) => a.nom).join(', ')} : ils se dégraderaient plus vite.
        </p>
      )}

      {aliments.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {aliments.map((a) => (
            <li key={a.id}>
              <BadgeAliment aliment={a} onOuvrir={onOuvrir} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function SchemaFrigo({ inventaire, typeFrigo, onOuvrirAliment }) {
  // Regroupe les aliments de l'inventaire par emplacement
  const parZone = (idZone) => inventaire.filter((a) => a.emplacement === idZone)

  return (
    <div className="space-y-4">
      {/* Le frigo lui-même : zones empilées de haut en bas comme dans la réalité */}
      <div className="rounded-3xl border-4 border-stone-300 bg-white p-3 shadow-md">
        <h2 className="mb-2 px-1 text-lg font-bold">
          🧊 Mon frigo
          <span className="ml-2 align-middle text-xs font-semibold text-stone-500">
            {typeFrigo === 'statique' ? 'froid statique' : 'froid ventilé'}
          </span>
        </h2>
        <div className="space-y-2">
          {ZONES_FRIGO.map((zone) => (
            <Zone
              key={zone.id}
              zone={zone}
              typeFrigo={typeFrigo}
              aliments={parZone(zone.id)}
              onOuvrir={onOuvrirAliment}
            />
          ))}
        </div>
      </div>

      {/* Zones hors frigo */}
      <div>
        <h2 className="mb-2 px-1 text-lg font-bold">🏠 Hors du frigo</h2>
        <div className="space-y-2">
          {ZONES_HORS_FRIGO.map((zone) => (
            <Zone
              key={zone.id}
              zone={zone}
              typeFrigo={typeFrigo}
              aliments={parZone(zone.id)}
              onOuvrir={onOuvrirAliment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
