import { useState } from 'react'
import { CATEGORIES } from '../data/aliments.js'
import { EMPLACEMENTS, TOUTES_LES_ZONES } from '../data/zones.js'

/*
  Modale d'ajout LIBRE : pour un aliment absent de la base.
  On propose un emplacement et une durée de conservation par défaut,
  que l'utilisateur peut corriger avant de valider.
*/

// Valeurs par défaut prudentes pour un aliment inconnu
const EMPLACEMENT_DEFAUT = EMPLACEMENTS.MILIEU
const DUREE_DEFAUT = 5

export default function ModalAjoutLibre({ nomInitial, onAjouter, onFermer }) {
  const [nom, setNom] = useState(nomInitial)
  const [emplacement, setEmplacement] = useState(EMPLACEMENT_DEFAUT)
  const [duree, setDuree] = useState(DUREE_DEFAUT)
  const [categorie, setCategorie] = useState(CATEGORIES.AUTRE)

  function valider(e) {
    e.preventDefault()
    if (!nom.trim()) return
    onAjouter({
      nom: nom.trim(),
      categorie,
      emplacement,
      conseil: 'Aliment ajouté manuellement : vérifiez l’emballage pour la conservation.',
      dureeJours: Math.max(0, Number.parseInt(duree, 10) || DUREE_DEFAUT),
    })
    onFermer()
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Ajouter un aliment personnalisé"
      onClick={onFermer}
    >
      <form
        onSubmit={valider}
        className="animation-apparition max-h-[90vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">➕ Nouvel aliment</h2>
        <p className="mt-1 text-sm text-stone-500">
          Cet aliment n’est pas dans la base : proposez-lui un rangement et une durée,
          vous pourrez les corriger.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="libre-nom" className="block text-sm font-semibold">Nom</label>
            <input
              id="libre-nom"
              type="text"
              required
              className="mt-1 min-h-[48px] w-full rounded-xl border-2 border-stone-200 bg-white px-3 text-base focus:border-amber-500 focus:outline-none"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="libre-categorie" className="block text-sm font-semibold">Catégorie</label>
            <select
              id="libre-categorie"
              className="mt-1 min-h-[48px] w-full rounded-xl border-2 border-stone-200 bg-white px-3 text-base focus:border-amber-500 focus:outline-none"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              {Object.values(CATEGORIES).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="libre-emplacement" className="block text-sm font-semibold">
              Emplacement conseillé (par défaut : étagère du milieu)
            </label>
            <select
              id="libre-emplacement"
              className="mt-1 min-h-[48px] w-full rounded-xl border-2 border-stone-200 bg-white px-3 text-base focus:border-amber-500 focus:outline-none"
              value={emplacement}
              onChange={(e) => setEmplacement(e.target.value)}
            >
              {TOUTES_LES_ZONES.map((z) => (
                <option key={z.id} value={z.id}>{z.emoji} {z.nom}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="libre-duree" className="block text-sm font-semibold">
              Durée de conservation estimée (jours)
            </label>
            <input
              id="libre-duree"
              type="number"
              min="0"
              inputMode="numeric"
              className="mt-1 min-h-[48px] w-full rounded-xl border-2 border-stone-200 bg-white px-3 text-base focus:border-amber-500 focus:outline-none"
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
            />
          </div>
        </div>

        <footer className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="submit"
            className="min-h-[48px] rounded-2xl bg-amber-500 px-4 font-bold text-white shadow-sm active:bg-amber-600"
          >
            Ajouter
          </button>
          <button
            type="button"
            onClick={onFermer}
            className="min-h-[48px] rounded-2xl border-2 border-stone-200 bg-white px-4 font-semibold text-stone-600 active:bg-stone-50"
          >
            Annuler
          </button>
        </footer>
      </form>
    </div>
  )
}
