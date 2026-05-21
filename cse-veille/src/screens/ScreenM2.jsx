// ScreenM2.jsx — webmail Vanessa

const styles = `
.mail-layout { display: grid; grid-template-columns: 220px 1fr; flex: 1; overflow: hidden; }
.mail-sidebar {
  background: var(--surface); border-right: 1px solid var(--border);
  padding: 1rem 0; display: flex; flex-direction: column; gap: 2px;
}
.mail-folder {
  padding: .4rem 1rem; font-size: .65rem; color: var(--ink-dim);
  cursor: pointer; display: flex; align-items: center; gap: .5rem; transition: background .15s;
}
.mail-folder:hover { background: var(--surface2); }
.mail-folder.active { background: var(--accent-light); color: var(--accent); font-weight: 500; }
.f-count {
  margin-left: auto; background: var(--accent); color: #a8d4b8;
  font-size: .55rem; padding: .05rem .35rem; border-radius: 100px;
}
.mail-main { display: flex; flex-direction: column; overflow: hidden; }
.mail-header {
  padding: .9rem 1.25rem; border-bottom: 1px solid var(--border);
  background: var(--surface); flex-shrink: 0;
}
.mail-header-row { display: flex; align-items: center; gap: .75rem; margin-bottom: .25rem; }
.mail-avatar {
  width: 32px; height: 32px; border-radius: 50%; background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  color: #a8d4b8; font-size: .65rem; font-weight: 600; flex-shrink: 0;
}
.mail-sender-name { font-size: .78rem; font-weight: 500; color: var(--ink); }
.mail-sender-role { font-size: .62rem; color: var(--ink-faint); }
.mail-meta { font-size: .6rem; color: var(--ink-faint); margin-left: auto; }
.mail-subject { font-size: .65rem; color: var(--ink-faint); margin-left: 40px; font-style: italic; }
.mail-body {
  flex: 1; overflow-y: auto; padding: 1.5rem 1.75rem;
  font-size: .78rem; line-height: 1.8; color: var(--ink-dim); background: var(--surface);
}
.mail-body p { margin-bottom: .9rem; }
.mail-body .sig {
  color: var(--ink-faint); font-style: italic;
  border-top: 1px solid var(--border); padding-top: .75rem; margin-top: 1rem;
}
.mail-attachment {
  margin-top: 1rem; display: inline-flex; align-items: center; gap: .6rem;
  padding: .6rem .9rem; border: 1px solid var(--border-strong); border-radius: var(--r);
  background: var(--surface2); cursor: pointer; transition: all .2s; font-size: .68rem; color: var(--ink);
}
.mail-attachment:hover { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }
.mail-hint {
  padding: .6rem 1.75rem; font-size: .62rem; color: var(--ink-faint); font-style: italic;
  border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0;
}
`

export default function ScreenM2({ navigate, onMailOpened }) {
  return (
    <>
      <style>{styles}</style>
      <div className="mail-layout">
        <div className="mail-sidebar">
          <div className="mail-folder active">
            <span>Boîte de réception</span>
            <span className="f-count">1</span>
          </div>
          <div className="mail-folder">Envoyés</div>
          <div className="mail-folder">Documents partagés</div>
          <div className="mail-folder">Archives</div>
        </div>
        <div className="mail-main">
          <div className="mail-header">
            <div className="mail-header-row">
              <div className="mail-avatar">VM</div>
              <div>
                <div className="mail-sender-name">Vanessa Moreau</div>
                <div className="mail-sender-role">Coordinatrice administrative · Pôle Santé Confluences</div>
              </div>
              <div className="mail-meta">Aujourd'hui, 08h14</div>
            </div>
            <div className="mail-subject">(sans objet)</div>
          </div>
          <div className="mail-body fade-in">
            <p>Bonjour,</p>
            <p>Je ne sais pas trop par où commencer. On vient de recevoir quelque chose d'un de nos prestataires numériques. J'ai besoin qu'on réfléchisse à ça ensemble avant la réunion de novembre.</p>
            <p>Je vous transmets le mail en question.</p>
            <div
              className="mail-attachment"
              onClick={() => { onMailOpened(); navigate('m4') }}
            >
              <span>📎</span>
              <span>mail_prestataire_numerique.pdf</span>
              <span style={{ fontSize:'.58rem', color:'var(--ink-faint)', marginLeft:'.4rem' }}>— 38 Ko</span>
            </div>
            <div className="sig">Vanessa</div>
          </div>
          <div className="mail-hint">
            Vous pouvez aussi explorer les fragments disponibles via la navigation.
          </div>
        </div>
      </div>
    </>
  )
}
