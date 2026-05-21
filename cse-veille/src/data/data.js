// ─────────────────────────────────────────────
// CSE Veille — data.js
// Source unique de vérité : narratif, BTS, sources
// ─────────────────────────────────────────────

export const BTS_LIST = [
  {
    code: 'MCO',
    label: 'Management Commercial Opérationnel',
    livrable: 'Note de veille concurrentielle',
    cadrage: 'Alternatives identifiées, positionnement marché, points de vigilance, éléments de décision pour les praticiens.',
    placeholder: 'Rédigez votre note de veille concurrentielle…\n\nStructure suggérée :\n1. Contexte et enjeux\n2. Panorama des alternatives\n3. Analyse comparative\n4. Points de vigilance\n5. Recommandations',
  },
  {
    code: 'NDRC',
    label: 'Négociation & Digitalisation de la Relation Client',
    livrable: 'Fiche d\'argumentation',
    cadrage: 'Ce que Vanessa peut dire aux praticiens pour objectiver la décision et structurer la négociation.',
    placeholder: 'Rédigez votre fiche d\'argumentation…\n\nStructure suggérée :\n1. Arguments clés pour la décision\n2. Objections prévisibles et réponses\n3. Données chiffrées mobilisables\n4. Proposition de démarche',
  },
  {
    code: 'GPME',
    label: 'Gestion de la PME',
    livrable: 'Synthèse décisionnelle',
    cadrage: 'Impact financier chiffré, risques juridiques (RGPD/HDS), analyse coût/bénéfice, recommandation opérationnelle.',
    placeholder: 'Rédigez votre synthèse décisionnelle…\n\nStructure suggérée :\n1. Diagnostic financier (impact +18%)\n2. Analyse des risques juridiques\n3. Options disponibles et coûts comparés\n4. Recommandation motivée',
  },
  {
    code: 'COM',
    label: 'Communication',
    livrable: 'État des lieux médiatique et réputationnel',
    cadrage: 'Ce qui se dit, ce qui s\'écrit sur le sujet, ce que ça implique pour la communication du Pôle.',
    placeholder: 'Rédigez votre état des lieux médiatique…\n\nStructure suggérée :\n1. Cartographie des discours en présence\n2. Analyse de l\'e-réputation Doctolib\n3. Signaux faibles détectés\n4. Implications pour la communication du Pôle',
  },
  {
    code: 'TOURISME',
    label: 'Tourisme',
    livrable: 'Note de veille sectorielle',
    cadrage: 'Panorama du marché des solutions de RDV médical, acteurs, modèles économiques, tendances de fond.',
    placeholder: 'Rédigez votre note de veille sectorielle…\n\nStructure suggérée :\n1. Présentation du marché\n2. Acteurs identifiés et positionnements\n3. Tendances et évolutions\n4. Enseignements pour le Pôle',
  },
]

export const getBTS = (code) => BTS_LIST.find(b => b.code === code)

// ─── FRAGMENTS ───────────────────────────────
export const FRAGMENTS = {
  a: {
    id: 'a',
    label: 'Ordre du jour',
    sublabel: 'Réunion coordination',
    type: 'odj',
  },
  b: {
    id: 'b',
    label: 'Fil WhatsApp',
    sublabel: 'Transféré par erreur',
    type: 'whatsapp',
  },
  c: {
    id: 'c',
    label: 'Post LinkedIn',
    sublabel: 'Directeur MSP Les Herbiers',
    type: 'linkedin',
  },
  d: {
    id: 'd',
    label: 'Article presse',
    sublabel: 'Bonus · What\'s Up Doc',
    type: 'bonus',
    locked: true,
  },
}

// ─── AXES DE VEILLE ───────────────────────────
export const AXES = [
  { id: 'A1', label: 'Concurrentielle', color: '#1D9E75' },
  { id: 'A2', label: 'Tarifaire / Financière', color: '#BA7517' },
  { id: 'A3', label: 'Réglementaire', color: '#534AB7' },
  { id: 'A4', label: 'Communication / e-réputation', color: '#D4537E' },
  { id: 'A5', label: 'Usages patients', color: '#378ADD' },
]

// ─── RÉSULTATS DE RECHERCHE SIMULÉS ──────────
export const SEARCH_RESULTS = [
  {
    id: 'maiia-tarifs',
    axe: 'A1',
    url: 'maiia.com',
    urlDisplay: 'https://www.maiia.com/tarifs-professionnels',
    title: 'Maiia — Tarifs et offres pour les professionnels de santé',
    body: 'Maiia propose une solution de gestion de cabinet et de prise de rendez-vous en ligne pour les médecins libéraux et les maisons de santé pluridisciplinaires. Déployée dans plus de 12 000 structures en France.',
    highlight: '<strong>Offre Cabinet :</strong> à partir de 69 €/mois par praticien — sans engagement. Hébergement certifié HDS inclus. Conformité RGPD documentée. Interopérabilité avec les principaux logiciels métier.',
    pinText: 'Maiia — 69€/mois/praticien, HDS certifié, sans engagement',
  },
  {
    id: 'ans-hds',
    axe: 'A3',
    url: 'esante.gouv.fr',
    urlDisplay: 'https://esante.gouv.fr/securite/hds/hebergeurs-certifies',
    title: 'Hébergement de données de santé — Annuaire des hébergeurs certifiés',
    body: "L'ANS publie la liste des hébergeurs de données de santé ayant obtenu la certification HDS. Cette certification est obligatoire pour tout prestataire traitant des données de santé à caractère personnel en France.",
    highlight: 'Doctolib, Maiia et Clickdoc figurent dans l\'annuaire certifié HDS. La certification couvre l\'hébergement, la sauvegarde et l\'infogérance des systèmes d\'information de santé.',
    pinText: 'ANS — Doctolib, Maiia, Clickdoc : hébergeurs HDS certifiés',
  },
  {
    id: 'kalizi-msp',
    axe: 'A1',
    url: 'kalizi.fr',
    urlDisplay: 'https://www.kalizi.fr/maisons-de-sante',
    title: 'Kalizi — Solution spécialisée maisons de santé pluridisciplinaires',
    body: 'Kalizi (anciennement RDVmédicaux) propose une solution conçue spécifiquement pour les MSP, avec agenda partagé multi-praticiens et module de coordination interne.',
    highlight: '<strong>Tarif MSP :</strong> 49 €/mois pour la structure + 19 €/mois par praticien. Conformité HDS en cours de certification. Référencé par l\'ANS dans son catalogue de solutions.',
    pinText: 'Kalizi — 49€ structure + 19€/praticien, spécialisé MSP',
  },
  {
    id: 'cnil-sante',
    axe: 'A3',
    url: 'cnil.fr',
    urlDisplay: 'https://www.cnil.fr/fr/professionnels-de-sante',
    title: 'CNIL — RGPD et données de santé : obligations des professionnels',
    body: 'Les données de santé sont des données sensibles au sens du RGPD. Leur traitement est soumis à des obligations spécifiques renforcées. Tout changement de prestataire implique une analyse d\'impact (AIPD).',
    highlight: '<strong>Point clé migration :</strong> en cas de changement d\'hébergeur, une AIPD (Analyse d\'Impact relative à la Protection des Données) est recommandée. Les patients doivent être informés de tout changement affectant leurs données.',
    pinText: 'CNIL — migration prestataire : AIPD recommandée, patients à informer',
  },
  {
    id: 'trustpilot-doctolib',
    axe: 'A4',
    url: 'fr.trustpilot.com',
    urlDisplay: 'https://fr.trustpilot.com/review/doctolib.fr',
    title: 'Doctolib — Avis praticiens sur Trustpilot',
    body: 'Note globale : 3,2/5 sur 847 avis. Les praticiens soulignent la notoriété de la plateforme auprès des patients mais critiquent régulièrement le service client et les hausses tarifaires.',
    highlight: '"Support difficile à joindre lors des migrations." · "Tarifs qui augmentent sans négociation possible." · "Les patients sont habitués, difficile de partir sans les prévenir." — Extraits représentatifs des avis récents.',
    pinText: 'Trustpilot Doctolib — 3,2/5 : critiques sur tarifs et support',
  },
  {
    id: 'credoc-fracture',
    axe: 'A5',
    url: 'arcep.fr',
    urlDisplay: 'https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-2023.pdf',
    title: 'Baromètre du numérique 2023 — CREDOC / Arcep',
    body: 'Enquête annuelle sur les usages numériques des Français. Focus sur les populations éloignées du numérique : personnes âgées, populations rurales, bas revenus.',
    highlight: '<strong>Données Nouvelle-Aquitaine :</strong> 23% des plus de 65 ans déclarent ne jamais utiliser internet. La prise de RDV en ligne reste inaccessible pour environ 1 patient sur 5 en zone rurale.',
    pinText: 'CREDOC 2023 — 23% des +65 ans hors ligne, 1/5 patients ruraux sans accès RDV en ligne',
  },
]

// ─── QUESTIONS D'AIDE VANESSA ─────────────────
export const HELP_QUESTIONS = [
  'Qui d\'autre a vécu ça, et qu\'ont-ils fait ?',
  'Quelles solutions existent vraiment, et à quel prix ?',
  'Les données de nos patients sont-elles protégées quelle que soit la solution choisie ?',
]
