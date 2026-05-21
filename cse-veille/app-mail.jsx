// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — app-mail.jsx
//  Messagerie interne — mail Vanessa + mail Doctolib + distracteurs
// ══════════════════════════════════════════════════════════════
const { useState: useMailState } = React;

function MailApp() {
  const D = window.CSE_DATA;
  const inbox = [
    D.mailVanessa,
    D.mailDoctolib,
    ...D.mailsDistracteurs
  ];

  const [selected, setMailSelected] = useMailState(null);
  const [read, setRead] = useMailState(new Set());

  function openMail(m) {
    setMailSelected(m);
    setRead(r => new Set([...r, m.id]));
    if (m.id === 'doctolib_mail') {
      window.CSE_STATE.mailDoctolibOpened = true;
      window.CSE_STATE.checkBonusUnlock && window.CSE_STATE.checkBonusUnlock();
    }
  }

  const isUnread = (m) => m.unread && !read.has(m.id);

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: '#f5f2ec', borderRight: '1px solid rgba(20,24,36,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid rgba(20,24,36,0.08)' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Messagerie</div>
        </div>
        <div style={{ padding: '6px 0' }}>
          {[
            { label: 'Boîte de réception', count: inbox.filter(m => isUnread(m)).length },
            { label: 'Envoyés', count: 0 },
            { label: 'Documents partagés', count: 0 },
            { label: 'Archives', count: 0 }
          ].map((f, i) => (
            <div key={i} style={{
              padding: '6px 14px', fontSize: 12.5, color: i === 0 ? 'var(--ink)' : 'var(--ink-mute)',
              fontWeight: i === 0 ? 500 : 400, cursor: 'default', display: 'flex', alignItems: 'center', gap: 6
            }}>
              {f.label}
              {f.count > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--accent)', color: 'white', borderRadius: 10, fontSize: 10, fontWeight: 700, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>
                  {f.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Liste mails */}
      <div style={{ width: 300, background: 'white', borderRight: '1px solid rgba(20,24,36,0.08)', overflow: 'auto' }}>
        <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid rgba(20,24,36,0.08)', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
          Boîte de réception
        </div>
        {inbox.map(m => (
          <div key={m.id}
            onClick={() => openMail(m)}
            style={{
              padding: '10px 14px', borderBottom: '1px solid rgba(20,24,36,0.06)',
              cursor: 'pointer', background: selected?.id === m.id ? '#e8f0f8' : 'white',
              transition: 'background .12s'
            }}
            onMouseEnter={e => { if (selected?.id !== m.id) e.currentTarget.style.background = '#f8f6f2'; }}
            onMouseLeave={e => { if (selected?.id !== m.id) e.currentTarget.style.background = 'white'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: m.avatarColor,
                color: 'white', fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>{m.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: isUnread(m) ? 700 : 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.from}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{m.date}</div>
              </div>
              {isUnread(m) && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#007aff', flexShrink: 0 }}/>}
            </div>
            <div style={{ fontSize: 12, fontWeight: isUnread(m) ? 600 : 400, color: 'var(--ink-soft)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 }}>
              {m.subject}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-faint)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {m.preview}
            </div>
          </div>
        ))}
      </div>

      {/* Corps du mail */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'white' }}>
        {!selected ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-faint)', fontSize: 13 }}>
            Sélectionnez un message
          </div>
        ) : (
          <>
            <div style={{ padding: '16px 24px 14px', borderBottom: '1px solid rgba(20,24,36,0.08)', background: '#faf9f6' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>{selected.subject}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: selected.avatarColor,
                  color: 'white', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>{selected.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{selected.from}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>{selected.fromEmail} · {selected.date}</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.85, color: 'var(--ink-soft)', whiteSpace: 'pre-wrap', maxWidth: 620 }}>
                {selected.body}
              </div>
              {selected.attachment && (
                <div
                  onClick={() => {
                    window.CSE_STATE.mailDoctolibOpened = true;
                    window.CSE_STATE.checkBonusUnlock && window.CSE_STATE.checkBonusUnlock();
                    window.__openApp && window.__openApp('pdf');
                  }}
                  style={{
                    marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '10px 16px', border: '1px solid rgba(20,24,36,0.15)', borderRadius: 8,
                    background: '#f5f2ec', cursor: 'pointer', transition: 'all .15s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = '#fff5f0'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(20,24,36,0.15)'; e.currentTarget.style.background = '#f5f2ec'; }}
                >
                  <span style={{ fontSize: 20 }}>📎</span>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>{selected.attachment.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{selected.attachment.size} — Cliquez pour ouvrir</div>
                  </div>
                </div>
              )}
              {selected.postit && (
                <div style={{
                  marginTop: 24, display: 'inline-block', background: '#fffacc',
                  border: '1px solid #e8d87a', borderRadius: 4, padding: '10px 14px',
                  fontSize: 12.5, color: '#5a4a00', fontStyle: 'italic',
                  boxShadow: '2px 3px 8px rgba(180,160,0,.15)', transform: 'rotate(-1.2deg)',
                  whiteSpace: 'pre-line', maxWidth: 200, lineHeight: 1.6
                }}>
                  {selected.postit}
                </div>
              )}
            </div>
            {selected.id === 'doctolib_mail' && (
              <div style={{
                padding: '12px 24px', borderTop: '1px solid rgba(20,24,36,0.08)',
                background: '#f5f2ec', fontSize: 12, color: 'var(--ink-mute)',
                fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span>Vanessa doit arriver en novembre avec des éléments concrets. Pas une impression — une veille.</span>
                <button
                  onClick={() => window.__openApp && window.__openApp('browser')}
                  style={{
                    padding: '6px 14px', background: '#1a3a2e', color: '#a8d4b8',
                    border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                    fontWeight: 500, whiteSpace: 'nowrap', marginLeft: 16
                  }}>
                  Commencer la veille →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.mail = MailApp;
