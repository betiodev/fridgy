# 🥕 Fridgy — mon frigo bien rangé

Application web **mobile-first** (React + Vite + Tailwind CSS) qui vous aide à :

- **ranger vos aliments au bon endroit** (zones du frigo, placard, corbeille,
  congélateur) pour les conserver le plus longtemps possible ;
- **garder un inventaire** de ce que vous possédez (persisté sur votre appareil) ;
- **être alerté** quand un aliment doit être consommé rapidement (orange) ou
  jeté (rouge).

Tout fonctionne **côté client**, sans backend : les données sont stockées dans
le `localStorage` du navigateur. Rien n'est envoyé sur Internet.

## 🚀 Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrez l'adresse affichée (par défaut http://localhost:5173).

Pour une version de production :

```bash
npm run build    # génère le dossier dist/
npm run preview  # sert le build localement
```

## 🧭 Fonctionnement

- **Premier lancement** : choisissez votre type de frigo — *froid statique*
  (zones de température différenciées, le plus froid en haut) ou *froid
  ventilé / brassé* (température homogène, priorité à l'hygiène et à la
  séparation cru / cuit). Modifiable à tout moment dans **Réglages**.
- **Ajouter un aliment** : tapez son nom dans la barre de recherche
  (insensible aux accents et à la casse), puis touchez une suggestion. La date
  d'ajout est enregistrée automatiquement et la date limite est calculée à
  partir de la durée de conservation estimée. Un aliment absent de la base
  peut être ajouté en **saisie libre** (emplacement et durée par défaut,
  corrigeables).
- **Fiche aliment** : touchez un aliment (badge du schéma ou ligne
  d'inventaire) pour voir la zone conseillée, le conseil de conservation, les
  incompatibilités éthylène, et pour **modifier la date limite** (si
  l'emballage indique une vraie date de péremption), la durée ou
  l'emplacement, ou le retirer (consommé / jeté).
- **Onglet Urgent** : regroupe les aliments à consommer bientôt (orange,
  ≤ 2 jours restants) et périmés (rouge), triés par urgence.

## 🍎 Enrichir la base d'aliments

La base (200+ aliments) vit dans **`src/data/aliments.js`**. Pour ajouter un
aliment, ajoutez simplement un objet au tableau `ALIMENTS` :

```js
{
  nom: 'Panais',                        // nom affiché et recherché
  categorie: CATEGORIES.LEGUMES,        // voir CATEGORIES en haut du fichier
  emplacement: BAC,                     // haut, milieu, bas, bac, porte, placard, ambiant, congelateur
  conseil: 'Sans les fanes, dans un sac aéré au bac à légumes.',
  dureeJours: 14,                       // durée de conservation estimée (jours)
  ethylene: 'sensible',                 // optionnel : 'producteur' ou 'sensible'
}
```

La recherche, le schéma du frigo, les recommandations et les alertes prennent
automatiquement en compte la nouvelle entrée. Les zones et leurs descriptions
(statique / ventilé) sont définies dans `src/data/zones.js`.

## 🍳 v2 — module de suggestions de recettes (à venir)

L'architecture est prête pour brancher un module de recettes :

- **Point de branchement : `src/services/inventaire.js`** — un `TODO v2`
  y réserve l'emplacement de `suggererRecettes(inventaire)`. Ce service expose
  déjà `alimentsDisponibles()` (aliments non périmés, la source de vérité pour
  les recettes) et `alimentsUrgents()` (à prioriser pour l'anti-gaspillage).
- Les entrées d'inventaire sont de simples objets sérialisables
  (`nom`, `categorie`, `emplacement`, `dateLimite`, …), indépendants des
  composants React : le module recettes n'aura qu'à croiser ces noms /
  catégories avec une future base `src/data/recettes.js`.

## 📁 Structure du projet

```
src/
├── data/
│   ├── aliments.js      # base de 200+ aliments (à enrichir ici)
│   └── zones.js         # zones du frigo + hors frigo, types de frigo
├── components/
│   ├── BarreRecherche.jsx   # autocomplétion + saisie libre
│   ├── SchemaFrigo.jsx      # schéma visuel par zones + alertes éthylène
│   ├── ListeInventaire.jsx  # inventaire trié par urgence
│   ├── VueAlertes.jsx       # vue "À consommer bientôt / À jeter"
│   ├── ModalAliment.jsx     # fiche + édition date limite / durée / zone
│   ├── ModalAjoutLibre.jsx  # ajout d'un aliment hors base
│   ├── ChoixTypeFrigo.jsx   # onboarding premier lancement
│   ├── Reglages.jsx         # type de frigo + réinitialisation
│   ├── Navigation.jsx       # barre d'onglets basse (mobile)
│   └── PastilleStatut.jsx   # pastille vert / orange / rouge
├── services/
│   └── inventaire.js    # accès métier à l'inventaire + TODO recettes v2
├── hooks/
│   └── useLocalStorage.js
└── utils/
    ├── dates.js         # calculs de dates et statut de fraîcheur
    └── texte.js         # recherche insensible aux accents
```

## 📱 Vers une app mobile

L'interface est pensée pour une conversion future en PWA / Capacitor :
mobile-first, cibles tactiles ≥ 44 px, navigation basse type app, aucune
dépendance à la souris, `safe-area-inset` géré pour les encoches.
