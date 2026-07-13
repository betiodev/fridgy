/*
  BASE D'ALIMENTS — le référentiel métier de l'application.

  Chaque aliment est un objet :
    - nom          : nom en français (affiché et recherché)
    - categorie    : une des CATEGORIES ci-dessous
    - emplacement  : identifiant de zone (voir EMPLACEMENTS dans zones.js)
    - conseil      : courte phrase de conseil de conservation
    - dureeJours   : durée de conservation estimée une fois entamé / rangé (en jours)
    - ethylene     : (optionnel) 'producteur' si l'aliment dégage de l'éthylène,
                     'sensible' s'il se dégrade au contact de l'éthylène

  Pour ENRICHIR la base : ajoutez simplement un objet dans le tableau ALIMENTS
  en respectant cette structure. La recherche, le schéma du frigo et les alertes
  l'utiliseront automatiquement.

  Cette base est aussi pensée pour être réutilisée par le futur module de
  suggestions de recettes (v2) — voir src/services/inventaire.js.
*/

import { EMPLACEMENTS } from './zones.js'

const { HAUT, MILIEU, BAS, BAC, PORTE, PLACARD, AMBIANT, CONGELATEUR } = EMPLACEMENTS

export const CATEGORIES = {
  FRUITS: 'Fruits frais',
  LEGUMES: 'Légumes frais',
  LAITIERS: 'Produits laitiers & œufs',
  VIANDES: 'Viandes & charcuterie',
  POISSONS: 'Poissons & fruits de mer',
  TRANSFORMES: 'Produits transformés & restes',
  CONDIMENTS: 'Condiments & sauces',
  EPICERIE: 'Épicerie sèche & placard',
  AUTRE: 'Autre',
}

export const ALIMENTS = [
  // ─────────────────────────── FRUITS FRAIS ───────────────────────────
  { nom: 'Pomme', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Se garde des semaines au frais ; en corbeille, elle fait mûrir les fruits voisins.', dureeJours: 25, ethylene: 'producteur' },
  { nom: 'Poire', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Au bac une fois mûre ; à température ambiante pour finir de mûrir.', dureeJours: 7, ethylene: 'producteur' },
  { nom: 'Banane', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Jamais au frigo : la peau noircit. À suspendre, à l’écart des autres fruits.', dureeJours: 5, ethylene: 'producteur' },
  { nom: 'Orange', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'En corbeille ~1 semaine ; au bac à légumes jusqu’à 2 semaines.', dureeJours: 10 },
  { nom: 'Citron', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'En corbeille ~2 semaines ; entamé, filmé au frigo 2-3 jours.', dureeJours: 14 },
  { nom: 'Citron vert', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Au bac pour garder son jus ; il sèche vite à l’air libre.', dureeJours: 14 },
  { nom: 'Clémentine', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'En corbeille, à consommer dans la semaine.', dureeJours: 7 },
  { nom: 'Pamplemousse', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'En corbeille ~10 jours ; entamé, filmé au frigo.', dureeJours: 10 },
  { nom: 'Fraises', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Très fragiles : ne les lavez qu’au dernier moment, en une seule couche si possible.', dureeJours: 3 },
  { nom: 'Framboises', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'À consommer très vite ; retirez les fruits abîmés qui contaminent les autres.', dureeJours: 2 },
  { nom: 'Myrtilles', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Dans leur barquette aérée, non lavées.', dureeJours: 5 },
  { nom: 'Mûres', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Très fragiles : à consommer sous 48 h.', dureeJours: 2 },
  { nom: 'Cerises', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Non lavées, dans un sac aéré.', dureeJours: 4 },
  { nom: 'Raisin', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'En grappe non lavée ; retirez les grains abîmés.', dureeJours: 6 },
  { nom: 'Pêche', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Mûrit en corbeille ; une fois mûre, 2-3 jours de plus au bac.', dureeJours: 4, ethylene: 'producteur' },
  { nom: 'Nectarine', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Comme la pêche : corbeille puis bac une fois mûre.', dureeJours: 4, ethylene: 'producteur' },
  { nom: 'Abricot', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'En corbeille, à consommer rapidement une fois mûr.', dureeJours: 4, ethylene: 'producteur' },
  { nom: 'Prune', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Au bac une fois mûre pour prolonger de quelques jours.', dureeJours: 5, ethylene: 'producteur' },
  { nom: 'Kiwi', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Ferme : en corbeille pour mûrir. Mûr : au bac.', dureeJours: 10, ethylene: 'producteur' },
  { nom: 'Melon', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Entier à température ambiante ; entamé, filmé au bac 2-3 jours (il parfume tout !).', dureeJours: 4, ethylene: 'producteur' },
  { nom: 'Pastèque', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Entière à l’ambiante ; entamée, filmée au frigo 3 jours.', dureeJours: 7 },
  { nom: 'Ananas', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Entier en corbeille ; découpé, en boîte hermétique au frigo 3-4 jours.', dureeJours: 5 },
  { nom: 'Mangue', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Mûrit en corbeille ; mûre, quelques jours de plus au bac.', dureeJours: 5, ethylene: 'producteur' },
  { nom: 'Avocat (non mûr)', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Mûrit à l’air libre ; pour accélérer, placez-le près de pommes ou bananes.', dureeJours: 5, ethylene: 'producteur' },
  { nom: 'Avocat (mûr)', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Une fois mûr, le bac ralentit son évolution de 2-3 jours.', dureeJours: 3, ethylene: 'producteur' },
  { nom: 'Figue', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Très fragile : à plat, à consommer sous 2-3 jours.', dureeJours: 3, ethylene: 'producteur' },
  { nom: 'Grenade', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Entière, elle se conserve très bien au frais.', dureeJours: 20 },
  { nom: 'Litchi', categorie: CATEGORIES.FRUITS, emplacement: BAC, conseil: 'Dans un sac perforé pour éviter le dessèchement.', dureeJours: 7 },
  { nom: 'Papaye', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Mûrit en corbeille ; mûre, au bac 2-3 jours.', dureeJours: 4, ethylene: 'producteur' },
  { nom: 'Kaki', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Se consomme bien mûr, presque translucide.', dureeJours: 4 },
  { nom: 'Coing', categorie: CATEGORIES.FRUITS, emplacement: AMBIANT, conseil: 'Se garde longtemps en corbeille, mais parfume beaucoup.', dureeJours: 20, ethylene: 'producteur' },

  // ─────────────────────────── LÉGUMES FRAIS ───────────────────────────
  { nom: 'Salade verte (laitue)', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Enveloppée dans un torchon propre ou un sac micro-perforé.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Mâche', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Très fragile : dans sa barquette, à consommer vite.', dureeJours: 3, ethylene: 'sensible' },
  { nom: 'Roquette', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans un sac aéré avec un papier absorbant.', dureeJours: 3, ethylene: 'sensible' },
  { nom: 'Épinards frais', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Non lavés, dans un sac aéré ; ils s’affaissent vite.', dureeJours: 3, ethylene: 'sensible' },
  { nom: 'Endives', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'À l’abri de la lumière, sinon elles verdissent et deviennent amères.', dureeJours: 6, ethylene: 'sensible' },
  { nom: 'Chou kale', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans un sac avec un papier absorbant.', dureeJours: 5, ethylene: 'sensible' },
  { nom: 'Tomate', categorie: CATEGORIES.LEGUMES, emplacement: AMBIANT, conseil: 'Jamais au frigo : elle perd son goût. Posée queue vers le bas.', dureeJours: 5, ethylene: 'producteur' },
  { nom: 'Tomates cerises', categorie: CATEGORIES.LEGUMES, emplacement: AMBIANT, conseil: 'En corbeille, à l’abri du soleil direct.', dureeJours: 5, ethylene: 'producteur' },
  { nom: 'Courgette', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Entière et non lavée ; entamée, filmée 2 jours.', dureeJours: 5, ethylene: 'sensible' },
  { nom: 'Aubergine', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Craint le froid intense : bac à légumes uniquement.', dureeJours: 5, ethylene: 'sensible' },
  { nom: 'Poivron', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Entier au bac ; entamé, filmé 2-3 jours.', dureeJours: 7, ethylene: 'sensible' },
  { nom: 'Concombre', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Sensible au froid : dans la partie la moins froide du bac.', dureeJours: 5, ethylene: 'sensible' },
  { nom: 'Carotte', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Sans les fanes, elles tiennent 2-3 semaines au bac.', dureeJours: 18, ethylene: 'sensible' },
  { nom: 'Navet', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Sans les fanes, dans un sac aéré.', dureeJours: 14 },
  { nom: 'Radis', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Sans les fanes, dans un linge humide.', dureeJours: 4 },
  { nom: 'Betterave crue', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Se garde bien au bac ; cuite, 3-4 jours en boîte hermétique.', dureeJours: 14 },
  { nom: 'Céleri branche', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Enveloppé dans du papier aluminium, il reste croquant.', dureeJours: 10, ethylene: 'sensible' },
  { nom: 'Céleri-rave', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Entier au bac ; entamé, filmé (il noircit à l’air).', dureeJours: 14 },
  { nom: 'Poireau', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Racines vers le bas, dans un sac aéré.', dureeJours: 8, ethylene: 'sensible' },
  { nom: 'Brocoli', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Non lavé, tête vers le haut ; il jaunit vite.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Chou-fleur', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Entier, tige vers le bas, dans un sac perforé.', dureeJours: 5, ethylene: 'sensible' },
  { nom: 'Chou blanc', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Entier, il se garde très bien ; entamé, filmé.', dureeJours: 14 },
  { nom: 'Chou rouge', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Entier, il se garde très bien ; entamé, filmé.', dureeJours: 14 },
  { nom: 'Choux de Bruxelles', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans un sac aéré, non lavés.', dureeJours: 5, ethylene: 'sensible' },
  { nom: 'Haricots verts', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Non lavés, dans un sac aéré ; ils flétrissent vite.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Petits pois (en gousses)', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'À écosser au dernier moment, ils perdent vite leur sucre.', dureeJours: 3 },
  { nom: 'Champignons de Paris', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans un sac en papier, jamais en plastique (ils transpirent).', dureeJours: 4 },
  { nom: 'Courge butternut', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Entière : plusieurs semaines au sec. Entamée : filmée au bac 4-5 jours.', dureeJours: 30 },
  { nom: 'Potiron', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Entier : plusieurs semaines au sec. Entamé : filmé au bac.', dureeJours: 30 },
  { nom: 'Pomme de terre', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Placard sombre, sec et aéré, loin des oignons (elles germent plus vite ensemble).', dureeJours: 30 },
  { nom: 'Patate douce', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Au sec et à l’abri de la lumière, jamais au frigo.', dureeJours: 20 },
  { nom: 'Oignon', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Au sec, à l’abri de la lumière, loin des pommes de terre.', dureeJours: 30 },
  { nom: 'Oignon rouge', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Comme l’oignon jaune ; entamé, filmé au frigo 2-3 jours.', dureeJours: 25 },
  { nom: 'Ail', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Au sec et aéré, séparé des pommes de terre et des oignons.', dureeJours: 60 },
  { nom: 'Échalote', categorie: CATEGORIES.LEGUMES, emplacement: PLACARD, conseil: 'Au sec et aéré, comme l’oignon et l’ail, séparée d’eux.', dureeJours: 30 },
  { nom: 'Persil', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'En bouquet dans un verre d’eau, ou dans un linge humide au bac.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Basilic', categorie: CATEGORIES.LEGUMES, emplacement: AMBIANT, conseil: 'Jamais au frigo (il noircit) : tiges dans un verre d’eau, comme un bouquet.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Coriandre', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans un linge humide ou un verre d’eau au frigo.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Ciboulette', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans un linge légèrement humide.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Menthe', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Tiges dans un verre d’eau ou linge humide au bac.', dureeJours: 4, ethylene: 'sensible' },
  { nom: 'Thym', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Se garde bien ; peut aussi sécher à l’air libre.', dureeJours: 8 },
  { nom: 'Fenouil', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans un sac aéré ; les tiges se dessèchent en premier.', dureeJours: 7 },
  { nom: 'Asperges', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Debout dans un fond d’eau ou dans un linge humide, à consommer vite.', dureeJours: 3, ethylene: 'sensible' },
  { nom: 'Artichaut', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Cru au bac ; cuit, il s’oxyde : à manger dans les 24 h.', dureeJours: 4 },
  { nom: 'Maïs (épis frais)', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Dans ses feuilles, à consommer très vite (le sucre se transforme).', dureeJours: 2 },
  { nom: 'Gingembre', categorie: CATEGORIES.LEGUMES, emplacement: BAC, conseil: 'Non pelé au bac ; se congèle très bien aussi.', dureeJours: 20 },

  // ─────────────────────── PRODUITS LAITIERS & ŒUFS ───────────────────────
  { nom: 'Lait (entamé)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Bien refermé, à consommer sous 4-5 jours ; évitez la porte, trop chaude.', dureeJours: 4 },
  { nom: 'Lait végétal (entamé)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Bien refermé, à consommer sous 4-5 jours.', dureeJours: 4 },
  { nom: 'Crème fraîche (entamée)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Pot bien refermé, cuillère propre à chaque usage.', dureeJours: 5 },
  { nom: 'Crème liquide (entamée)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Brique refermée, à utiliser sous 3 jours.', dureeJours: 3 },
  { nom: 'Beurre', categorie: CATEGORIES.LAITIERS, emplacement: PORTE, conseil: 'Dans un beurrier fermé ; la porte le garde tartinable.', dureeJours: 30 },
  { nom: 'Beurre demi-sel', categorie: CATEGORIES.LAITIERS, emplacement: PORTE, conseil: 'Le sel aide à la conservation ; beurrier fermé.', dureeJours: 30 },
  { nom: 'Yaourt nature', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Se garde souvent quelques jours après la date indiquée (odeur et aspect font foi).', dureeJours: 10 },
  { nom: 'Yaourt aux fruits', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Comme le yaourt nature, au milieu du frigo.', dureeJours: 10 },
  { nom: 'Fromage blanc (entamé)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Bien refermé, cuillère propre à chaque usage.', dureeJours: 5 },
  { nom: 'Petit-suisse', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Dans son emballage d’origine.', dureeJours: 7 },
  { nom: 'Skyr', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Comme un yaourt : au milieu, bien refermé.', dureeJours: 10 },
  { nom: 'Crème dessert', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Non entamée, suivez la date ; entamée, sous 48 h.', dureeJours: 7 },
  { nom: 'Mozzarella (entamée)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Conservée dans son eau, à consommer sous 48 h.', dureeJours: 2 },
  { nom: 'Burrata', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'À consommer le jour de l’ouverture, dans son eau.', dureeJours: 1 },
  { nom: 'Ricotta (entamée)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'En boîte hermétique, à consommer vite.', dureeJours: 4 },
  { nom: 'Mascarpone (entamé)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Bien refermé, cuillère propre.', dureeJours: 4 },
  { nom: 'Feta (entamée)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Immergée dans sa saumure ou dans de l’huile d’olive.', dureeJours: 7 },
  { nom: 'Chèvre frais', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Dans une boîte, à l’écart des aliments odorants.', dureeJours: 7 },
  { nom: 'Camembert', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Dans sa boîte d’origine ou du papier fromage ; sortez-le 30 min avant dégustation.', dureeJours: 10 },
  { nom: 'Brie', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Dans du papier fromage, jamais de film plastique directement.', dureeJours: 10 },
  { nom: 'Comté', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Papier fromage ou boîte : 2-3 semaines sans problème.', dureeJours: 20 },
  { nom: 'Emmental', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'En morceau, il se garde mieux que râpé (râpé : 4-5 jours).', dureeJours: 18 },
  { nom: 'Parmesan', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'En morceau bien emballé, il se garde très longtemps.', dureeJours: 30 },
  { nom: 'Raclette (tranches)', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Tranches filmées, à consommer dans la semaine.', dureeJours: 7 },
  { nom: 'Roquefort', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Dans son papier d’origine, bien emballé (odorant !).', dureeJours: 15 },
  { nom: 'Œufs', categorie: CATEGORIES.LAITIERS, emplacement: PORTE, conseil: 'Pointe vers le bas, dans leur boîte ; ne pas les laver avant usage.', dureeJours: 25 },
  { nom: 'Œufs durs', categorie: CATEGORIES.LAITIERS, emplacement: MILIEU, conseil: 'Avec coquille : 4 jours ; écalés : 2 jours maximum.', dureeJours: 4 },

  // ─────────────────────── VIANDES & CHARCUTERIE ───────────────────────
  { nom: 'Bœuf (steak, morceaux)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Zone la plus froide, dans son emballage d’origine, jamais au-dessus d’aliments cuits.', dureeJours: 3 },
  { nom: 'Bœuf haché', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Très périssable : à consommer sous 24 h ou à congeler immédiatement.', dureeJours: 1 },
  { nom: 'Rôti de bœuf (cru)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Zone la plus froide, bien emballé.', dureeJours: 3 },
  { nom: 'Veau (escalope)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Viande délicate : à consommer sous 48 h.', dureeJours: 2 },
  { nom: 'Côtes de porc', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Zone la plus froide, dans leur emballage.', dureeJours: 3 },
  { nom: 'Filet mignon de porc', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'À cuisiner sous 48 h ou à congeler.', dureeJours: 2 },
  { nom: 'Agneau (côtelettes, gigot)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Zone la plus froide, bien emballé.', dureeJours: 3 },
  { nom: 'Poulet entier (cru)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Volaille crue : très périssable, jamais au contact d’autres aliments.', dureeJours: 2 },
  { nom: 'Escalope de poulet', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'À consommer sous 48 h ; lavez-vous les mains après manipulation.', dureeJours: 2 },
  { nom: 'Cuisses de poulet', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Zone la plus froide, bien séparées des aliments prêts à consommer.', dureeJours: 2 },
  { nom: 'Escalope de dinde', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Comme le poulet : sous 48 h, bien emballée.', dureeJours: 2 },
  { nom: 'Magret de canard', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Sous vide, il tient quelques jours ; ouvert, sous 48-72 h.', dureeJours: 3 },
  { nom: 'Lardons (entamés)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Barquette refermée ou boîte hermétique.', dureeJours: 4 },
  { nom: 'Bacon (entamé)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Tranches filmées, à consommer dans les 5 jours.', dureeJours: 5 },
  { nom: 'Jambon blanc (entamé)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Une fois ouvert, 3-4 jours maximum, bien refilmé.', dureeJours: 3 },
  { nom: 'Jambon cru (entamé)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Tranches filmées ; le sel le protège un peu plus longtemps.', dureeJours: 7 },
  { nom: 'Saucisson sec (entamé)', categorie: CATEGORIES.VIANDES, emplacement: PLACARD, conseil: 'Entamé : dans un torchon, endroit frais et sec (ou bas du frigo l’été).', dureeJours: 21 },
  { nom: 'Chorizo (entamé)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Filmé ou en boîte ; il parfume, emballez-le bien.', dureeJours: 10 },
  { nom: 'Saucisses fraîches', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Très périssables : à cuire sous 48 h.', dureeJours: 2 },
  { nom: 'Merguez', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Comme les saucisses fraîches : sous 48 h.', dureeJours: 2 },
  { nom: 'Boudin noir', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'À consommer rapidement, sous 2-3 jours.', dureeJours: 3 },
  { nom: 'Pâté / terrine (entamé)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Filmé au contact, 3-4 jours maximum.', dureeJours: 3 },
  { nom: 'Rillettes (entamées)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Pot bien refermé, couche de gras protectrice conservée.', dureeJours: 4 },
  { nom: 'Viande marinée', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'La marinade ne prolonge pas la conservation : sous 48 h.', dureeJours: 2 },
  { nom: 'Knacks (entamées)', categorie: CATEGORIES.VIANDES, emplacement: HAUT, conseil: 'Sachet ouvert : en boîte hermétique, 3-4 jours.', dureeJours: 4 },

  // ─────────────────── POISSONS & FRUITS DE MER ───────────────────
  { nom: 'Saumon frais', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Zone la plus froide, à consommer sous 24-48 h.', dureeJours: 2 },
  { nom: 'Cabillaud', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Poisson blanc fragile : à cuisiner le jour même ou le lendemain.', dureeJours: 1 },
  { nom: 'Filet de poisson blanc', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'À consommer sous 24 h, bien emballé.', dureeJours: 1 },
  { nom: 'Truite fraîche', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Vidée, dans la zone la plus froide, sous 48 h.', dureeJours: 2 },
  { nom: 'Sardines fraîches', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Poisson gras très fragile : à consommer le jour même.', dureeJours: 1 },
  { nom: 'Thon frais', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'À consommer sous 24 h, surtout s’il est consommé cru.', dureeJours: 1 },
  { nom: 'Dorade', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Vidée et écaillée, sous 48 h dans la zone la plus froide.', dureeJours: 2 },
  { nom: 'Saumon fumé (entamé)', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Une fois ouvert, filmé au contact, sous 72 h.', dureeJours: 3 },
  { nom: 'Truite fumée (entamée)', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Comme le saumon fumé : sous 72 h après ouverture.', dureeJours: 3 },
  { nom: 'Crevettes cuites', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'À consommer sous 48 h, bien couvertes.', dureeJours: 2 },
  { nom: 'Crevettes crues', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Très périssables : sous 24 h ou à congeler.', dureeJours: 1 },
  { nom: 'Moules fraîches', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Sous un linge humide, jamais dans l’eau ni en sac fermé. Jetez celles qui restent ouvertes.', dureeJours: 2 },
  { nom: 'Huîtres', categorie: CATEGORIES.POISSONS, emplacement: BAS, conseil: 'À plat dans leur bourriche, un poids dessus, jamais hermétiques.', dureeJours: 5 },
  { nom: 'Surimi (entamé)', categorie: CATEGORIES.POISSONS, emplacement: HAUT, conseil: 'Sachet ouvert : en boîte hermétique, 2-3 jours.', dureeJours: 3 },
  { nom: 'Thon en conserve (entamé)', categorie: CATEGORIES.POISSONS, emplacement: MILIEU, conseil: 'Transvasé dans une boîte hermétique, jamais gardé dans la boîte métallique.', dureeJours: 2 },
  { nom: 'Poisson pané (surgelé)', categorie: CATEGORIES.POISSONS, emplacement: CONGELATEUR, conseil: 'Au congélateur jusqu’à cuisson ; ne jamais recongeler après décongélation.', dureeJours: 90 },

  // ─────────────── PRODUITS TRANSFORMÉS & RESTES ───────────────
  { nom: 'Restes de plat maison', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Refroidis rapidement (moins de 2 h), couverts, consommés sous 3-4 jours.', dureeJours: 3 },
  { nom: 'Soupe maison', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'En bocal ou boîte fermée ; se congèle très bien.', dureeJours: 3 },
  { nom: 'Pâtes cuites', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'En boîte hermétique, un filet d’huile pour éviter qu’elles collent.', dureeJours: 3 },
  { nom: 'Riz cuit', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Refroidi vite puis couvert : le riz cuit tourne rapidement (48 h max).', dureeJours: 2 },
  { nom: 'Pizza (restes)', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Filmée ou en boîte, à consommer sous 48 h.', dureeJours: 2 },
  { nom: 'Quiche (entamée)', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Couverte, à consommer sous 2-3 jours.', dureeJours: 3 },
  { nom: 'Salade composée', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Assaisonnée, elle ne tient pas : à manger sous 24 h.', dureeJours: 1 },
  { nom: 'Sandwich', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Filmé, à consommer sous 24 h.', dureeJours: 1 },
  { nom: 'Plat cuisiné frais (non ouvert)', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Respectez la DLC de l’emballage (ajustez la date limite ci-dessous).', dureeJours: 4 },
  { nom: 'Plat cuisiné (ouvert)', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Une fois ouvert, couvert et consommé sous 48 h.', dureeJours: 2 },
  { nom: 'Gratin', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Couvert, à consommer sous 3 jours.', dureeJours: 3 },
  { nom: 'Purée maison', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'En boîte hermétique, sous 48 h.', dureeJours: 2 },
  { nom: 'Légumes cuits', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Couverts, à consommer sous 3 jours.', dureeJours: 3 },
  { nom: 'Viande cuite (restes)', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Couverte, jamais sous de la viande crue, sous 3 jours.', dureeJours: 3 },
  { nom: 'Poisson cuit (restes)', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Couvert, à consommer sous 48 h.', dureeJours: 2 },
  { nom: 'Bouillon maison', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'En bocal fermé ; se congèle très bien en portions.', dureeJours: 4 },
  { nom: 'Compote maison', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'En bocal fermé, sous 4-5 jours.', dureeJours: 4 },
  { nom: 'Gâteau maison', categorie: CATEGORIES.TRANSFORMES, emplacement: AMBIANT, conseil: 'Sous cloche à température ambiante ; au frigo seulement s’il contient de la crème.', dureeJours: 3 },
  { nom: 'Tarte aux fruits', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Couverte, à consommer sous 48 h.', dureeJours: 2 },
  { nom: 'Crêpes', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Empilées et filmées, sous 48 h.', dureeJours: 2 },
  { nom: 'Houmous (entamé)', categorie: CATEGORIES.TRANSFORMES, emplacement: MILIEU, conseil: 'Bien refermé, un filet d’huile sur le dessus.', dureeJours: 3 },
  { nom: 'Taboulé', categorie: CATEGORIES.TRANSFORMES, emplacement: BAS, conseil: 'Couvert, à consommer sous 48 h.', dureeJours: 2 },

  // ─────────────── CONDIMENTS, SAUCES & ÉPICERIE OUVERTE ───────────────
  { nom: 'Moutarde (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'À la porte, elle se garde plusieurs mois bien refermée.', dureeJours: 90 },
  { nom: 'Ketchup (entamé)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Au frigo après ouverture, plusieurs semaines.', dureeJours: 60 },
  { nom: 'Mayonnaise industrielle (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Au frigo après ouverture, environ un mois.', dureeJours: 30 },
  { nom: 'Mayonnaise maison', categorie: CATEGORIES.CONDIMENTS, emplacement: MILIEU, conseil: 'Œufs crus : à consommer sous 24 h.', dureeJours: 1 },
  { nom: 'Sauce tomate (pot entamé)', categorie: CATEGORIES.CONDIMENTS, emplacement: MILIEU, conseil: 'Pot refermé, 4-5 jours ; se congèle bien en portions.', dureeJours: 4 },
  { nom: 'Pesto (pot entamé)', categorie: CATEGORIES.CONDIMENTS, emplacement: MILIEU, conseil: 'Recouvert d’un filet d’huile pour éviter l’oxydation.', dureeJours: 5 },
  { nom: 'Sauce soja (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Très salée, elle se garde des mois au frais.', dureeJours: 180 },
  { nom: 'Sauce barbecue (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Au frigo après ouverture, plusieurs semaines.', dureeJours: 60 },
  { nom: 'Harissa (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Recouverte d’huile, en tube ou bocal refermé.', dureeJours: 30 },
  { nom: 'Tapenade (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: MILIEU, conseil: 'Filmée ou huilée en surface, sous 5 jours.', dureeJours: 5 },
  { nom: 'Vinaigrette maison', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'En bocal fermé, à secouer avant usage.', dureeJours: 7 },
  { nom: 'Cornichons (entamés)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Toujours immergés dans leur vinaigre, pince ou fourchette propre.', dureeJours: 90 },
  { nom: 'Olives (entamées)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Immergées dans leur saumure ou huile.', dureeJours: 21 },
  { nom: 'Câpres (entamées)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Immergées dans leur saumure, elles durent des mois.', dureeJours: 90 },
  { nom: 'Confiture (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Cuillère propre à chaque usage ; au frigo une fois ouverte.', dureeJours: 30 },
  { nom: 'Miel', categorie: CATEGORIES.CONDIMENTS, emplacement: PLACARD, conseil: 'Ne se périme quasiment pas ; jamais au frigo, il cristallise.', dureeJours: 365 },
  { nom: 'Beurre de cacahuète (entamé)', categorie: CATEGORIES.CONDIMENTS, emplacement: PLACARD, conseil: 'Au placard, bien refermé ; mélangez l’huile qui remonte.', dureeJours: 60 },
  { nom: 'Pâte à tartiner (entamée)', categorie: CATEGORIES.CONDIMENTS, emplacement: PLACARD, conseil: 'Au placard : au frigo elle durcit.', dureeJours: 60 },
  { nom: 'Jus d’orange (ouvert)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Bien rebouché, à consommer sous 3-4 jours.', dureeJours: 4 },
  { nom: 'Jus de pomme (ouvert)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Bien rebouché, à consommer sous 5 jours.', dureeJours: 5 },
  { nom: 'Lait de coco (ouvert)', categorie: CATEGORIES.CONDIMENTS, emplacement: MILIEU, conseil: 'Transvasé dans un récipient hermétique, sous 3 jours.', dureeJours: 3 },
  { nom: 'Tarama (entamé)', categorie: CATEGORIES.CONDIMENTS, emplacement: MILIEU, conseil: 'Bien refermé, à consommer sous 3 jours.', dureeJours: 3 },
  { nom: 'Sirop d’érable (ouvert)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Au frigo après ouverture, plusieurs mois.', dureeJours: 90 },
  { nom: 'Sauce pimentée (sriracha)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Se garde très longtemps grâce au vinaigre et au sel.', dureeJours: 120 },
  { nom: 'Vin blanc (ouvert)', categorie: CATEGORIES.CONDIMENTS, emplacement: PORTE, conseil: 'Rebouché, 3-4 jours ; parfait pour cuisiner ensuite.', dureeJours: 4 },

  // ─────────────────── ÉPICERIE SÈCHE & PLACARD ───────────────────
  { nom: 'Pain (boule, campagne)', categorie: CATEGORIES.EPICERIE, emplacement: AMBIANT, conseil: 'Dans un sac en tissu ou une boîte à pain ; jamais au frigo, il rassit plus vite.', dureeJours: 3 },
  { nom: 'Baguette', categorie: CATEGORIES.EPICERIE, emplacement: AMBIANT, conseil: 'À consommer le jour même ; se congèle très bien coupée en deux.', dureeJours: 1 },
  { nom: 'Pain de mie (entamé)', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'Sachet bien refermé, à l’abri de la chaleur.', dureeJours: 7 },
  { nom: 'Riz sec', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En bocal hermétique, à l’abri de l’humidité.', dureeJours: 365 },
  { nom: 'Pâtes sèches', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En bocal hermétique, quasi illimité.', dureeJours: 365 },
  { nom: 'Farine', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En bocal fermé pour éviter les mites alimentaires.', dureeJours: 180 },
  { nom: 'Sucre', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'Au sec, il se garde indéfiniment.', dureeJours: 365 },
  { nom: 'Café (moulu, entamé)', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'Boîte hermétique à l’abri de la lumière ; pas au frigo (humidité et odeurs).', dureeJours: 60 },
  { nom: 'Thé', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En boîte hermétique, à l’abri de la lumière.', dureeJours: 365 },
  { nom: 'Huile d’olive', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'À l’abri de la lumière et de la chaleur ; jamais au frigo (elle fige).', dureeJours: 120 },
  { nom: 'Huile de tournesol', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'Bouteille bien fermée, à l’abri de la lumière.', dureeJours: 180 },
  { nom: 'Chocolat', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'Au sec, entre 15 et 18 °C ; le frigo le fait blanchir.', dureeJours: 180 },
  { nom: 'Céréales (entamées)', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'Sachet bien refermé ou bocal, sinon elles ramollissent.', dureeJours: 60 },
  { nom: 'Biscuits (entamés)', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En boîte métallique ou sachet bien refermé.', dureeJours: 30 },
  { nom: 'Noix', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En coque au sec ; décortiquées, en bocal (elles rancissent à l’air).', dureeJours: 90 },
  { nom: 'Amandes', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En bocal hermétique, à l’abri de la chaleur.', dureeJours: 90 },
  { nom: 'Lentilles sèches', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En bocal hermétique, quasi illimité.', dureeJours: 365 },
  { nom: 'Pois chiches secs', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En bocal hermétique, quasi illimité.', dureeJours: 365 },
  { nom: 'Conserve (non ouverte)', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'Au sec ; une fois ouverte, transvasez le contenu au frigo (48 h).', dureeJours: 365 },
  { nom: 'Chapelure', categorie: CATEGORIES.EPICERIE, emplacement: PLACARD, conseil: 'En bocal hermétique, à l’abri de l’humidité.', dureeJours: 90 },
]

/*
  Règles de séparation éthylène :
  - PRODUCTEURS (pommes, bananes, tomates, avocats, poires…) : ils accélèrent
    le mûrissement et la dégradation des végétaux voisins.
  - SENSIBLES (salades, légumes verts, herbes…) : à tenir à l'écart des producteurs.
*/

/** Liste courte des producteurs d'éthylène (pour les messages d'avertissement). */
export const EXEMPLES_PRODUCTEURS = 'pommes, bananes, tomates, avocats'

/** Liste courte des aliments sensibles à l'éthylène. */
export const EXEMPLES_SENSIBLES = 'salades, légumes verts, herbes fraîches'

/**
 * Retourne la phrase "à ne pas mettre à côté de…" pour un aliment donné,
 * ou null s'il n'est pas concerné par l'éthylène.
 */
export function incompatibilites(aliment) {
  if (aliment?.ethylene === 'producteur') {
    return `Produit de l’éthylène : à éloigner des ${EXEMPLES_SENSIBLES}.`
  }
  if (aliment?.ethylene === 'sensible') {
    return `Sensible à l’éthylène : à éloigner des ${EXEMPLES_PRODUCTEURS}.`
  }
  return null
}
