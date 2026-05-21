// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — main.jsx
//  Écran de sélection BTS + login étudiant + boot desktop
// ══════════════════════════════════════════════════════════════
const { useState: useRootState, useEffect: useRootEffect } = React;

// ─── État global session ────────────────────────────────────
window.CSE_STATE = {
  pins: [],
  livrable: '',
  mailDoctolibOpened: false,
  fragAOpened: false,
  fragBOpened: false,
  fragCOpened: false,
  onPinsChange: null,
  onPinsChangeLivrable: null,
  checkBonusUnlock: null
};

// Déverrouillage du fragment D
window.CSE_STATE.checkBonusUnlock = () => {
  const s = window.CSE_STATE;
  if (s.fragAOpened && s.fragBOpened && s.fragCOpened && s.mailDoctolibOpened) {
    window.CSE_DATA.fragments.d.unlocked = true;
    if (window.__pushNotif) window.__pushNotif({
      app: 'Fragments', icon: '📰', color: '#1a3a2e',
      title: 'Fragment D déverrouillé',
      body: 'Un article de presse est maintenant accessible dans vos fragments.',
      click: { app: 'notes' }
    });
  }
};

// ─── Écran de sélection BTS ──────────────────────────────────
function BTSScreen({ onConfirm }) {
  const [prenom, setPrenom] = useRootState('');
  const [bts, setBts] = useRootState(null);
  const [shake, setShake] = useRootState(false);

  const canConfirm = prenom.trim() && bts;

  function confirm() {
    if (!canConfirm) { setShake(true); setTimeout(() => setShake(false), 500); return; }
    const D = window.CSE_DATA;
    D.student.prenom = prenom.trim();
    D.student.name = prenom.trim();
    D.student.initial = prenom.trim()[0].toUpperCase();
    D.student.bts = bts;
    onConfirm();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: `
        radial-gradient(ellipse 70% 55% at 15% 25%, rgba(168,212,184,.3) 0%, transparent 55%),
        radial-gradient(ellipse 80% 60% at 50% 90%, rgba(30,80,60,.4) 0%, transparent 60%),
        linear-gradient(160deg, #1a4a32 0%, #2a6a48 25%, #1a3a2e 55%, #0d2018 100%)
      `,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: 'white', padding: '2rem', fontFamily: 'var(--font-sans)'
    }}>
      {/* Titre */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: .65, marginBottom: 8 }}>
        CSE Pilote · Éminéo · Veille & Traitement de l'information
      </div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 6, textShadow: '0 2px 12px rgba(0,0,0,.3)' }}>
        Pôle Santé Confluences
      </div>
      <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 16, opacity: .6, marginBottom: 48 }}>
        Niort · J-90 avant la réunion praticiens
      </div>

      <div style={{
        background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,.18)', borderRadius: 16,
        padding: '32px 36px', width: '100%', maxWidth: 480,
        animation: shake ? 'shake 0.4s ease' : 'none'
      }}>
        {/* Prénom */}
        <div style={{ fontSize: 13, opacity: .85, marginBottom: 20, lineHeight: 1.6 }}>
          Vous allez entrer dans ce dossier en tant que collaborateur·rice externe.<br/>
          <span style={{ opacity: .65 }}>Comment vous appelez-vous ?</span>
        </div>
        <input
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && confirm()}
          placeholder="Votre prénom *"
          autoFocus
          style={{
            width: '100%', padding: '10px 14px', marginBottom: 24,
            border: prenom.trim() ? '1.5px solid rgba(168,212,184,.6)' : '1.5px solid rgba(255,255,255,.2)',
            borderRadius: 10, background: 'rgba(255,255,255,.12)',
            color: 'white', fontSize: 14, outline: 'none',
            fontFamily: 'var(--font-sans)', transition: 'border-color .2s'
          }}
        />

        {/* Sélection BTS */}
        <div style={{ fontSize: 13, opacity: .85, marginBottom: 12 }}>Votre filière BTS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 28 }}>
          {window.CSE_DATA.bts.map((b, i) => (
            <button
              key={b.code}
              onClick={() => setBts(b.code)}
              style={{
                padding: '9px 12px',
                border: bts === b.code ? '1.5px solid rgba(168,212,184,.8)' : '1.5px solid rgba(255,255,255,.2)',
                borderRadius: 10, background: bts === b.code ? 'rgba(168,212,184,.15)' : 'rgba(255,255,255,.08)',
                color: bts === b.code ? '#a8d4b8' : 'rgba(255,255,255,.8)',
                cursor: 'pointer', textAlign: 'left', lineHeight: 1.3, fontSize: 12.5, fontWeight: 500,
                gridColumn: i === window.CSE_DATA.bts.length - 1 ? 'span 2' : 'span 1',
                transition: 'all .18s', fontFamily: 'var(--font-sans)'
              }}>
              <span style={{ fontSize: 10, display: 'block', opacity: .65, marginBottom: 2, fontFamily: 'var(--font-mono)' }}>BTS {b.code}</span>
              {b.label}
            </button>
          ))}
        </div>

        <button
          onClick={confirm}
          style={{
            width: '100%', padding: '12px', borderRadius: 10, border: 'none',
            background: canConfirm ? 'rgba(168,212,184,.9)' : 'rgba(255,255,255,.2)',
            color: canConfirm ? '#0d2018' : 'rgba(255,255,255,.4)',
            fontSize: 14, fontWeight: 600, cursor: canConfirm ? 'pointer' : 'default',
            fontFamily: 'var(--font-sans)', transition: 'all .2s'
          }}>
          Entrer dans le dossier →
        </button>
      </div>
    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────
function RootApp() {
  const [phase, setPhase] = useRootState('bts'); // bts | desktop

  if (phase === 'bts') return <BTSScreen onConfirm={() => setPhase('desktop')}/>;
  return <window.CSEDesktop/>;
}

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(<RootApp/>);
