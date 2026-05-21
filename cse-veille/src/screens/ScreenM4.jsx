// ScreenM4.jsx — mail prestataire Doctolib

const styles = `
.m4-body { flex: 1; overflow-y: auto; display: flex; align-items: flex-start; justify-content: center; padding: 2rem; gap: 1.5rem; background: var(--bg); }
.mail-doc { background: #fff; border: 1px solid #ddd; border-radius: 4px; max-width: 560px; width: 100%; box-shadow: 0 3px 16px rgba(0,0,0,.08); font-size: .75rem; }
.mail-doc-header { background: #f7f5f0; padding: .75rem 1.25rem; border-bottom: 1px solid #ddd; font-size: .62rem; color: var(--ink-dim); display: flex; flex-direction: column; gap: .2rem; }
.mail-doc-from { font-weight: 500; color: var(--ink); }
.mail-doc-body { padding: 1.5rem 1.75rem; line-height: 1.85; color: var(--ink-dim); }
.mail-doc-body p { margin-bottom: .9rem; }
.amount { font-weight: 500; color: var(--accent-warm); font-size: .82rem; }
.sig-doc { color: var(--ink-dim); font-style: italic; border-top: 1px solid #eee; padding-top: .75rem; margin-top: .5rem; }
.postit {
  background: #fffacc; border: 1px solid #e8d87a; border-radius: 4px;
  padding: .65rem .9rem; max-width: 200px; font-size: .7rem; color: #5a4a00; font-style: italic;
  box-shadow: 2px 3px 8px rgba(180,160,0,.15); transform: rotate(-1.5deg);
  flex-shrink: 0; margin-top: 2rem;
}
.m4-footer {
  padding: 1rem 2rem; border-top: 1px solid var(--border); background: var(--surface);
  flex-shrink: 0; display: flex; align-items: center; justify-content: space-between;
}
.m4-footer-text { font-family: var(--font-serif); font-style: italic; font-size: .88rem; color: var(--ink-dim); }
.m4-next-btn {
  padding: .5rem 1.1rem; background: var(--accent); color: #a8d4b8; border: none;
  border-radius: var(--r); font-family: var(--font-mono); font-size: .65rem;
  letter-spacing: .04em; cursor: pointer; transition: opacity .2s;
}
.m4-next-btn:hover { opacity: .85; }
`

export default function ScreenM4({ navigate }) {
  return (
    <>
      <style>{styles}</style>
      <div className="m4-body">
        <div className="mail-doc fade-in">
          <div className="mail-doc-header">
            <div className="mail-doc-from">De : Equipe Compte — Doctolib Pro &lt;pro@doctolib.fr&gt;</div>
            <div>À : administration@polesanteconfluences.fr</div>
            <div>Objet : Évolution de votre abonnement au 1er janvier</div>
            <div style={{marginTop:'.2rem',color:'var(--ink-faint)'}}>Reçu le 14 octobre</div>
          </div>
          <div className="mail-doc-body">
            <p>Madame, Monsieur,</p>
            <p>Dans le cadre de notre politique tarifaire annuelle et afin de financer nos investissements en infrastructure, sécurité et nouvelles fonctionnalités, nous procédons à une révision de nos tarifs d'abonnement.</p>
            <p>À compter du 1er janvier prochain, le tarif mensuel de votre abonnement sera ajusté de <span className="amount">+18%</span>, passant de <span className="amount">139 € à 164 € HT</span> par praticien et par mois.</p>
            <p>Cette évolution reflète notre engagement continu à vous offrir une solution performante et conforme aux exigences réglementaires en matière de données de santé.</p>
            <p>Pour toute question, votre chargé de compte reste disponible.</p>
            <p className="sig-doc">Cordialement,<br/>L'équipe Doctolib Pro</p>
          </div>
        </div>
        <div className="postit fade-in">
          8 praticiens.<br/>Novembre.<br/>
          <span style={{fontSize:'.6rem',opacity:.6,display:'block',marginTop:'.3rem'}}>— Vanessa</span>
        </div>
      </div>
      <div className="m4-footer">
        <span className="m4-footer-text">Vanessa doit arriver en novembre avec des éléments concrets. Pas une impression — une veille.</span>
        <button className="m4-next-btn" onClick={() => navigate('m5')}>Commencer la veille →</button>
      </div>
    </>
  )
}
