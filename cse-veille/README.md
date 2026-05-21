# CSE Veille — Pôle Santé Confluences

Application pédagogique interactive — Veille & Traitement de l'information  
BTS MCO · NDRC · GPME · COM · Tourisme  
Éminéo · Déploiement septembre 2026

---

## Stack

- **React 18** + **Vite 5**
- Stateless (V1) — pas de backend, pas de base de données
- Déployé sur **Vercel**

## Démarrage local

```bash
npm install
npm run dev
```

## Déploiement Vercel

```bash
# Depuis le repo cse-veille
vercel
```

Ou via l'interface Vercel : importer le repo GitHub `cse-veille`, Vite détecté automatiquement.

---

## Architecture

```
src/
├── App.jsx              # Orchestrateur — état global + routing
├── main.jsx             # Point d'entrée React
├── styles.css           # Design system + tokens CSS
├── components/
│   └── Topbar.jsx       # Barre de navigation partagée
├── data/
│   └── data.js          # Source unique : BTS, fragments, sources, axes
└── screens/
    ├── ScreenBTS.jsx    # M0 — sélection filière
    ├── ScreenM1.jsx     # M1 — signal vidéo
    ├── ScreenM2.jsx     # M2 — webmail Vanessa
    ├── ScreenM3.jsx     # M3 — fragments A/B/C/D
    ├── ScreenM4.jsx     # M4 — mail Doctolib
    ├── ScreenM5.jsx     # M5 — veille + collecte
    ├── ScreenM6.jsx     # M6 — production livrable
    └── ScreenM7.jsx     # M7 — retour + memento
```

## Feuille de route

| Version | Contenu |
|---------|---------|
| V1 (sept. 2026) | Flux complet stateless, 5 BTS, déployé Vercel |
| V2 | Claude API — memento connecté au référentiel BTS |
| V3 | Supabase — persistance groupes, sessions, livrables |
