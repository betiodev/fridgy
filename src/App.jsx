import { useState } from 'react'
import BarreRecherche from './components/BarreRecherche.jsx'
import ChoixTypeFrigo from './components/ChoixTypeFrigo.jsx'
import ListeInventaire from './components/ListeInventaire.jsx'
import ModalAjoutLibre from './components/ModalAjoutLibre.jsx'
import ModalAliment from './components/ModalAliment.jsx'
import Navigation from './components/Navigation.jsx'
import Reglages from './components/Reglages.jsx'
import SchemaFrigo from './components/SchemaFrigo.jsx'
import VueAlertes from './components/VueAlertes.jsx'
import { nomZone } from './data/zones.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import {
  alimentsUrgents,
  CLE_INVENTAIRE,
  CLE_TYPE_FRIGO,
  creerEntree,
} from './services/inventaire.js'
import { aujourdHui, ajouterJours } from './utils/dates.js'

/*
  Composant racine : détient l'état global (inventaire + type de frigo),
  persisté en localStorage, et orchestre les vues.

  NOTE ARCHITECTURE (v2 recettes) : l'inventaire est un simple tableau
  d'entrées sérialisables ; le futur module recettes le consommera via
  src/services/inventaire.js (alimentsDisponibles / alimentsUrgents)
  sans toucher aux composants.
*/
export default function App() {
  // ── État persistant ──────────────────────────────────────────────
  const [inventaire, setInventaire] = useLocalStorage(CLE_INVENTAIRE, [])
  const [typeFrigo, setTypeFrigo] = useLocalStorage(CLE_TYPE_FRIGO, null)

  // ── État d'interface (non persistant) ────────────────────────────
  const [onglet, setOnglet] = useState('frigo')
  const [alimentOuvert, setAlimentOuvert] = useState(null) // fiche en cours d'édition
  const [saisieLibre, setSaisieLibre] = useState(null) // nom pré-rempli de l'ajout libre
  const [toast, setToast] = useState(null)

  const urgents = alimentsUrgents(inventaire)

  /** Affiche un message furtif de confirmation. */
  function notifier(message) {
    setToast(message)
    window.clearTimeout(notifier.minuteur)
    notifier.minuteur = window.setTimeout(() => setToast(null), 2600)
  }

  // ── Actions sur l'inventaire ─────────────────────────────────────

  /** Ajoute une fiche (de la base ou libre) : date d'ajout = aujourd'hui. */
  function ajouterAliment(fiche) {
    const dateAjout = aujourdHui()
    const entree = creerEntree(fiche, {
      dateAjout,
      dateLimite: ajouterJours(dateAjout, fiche.dureeJours),
    })
    setInventaire((prec) => [...prec, entree])
    notifier(`✅ ${fiche.nom} → ${nomZone(fiche.emplacement)}`)
  }

  /** Met à jour une entrée (date limite, durée, emplacement…). */
  function modifierAliment(id, changements) {
    setInventaire((prec) => prec.map((a) => (a.id === id ? { ...a, ...changements } : a)))
  }

  /** Retire une entrée (consommée ou jetée). */
  function retirerAliment(id) {
    setInventaire((prec) => prec.filter((a) => a.id !== id))
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 pb-24 pt-4">
      {/* Premier lancement : choix obligatoire du type de frigo */}
      {typeFrigo === null && <ChoixTypeFrigo onChoisir={setTypeFrigo} />}

      {/* En-tête */}
      <header className="mb-4">
        <h1 className="text-2xl font-extrabold tracking-tight">
          🥕 Fridgy
          <span className="ml-2 text-sm font-medium text-stone-500">
            mon frigo bien rangé
          </span>
        </h1>
      </header>

      {/* Barre de recherche : visible sur les onglets Frigo et Inventaire */}
      {(onglet === 'frigo' || onglet === 'inventaire') && (
        <div className="mb-4">
          <BarreRecherche
            onAjouterConnu={ajouterAliment}
            onAjouterLibre={(nom) => setSaisieLibre(nom)}
          />
        </div>
      )}

      {/* Bandeau d'alerte global (accès rapide à la vue urgente) */}
      {onglet !== 'alertes' && urgents.length > 0 && (
        <button
          type="button"
          onClick={() => setOnglet('alertes')}
          className="mb-4 flex min-h-[48px] w-full items-center gap-2 rounded-2xl border-2 border-orange-300 bg-orange-50 px-4 py-2 text-left text-sm font-semibold text-orange-800 active:bg-orange-100"
        >
          ⏰ {urgents.length} aliment{urgents.length > 1 ? 's' : ''} à consommer bientôt
          ou à jeter — voir la liste
        </button>
      )}

      {/* Contenu de l'onglet actif */}
      <main>
        {onglet === 'frigo' && typeFrigo && (
          <SchemaFrigo
            inventaire={inventaire}
            typeFrigo={typeFrigo}
            onOuvrirAliment={setAlimentOuvert}
          />
        )}

        {onglet === 'inventaire' && (
          <ListeInventaire inventaire={inventaire} onOuvrirAliment={setAlimentOuvert} />
        )}

        {onglet === 'alertes' && (
          <VueAlertes
            inventaire={inventaire}
            onOuvrirAliment={setAlimentOuvert}
            onRetirer={retirerAliment}
          />
        )}

        {onglet === 'reglages' && typeFrigo && (
          <Reglages
            typeFrigo={typeFrigo}
            onChangerType={setTypeFrigo}
            onToutReinitialiser={() => setInventaire([])}
            nbAliments={inventaire.length}
          />
        )}
      </main>

      {/* Modales */}
      {alimentOuvert && (
        <ModalAliment
          aliment={alimentOuvert}
          typeFrigo={typeFrigo ?? 'statique'}
          onModifier={modifierAliment}
          onRetirer={retirerAliment}
          onFermer={() => setAlimentOuvert(null)}
        />
      )}

      {saisieLibre !== null && (
        <ModalAjoutLibre
          nomInitial={saisieLibre}
          onAjouter={ajouterAliment}
          onFermer={() => setSaisieLibre(null)}
        />
      )}

      {/* Toast de confirmation */}
      {toast && (
        <div
          role="status"
          className="animation-apparition fixed bottom-20 left-1/2 z-40 w-max max-w-[90vw] -translate-x-1/2 rounded-full bg-stone-800 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}

      {/* Navigation basse */}
      <Navigation ongletActif={onglet} onChanger={setOnglet} nbAlertes={urgents.length} />
    </div>
  )
}
