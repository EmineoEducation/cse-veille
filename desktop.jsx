// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — desktop.jsx
//  Window manager · Dock · Menu bar · Notifications · Wallpaper
//  Adapté du shell Lumio BC1
// ══════════════════════════════════════════════════════════════
const { useState: useWmState, useEffect: useWmEffect, useRef: useWmRef, useContext: useWmContext, createContext } = React;

const WindowsCtx = createContext(null);
window.useWindows = () => useWmContext(WindowsCtx);

// ─── App registry ────────────────────────────────────────────
const APP_META = {
  mail:     { title: 'Messagerie — Pôle Santé', w: 1060, h: 660, icon: 'MailIcon' },
  browser:  { title: 'Veille & Collecte',       w: 1080, h: 700, icon: 'BrowserIcon' },
  pdf:      { title: 'Aperçu — mail_prestataire_numerique.pdf', w: 860, h: 640, icon: 'FinderIcon' },
  notes:    { title: 'Fragments',                w: 900,  h: 620, icon: 'NotesIcon' },
  livrable: { title: 'Livrable — Veille BTS',   w: 940,  h: 680, icon: 'LivrableIcon' },
};

// ─── Fenêtre ─────────────────────────────────────────────────
function Win({ win, onFocus, onClose, onMinimize, onMove, onResize }) {
  const onDragStart = (e) => {
    if (win.maximized) return;
    onFocus(win.id);
    const sx = e.clientX, sy = e.clientY, wx = win.x, wy = win.y;
    const move = (ev) => onMove(win.id, wx + ev.clientX - sx, Math.max(28, wy + ev.clientY - sy));
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const onResizeStart = (e) => {
    e.stopPropagation(); e.preventDefault(); onFocus(win.id);
    const sx = e.clientX, sy = e.clientY, sw = win.w, sh = win.h;
    const move = (ev) => onResize(win.id, Math.max(520, sw + ev.clientX - sx), Math.max(360, sh + ev.clientY - sy));
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const meta = APP_META[win.app];
  const AppComp = (window.LUMIO_APPS || {})[win.app];

  const style = win.maximized
    ? { left: 0, top: 28, width: '100%', height: 'calc(100% - 28px - 72px)' }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div
      onMouseDown={() => onFocus(win.id)}
      style={{
        position: 'absolute', ...style,
        background: 'white', borderRadius: 10,
        boxShadow: win.focused
          ? '0 24px 60px rgba(20,24,36,.32), 0 6px 18px rgba(20,24,36,.18), 0 0 0 0.5px rgba(20,24,36,.4)'
          : '0 10px 24px rgba(20,24,36,.18), 0 0 0 0.5px rgba(20,24,36,.3)',
        zIndex: win.z,
        display: win.minimized ? 'none' : 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: win.focused ? 1 : 0.97,
        transition: 'opacity 120ms'
      }}>
      {/* Barre titre */}
      <div
        onMouseDown={onDragStart}
        onDoubleClick={() => onFocus(win.id, 'toggleMax')}
        style={{
          height: 32, flexShrink: 0, cursor: 'grab', userSelect: 'none',
          background: win.focused ? 'linear-gradient(180deg,#f4f2ee,#e8e6e0)' : '#f0eee8',
          borderBottom: '1px solid rgba(20,24,36,.12)',
          display: 'flex', alignItems: 'center', padding: '0 10px'
        }}>
        <div style={{ display: 'flex', gap: 7 }}>
          <button onClick={(e) => { e.stopPropagation(); onClose(win.id); }} style={tl('#fc615d')}/>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} style={tl('#fdbc40')}/>
          <button onClick={(e) => { e.stopPropagation(); onFocus(win.id, 'toggleMax'); }} style={tl('#34c84a')}/>
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 600, color: win.focused ? 'var(--ink)' : 'var(--ink-mute)', letterSpacing: '0.005em' }}>
          {meta?.title}
        </div>
        <div style={{ width: 60 }}/>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
        {AppComp ? <AppComp {...(win.props || {})}/> : <div style={{ padding: 40 }}>Chargement…</div>}
      </div>
      {!win.maximized && (
        <div onMouseDown={onResizeStart} style={{
          position: 'absolute', right: 0, bottom: 0, width: 14, height: 14, cursor: 'nwse-resize', zIndex: 10,
          background: 'linear-gradient(135deg, transparent 50%, rgba(20,24,36,.2) 50%)'
        }}/>
      )}
    </div>
  );
}
const tl = (c) => ({ width: 12, height: 12, borderRadius: '50%', background: c, border: 'none', padding: 0, cursor: 'pointer', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,.2)' });

// ─── Menu bar ────────────────────────────────────────────────
function MenuBar({ activeApp }) {
  const [time, setTime] = useWmState('');
  const [showUser, setShowUser] = useWmState(false);
  const D = window.CSE_DATA;

  useWmEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' · ' + now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 28, zIndex: 10000,
      background: 'rgba(240,237,230,.82)', backdropFilter: 'blur(20px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
      borderBottom: '1px solid rgba(20,24,36,.08)',
      display: 'flex', alignItems: 'center', padding: '0 14px',
      fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--font-sans)'
    }}>
      <div style={{ fontSize: 14, marginRight: 14 }}>🌿</div>
      <div style={{ fontWeight: 700, marginRight: 18 }}>{activeApp || 'Finder'}</div>
      {['Fichier','Édition','Présentation','Aller','Fenêtre','Aide'].map(m => (
        <div key={m} style={{ marginRight: 14, color: 'var(--ink-mute)', cursor: 'default' }}>{m}</div>
      ))}
      <div style={{ flex: 1 }}/>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', color: 'var(--ink-mute)', fontSize: 12 }}>
        <span>📶</span>
        <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{time}</span>
        <span
          onClick={() => setShowUser(v => !v)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, position: 'relative' }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#1a3a2e', color: '#a8d4b8', fontSize: 9, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {D.student.initial || 'E'}
          </span>
          {D.student.prenom || 'Étudiant·e'} ▾
          {showUser && (
            <div style={{
              position: 'absolute', top: 24, right: 0, background: 'white',
              border: '1px solid rgba(20,24,36,.12)', borderRadius: 8,
              boxShadow: '0 8px 24px rgba(20,24,36,.18)', minWidth: 200, zIndex: 20000, overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(20,24,36,.08)' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{D.student.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>BTS {D.student.bts} · Pôle Santé Confluences</div>
              </div>
              <div style={{ padding: '8px 14px', fontSize: 12, color: 'var(--ink-mute)', cursor: 'default' }}>
                Session en cours · J-90
              </div>
            </div>
          )}
        </span>
      </div>
      {showUser && <div onClick={() => setShowUser(false)} style={{ position: 'fixed', inset: 0, zIndex: 19999 }}/>}
    </div>
  );
}

// ─── Dock ────────────────────────────────────────────────────
function Dock({ openApp, openWindows, livrableUnlocked }) {
  const baseItems = [
    { id: 'mail',     label: 'Messagerie' },
    { id: 'pdf',      label: 'Mail Doctolib' },
    { id: 'notes',    label: 'Fragments' },
    { id: 'browser',  label: 'Veille' },
    { id: 'livrable', label: 'Livrable', bounce: true },
  ];

  return (
    <div style={{
      position: 'fixed', bottom: 8, left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(240,237,230,.58)', backdropFilter: 'blur(28px) saturate(1.6)',
      WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
      border: '1px solid rgba(255,255,255,.45)',
      boxShadow: '0 12px 30px rgba(20,24,36,.18)',
      borderRadius: 18, padding: '6px 12px',
      display: 'flex', alignItems: 'flex-end', gap: 8, zIndex: 9999
    }}>
      {baseItems.map(it => {
        const Icon = window[APP_META[it.id]?.icon];
        if (!Icon) return null;
        const isOpen = openWindows.some(w => w.app === it.id);
        const showBounce = it.bounce && livrableUnlocked;
        return (
          <div key={it.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={() => openApp(it.id)}
              title={it.label}
              className={showBounce ? 'dock-bounce' : ''}
              style={{
                background: 'transparent', border: 'none', padding: 4, cursor: 'pointer',
                transition: 'transform 180ms cubic-bezier(.34,1.56,.64,1)'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.18)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <Icon size={52}/>
            </button>
            {showBounce && (
              <div style={{
                position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: '50%',
                background: '#34c84a', border: '2px solid white', fontSize: 8, color: 'white',
                fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1
              }}>!</div>
            )}
            {isOpen && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(20,24,36,.5)', position: 'absolute', bottom: -2 }}/>}
          </div>
        );
      })}
    </div>
  );
}

// ─── Icônes bureau ───────────────────────────────────────────
function DesktopIcons({ openApp }) {
  const icons = [
    { app: 'mail',    label: 'Messagerie',    Icon: window.MailIcon,     x: 36, y: 56  },
    { app: 'notes',   label: 'Fragments',     Icon: window.NotesIcon,    x: 36, y: 174 },
    { app: 'browser', label: 'Veille',        Icon: window.BrowserIcon,  x: 36, y: 292 },
  ];
  return (
    <>
      {icons.map(it => it.Icon && (
        <div key={it.app}
          onClick={() => openApp(it.app)}
          style={{
            position: 'absolute', left: it.x, top: it.y, width: 88,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            cursor: 'pointer', padding: 6, borderRadius: 4
          }}>
          <it.Icon size={56}/>
          <div style={{ fontSize: 12, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,.6)', marginTop: 4, textAlign: 'center', lineHeight: 1.2 }}>
            {it.label}
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Wallpaper ───────────────────────────────────────────────
function Wallpaper() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      background: `
        radial-gradient(ellipse 70% 55% at 15% 25%, rgba(168,212,184,.35) 0%, transparent 55%),
        radial-gradient(ellipse 60% 70% at 85% 15%, rgba(100,160,130,.25) 0%, transparent 50%),
        radial-gradient(ellipse 80% 60% at 50% 90%, rgba(30,80,60,.4) 0%, transparent 60%),
        linear-gradient(160deg, #1a4a32 0%, #2a6a48 25%, #1a3a2e 55%, #0d2018 100%)
      `
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: .04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay'
      }}/>
    </div>
  );
}

// ─── Notifications ───────────────────────────────────────────
function NotificationStack({ notifications, onDismiss, onClick }) {
  return (
    <div style={{ position: 'fixed', top: 36, right: 12, width: 340, zIndex: 11000, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {notifications.map(n => (
        <div key={n.id} onClick={() => onClick(n)} style={{
          background: 'rgba(244,242,238,.94)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', borderRadius: 12, padding: '12px 14px',
          boxShadow: '0 8px 24px rgba(20,24,36,.22), 0 0 0 0.5px rgba(20,24,36,.1)',
          cursor: 'pointer', animation: 'slideInNotif 280ms ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: n.color || '#1a3a2e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1, fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{n.app}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-faint)' }}>maintenant</div>
            <button onClick={e => { e.stopPropagation(); onDismiss(n.id); }} style={{ background: 'none', border: 'none', color: 'var(--ink-faint)', fontSize: 15, cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{n.title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)', lineHeight: 1.4 }}>{n.body}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Desktop ─────────────────────────────────────────────────
function Desktop() {
  const [windows, setWindows] = useWmState([]);
  const [zCounter, setZ] = useWmState(100);
  const [notifications, setNotifs] = useWmState([]);
  const [livrableUnlocked, setLivrableUnlocked] = useWmState(false);
  const nSeq = useWmRef(0);

  // Exposer pushNotif globalement
  useWmEffect(() => {
    window.__pushNotif = (n) => {
      const id = ++nSeq.current;
      setNotifs(ns => [...ns, { id, ...n }]);
      setTimeout(() => setNotifs(ns => ns.filter(x => x.id !== id)), 14000);
    };
  }, []);

  // Débloquer livrable quand 2+ sources épinglées
  useWmEffect(() => {
    const check = setInterval(() => {
      if (!livrableUnlocked && window.CSE_STATE.pins.length >= 2) {
        setLivrableUnlocked(true);
        window.__pushNotif({
          app: 'Livrable', icon: '📋', color: '#1a3a2e',
          title: 'Livrable disponible',
          body: 'Vous avez collecté suffisamment d\'éléments. Le livrable est prêt à être rédigé.',
          click: { app: 'livrable' }
        });
      }
    }, 2000);
    return () => clearInterval(check);
  }, [livrableUnlocked]);

  // Notifications scénarisées
  useWmEffect(() => {
    const events = [
      { t: 8000,  n: { app: 'Messagerie', icon: 'VM', color: '#1a3a2e', title: 'Vanessa Moreau', body: 'N\'oubliez pas de regarder les fragments — certains éléments peuvent vous surprendre.', click: { app: 'notes' } }},
      { t: 45000, n: { app: 'Messagerie', icon: 'VM', color: '#1a3a2e', title: 'Vanessa Moreau', body: 'François Dupré (MSP Les Herbiers) a accepté d\'être contacté. Son post LinkedIn est dans les fragments.', click: { app: 'notes' } }},
      { t: 90000, n: { app: 'Veille',     icon: '⌕',  color: '#1a6a9a', title: 'Conseil de veille', body: 'Pensez à vérifier la conformité HDS de chaque alternative — c\'est une obligation légale.', click: { app: 'browser' } }},
    ];
    const timers = events.map(ev => setTimeout(() => {
      const id = ++nSeq.current;
      setNotifs(ns => [...ns, { id, ...ev.n }]);
      setTimeout(() => setNotifs(ns => ns.filter(x => x.id !== id)), 14000);
    }, ev.t));
    return () => timers.forEach(clearTimeout);
  }, []);

  const openApp = (app, props = {}) => {
    const meta = APP_META[app]; if (!meta) return;
    setWindows(ws => {
      const idx = ws.findIndex(w => w.app === app);
      const newZ = zCounter + 1; setZ(newZ);
      if (idx >= 0) {
        return ws.map((w, i) => i === idx
          ? { ...w, focused: true, minimized: false, z: newZ, props: { ...w.props, ...props } }
          : { ...w, focused: false });
      }
      const id = `w_${Date.now()}`;
      const off = ws.length * 26;
      return [...ws.map(w => ({ ...w, focused: false })), {
        id, app, props, x: 70 + off, y: 56 + off,
        w: meta.w, h: meta.h, z: newZ, focused: true, minimized: false, maximized: false
      }];
    });
  };
  window.__openApp = openApp;

  const focusWin = (id, action) => setWindows(ws => {
    const newZ = zCounter + 1; setZ(newZ);
    return ws.map(w => w.id === id
      ? { ...w, focused: true, z: newZ, ...(action === 'toggleMax' ? { maximized: !w.maximized } : {}) }
      : { ...w, focused: false });
  });
  const closeWin  = (id) => setWindows(ws => ws.filter(w => w.id !== id));
  const minWin    = (id) => setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true, focused: false } : w));
  const moveWin   = (id, x, y) => setWindows(ws => ws.map(w => w.id === id ? { ...w, x, y } : w));
  const resizeWin = (id, w, h) => setWindows(ws => ws.map(win => win.id === id ? { ...win, w, h } : win));

  const dismiss = (id) => setNotifs(ns => ns.filter(n => n.id !== id));
  const clickN  = (n)  => { if (n.click) openApp(n.click.app, n.click.props || {}); dismiss(n.id); };

  const focused = windows.find(w => w.focused);
  const activeTitle = focused ? APP_META[focused.app]?.title?.split(' — ')[0] : 'Bureau';

  return (
    <WindowsCtx.Provider value={{ open: openApp }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', userSelect: 'none' }}>
        <Wallpaper/>
        <MenuBar activeApp={activeTitle}/>
        <DesktopIcons openApp={openApp}/>
        {windows.map(w => (
          <Win key={w.id} win={w} onFocus={focusWin} onClose={closeWin} onMinimize={minWin} onMove={moveWin} onResize={resizeWin}/>
        ))}
        <Dock openApp={openApp} openWindows={windows} livrableUnlocked={livrableUnlocked}/>
        <NotificationStack notifications={notifications} onDismiss={dismiss} onClick={clickN}/>
      </div>
    </WindowsCtx.Provider>
  );
}

window.CSEDesktop = Desktop;
