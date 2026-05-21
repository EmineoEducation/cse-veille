// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — app-browser.jsx
//  Zone de veille : recherche simulée + sources réelles + épinglage
// ══════════════════════════════════════════════════════════════
const { useState: useBrowserState, useRef: useBrowserRef } = React;

// Badge axe coloré
function AxeBadge({ axe, label }) {
  const colors = {
    A1: { bg: '#e1f5ee', text: '#0f6e56', border: '#5dcaa5' },
    A2: { bg: '#faeeda', text: '#854f0b', border: '#ef9f27' },
    A3: { bg: '#eeedfe', text: '#3c3489', border: '#afa9ec' },
    A4: { bg: '#fbeaf0', text: '#72243e', border: '#ed93b1' },
    A5: { bg: '#e6f1fb', text: '#0c447c', border: '#85b7eb' },
  };
  const c = colors[axe] || colors.A1;
  return (
    <span style={{
      fontSize: 10, padding: '2px 7px', borderRadius: 100,
      background: c.bg, color: c.text, border: `0.5px solid ${c.border}`,
      fontWeight: 500, letterSpacing: '0.04em', whiteSpace: 'nowrap'
    }}>{axe} · {label}</span>
  );
}

function BrowserApp() {
  const D = window.CSE_DATA;
  const [query, setQuery] = useBrowserState('');
  const [srcIdx, setSrcIdx] = useBrowserState(0);
  const [current, setCurrent] = useBrowserState(null);
  const [helpOpen, setHelpOpen] = useBrowserState(false);
  const inputRef = useBrowserRef(null);

  function doSearch() {
    const res = D.sources[srcIdx % D.sources.length];
    setSrcIdx(i => i + 1);
    setCurrent(res);
  }

  function addPin(src) {
    const already = window.CSE_STATE.pins.find(p => p.id === src.id);
    if (already) return;
    window.CSE_STATE.pins = [...window.CSE_STATE.pins, { id: src.id, src: src.url, text: src.pinText, axe: src.axe }];
    window.CSE_STATE.onPinsChange && window.CSE_STATE.onPinsChange([...window.CSE_STATE.pins]);
    // Notif optionnelle
    if (window.__pushNotif) window.__pushNotif({
      app: 'Veille', icon: '📌', color: '#1a3a2e',
      title: 'Source épinglée',
      body: src.url
    });
  }

  const isPinned = (id) => window.CSE_STATE.pins.some(p => p.id === id);

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-sans)' }}>
      {/* ── GAUCHE : navigateur ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(20,24,36,.08)', minWidth: 0 }}>
        {/* Header */}
        <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(20,24,36,.08)', background: '#faf9f6', flexShrink: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 4 }}>Zone de recherche</div>
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 14.5, color: 'var(--ink)', lineHeight: 1.3 }}>
            Cherchez ce que vous voulez.<br/>
            <span style={{ color: 'var(--ink-mute)' }}>Le web entier est accessible.</span>
          </div>
        </div>

        {/* Barre de recherche */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(20,24,36,.08)', background: '#faf9f6', flexShrink: 0 }}>
          <div style={{
            display: 'flex', gap: 8, alignItems: 'center',
            border: '1.5px solid rgba(20,24,36,.2)', borderRadius: 8,
            padding: '7px 10px', background: 'white', transition: 'border-color .15s'
          }}>
            <span style={{ color: 'var(--ink-faint)', fontSize: 14, flexShrink: 0 }}>⌕</span>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
              placeholder="alternatives Doctolib maison de santé…"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--font-sans)'
              }}
            />
            <button onClick={doSearch} style={{
              padding: '4px 12px', background: '#1a3a2e', color: '#a8d4b8',
              border: 'none', borderRadius: 6, fontSize: 11.5, cursor: 'pointer', fontWeight: 500, flexShrink: 0
            }}>Chercher</button>
          </div>
        </div>

        {/* Viewport navigateur */}
        <div style={{ flex: 1, overflow: 'auto', background: '#e8e6e0', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {!current ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 36, opacity: .15 }}>⌕</div>
              <div style={{ fontSize: 13, color: 'var(--ink-faint)', fontStyle: 'italic', lineHeight: 1.6 }}>
                Lancez une recherche<br/>pour explorer le web.
              </div>
            </div>
          ) : (
            <>
              {/* Onglets */}
              <div style={{ display: 'flex', gap: 4 }}>
                <div style={{
                  padding: '4px 12px', background: 'white', borderRadius: '6px 6px 0 0',
                  fontSize: 11, color: 'var(--ink-soft)', border: '1px solid rgba(20,24,36,.15)',
                  borderBottom: 'none', maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {current.title.substring(0, 24)}…
                </div>
                <div style={{ padding: '4px 12px', background: 'rgba(255,255,255,.4)', borderRadius: '6px 6px 0 0', fontSize: 11, color: 'var(--ink-faint)' }}>+</div>
              </div>
              {/* Fenêtre */}
              <div style={{ background: 'white', borderRadius: '0 6px 6px 6px', overflow: 'hidden', border: '1px solid rgba(20,24,36,.15)' }}>
                {/* URL bar */}
                <div style={{ background: '#f5f2ec', padding: '7px 12px', borderBottom: '1px solid rgba(20,24,36,.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {['#fc615d','#fdbc40','#34c84a'].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}/>
                    ))}
                  </div>
                  <div style={{
                    flex: 1, background: 'white', border: '1px solid rgba(20,24,36,.12)',
                    borderRadius: 5, padding: '3px 8px', fontSize: 11, color: 'var(--ink-mute)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {current.urlFull}
                  </div>
                </div>
                {/* Contenu */}
                <div style={{ padding: '18px 20px', fontSize: 13, lineHeight: 1.65, color: 'var(--ink)' }}>
                  <div style={{ marginBottom: 8 }}>
                    <AxeBadge axe={current.axe} label={current.axeLabel}/>
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--ink)' }}>{current.title}</h2>
                  <p style={{ color: 'var(--ink-mute)', marginBottom: 10 }}>{current.body}</p>
                  <div style={{
                    background: '#fff9e6', borderLeft: '3px solid #c4420f',
                    padding: '9px 12px', marginBottom: 12, borderRadius: '0 4px 4px 0', fontSize: 12.5
                  }} dangerouslySetInnerHTML={{ __html: current.highlight }}/>
                  <button
                    onClick={() => !isPinned(current.id) && addPin(current)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px', borderRadius: 100,
                      border: '1px solid ' + (isPinned(current.id) ? '#c8a060' : '#d4b896'),
                      background: isPinned(current.id) ? '#fff9e0' : '#fffef5',
                      fontSize: 11.5, color: isPinned(current.id) ? '#8a6010' : '#8b3a1a',
                      cursor: isPinned(current.id) ? 'default' : 'pointer',
                      transition: 'all .15s'
                    }}>
                    📌 {isPinned(current.id) ? 'Épinglé' : 'Épingler cet extrait'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Zone aide Vanessa */}
        <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(20,24,36,.08)', background: '#faf9f6', flexShrink: 0 }}>
          <div
            onClick={() => setHelpOpen(o => !o)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', width: 'fit-content' }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', border: '1px solid rgba(20,24,36,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--ink-mute)'
            }}>?</div>
            <span style={{ fontSize: 12, color: 'var(--ink-mute)', fontStyle: 'italic' }}>Vanessa s'est posé des questions</span>
          </div>
          {helpOpen && (
            <div style={{ marginTop: 8, padding: '10px 12px', background: '#f5efe8', border: '1px solid #d4b896', borderRadius: 6 }}>
              {D.helpQuestions.map((q, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: i < D.helpQuestions.length - 1 ? '1px dashed #d4b896' : 'none', fontSize: 12, color: 'var(--ink-mute)' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(20,24,36,.25)', flexShrink: 0 }}>—</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── DROITE : collecte ── */}
      <PinPanel/>
    </div>
  );
}

function PinPanel() {
  const [pins, setPins] = useBrowserState(window.CSE_STATE.pins || []);

  // S'abonner aux changements
  React.useEffect(() => {
    window.CSE_STATE.onPinsChange = (newPins) => setPins([...newPins]);
    return () => { window.CSE_STATE.onPinsChange = null; };
  }, []);

  function removePin(id) {
    window.CSE_STATE.pins = window.CSE_STATE.pins.filter(p => p.id !== id);
    setPins([...window.CSE_STATE.pins]);
  }

  return (
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', background: 'white', flexShrink: 0 }}>
      <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid rgba(20,24,36,.08)', background: '#faf9f6', flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 3 }}>Zone de collecte</div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: 'var(--ink)' }}>Ce que vous gardez</div>
        <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 2, fontStyle: 'italic' }}>Épinglez ce qui semble utile.</div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pins.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 8, padding: 20 }}>
            <div style={{ fontSize: 28, opacity: .18 }}>📌</div>
            <div style={{ fontSize: 12, color: 'var(--ink-faint)', fontStyle: 'italic', lineHeight: 1.5 }}>
              Rien d'épinglé pour l'instant.<br/>Cliquez sur "Épingler" dans les résultats.
            </div>
          </div>
        ) : (
          pins.map(p => (
            <div key={p.id} style={{
              background: '#fffef5', border: '1px solid #e8d9a0', borderRadius: 6,
              padding: '9px 10px', position: 'relative',
              boxShadow: '0 2px 8px rgba(180,160,80,.12)'
            }}>
              <button
                onClick={() => removePin(p.id)}
                style={{ position: 'absolute', top: 5, right: 6, background: 'none', border: 'none', color: 'var(--ink-faint)', cursor: 'pointer', fontSize: 13, lineHeight: 1 }}>
                ✕
              </button>
              <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginBottom: 3, letterSpacing: '0.04em' }}>{p.src}</div>
              <div style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.4, paddingRight: 16 }}>{p.text}</div>
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(20,24,36,.08)', flexShrink: 0 }}>
        <button
          onClick={() => window.__openApp && window.__openApp('livrable')}
          style={{
            width: '100%', padding: '9px', background: '#1a3a2e', color: '#a8d4b8',
            border: 'none', borderRadius: 8, fontSize: 12.5, cursor: 'pointer', fontWeight: 500
          }}>
          Passer à la production →
        </button>
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.browser = BrowserApp;
