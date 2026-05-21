// ScreenBTS.jsx — sélection de la filière BTS

import { useState } from 'react'
import { BTS_LIST } from '../data/data.js'

const styles = `
.bts-wrap {
  display: flex; justify-content: center; align-items: center;
  height: 100vh; background: var(--bg);
}
.bts-card {
  background: var(--surface); border: 1px solid var(--border-strong);
  border-radius: 12px; padding: 2.5rem 3rem; max-width: 520px; width: 100%;
  text-align: center;
}
.bts-eyebrow {
  font-size: .6rem; letter-spacing: .18em; text-transform: uppercase;
  color: var(--ink-faint); margin-bottom: .6rem;
}
.bts-title {
  font-family: var(--font-serif); font-size: 1.6rem; color: var(--ink);
  margin-bottom: .35rem;
}
.bts-sub {
  font-size: .72rem; color: var(--ink-dim); margin-bottom: 2rem; line-height: 1.55;
}
.bts-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; margin-bottom: 1.5rem;
}
.bts-btn {
  padding: .7rem .9rem; border: 1.5px solid var(--border-strong);
  border-radius: var(--r); background: var(--surface2);
  font-family: var(--font-mono); font-size: .72rem; font-weight: 500;
  color: var(--ink); cursor: pointer; text-align: left; line-height: 1.3;
  transition: all .2s;
}
.bts-btn:hover { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }
.bts-btn.selected { border-color: var(--accent); background: var(--accent); color: #a8d4b8; }
.bts-code { font-size: .62rem; display: block; opacity: .7; margin-bottom: .15rem; }
.bts-btn-full { grid-column: span 2; }
.bts-confirm {
  width: 100%; padding: .75rem; background: var(--accent); color: #a8d4b8;
  border: none; border-radius: var(--r); font-family: var(--font-mono);
  font-size: .75rem; letter-spacing: .06em; cursor: pointer;
  opacity: .35; transition: opacity .2s;
}
.bts-confirm.ready { opacity: 1; }
`

export default function ScreenBTS({ onSelect }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <style>{styles}</style>
      <div className="bts-wrap">
        <div className="bts-card fade-in">
          <div className="bts-eyebrow">CSE Pilote · Éminéo · Veille &amp; Traitement de l'information</div>
          <div className="bts-title">Pôle Santé Confluences</div>
          <div className="bts-sub">
            Niort · J-90 avant la réunion praticiens<br />
            Sélectionnez votre filière pour commencer.
          </div>
          <div className="bts-grid">
            {BTS_LIST.map((b, i) => (
              <button
                key={b.code}
                className={'bts-btn' + (selected === b.code ? ' selected' : '') + (i === BTS_LIST.length - 1 ? ' bts-btn-full' : '')}
                onClick={() => setSelected(b.code)}
              >
                <span className="bts-code">BTS {b.code}</span>
                {b.label}
              </button>
            ))}
          </div>
          <button
            className={'bts-confirm' + (selected ? ' ready' : '')}
            onClick={() => selected && onSelect(selected)}
          >
            Commencer →
          </button>
        </div>
      </div>
    </>
  )
}
