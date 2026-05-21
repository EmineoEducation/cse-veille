// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — app-livrable.jsx
//  Production du livrable BTS + retour Vanessa + memento
// ══════════════════════════════════════════════════════════════
const { useState: useLivrableState, useEffect: useLivrableEffect, useRef: useLivrableRef } = React;

function LivrableApp() {
  const D = window.CSE_DATA;
  const btsCode = D.student.bts;
  const bts = D.bts.find(b => b.code === btsCode) || D.bts[0];

  const [text, setText] = useLivrableState(window.CSE_STATE.livrable || '');
  const [submitted, setSubmitted] = useLivrableState(false);
  const [showRetro, setShowRetro] = useLivrableState(false);
  const [showMemento, setShowMemento] = useLivrableState(false);
  const [pins, setPins] = useLivrableState(window.CSE_STATE.pins || []);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const enough = words >= (bts.minMots || 150);

  // Sync pins depuis l'état global
  useLivrableEffect(() => {
    const prev = window.CSE_STATE.onPinsChangeLivrable;
    window.CSE_STATE.onPinsChangeLivrable = (p) => setPins([...p]);
    return () => { window.CSE_STATE.onPinsChangeLivrable = prev; };
  }, []);

  function handleTextChange(e) {
    setText(e.target.value);
    window.CSE_STATE.livrable = e.target.value;
  }

  function handleSubmit() {
    if (!text.trim()) return;
    window.CSE_STATE.livrable = text;
    setSubmitted(true);
    // Notif retour Vanessa
    if (window.__pushNotif) {
      window.__pushNotif({
        app: 'Mail', icon: 'VM', color: '#1a3a2e',
        title: 'Vanessa Moreau',
        body: 'Je viens de recevoir votre document. Je vous lis.'
      });
    }
    setTimeout(() => setShowRetro(true), 2200);
    setTimeout(() => setShowMemento(true), 4000);
  }

  function downloadMemento() {
    const now = new Date().toLocaleDateString('fr-FR');
    const srcList = pins.length
      ? pins.map(p => `• ${p.src} — ${p.text}`).join('\n')
      : '(aucune source épinglée)';
    const content = `MEMENTO — CSE Veille & Traitement de l'information
Pôle Santé Confluences · Niort · ${now}
BTS ${btsCode} · ${D.student.name}
${'─'.repeat(52)}

SOURCES UTILISÉES
${srcList}

${'─'.repeat(52)}

LIVRABLE PRODUIT — ${bts.livrableType}
${text || '(aucun contenu rédigé)'}

${'─'.repeat(52)}

CE QUE VOUS AVEZ FAIT
Vous avez identifié une situation professionnelle à partir de signaux fragmentés.
Vous avez conduit une veille sur sources réelles accessibles en ligne.
Vous avez produit un document opérationnel pour un décideur.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `memento_veille_${btsCode.toLowerCase()}_${now.replace(/\//g,'-')}.txt`;
    a.click();
  }

  if (submitted) {
    return (
      <div style={{ height: '100%', overflow: 'auto', background: '#f5f2ec', padding: 32, display: 'flex', flexDirection: 'column', gap: 18, fontFamily: 'var(--font-sans)' }}>
        {/* Réponse Vanessa */}
        <div style={{ background: 'white', border: '1px solid rgba(20,24,36,.1)', borderRadius: 10, padding: '18px 22px', animation: 'fadeIn .4s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1a3a2e', color: '#a8d4b8', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>VM</div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>Vanessa Moreau</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Coordinatrice administrative · vient de lire votre document</div>
            </div>
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
            "Merci. C'est exactement ce dont j'avais besoin pour novembre."
          </div>
        </div>

        {/* Rétrospective */}
        <div style={{
          background: 'white', border: '1px solid rgba(20,24,36,.1)', borderRadius: 10,
          padding: '18px 22px', opacity: showRetro ? 1 : 0, transition: 'opacity .8s'
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 12 }}>Comment avez-vous travaillé ?</div>
          {[
            'Par où avez-vous commencé ? Pourquoi ?',
            'Qu\'est-ce qui a orienté vos choix de sources ?',
            'Qu\'est-ce que vous feriez différemment ?',
          ].map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'rgba(20,24,36,.25)', flexShrink: 0, marginTop: 1 }}>—</span>
              <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{q}</span>
            </div>
          ))}
        </div>

        {/* Memento */}
        <div style={{
          background: '#e8f2ec', border: '1px solid #a0c8b0', borderRadius: 10,
          padding: '18px 22px', opacity: showMemento ? 1 : 0, transition: 'opacity .8s'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3a7a55' }}>Memento · Ce que vous avez produit</div>
            <button
              onClick={downloadMemento}
              style={{ fontSize: 11, padding: '3px 10px', background: '#1a3a2e', color: '#a8d4b8', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}>
              ↓ Télécharger
            </button>
          </div>
          {/* Sources */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a8a6a', marginBottom: 6 }}>Sources utilisées</div>
            {pins.length === 0 ? (
              <div style={{ fontSize: 12, color: '#5a8a6a', fontStyle: 'italic' }}>Aucune source épinglée</div>
            ) : (
              pins.map(p => (
                <div key={p.id} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '3px 0', borderBottom: '1px dashed #b0d8be', fontSize: 12, color: '#1a3a2e' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a3a2e', flexShrink: 0 }}/>
                  <span>{p.src} — {p.text}</span>
                </div>
              ))
            )}
          </div>
          {/* Aperçu livrable */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a8a6a', marginBottom: 6 }}>Livrable produit</div>
            <div style={{
              background: 'white', border: '1px solid #b0d8be', borderRadius: 4, padding: '10px 12px',
              fontSize: 12, color: 'var(--ink-mute)', fontStyle: 'italic', lineHeight: 1.5,
              maxHeight: 80, overflow: 'hidden', position: 'relative'
            }}>
              {text || '(aucun contenu)'}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 24, background: 'linear-gradient(transparent, white)' }}/>
            </div>
          </div>
          {/* Compétences */}
          <div style={{ background: '#d4ead8', borderRadius: 6, padding: '10px 12px', fontSize: 12, color: '#2a5a3a', lineHeight: 1.7 }}>
            Vous avez identifié une situation professionnelle à partir de signaux fragmentés.<br/>
            Vous avez conduit une veille sur sources réelles.<br/>
            Vous avez produit un document opérationnel pour un décideur.
          </div>
          <div style={{ textAlign: 'right', fontSize: 11, color: '#5a8a6a', marginTop: 8 }}>
            {new Date().toLocaleDateString('fr-FR')} · BTS {btsCode} · Pôle Santé Confluences
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar sources épinglées */}
      <div style={{ width: 220, background: '#f5f2ec', borderRight: '1px solid rgba(20,24,36,.08)', overflow: 'auto', flexShrink: 0 }}>
        <div style={{ padding: '10px 12px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
          Éléments épinglés
        </div>
        {pins.length === 0 ? (
          <div style={{ padding: '10px 12px', fontSize: 12, color: 'var(--ink-faint)', fontStyle: 'italic', lineHeight: 1.5 }}>
            Vos sources épinglées apparaissent ici.
          </div>
        ) : (
          pins.map(p => (
            <div key={p.id} style={{ padding: '8px 12px', borderBottom: '1px solid rgba(20,24,36,.06)' }}>
              <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginBottom: 2 }}>{p.src}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.3 }}>{p.text}</div>
            </div>
          ))
        )}
      </div>

      {/* Zone de rédaction */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px 10px', borderBottom: '1px solid rgba(20,24,36,.08)', background: 'white', flexShrink: 0 }}>
          <div style={{
            display: 'inline-block', fontSize: 10, padding: '2px 8px', background: '#1a3a2e',
            color: '#a8d4b8', borderRadius: 4, letterSpacing: '0.06em', marginBottom: 6
          }}>
            BTS {btsCode}
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{bts.livrableType}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)', fontStyle: 'italic', lineHeight: 1.45 }}>{bts.cadrage}</div>
        </div>

        {/* Textarea */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', background: '#faf9f6' }}>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder={bts.placeholder}
            style={{
              width: '100%', minHeight: 360, background: 'white',
              border: '1.5px solid rgba(20,24,36,.15)', borderRadius: 8,
              padding: '14px 16px', fontSize: 13.5, lineHeight: 1.8,
              color: 'var(--ink)', resize: 'vertical', outline: 'none',
              fontFamily: 'var(--font-sans)', transition: 'border-color .15s'
            }}
            onFocus={e => e.target.style.borderColor = '#1a3a2e'}
            onBlur={e => e.target.style.borderColor = 'rgba(20,24,36,.15)'}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 20px', borderTop: '1px solid rgba(20,24,36,.08)', background: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0
        }}>
          <div style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
            {words} {words <= 1 ? 'mot' : 'mots'}
            {!enough && words > 0 && (
              <span style={{ marginLeft: 6, color: '#c4420f' }}>· minimum {bts.minMots} mots recommandé</span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            style={{
              padding: '8px 18px', background: text.trim() ? '#1a3a2e' : '#ccc', color: text.trim() ? '#a8d4b8' : '#888',
              border: 'none', borderRadius: 8, fontSize: 13, cursor: text.trim() ? 'pointer' : 'default',
              fontWeight: 500, transition: 'all .2s'
            }}>
            Transmettre à Vanessa →
          </button>
        </div>
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.livrable = LivrableApp;
