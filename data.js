// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — data.js
//  Source unique de vérité : narratif, BTS, fragments, sources
// ══════════════════════════════════════════════════════════════

window.CSE_DATA = {

  // ── Étudiant (rempli au login) ─────────────────────────────
  student: { name: '', prenom: '', initial: '', bts: '' },

  // ── Contexte ───────────────────────────────────────────────
  context: {
    structure: 'Pôle Santé Confluences',
    ville: 'Niort',
    coordinatrice: 'Vanessa Moreau',
    prestataire: 'Doctolib',
    hausse: '+18%',
    prixAvant: '139 €',
    prixApres: '164 €',
    nbPraticiens: 8,
    reunionDate: 'novembre',
    jMoins: 'J-90'
  },

  // ── BTS ────────────────────────────────────────────────────
  bts: [
    {
      code: 'MCO',
      label: 'Management Commercial Opérationnel',
      livrableType: 'Note de veille concurrentielle',
      cadrage: 'Alternatives identifiées, positionnement marché, points de vigilance, éléments de décision pour les praticiens.',
      placeholder: 'Rédigez votre note de veille concurrentielle…\n\nStructure suggérée :\n1. Contexte et enjeux\n2. Panorama des alternatives\n3. Analyse comparative (offre, tarifs, HDS)\n4. Points de vigilance\n5. Recommandations',
      minMots: 150
    },
    {
      code: 'NDRC',
      label: 'Négociation & Digitalisation de la Relation Client',
      livrableType: 'Fiche d\'argumentation',
      cadrage: 'Ce que Vanessa peut dire aux praticiens pour objectiver la décision et structurer la négociation.',
      placeholder: 'Rédigez votre fiche d\'argumentation…\n\nStructure suggérée :\n1. Arguments clés pour la décision\n2. Objections prévisibles et réponses\n3. Données chiffrées mobilisables\n4. Proposition de démarche',
      minMots: 150
    },
    {
      code: 'GPME',
      label: 'Gestion de la PME',
      livrableType: 'Synthèse décisionnelle',
      cadrage: 'Impact financier chiffré, risques juridiques (RGPD/HDS), analyse coût/bénéfice, recommandation opérationnelle.',
      placeholder: 'Rédigez votre synthèse décisionnelle…\n\nStructure suggérée :\n1. Diagnostic financier (impact +18% × 8 praticiens)\n2. Analyse des risques juridiques (RGPD/HDS)\n3. Options disponibles et coûts comparés\n4. Recommandation motivée',
      minMots: 150
    },
    {
      code: 'COM',
      label: 'Communication',
      livrableType: 'État des lieux médiatique et réputationnel',
      cadrage: 'Ce qui se dit, ce qui s\'écrit sur le sujet, ce que ça implique pour la communication du Pôle.',
      placeholder: 'Rédigez votre état des lieux médiatique…\n\nStructure suggérée :\n1. Cartographie des discours en présence\n2. Analyse de l\'e-réputation Doctolib\n3. Signaux faibles détectés\n4. Implications pour la communication du Pôle',
      minMots: 150
    },
    {
      code: 'TOURISME',
      label: 'Tourisme',
      livrableType: 'Note de veille sectorielle',
      cadrage: 'Panorama du marché des solutions de RDV médical, acteurs, modèles économiques, tendances de fond.',
      placeholder: 'Rédigez votre note de veille sectorielle…\n\nStructure suggérée :\n1. Présentation du marché\n2. Acteurs identifiés et positionnements\n3. Tendances et évolutions\n4. Enseignements pour le Pôle',
      minMots: 150
    }
  ],

  // ── Mail de Vanessa ────────────────────────────────────────
  mailVanessa: {
    id: 'vanessa_init',
    from: 'Vanessa Moreau',
    fromEmail: 'v.moreau@polesanteconfluences.fr',
    avatar: 'VM',
    avatarColor: '#1a3a2e',
    subject: '(sans objet)',
    date: 'Aujourd\'hui, 08h14',
    preview: 'Je ne sais pas trop par où commencer. On vient de recevoir quelque chose…',
    unread: true,
    flagged: true,
    body: `Bonjour,

Je ne sais pas trop par où commencer. On vient de recevoir quelque chose d'un de nos prestataires numériques. J'ai besoin qu'on réfléchisse à ça ensemble avant la réunion de novembre.

Je vous transmets le mail en question.

Vanessa`,
    attachment: { name: 'mail_prestataire_numerique.pdf', size: '38 Ko', id: 'doctolib_mail' }
  },

  mailDoctolib: {
    id: 'doctolib_mail',
    from: 'Equipe Compte — Doctolib Pro',
    fromEmail: 'pro@doctolib.fr',
    avatar: 'D',
    avatarColor: '#00a6d6',
    subject: 'Évolution de votre abonnement au 1er janvier',
    date: '14 octobre · 11h03',
    preview: 'Dans le cadre de notre politique tarifaire annuelle…',
    unread: false,
    body: `Madame, Monsieur,

Dans le cadre de notre politique tarifaire annuelle et afin de financer nos investissements en infrastructure, sécurité et nouvelles fonctionnalités, nous procédons à une révision de nos tarifs d'abonnement.

À compter du 1er janvier prochain, le tarif mensuel de votre abonnement sera ajusté de +18%, passant de 139 € à 164 € HT par praticien et par mois.

Cette évolution reflète notre engagement continu à vous offrir une solution performante et conforme aux exigences réglementaires en matière de données de santé.

Pour toute question, votre chargé de compte reste disponible.

Cordialement,
L'équipe Doctolib Pro`,
    postit: '8 praticiens.\nNovembre.\n— Vanessa'
  },

  // Emails distracteurs
  mailsDistracteurs: [
    {
      id: 'd1', from: 'CPAM Deux-Sèvres', fromEmail: 'no-reply@cpam79.fr',
      avatar: 'CP', avatarColor: '#003189',
      subject: 'Mise à jour protocole téléexpertise — à lire avant le 31/10',
      date: '13 octobre · 09h20',
      preview: 'Suite à la parution du décret du 8 octobre, les règles de facturation…',
      unread: true, distractor: true,
      body: 'Suite à la parution du décret du 8 octobre, les règles de facturation de la téléexpertise évoluent. Veuillez consulter la notice jointe avant le 31 octobre.'
    },
    {
      id: 'd2', from: 'FNMPS', fromEmail: 'info@fnmps.fr',
      avatar: 'FN', avatarColor: '#2a5a3a',
      subject: 'Webinaire : financer la transition numérique de votre MSP',
      date: '11 octobre · 14h55',
      preview: 'Inscrivez-vous à notre prochain webinaire sur les aides ACI et les outils…',
      unread: false, distractor: true,
      body: 'Inscrivez-vous à notre prochain webinaire sur les aides ACI et les outils numériques pour MSP. Mardi 22 octobre à 12h30 — lien de connexion sur inscription.'
    },
    {
      id: 'd3', from: 'Ordre National des Médecins', fromEmail: 'contact@conseil-national.medecin.fr',
      avatar: 'ON', avatarColor: '#14345a',
      subject: 'Newsletter octobre — déontologie numérique et consentement patient',
      date: '10 octobre · 08h00',
      preview: 'Au sommaire : données de santé, consentement éclairé et outils de prise de RDV…',
      unread: false, distractor: true,
      body: 'Au sommaire ce mois-ci : données de santé et consentement éclairé, outils de prise de RDV en ligne — ce que dit le code de déontologie, et actualités réglementaires CNIL.'
    }
  ],

  // ── Fragments ──────────────────────────────────────────────
  fragments: {
    a: {
      id: 'a', label: 'Ordre du jour', sublabel: 'Réunion coordination',
      icon: '📋', unlocked: true
    },
    b: {
      id: 'b', label: 'Fil WhatsApp', sublabel: 'Transféré par erreur',
      icon: '💬', unlocked: true
    },
    c: {
      id: 'c', label: 'Post LinkedIn', sublabel: 'Directeur MSP Les Herbiers',
      icon: 'in', unlocked: true
    },
    d: {
      id: 'd', label: 'Article presse', sublabel: 'What\'s Up Doc · Bonus',
      icon: '📰', unlocked: false
    }
  },

  // ── Sources de recherche simulées ─────────────────────────
  sources: [
    {
      id: 'maiia',
      axe: 'A1', axeLabel: 'Concurrentielle',
      url: 'maiia.com',
      urlFull: 'https://www.maiia.com/tarifs-professionnels',
      title: 'Maiia — Tarifs et offres pour les professionnels de santé',
      body: 'Maiia propose une solution de gestion de cabinet et de prise de rendez-vous en ligne pour les médecins libéraux et les maisons de santé pluridisciplinaires. Déployée dans plus de 12 000 structures en France.',
      highlight: '<strong>Offre Cabinet :</strong> à partir de 69 €/mois par praticien, sans engagement. Hébergement certifié HDS inclus. Conformité RGPD documentée. Interopérabilité avec les principaux logiciels métier (Medistory, Crossway, Doctocare).',
      pinText: 'Maiia — 69 €/mois/praticien, HDS certifié, sans engagement'
    },
    {
      id: 'ans-hds',
      axe: 'A3', axeLabel: 'Réglementaire',
      url: 'esante.gouv.fr',
      urlFull: 'https://esante.gouv.fr/securite/hds/hebergeurs-certifies',
      title: 'ANS — Hébergeurs de données de santé certifiés HDS',
      body: "L'ANS publie la liste des hébergeurs de données de santé ayant obtenu la certification HDS. Cette certification est obligatoire pour tout prestataire traitant des données de santé à caractère personnel en France.",
      highlight: 'Doctolib, Maiia et Clickdoc figurent dans l\'annuaire certifié HDS à jour. La certification couvre l\'hébergement, la sauvegarde et l\'infogérance. <strong>En cas de migration :</strong> une AIPD est recommandée et les patients doivent être informés.',
      pinText: 'ANS — Doctolib, Maiia, Clickdoc certifiés HDS. Migration : AIPD + info patients obligatoires.'
    },
    {
      id: 'kalizi',
      axe: 'A1', axeLabel: 'Concurrentielle',
      url: 'kalizi.fr',
      urlFull: 'https://www.kalizi.fr/maisons-de-sante',
      title: 'Kalizi — Solution spécialisée maisons de santé pluridisciplinaires',
      body: 'Kalizi (anciennement RDVmédicaux) propose une solution conçue pour les MSP, avec agenda partagé multi-praticiens et module de coordination interne.',
      highlight: '<strong>Tarif MSP :</strong> 49 €/mois pour la structure + 19 €/mois par praticien. Spécialisation MSP : agenda partagé, coordination, statistiques d\'activité. Référencé ANS. Certification HDS en cours.',
      pinText: 'Kalizi — 49 €/structure + 19 €/praticien, spécialisé MSP, HDS en cours'
    },
    {
      id: 'cnil',
      axe: 'A3', axeLabel: 'Réglementaire',
      url: 'cnil.fr',
      urlFull: 'https://www.cnil.fr/fr/professionnels-de-sante',
      title: 'CNIL — RGPD et données de santé : obligations des professionnels',
      body: 'Les données de santé sont des données sensibles au sens du RGPD. Leur traitement est soumis à des obligations renforcées. Tout changement de prestataire implique une analyse d\'impact.',
      highlight: '<strong>Obligation clé :</strong> toute structure utilisant un sous-traitant pour héberger des données de santé doit signer un DPA (Data Processing Agreement). En cas de changement, une AIPD est recommandée et le registre des traitements doit être mis à jour.',
      pinText: 'CNIL — migration prestataire : DPA + AIPD + mise à jour registre traitements'
    },
    {
      id: 'trustpilot',
      axe: 'A4', axeLabel: 'E-réputation',
      url: 'fr.trustpilot.com',
      urlFull: 'https://fr.trustpilot.com/review/doctolib.fr',
      title: 'Doctolib Pro — Avis praticiens sur Trustpilot',
      body: 'Note globale Doctolib : 3,2/5 sur plus de 800 avis praticiens. Critiques récurrentes sur le support, les hausses tarifaires et la dépendance à la plateforme.',
      highlight: '"Le support est injoignable lors des migrations." · "Tarifs qui augmentent sans négociation possible." · "Les patients sont habitués à la plateforme, partir sans les prévenir est risqué." — Extraits représentatifs des avis des 6 derniers mois.',
      pinText: 'Trustpilot Doctolib — 3,2/5 : critiques tarifs, support, dépendance patients'
    },
    {
      id: 'credoc',
      axe: 'A5', axeLabel: 'Usages patients',
      url: 'arcep.fr · CREDOC',
      urlFull: 'https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-2023.pdf',
      title: 'Baromètre du numérique 2023 — CREDOC / Arcep',
      body: 'Enquête annuelle sur les usages numériques des Français. Focus sur les populations éloignées du numérique : personnes âgées, zones rurales, bas revenus.',
      highlight: '<strong>Données Nouvelle-Aquitaine :</strong> 23 % des plus de 65 ans déclarent ne jamais utiliser internet. La prise de RDV en ligne reste inaccessible pour environ 1 patient sur 5 en zone rurale. Impact direct sur les structures gérant leur propre patientèle.',
      pinText: 'CREDOC 2023 — 23 % des +65 ans hors ligne · 1/5 patients ruraux sans accès RDV en ligne'
    }
  ],

  // ── Questions d'aide ───────────────────────────────────────
  helpQuestions: [
    'Qui d\'autre a vécu ça, et qu\'ont-ils fait ?',
    'Quelles solutions existent vraiment, et à quel prix ?',
    'Les données de nos patients sont-elles protégées quelle que soit la solution choisie ?'
  ]
};
