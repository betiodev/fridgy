import { SelecteurTypeFrigo } from './ChoixTypeFrigo.jsx'

/*
  Réglages :
  - changement du type de frigo (adapte tous les conseils de zone) ;
  - réinitialisation complète de l'inventaire (avec confirmation).
*/
export default function Reglages({ typeFrigo, onChangerType, onToutReinitialiser, nbAliments }) {
  function confirmerReinitialisation() {
    const ok = window.confirm(
      `Supprimer les ${nbAliments} aliment(s) de votre inventaire ? Cette action est définitive.`,
    )
    if (ok) onToutReinitialiser()
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-2 text-lg font-bold">🧊 Type de réfrigérateur</h2>
        <p className="mb-3 text-sm text-stone-600">
          Ce réglage adapte les légendes de température et les conseils de rangement.
        </p>
        <SelecteurTypeFrigo typeFrigo={typeFrigo} onChoisir={onChangerType} />
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">🧹 Données</h2>
        <button
          type="button"
          onClick={confirmerReinitialisation}
          disabled={nbAliments === 0}
          className="min-h-[48px] w-full rounded-2xl border-2 border-red-200 bg-red-50 px-4 font-bold text-red-700 active:bg-red-100 disabled:opacity-40"
        >
          Tout réinitialiser ({nbAliments} aliment{nbAliments > 1 ? 's' : ''})
        </button>
        <p className="mt-2 text-xs text-stone-500">
          Vos données sont stockées uniquement sur cet appareil (localStorage), rien
          n’est envoyé sur Internet.
        </p>
      </section>

      <section className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-4 text-sm text-stone-500">
        <h2 className="font-bold text-stone-600">🍳 Bientôt : suggestions de recettes</h2>
        <p className="mt-1">
          En v2, Fridgy vous proposera des recettes à partir des aliments de votre
          inventaire, en priorité ceux à consommer rapidement.
        </p>
      </section>
    </div>
  )
}
