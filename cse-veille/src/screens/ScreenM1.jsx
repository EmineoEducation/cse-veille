// ScreenM1.jsx — signal vidéo d'ouverture

import { useState } from 'react'

const styles = `
.m1-wrap {
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  height: 100vh; background: #0d0f0e; gap: 1.5rem;
}
.video-frame {
  width: 620px; max-width: 90vw; background: #111;
  border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden;
}
.video-chrome {
  background: #1a1a1a; padding: .4rem .6rem;
  display: flex; align-items: center; gap: .5rem; border-bottom: 1px solid #2a2a2a;
}
.vc-dot { width: 8px; height: 8px; border-radius: 50%; }
.vc-url {
  font-size: .58rem; color: #555; letter-spacing: .04em;
  font-family: var(--font-mono); margin-left: .4rem;
}
.video-screen {
  background: #0d1a14; aspect-ratio: 16/9;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  position: relative; overflow: hidden; cursor: pointer;
}
.video-ticker {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: rgba(26,58,46,.85); padding: .35rem .75rem;
  font-size: .6rem; letter-spacing: .06em; color: #a8d4b8;
  display: flex; align-items: center; gap: .75rem;
}
.ticker-tag {
  background: #a8d4b8; color: #0d2018; padding: .05rem .35rem;
  font-size: .55rem; font-weight: 500; border-radius: 2px; letter-spacing: .04em;
}
.video-play {
  width: 54px; height: 54px; background: rgba(168,212,184,.12);
  border: 2px solid rgba(168,212,184,.4); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; transition: all .3s;
}
.video-play:hover { background: rgba(168,212,184,.22); border-color: rgba(168,212,184,.7); }
.play-icon {
  width: 0; height: 0;
  border-top: 10px solid transparent; border-bottom: 10px solid transparent;
  border-left: 18px solid #a8d4b8; margin-left: 4px;
}
.video-playing-inner {
  text-align: center; position: absolute;
  top: 50%; left: 50%; transform: translate(-50%,-50%);
}
.video-caption { font-size: .62rem; color: #5a7a6a; letter-spacing: .04em; text-align: center; margin-top: .5rem; }
.m1-phrase {
  font-family: var(--font-serif); font-style: italic;
  font-size: 1.05rem; color: #6b9e7e; text-align: center;
  opacity: 0; transition: opacity 1s;
}
.m1-phrase.visible { opacity: 1; }
.m1-continue {
  font-size: .62rem; color: #3d5a48; letter-spacing: .08em;
  cursor: pointer; border-bottom: 1px solid #3d5a48; padding-bottom: .1rem;
  opacity: 0; transition: opacity .8s;
}
.m1-continue.visible { opacity: 1; }
.m1-continue:hover { color: #6b9e7e; }
`

export default function ScreenM1({ navigate }) {
  const [played, setPlayed] = useState(false)
  const [showPhrase, setShowPhrase] = useState(false)
  const [showContinue, setShowContinue] = useState(false)

  function handlePlay() {
    if (played) return
    setPlayed(true)
    setTimeout(() => setShowPhrase(true), 1200)
    setTimeout(() => setShowContinue(true), 2600)
  }

  return (
    <>
      <style>{styles}</style>
      <div className="m1-wrap">
        <div className="video-frame fade-in">
          <div className="video-chrome">
            <div className="vc-dot" style={{ background: '#e57373' }} />
            <div className="vc-dot" style={{ background: '#ffb74d' }} />
            <div className="vc-dot" style={{ background: '#81c784' }} />
            <span className="vc-url">france.tv — info régionale</span>
          </div>
          <div className="video-screen" onClick={handlePlay}>
            {!played && (
              <div className="video-play">
                <div className="play-icon" />
              </div>
            )}
            {played && (
              <div className="video-playing-inner fade-in">
                <div style={{ fontFamily:'var(--font-sans)', fontSize:'.62rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'#a8d4b8', marginBottom:'.4rem' }}>
                  SANTÉ NUMÉRIQUE · FRANCE 3 NOUVELLE-AQUITAINE
                </div>
                <div style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'.95rem', color:'#d4ead8', lineHeight:1.4, maxWidth:360 }}>
                  "Les cabinets médicaux face à la dépendance aux plateformes numériques"
                </div>
                <div style={{ fontSize:'.6rem', color:'#5a8a6a', marginTop:'.5rem' }}>▶ 0:52 — reportage</div>
              </div>
            )}
            <div className="video-ticker">
              <span className="ticker-tag">DIRECT</span>
              <span>France 3 Nouvelle-Aquitaine · Journal régional</span>
              <span style={{ marginLeft:'auto', opacity:.6 }}>▶ 0:52</span>
            </div>
          </div>
          <div className="video-caption">Cliquez pour lancer · 52 secondes</div>
        </div>

        <div className={'m1-phrase' + (showPhrase ? ' visible' : '')}>
          Quelqu'un dans votre région a reçu un mail ce matin.
        </div>
        <span
          className={'m1-continue' + (showContinue ? ' visible' : '')}
          onClick={() => showContinue && navigate('m2')}
        >
          Continuer →
        </span>
      </div>
    </>
  )
}
