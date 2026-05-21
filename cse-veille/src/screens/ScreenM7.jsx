// ScreenM7.jsx — retour Vanessa + memento

import { useEffect, useState } from 'react'

const styles = `
.m7-wrap { flex: 1; overflow-y: auto; display: flex; justify-content: center; align-items: flex-start; padding: 2rem; background: var(--bg); }
.m7-inner { max-width: 600px; width: 100%; display: flex; flex-direction: column; gap: 1.5rem; }
.vanessa-reply { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem 1.5rem; }
.v-header { display: flex; align-items: center; gap: .6rem; margin-bottom: .85rem; }
.v-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; color: #a8d4b8; font-size: .65rem; font-weight: 600; flex-shrink: 0; }
.v-name { font-size: .75rem; font-weight: 500; color: var(--ink); }
.v-meta { font-size: .6rem; color: var(--ink-faint); }
.v-text { font-family: var(--font-serif); font-style: italic; font-size: 1.05rem; color: var(--ink-dim); line-height: 1.55; }
.retro-block { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem 1.5rem; opacity: 0; transition: opacity .8s; }
.retro-block.visible { opacity: 1; }
.retro-q { font-size: .65rem; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: .75rem; }
.retro-item { display: flex; gap: .6rem; margin-bottom: .65rem; align-items: flex-start; }
.retro-dash { color: var(--border-strong); flex-shrink: 0; margin-top: .05rem; }
.retro-text { font-size: .72rem; color: var(--ink-dim); line-height: 1.45; }
.memento-block { background: var(--accent-light); border: 1px solid #a0c8b0; border-radius: 8px; padding: 1.25rem 1.5rem; opacity: 0; transition: opacity .8s; }
.memento-block.visible { opacity: 1; }
.memento-title { font-size: .6rem; letter-spacing: .14em; text-transform: uppercase; color: #3a7a55; margin-bottom: .85rem; display: flex; align-items: center; justify-content: space-between; }
.memento-dl { font-size: .58rem; padding: .2rem .55rem; background: var(--accent); color: #a8d4b8; border: none; border-radius: 3px; font-family: var(--font-mono); cursor: pointer; letter-spacing: .04em; }
.memento-section { margin-bottom: .85rem; }
.memento-section-label { font-size: .55rem; letter-spacing: .12em; text-transform: uppercase; color: #5a8a6a; margin-bottom: .35rem; }
.memento-src-item { font-size: .65rem; color: var(--accent); padding: .2rem 0; border-bottom: 1px dashed #b0d8be; display: flex; align-items: center; gap: .4rem; }
.memento-src-item:last-child { border-bottom: none; }
.memento-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
.memento-livrable-preview { background: var(--surface); border: 1px solid #b0d8be; border-radius: 4px; padding: .65rem .85rem; font-size: .68rem; color: var(--ink-dim); line-height: 1.5; font-style: italic; max-height: 80px; overflow: hidden; position: relative; }
.memento-livrable-preview::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 24px; background: linear-gradient(transparent, var(--surface)); }
.memento-ce-que { background: #e4f0e8; border-radius: 4px; padding: .7rem .85rem; font-size: .68rem; color: #2a5a3a; line-height: 1.6; }
.memento-meta { font-size: .6rem; color: #5a8a6a; text-align: right; margin-top: .5rem; }
`

export default function ScreenM7({ btsCode, pins, livrable }) {
  const [showRetro, setShowRetro] = useState(false)
  const [showMemento, setShowMemento] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowRetro(true), 1800)
    const t2 = setTimeout(() => setShowMemento(true), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const now = new Date().toLocaleDateString('fr-FR')

  function downloadMemento() {
    const sources = pins.length
      ? pins.map(p => `• ${p.src} — ${p.text}`).join('\n')
      : '(aucune source épinglée)'
    const content = `MEMENTO — CSE Veille & Traitement de l'information
Pôle Santé Confluences · Niort · ${now}
BTS ${btsCode}
${'─'.repeat(50)}

SOURCES UTILISÉES
${sources}

${'─'.repeat(50)}

LIVRABLE PRODUIT
${livrable || '(aucun contenu rédigé)'}

${'─'.repeat(50)}

CE QUE VOUS AVEZ FAIT
Vous avez identifié une situation professionnelle à partir de signaux fragmentés.
Vous avez conduit une veille sur sources réelles.
Vous avez produit un document opérationnel pour un décideur.
`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `memento_veille_${btsCode.toLowerCase()}_${now.replace(/\//g,'-')}.txt`
    a.click()
  }

  return (
    <>
      <style>{styles}</style>
      <div className="m7-wrap">
        <div className="m7-inner">
          <div className="vanessa-reply fade-in">
            <div className="v-header">
              <div className="v-avatar">VM</div>
              <div>
                <div className="v-name">Vanessa Moreau</div>
                <div className="v-meta">Coordinatrice administrative · vient de lire votre document</div>
              </div>
            </div>
            <div className="v-text">"Merci. C'est exactement ce dont j'avais besoin pour novembre."</div>
          </div>

          <div className={'retro-block' + (showRetro ? ' visible' : '')}>
            <div className="retro-q">Comment avez-vous travaillé ?</div>
            {[
              'Par où avez-vous commencé ? Pourquoi ?',
              'Qu\'est-ce qui a orienté vos choix de sources ?',
              'Qu\'est-ce que vous feriez différemment ?',
            ].map((q, i) => (
              <div key={i} className="retro-item">
                <span className="retro-dash">—</span>
                <span className="retro-text">{q}</span>
              </div>
            ))}
          </div>

          <div className={'memento-block' + (showMemento ? ' visible' : '')}>
            <div className="memento-title">
              <span>Memento · Ce que vous avez produit</span>
              <button className="memento-dl" onClick={downloadMemento}>↓ Télécharger</button>
            </div>
            <div className="memento-section">
              <div className="memento-section-label">Sources utilisées</div>
              {pins.length === 0 ? (
                <div className="memento-src-item"><span className="memento-dot"/><span>Aucune source épinglée</span></div>
              ) : (
                pins.map(p => (
                  <div key={p.id} className="memento-src-item">
                    <span className="memento-dot"/>
                    <span>{p.src} — {p.text}</span>
                  </div>
                ))
              )}
            </div>
            <div className="memento-section">
              <div className="memento-section-label">Livrable produit</div>
              <div className="memento-livrable-preview">{livrable || '(aucun contenu rédigé)'}</div>
            </div>
            <div className="memento-ce-que">
              Vous avez identifié une situation professionnelle à partir de signaux fragmentés.<br/>
              Vous avez conduit une veille sur sources réelles.<br/>
              Vous avez produit un document opérationnel pour un décideur.
            </div>
            <div className="memento-meta">{now} · BTS {btsCode} · Pôle Santé Confluences</div>
          </div>
        </div>
      </div>
    </>
  )
}
