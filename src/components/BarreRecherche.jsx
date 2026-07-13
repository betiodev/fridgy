import { useMemo, useRef, useState } from 'react'
import { ALIMENTS } from '../data/aliments.js'
import { nomZone } from '../data/zones.js'
import { contient } from '../utils/texte.js'

/*
  Barre de recherche avec autocomplétion sur la base d'aliments.
  - Tolérante aux accents et à la casse (voir utils/texte.js).
  - Un clic sur une suggestion ajoute l'aliment (date d'ajout = aujourd'hui).
  - Si l'aliment n'existe pas dans la base, une entrée "saisie libre" est
    proposée en bas de liste : elle ouvre la modale d'ajout libre.
*/
export default function BarreRecherche({ onAjouterConnu, onAjouterLibre }) {
  const [saisie, setSaisie] = useState('')
  const [ouvert, setOuvert] = useState(false)
  const refInput = useRef(null)

  // Suggestions filtrées (8 max pour rester lisible sur mobile)
  const suggestions = useMemo(() => {
    if (saisie.trim().length < 1) return []
    return ALIMENTS.filter((a) => contient(a.nom, saisie)).slice(0, 8)
  }, [saisie])

  function choisir(aliment) {
    onAjouterConnu(aliment)
    setSaisie('')
    setOuvert(false)
    refInput.current?.focus()
  }

  function choisirLibre() {
    onAjouterLibre(saisie.trim())
    setSaisie('')
    setOuvert(false)
  }

  const montrerListe = ouvert && saisie.trim().length > 0

  return (
    <div className="relative">
      <label htmlFor="recherche-aliment" className="sr-only">
        Rechercher un aliment à ajouter
      </label>
      <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-white px-4 shadow-sm focus-within:border-amber-500">
        <span aria-hidden="true" className="text-xl">🔍</span>
        <input
          id="recherche-aliment"
          ref={refInput}
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="Ajouter un aliment… (ex. yaourt, poulet)"
          className="min-h-[48px] w-full bg-transparent text-base outline-none placeholder:text-stone-400"
          value={saisie}
          onChange={(e) => {
            setSaisie(e.target.value)
            setOuvert(true)
          }}
          onFocus={() => setOuvert(true)}
          onBlur={() => setTimeout(() => setOuvert(false), 150)} // laisse le temps au clic sur une suggestion
        />
      </div>

      {montrerListe && (
        <ul
          className="animation-apparition absolute z-30 mt-2 max-h-96 w-full overflow-auto rounded-2xl border border-amber-200 bg-white shadow-lg"
          role="listbox"
          aria-label="Suggestions d'aliments"
        >
          {suggestions.map((aliment) => (
            <li key={aliment.nom}>
              <button
                type="button"
                className="flex min-h-[48px] w-full items-center justify-between gap-2 px-4 py-2 text-left hover:bg-amber-50 active:bg-amber-100"
                onMouseDown={(e) => e.preventDefault()} // évite de perdre le focus avant le clic
                onClick={() => choisir(aliment)}
              >
                <span className="font-medium">{aliment.nom}</span>
                <span className="shrink-0 rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-600">
                  {nomZone(aliment.emplacement)}
                </span>
              </button>
            </li>
          ))}

          {/* Saisie libre : toujours proposée pour les aliments absents de la base */}
          <li className={suggestions.length > 0 ? 'border-t border-stone-100' : ''}>
            <button
              type="button"
              className="flex min-h-[48px] w-full items-center gap-2 px-4 py-2 text-left text-amber-700 hover:bg-amber-50 active:bg-amber-100"
              onMouseDown={(e) => e.preventDefault()}
              onClick={choisirLibre}
            >
              <span aria-hidden="true">➕</span>
              <span>
                Ajouter « <strong>{saisie.trim()}</strong> » (saisie libre)
              </span>
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
