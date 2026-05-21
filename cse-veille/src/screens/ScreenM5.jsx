// ScreenM5.jsx — veille + collecte

import { useState, useRef } from 'react'
import { SEARCH_RESULTS, HELP_QUESTIONS } from '../data/data.js'

const styles = `
.m5-workspace { display: grid; grid-template-columns: 1fr 340px; flex: 1; overflow: hidden; }
.panel-left { display: flex; flex-direction: column; border-right: 1px solid var(--border); overflow: hidden; }
.panel-header { padding: 1rem 1.5rem .85rem; border-bottom: 1px solid var(--border); background: var(--surface); flex-shrink: 0; }
.panel-label { font-size: .55rem; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: .3rem; }
.panel-title { font-family: var(--font-serif); font-size: 1.05rem; color: var(--ink); line-height: 1.3; }
.panel-title em { font-style: italic; color: var(--ink-dim); }
.search-area { padding: .85rem 1.5rem; border-bottom: 1px solid var(--border); background: var(--surface); flex-shrink: 0; }
.search-box { display: flex; align-items: center; gap: .6rem; padding: .5rem .8rem; border: 1.5px solid var(--border-strong); border-radius: var(--r); background: var(--surface2); transition: border-color .2s; }
.search-box:focus-within { border-color: var(--accent); }
.search-icon { font-size: .8rem; color: var(--ink-faint); flex-shrink: 0; }
.search-input { flex: 1; border: none; background: transparent; font-family: var(--font-mono); font-size: .75rem; color: var(--ink); outline: none; }
.search-input::placeholder { color: var(--ink-faint); font-style: italic; }
.search-btn { padding: .28rem .65rem; background: var(--accent); color: #a8d4b8; border: none; border-radius: 4px; font-family: var(--font-mono); font-size: .6rem; letter-spacing: .05em; cursor: pointer; flex-shrink: 0; }
.browser-frame { flex: 1; overflow-y: auto; background: var(--surface2); padding: .85rem 1.25rem; display: flex; flex-direction: column; gap: .6rem; }
.browser-tabs { display: flex; gap: .3rem; flex-shrink: 0; }
.browser-tab { padding: .25rem .65rem; border-radius: 4px 4px 0 0; font-size: .58rem; cursor: pointer; border: 1px solid var(--border); border-bottom: none; background: var(--surface2); color: var(--ink-dim); max-width: 140px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.browser-tab.active { background: var(--surface); color: var(--ink); border-color: var(--border-strong); }
.browser-viewport { background: var(--surface); border: 1px solid var(--border-strong); border-radius: 0 var(--r) var(--r) var(--r); overflow: hidden; }
.browser-url-bar { display: flex; align-items: center; gap: .5rem; padding: .4rem .65rem; background: var(--surface2); border-bottom: 1px solid var(--border); }
.url-dots { display: flex; gap: .25rem; }
.url-dot { width: 7px; height: 7px; border-radius: 50%; }
.url-text { flex: 1; font-size: .58rem; color: var(--ink-dim); background: var(--surface); border: 1px solid var(--border); border-radius: 3px; padding: .15rem .4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.page-content { padding: 1rem 1.25rem; font-size: .7rem; line-height: 1.6; color: var(--ink); }
.page-content h2 { font-family: var(--font-sans); font-size: .82rem; margin-bottom: .5rem; }
.page-content p { margin-bottom: .5rem; color: var(--ink-dim); }
.page-highlight { background: #fff9e6; border-left: 3px solid var(--accent-warm); padding: .5rem .8rem; margin: .6rem 0; font-size: .68rem; border-radius: 0 4px 4px 0; }
.src-tag { display: inline-block; font-size: .54rem; padding: .08rem .35rem; background: var(--accent-light); color: var(--accent); border-radius: 3px; letter-spacing: .03em; margin-bottom: .4rem; }
.pin-this { display: inline-flex; align-items: center; gap: .25rem; font-size: .58rem; color: var(--accent-warm); cursor: pointer; border: 1px solid var(--help-border); padding: .18rem .5rem; border-radius: 100px; background: var(--pin-bg); margin-top: .35rem; transition: all .2s; }
.pin-this:hover { background: #fff9e0; border-color: var(--accent-warm); }
.pin-this.pinned { opacity: .5; cursor: default; }
.help-zone { padding: .6rem 1.5rem; border-top: 1px solid var(--border); background: var(--surface); flex-shrink: 0; }
.help-toggle { display: flex; align-items: center; gap: .4rem; cursor: pointer; width: fit-content; }
.help-icon { width: 16px; height: 16px; border: 1px solid var(--border-strong); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .6rem; color: var(--ink-dim); flex-shrink: 0; }
.help-label { font-size: .62rem; color: var(--ink-dim); letter-spacing: .03em; font-style: italic; }
.help-panel { margin-top: .6rem; padding: .8rem .9rem; background: var(--help-bg); border: 1px solid var(--help-border); border-radius: var(--r); }
.help-q { font-size: .65rem; color: var(--ink-dim); line-height: 1.5; padding: .3rem 0; border-bottom: 1px dashed var(--help-border); display: flex; gap: .5rem; align-items: flex-start; }
.help-q:last-child { border-bottom: none; }
.help-q-dash { font-family: var(--font-serif); font-style: italic; font-size: .8rem; color: var(--border-strong); flex-shrink: 0; }
/* Panel droit */
.panel-right { display: flex; flex-direction: column; background: var(--surface); overflow: hidden; }
.collect-header { padding: 1rem 1.1rem .85rem; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.collect-label { font-size: .55rem; letter-spacing: .15em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: .3rem; }
.collect-title { font-family: var(--font-serif); font-size: .95rem; color: var(--ink); }
.collect-sub { font-size: .58rem; color: var(--ink-faint); margin-top: .2rem; font-style: italic; }
.pins-area { flex: 1; overflow-y: auto; padding: .85rem 1.1rem; display: flex; flex-direction: column; gap: .6rem; }
.pin-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; gap: .5rem; }
.pin-empty-icon { font-size: 1.5rem; opacity: .25; }
.pin-empty-text { font-size: .65rem; color: var(--ink-faint); line-height: 1.5; font-style: italic; }
.pin-item { background: var(--pin-bg); border: 1px solid var(--pin-border); border-radius: var(--r); padding: .7rem .85rem; box-shadow: 0 2px 8px var(--pin-shadow); position: relative; }
.pin-source { font-size: .55rem; letter-spacing: .05em; color: var(--ink-faint); margin-bottom: .2rem; }
.pin-text { font-size: .68rem; color: var(--ink); line-height: 1.4; }
.pin-remove { position: absolute; top: .4rem; right: .5rem; font-size: .65rem; color: var(--ink-faint); cursor: pointer; opacity: .5; background: none; border: none; font-family: var(--font-mono); transition: opacity .2s; }
.pin-remove:hover { opacity: 1; color: var(--accent-warm); }
.collect-footer { padding: .75rem 1.1rem; border-top: 1px solid var(--border); flex-shrink: 0; }
.proceed-btn { width: 100%; padding: .6rem; background: var(--accent); color: #a8d4b8; border: none; border-radius: var(--r); font-family: var(--font-mono); font-size: .65rem; letter-spacing: .05em; cursor: pointer; transition: opacity .2s; }
.proceed-btn:hover { opacity: .85; }
.browser-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; gap: .6rem; padding: 2rem; }
`

export default function ScreenM5({ navigate, pins, setPins }) {
  const [searchVal, setSearchVal] = useState('')
  const [resultIdx, setResultIdx] = useState(0)
  const [currentResult, setCurrentResult] = useState(null)
  const [helpOpen, setHelpOpen] = useState(false)

  function doSearch() {
    const res = SEARCH_RESULTS[resultIdx % SEARCH_RESULTS.length]
    setResultIdx(i => i + 1)
    setCurrentResult(res)
  }

  function addPin(res) {
    if (pins.find(p => p.id === res.id)) return
    setPins(prev => [...prev, { id: res.id, src: res.url, text: res.pinText }])
  }

  function removePin(id) {
    setPins(prev => prev.filter(p => p.id !== id))
  }

  const isPinned = (id) => pins.some(p => p.id === id)

  return (
    <>
      <style>{styles}</style>
      <div className="m5-workspace">
        {/* ── GAUCHE ── */}
        <div className="panel-left">
          <div className="panel-header">
            <div className="panel-label">Zone de recherche</div>
            <div className="panel-title">Cherchez ce que vous voulez.<br/><em>Le web entier est accessible.</em></div>
          </div>
          <div className="search-area">
            <div className="search-box">
              <span className="search-icon">⌕</span>
              <input
                className="search-input"
                type="text"
                placeholder="alternatives Doctolib maison de santé…"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSearch()}
              />
              <button className="search-btn" onClick={doSearch}>Chercher</button>
            </div>
          </div>

          <div className="browser-frame">
            {!currentResult ? (
              <div className="browser-empty">
                <div style={{fontSize:'1.4rem',opacity:.2}}>⌕</div>
                <div style={{fontSize:'.68rem',color:'var(--ink-faint)',lineHeight:1.6,fontStyle:'italic'}}>Lancez une recherche<br/>pour explorer le web.</div>
              </div>
            ) : (
              <>
                <div className="browser-tabs">
                  <div className="browser-tab active">{currentResult.title.substring(0,28)}…</div>
                  <div className="browser-tab">+ Nouvel onglet</div>
                </div>
                <div className="browser-viewport fade-in">
                  <div className="browser-url-bar">
                    <div className="url-dots">
                      <div className="url-dot" style={{background:'#e57373'}}/>
                      <div className="url-dot" style={{background:'#ffb74d'}}/>
                      <div className="url-dot" style={{background:'#81c784'}}/>
                    </div>
                    <div className="url-text">{currentResult.urlDisplay}</div>
                  </div>
                  <div className="page-content">
                    <div className="src-tag">{currentResult.url}</div>
                    <h2>{currentResult.title}</h2>
                    <p>{currentResult.body}</p>
                    <div className="page-highlight" dangerouslySetInnerHTML={{__html: currentResult.highlight}} />
                    <button
                      className={'pin-this' + (isPinned(currentResult.id) ? ' pinned' : '')}
                      onClick={() => !isPinned(currentResult.id) && addPin(currentResult)}
                    >
                      📌 {isPinned(currentResult.id) ? 'Épinglé' : 'Épingler cet extrait'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="help-zone">
            <div className="help-toggle" onClick={() => setHelpOpen(o => !o)}>
              <div className="help-icon">?</div>
              <span className="help-label">Vanessa s'est posé des questions</span>
            </div>
            {helpOpen && (
              <div className="help-panel fade-in">
                {HELP_QUESTIONS.map((q, i) => (
                  <div key={i} className="help-q">
                    <span className="help-q-dash">—</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── DROITE ── */}
        <div className="panel-right">
          <div className="collect-header">
            <div className="collect-label">Zone de collecte</div>
            <div className="collect-title">Ce que vous gardez</div>
            <div className="collect-sub">Épinglez ce qui vous semble utile.<br/>Pas de structure imposée.</div>
          </div>
          <div className="pins-area">
            {pins.length === 0 ? (
              <div className="pin-empty">
                <div className="pin-empty-icon">📌</div>
                <div className="pin-empty-text">Rien d'épinglé pour l'instant.<br/>Cliquez sur "Épingler" dans les résultats.</div>
              </div>
            ) : (
              pins.map(p => (
                <div key={p.id} className="pin-item fade-in">
                  <button className="pin-remove" onClick={() => removePin(p.id)}>✕</button>
                  <div className="pin-source">{p.src}</div>
                  <div className="pin-text">{p.text}</div>
                </div>
              ))
            )}
          </div>
          <div className="collect-footer">
            <button className="proceed-btn" onClick={() => navigate('m6')}>
              Nous avons ce qu'il faut — passer à la production →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
