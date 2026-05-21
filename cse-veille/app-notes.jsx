// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — app-notes.jsx
//  Fragments narratifs A (ODJ) · B (WhatsApp) · C (LinkedIn) · D (bonus)
// ══════════════════════════════════════════════════════════════
const { useState: useNotesState, useEffect: useNotesEffect } = React;

// ── Fragment A — Ordre du jour ─────────────────────────────
function FragODJ() {
  return (
    <div style={{ padding: '24px 28px', overflow: 'auto', height: '100%', background: '#faf9f6' }}>
      <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>Fragment A — Ordre du jour · Réunion de coordination</div>
      <div style={{
        background: '#fffef8', border: '1px solid #ddd8c0', borderRadius: 4,
        padding: '20px 24px', maxWidth: 520, fontSize: 13, lineHeight: 1.8,
        boxShadow: '0 2px 12px rgba(0,0,0,.06)', fontFamily: 'var(--font-sans)'
      }}>
        <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(20,24,36,.1)' }}>
          Pôle Santé Confluences · Réunion de coordination<br/>
          <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>Lundi 16 septembre · 12h00 · Salle de réunion</span>
        </div>
        {[
          ['1.', 'Tour de table — actualités du Pôle', false],
          ['2.', 'Plannings de remplacement — octobre / novembre', false],
          ['3.', 'Commande fournitures médicales — validation bons', false],
          ['4.', 'Accueil secrétaire remplaçante — Mme Fabre', false],
          ['5.', 'Renouvellement convention bâtiment — point DRH', false],
          ['6.', 'Budget outils numériques — point à faire en novembre', true],
          ['7.', 'Divers', false],
        ].map(([n, t, hl]) => (
          <div key={n} style={{ display: 'flex', gap: 12, marginBottom: 6, color: hl ? 'var(--ink)' : 'var(--ink-mute)', fontWeight: hl ? 500 : 400 }}>
            <span style={{ flexShrink: 0, color: 'var(--ink-faint)', minWidth: 20 }}>{n}</span>
            <span>{t}</span>
          </div>
        ))}
        <div style={{ marginLeft: 32, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#8b3a1a', opacity: .85, marginTop: 2 }}>
          voir si on peut faire autrement
        </div>
      </div>
    </div>
  );
}

// ── Fragment B — WhatsApp ──────────────────────────────────
function FragWhatsApp() {
  const messages = [
    { side: 'them', text: 'Bon weekend ?', time: 'Sam 12 oct · 09h14' },
    { side: 'me', text: 'Oui merci ! Toi ?', time: '09h21' },
    { side: 'them', text: "Couci-couça. Dis, t'as vu le mail de ce matin ?", time: '09h23' },
    { side: 'me', text: 'Lequel 😅', time: '09h24' },
    { side: 'them', text: 'Doctolib. La tarification.', time: '09h24' },
    { side: 'me', text: "Ah. Pas encore ouvert.", time: '09h26' },
    { side: 'them', text: 'Ouvre.', time: '09h26' },
    { side: 'me', text: '...', time: '09h31' },
    { side: 'me', text: 'Ok je vois.', time: '09h31' },
    { side: 'them', text: "+18% c'est pas rien", time: '09h32' },
    { side: 'me', text: "Je sais pas trop quoi faire de ça pour l'instant", time: '09h34' },
    { side: 'them', text: 'On en parle en novembre non ? Tu peux préparer quelque chose ?', time: '09h35' },
    { side: 'me', text: "Je vais regarder ce qui existe", time: '09h37' },
    { side: 'them', text: "Parce que franchement si c'est pour payer plus cher un truc qui bug une fois sur trois...", time: '09h38' },
    { side: 'me', text: 'Haha ouais. Laisse-moi regarder', time: '09h41' },
    { side: 'them', text: "T'as vu le post de Dupré sur LinkedIn au fait ?", time: '09h42' },
  ];

  return (
    <div style={{ padding: '24px 28px', overflow: 'auto', height: '100%', background: '#faf9f6' }}>
      <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>Fragment B — Fil WhatsApp · Transféré par erreur</div>
      <div style={{ background: '#e5ddd5', borderRadius: 12, maxWidth: 360, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.12)' }}>
        <div style={{ background: '#075e54', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#128c7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'white', fontWeight: 700 }}>DL</div>
          <div>
            <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Dr Leroux</div>
            <div style={{ color: 'rgba(255,255,255,.65)', fontSize: 11 }}>Médecin généraliste · Pôle Santé Confluences</div>
          </div>
        </div>
        <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 420, overflow: 'auto' }}>
          <div style={{ background: '#fff8e6', border: '1px solid #e8c97a', borderRadius: 4, padding: '6px 10px', fontSize: 10.5, color: '#7a5c14', textAlign: 'center', fontStyle: 'italic', marginBottom: 4 }}>
            Ce message vous a été transféré par inadvertance.
          </div>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.side === 'me' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                background: msg.side === 'me' ? '#dcf8c6' : 'white',
                borderRadius: msg.side === 'me' ? '8px 0 8px 8px' : '0 8px 8px 8px',
                padding: '7px 10px', fontSize: 12, lineHeight: 1.5, maxWidth: '78%'
              }}>
                {msg.text}
                <div style={{ fontSize: 9.5, color: '#999', textAlign: 'right', marginTop: 2 }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Fragment C — LinkedIn ──────────────────────────────────
function FragLinkedIn() {
  return (
    <div style={{ padding: '24px 28px', overflow: 'auto', height: '100%', background: '#faf9f6' }}>
      <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>Fragment C — Post LinkedIn · Directeur MSP Les Herbiers</div>
      <div style={{ background: 'white', border: '1px solid #e0ddd8', borderRadius: 8, maxWidth: 520, padding: '18px 20px', fontSize: 13, lineHeight: 1.75, boxShadow: '0 1px 6px rgba(0,0,0,.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>FD</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1a1a1a' }}>François Dupré</div>
            <div style={{ fontSize: 11.5, color: '#666' }}>Directeur · MSP Les Herbiers · 847 abonnés</div>
            <div style={{ fontSize: 11, color: '#999' }}>Il y a 3 semaines</div>
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a', marginBottom: 10 }}>Quitter Doctolib ? Qui aurait l'audace de le faire ?</div>
        <div style={{ color: '#3a3a3a' }}>
          {[
            "Nous l'avons fait. En janvier dernier, après six ans d'utilisation et une nouvelle révision tarifaire que nous n'avions pas anticipée.",
            "Ce n'était pas une décision idéologique. C'était une décision de gestion. Quand le coût d'un outil dépasse ce qu'il produit en valeur réelle pour votre structure — et pour vos patients — il faut se poser la question.",
            "Nous avons pris trois mois pour faire le tour du marché. Les alternatives existent. Elles ne sont pas toutes au même niveau de maturité. Certaines ont des lacunes sur l'interopérabilité, d'autres sur la conformité HDS. Mais certaines sont sérieuses, moins chères, et franchement plus réactives sur le support.",
            "Ce qui m'a le plus surpris : la migration a pris deux semaines. Nos patients ont été informés. Deux ou trois ont appelé pour demander comment ça marchait. C'est tout.",
          ].map((p, i) => <p key={i} style={{ marginBottom: 10 }}>{p}</p>)}
          <p style={{ color: '#777', fontStyle: 'italic' }}>DM ouverts si vous êtes dans la même réflexion.</p>
        </div>
        <div style={{ display: 'flex', gap: 18, borderTop: '1px solid #f0edea', paddingTop: 10, marginTop: 10, fontSize: 12, color: '#666' }}>
          <span>👍 312</span><span>💬 47 commentaires</span><span>↗ 28 republications</span>
        </div>
      </div>
    </div>
  );
}

// ── Fragment D — Bonus ─────────────────────────────────────
function FragBonus() {
  return (
    <div style={{ padding: '24px 28px', overflow: 'auto', height: '100%', background: '#faf9f6' }}>
      <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>Fragment D — Article de presse · Bonus</div>
      <div style={{ background: '#e8f2ec', border: '1px solid #a0c8b0', borderRadius: 8, padding: '18px 20px', maxWidth: 480, fontSize: 13, color: '#1a3a2e' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a8a6a', marginBottom: 8 }}>Bonus · Presse professionnelle santé</div>
        <p style={{ lineHeight: 1.65, marginBottom: 12 }}>
          Un article de <em>What's Up Doc</em> analyse les évolutions tarifaires des plateformes de prise de rendez-vous médical et les stratégies de sortie adoptées par certaines structures de soins en France.
        </p>
        <a href="https://www.whatsupdoc-lemag.fr" target="_blank" rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1a3a2e', fontWeight: 600, borderBottom: '1px solid currentColor', textDecoration: 'none', fontSize: 12.5 }}>
          ↗ Lire sur whatsupdoc-lemag.fr
        </a>
      </div>
    </div>
  );
}

// ── App principale ─────────────────────────────────────────
function NotesApp() {
  const D = window.CSE_DATA;
  const [active, setActive] = useNotesState('a');
  const [opened, setOpened] = useNotesState({ a: false, b: false, c: false });

  function open(id) {
    if (id === 'd' && !bonusUnlocked) return;
    setActive(id);
    if (id !== 'd') {
      setOpened(o => {
        const next = { ...o, [id]: true };
        if (id === 'a' || id === 'b' || id === 'c') {
          window.CSE_STATE[`frag${id.toUpperCase()}Opened`] = true;
          window.CSE_STATE.checkBonusUnlock && window.CSE_STATE.checkBonusUnlock();
        }
        return next;
      });
    }
  }

  const bonusUnlocked = (
    window.CSE_STATE?.fragAOpened &&
    window.CSE_STATE?.fragBOpened &&
    window.CSE_STATE?.fragCOpened &&
    window.CSE_STATE?.mailDoctolibOpened
  );

  const tabs = [
    { id: 'a', label: 'Ordre du jour', sub: 'Réunion coordination' },
    { id: 'b', label: 'Fil WhatsApp', sub: 'Transféré par erreur' },
    { id: 'c', label: 'Post LinkedIn', sub: 'Directeur MSP Les Herbiers' },
    { id: 'd', label: 'Article presse', sub: bonusUnlocked ? "What's Up Doc" : '🔒 Déverrouiller en explorant', bonus: true },
  ];

  const FRAGS = { a: FragODJ, b: FragWhatsApp, c: FragLinkedIn, d: FragBonus };
  const FragComp = FRAGS[active];
  const isUnread = (id) => !opened[id] && id !== 'd';

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar */}
      <div style={{ width: 210, background: '#f5f2ec', borderRight: '1px solid rgba(20,24,36,.1)', overflow: 'auto' }}>
        <div style={{ padding: '10px 12px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
          Éléments disponibles
        </div>
        {tabs.map(t => {
          const locked = t.bonus && !bonusUnlocked;
          const unread = isUnread(t.id);
          return (
            <div key={t.id}
              onClick={() => open(t.id)}
              style={{
                padding: '9px 12px', cursor: locked ? 'default' : 'pointer',
                borderLeft: active === t.id ? '2.5px solid #1a3a2e' : '2.5px solid transparent',
                background: active === t.id ? '#e8f2ec' : 'transparent',
                opacity: locked ? 0.45 : 1,
                transition: 'all .12s'
              }}
              onMouseEnter={e => { if (!locked && active !== t.id) e.currentTarget.style.background = '#ece9e2'; }}
              onMouseLeave={e => { if (active !== t.id) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: unread ? 700 : 500, color: active === t.id ? '#1a3a2e' : 'var(--ink)', lineHeight: 1.3 }}>{t.label}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 1 }}>{t.sub}</div>
                </div>
                <div style={{
                  fontSize: 9.5, padding: '1px 5px', borderRadius: 3,
                  background: unread ? '#1a3a2e' : 'rgba(20,24,36,.1)',
                  color: unread ? '#a8d4b8' : 'var(--ink-faint)',
                  fontWeight: 600, flexShrink: 0
                }}>{t.id.toUpperCase()}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Contenu */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {FragComp && <FragComp />}
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.notes = NotesApp;
