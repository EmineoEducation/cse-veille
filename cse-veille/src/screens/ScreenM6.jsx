// ScreenM6.jsx — production du livrable BTS

import { useState } from 'react'
import { getBTS } from '../data/data.js'

const styles = `
.prod-layout { display: grid; grid-template-columns: 260px 1fr; flex: 1; overflow: hidden; }
.prod-sidebar { background: var(--surface); border-right: 1px solid var(--border); padding: .85rem 0; overflow-y: auto; }
.prod-sidebar-title { font-size: .55rem; letter-spacing: .15em; text-transform: uppercase; color: var(--ink-faint); padding: .25rem 1rem .6rem; }
.ref-item { padding: .5rem 1rem; font-size: .65rem; color: var(--ink-dim); border-left: 2px solid transparent; line-height: 1.35; }
.ref-src { font-size: .55rem; color: var(--ink-faint); display: block; margin-bottom: .1rem; }
.prod-main { display: flex; flex-direction: column; overflow: hidden; background: var(--bg); }
.prod-header { padding: 1rem 1.75rem .85rem; border-bottom: 1px solid var(--border); background: var(--surface); flex-shrink: 0; }
.prod-bts-badge { display: inline-block; font-size: .6rem; padding: .18rem .55rem; background: var(--accent); color: #a8d4b8; border-radius: 3px; letter-spacing: .06em; margin-bottom: .4rem; }
.prod-livrable-type { font-family: var(--font-serif); font-size: 1rem; color: var(--ink); margin-bottom: .25rem; }
.prod-cadrage { font-size: .68rem; color: var(--ink-dim); font-style: italic; line-height: 1.45; }
.prod-area { flex: 1; overflow-y: auto; padding: 1.5rem 1.75rem; }
.prod-textarea { width: 100%; min-height: 340px; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--r); padding: 1rem 1.1rem; font-family: var(--font-mono); font-size: .75rem; color: var(--ink); line-height: 1.7; resize: vertical; outline: none; transition: border-color .2s; }
.prod-textarea:focus { border-color: var(--accent); }
.prod-textarea::placeholder { color: var(--ink-faint); font-style: italic; }
.prod-footer { padding: .75rem 1.75rem; border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; }
.prod-wordcount { font-size: .62rem; color: var(--ink-faint); }
.prod-submit-btn { padding: .5rem 1.1rem; background: var(--accent); color: #a8d4b8; border: none; border-radius: var(--r); font-family: var(--font-mono); font-size: .65rem; letter-spacing: .05em; cursor: pointer; transition: opacity .2s; }
.prod-submit-btn:hover { opacity: .85; }
`

export default function ScreenM6({ btsCode, pins, livrable, setLivrable, navigate }) {
  const bts = getBTS(btsCode)
  const words = livrable.trim() ? livrable.trim().split(/\s+/).length : 0

  return (
    <>
      <style>{styles}</style>
      <div className="prod-layout">
        <div className="prod-sidebar">
          <div className="prod-sidebar-title">Éléments épinglés</div>
          {pins.length === 0 ? (
            <div style={{padding:'.75rem 1rem',fontSize:'.65rem',color:'var(--ink-faint)',fontStyle:'italic',lineHeight:1.5}}>
              Vos sources épinglées apparaissent ici.
            </div>
          ) : (
            pins.map(p => (
              <div key={p.id} className="ref-item">
                <span className="ref-src">{p.src}</span>
                {p.text}
              </div>
            ))
          )}
        </div>
        <div className="prod-main">
          <div className="prod-header">
            <div className="prod-bts-badge">BTS {btsCode}</div>
            <div className="prod-livrable-type">{bts?.livrable}</div>
            <div className="prod-cadrage">{bts?.cadrage}</div>
          </div>
          <div className="prod-area">
            <textarea
              className="prod-textarea"
              value={livrable}
              onChange={e => setLivrable(e.target.value)}
              placeholder={bts?.placeholder}
            />
          </div>
          <div className="prod-footer">
            <span className="prod-wordcount">{words} {words <= 1 ? 'mot' : 'mots'}</span>
            <button className="prod-submit-btn" onClick={() => navigate('m7')}>
              Transmettre à Vanessa →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
