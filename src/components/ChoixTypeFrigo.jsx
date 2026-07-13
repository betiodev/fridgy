import { TYPES_FRIGO } from '../data/zones.js'

/*
  Choix du type de frigo — affiché en modale au PREMIER lancement,
  et réutilisé dans les réglages (prop `enModale` à false).
  Le type choisi adapte toutes les légendes de température et les conseils de zone.
*/

const OPTIONS = [
  {
    valeur: TYPES_FRIGO.STATIQUE,
    titre: 'Froid statique',
    emoji: '🌡️',
    description:
      'Frigo classique : la température varie selon les zones. Le compartiment le plus froid est en haut, la porte est la zone la plus chaude.',
  },
  {
    valeur: TYPES_FRIGO.VENTILE,
    titre: 'Froid ventilé / brassé',
    emoji: '💨',
    description:
      'Température homogène (~4 °C partout). Le rangement dépend surtout de l’hygiène et de la séparation cru / cuit.',
  },
]

export function SelecteurTypeFrigo({ typeFrigo, onChoisir }) {
  return (
    <div className="space-y-2" role="radiogroup" aria-label="Type de réfrigérateur">
      {OPTIONS.map((option) => {
        const actif = typeFrigo === option.valeur
        return (
          <button
            key={option.valeur}
            type="button"
            role="radio"
            aria-checked={actif}
            onClick={() => onChoisir(option.valeur)}
            className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${
              actif
                ? 'border-amber-500 bg-amber-50'
                : 'border-stone-200 bg-white active:bg-stone-50'
            }`}
          >
            <span className="flex items-center gap-2 font-bold">
              <span aria-hidden="true" className="text-xl">{option.emoji}</span>
              {option.titre}
              {actif && <span className="ml-auto text-amber-600">✓</span>}
            </span>
            <span className="mt-1 block text-sm text-stone-600">{option.description}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Modale de premier lancement : bloque l'accès tant qu'un type n'est pas choisi. */
export default function ChoixTypeFrigo({ onChoisir }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choix du type de réfrigérateur"
    >
      <div className="animation-apparition w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold">👋 Bienvenue dans Fridgy !</h1>
        <p className="mt-2 text-stone-600">
          Pour vous donner les bons conseils de rangement, indiquez le type de votre
          réfrigérateur. Vous pourrez le modifier à tout moment dans les réglages.
        </p>
        <div className="mt-4">
          <SelecteurTypeFrigo typeFrigo={null} onChoisir={onChoisir} />
        </div>
      </div>
    </div>
  )
}
