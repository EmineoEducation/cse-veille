// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — app-pdf.jsx
//  Vue document — mail Doctolib + post-it Vanessa
// ══════════════════════════════════════════════════════════════

function PdfApp() {
  const D = window.CSE_DATA;
  const m = D.mailDoctolib;

  React.useEffect(() => {
    window.CSE_STATE.mailDoctolibOpened = true;
    window.CSE_STATE.checkBonusUnlock && window.CSE_STATE.checkBonusUnlock();
  }, []);

  return (
    <div style={{ height: '100%', background: '#6b6b6b', display: 'flex', overflow: 'auto', padding: 32, gap: 24, alignItems: 'flex-start', justifyContent: 'center' }}>
      {/* Document */}
      <div style={{
        background: 'white', width: 560, flexShrink: 0,
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        borderRadius: 2, overflow: 'hidden', fontFamily: 'var(--font-sans)'
      }}>
        {/* En-tête doc */}
        <div style={{ background: '#f7f5f0', padding: '14px 24px', borderBottom: '1px solid #ddd' }}>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>Aperçu — mail_prestataire_numerique.pdf</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3px 12px', fontSize: 12, color: '#555' }}>
            <span style={{ fontWeight: 600, color: '#222' }}>De :</span><span>Equipe Compte — Doctolib Pro &lt;pro@doctolib.fr&gt;</span>
            <span style={{ fontWeight: 600, color: '#222' }}>À :</span><span>administration@polesanteconfluences.fr</span>
            <span style={{ fontWeight: 600, color: '#222' }}>Objet :</span><span style={{ fontWeight: 500, color: '#222' }}>Évolution de votre abonnement au 1er janvier</span>
            <span style={{ fontWeight: 600, color: '#222' }}>Reçu :</span><span>14 octobre · 11h03</span>
          </div>
        </div>
        {/* Corps */}
        <div style={{ padding: '28px 32px', fontSize: 13.5, lineHeight: 1.9, color: '#444' }}>
          <p style={{ marginBottom: 16 }}>Madame, Monsieur,</p>
          <p style={{ marginBottom: 16 }}>Dans le cadre de notre politique tarifaire annuelle et afin de financer nos investissements en infrastructure, sécurité et nouvelles fonctionnalités, nous procédons à une révision de nos tarifs d'abonnement.</p>
          <p style={{ marginBottom: 16 }}>
            À compter du 1er janvier prochain, le tarif mensuel de votre abonnement sera ajusté de{' '}
            <strong style={{ color: '#b84a00', fontSize: 14.5 }}>+18%</strong>, passant de{' '}
            <strong style={{ color: '#b84a00' }}>139 € à 164 € HT</strong> par praticien et par mois.
          </p>
          <p style={{ marginBottom: 16 }}>Cette évolution reflète notre engagement continu à vous offrir une solution performante et conforme aux exigences réglementaires en matière de données de santé.</p>
          <p style={{ marginBottom: 16 }}>Pour toute question, votre chargé de compte reste disponible.</p>
          <p style={{ color: '#777', fontStyle: 'italic', borderTop: '1px solid #eee', paddingTop: 16, marginTop: 8 }}>
            Cordialement,<br/>L'équipe Doctolib Pro
          </p>
        </div>
      </div>

      {/* Post-it Vanessa */}
      <div style={{
        background: '#fffacc', border: '1px solid #e8d87a', borderRadius: 4,
        padding: '14px 16px', maxWidth: 180, fontSize: 13, color: '#5a4a00',
        fontStyle: 'italic', lineHeight: 1.7,
        boxShadow: '3px 4px 12px rgba(180,160,0,.2)', transform: 'rotate(-2deg)',
        marginTop: 16
      }}>
        8 praticiens.<br/>Novembre.<br/>
        <span style={{ fontSize: 11, opacity: .7, display: 'block', marginTop: 6 }}>— Vanessa</span>
      </div>

      {/* Bouton flottant */}
      <div style={{ position: 'absolute', bottom: 24, right: 24 }}>
        <button
          onClick={() => window.__openApp && window.__openApp('browser')}
          style={{
            padding: '10px 20px', background: '#1a3a2e', color: '#a8d4b8',
            border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer',
            fontWeight: 500, boxShadow: '0 4px 14px rgba(0,0,0,.25)'
          }}>
          Commencer la veille →
        </button>
      </div>
    </div>
  );
}

window.LUMIO_APPS = window.LUMIO_APPS || {};
window.LUMIO_APPS.pdf = PdfApp;
