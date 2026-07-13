/*
  Barre de navigation basse (façon app mobile) : cibles tactiles larges,
  badge d'alerte sur l'onglet "Urgent" quand des aliments sont à surveiller.
*/

const ONGLETS = [
  { id: 'frigo', libelle: 'Frigo', emoji: '🧊' },
  { id: 'inventaire', libelle: 'Inventaire', emoji: '🧺' },
  { id: 'alertes', libelle: 'Urgent', emoji: '⏰' },
  { id: 'reglages', libelle: 'Réglages', emoji: '⚙️' },
]

export default function Navigation({ ongletActif, onChanger, nbAlertes }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      aria-label="Navigation principale"
    >
      <ul className="mx-auto flex max-w-2xl">
        {ONGLETS.map((onglet) => {
          const actif = ongletActif === onglet.id
          return (
            <li key={onglet.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChanger(onglet.id)}
                aria-current={actif ? 'page' : undefined}
                className={`relative flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 text-xs font-semibold ${
                  actif ? 'text-amber-600' : 'text-stone-500'
                }`}
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  {onglet.emoji}
                </span>
                {onglet.libelle}
                {onglet.id === 'alertes' && nbAlertes > 0 && (
                  <span
                    className="absolute right-1/2 top-1.5 -mr-7 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white"
                    aria-label={`${nbAlertes} aliment(s) à surveiller`}
                  >
                    {nbAlertes}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
