// ScreenM3.jsx — fragments narratifs

import { useState } from 'react'

const styles = `
.frags-layout { display: grid; grid-template-columns: 220px 1fr; flex: 1; overflow: hidden; }
.frag-sidebar {
  background: var(--surface); border-right: 1px solid var(--border);
  padding: .75rem 0; overflow-y: auto;
}
.frag-sidebar-title {
  font-size: .55rem; letter-spacing: .15em; text-transform: uppercase;
  color: var(--ink-faint); padding: .3rem 1rem .6rem;
}
.frag-tab {
  padding: .55rem 1rem; font-size: .65rem; color: var(--ink-dim); cursor: pointer;
  display: flex; align-items: center; gap: .5rem; border-left: 2px solid transparent;
  transition: all .15s; line-height: 1.3;
}
.frag-tab:hover:not(.locked) { background: var(--surface2); color: var(--ink); }
.frag-tab.active { border-left-color: var(--accent); background: var(--accent-light); color: var(--accent); }
.frag-tab.locked { opacity: .4; cursor: default; }
.ft-badge {
  font-size: .5rem; padding: .05rem .3rem; border-radius: 3px;
  background: var(--border); color: var(--ink-faint); margin-left: auto;
}
.frag-tab.unread .ft-badge { background: var(--accent); color: #a8d4b8; }
.frag-content { flex: 1; overflow-y: auto; padding: 1.5rem 2rem; background: var(--bg); }

/* ODJ */
.odj-paper {
  background: #fffef8; border: 1px solid #ddd8c0; border-radius: 4px;
  padding: 1.25rem 1.5rem; max-width: 540px; font-size: .72rem; line-height: 1.7;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
}
.odj-title {
  font-family: var(--font-sans); font-size: .7rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: var(--ink-faint);
  margin-bottom: 1rem; padding-bottom: .5rem; border-bottom: 1px solid var(--border);
}
.odj-item { display: flex; gap: .75rem; margin-bottom: .5rem; color: var(--ink-dim); }
.odj-num { flex-shrink: 0; color: var(--ink-faint); }
.odj-item.hl .odj-text { color: var(--ink); font-weight: 500; }
.odj-note {
  font-family: var(--font-serif); font-style: italic; font-size: .78rem;
  color: var(--accent-warm); margin-left: 1.5rem; margin-top: .1rem; opacity: .85;
}
/* WhatsApp */
.wa-phone { background: #e5ddd5; border-radius: 12px; max-width: 360px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.1); }
.wa-header { background: #075e54; padding: .6rem .9rem; display: flex; align-items: center; gap: .6rem; }
.wa-avatar { width: 32px; height: 32px; border-radius: 50%; background: #128c7e; display: flex; align-items: center; justify-content: center; font-size: .7rem; color: #fff; font-weight: 600; }
.wa-contact { color: #fff; font-size: .72rem; font-weight: 500; }
.wa-status { font-size: .58rem; color: rgba(255,255,255,.65); }
.wa-body { padding: .75rem .6rem; display: flex; flex-direction: column; gap: .4rem; max-height: 420px; overflow-y: auto; }
.wa-msg { padding: .45rem .65rem; border-radius: 6px; font-size: .68rem; line-height: 1.5; max-width: 78%; word-break: break-word; }
.wa-msg.them { background: #fff; align-self: flex-start; border-radius: 0 6px 6px 6px; }
.wa-msg.me { background: #dcf8c6; align-self: flex-end; border-radius: 6px 0 6px 6px; }
.wa-time { font-size: .52rem; color: #888; text-align: right; margin-top: .15rem; }
.wa-erreur { background: #fff8e6; border: 1px solid #e8c97a; border-radius: 4px; padding: .4rem .7rem; font-size: .6rem; color: #7a5c14; margin-bottom: .5rem; font-style: italic; text-align: center; }
/* LinkedIn */
.li-post { background: #fff; border: 1px solid #e0ddd8; border-radius: 8px; max-width: 520px; padding: 1.1rem 1.25rem; font-size: .73rem; line-height: 1.7; box-shadow: 0 1px 6px rgba(0,0,0,.06); }
.li-author { display: flex; align-items: center; gap: .6rem; margin-bottom: .75rem; }
.li-avatar { width: 40px; height: 40px; border-radius: 50%; background: #0a66c2; display: flex; align-items: center; justify-content: center; color: #fff; font-size: .75rem; font-weight: 700; flex-shrink: 0; }
.li-name { font-size: .75rem; font-weight: 600; color: #1a1a1a; }
.li-role { font-size: .62rem; color: #666; }
.li-date { font-size: .58rem; color: #999; }
.li-title { font-size: .8rem; font-weight: 600; color: #1a1a1a; margin-bottom: .6rem; }
.li-body { color: #3a3a3a; margin-bottom: .75rem; }
.li-body p { margin-bottom: .55rem; }
.li-stats { font-size: .62rem; color: #666; display: flex; gap: 1rem; border-top: 1px solid #f0edea; padding-top: .5rem; }
/* Bonus */
.bonus-wrap { background: var(--accent-light); border: 1px solid #a0c8b0; border-radius: var(--r); padding: 1rem 1.25rem; max-width: 480px; font-size: .72rem; color: var(--accent); }
.bonus-tag { font-size: .55rem; letter-spacing: .12em; text-transform: uppercase; color: #5a8a6a; margin-bottom: .4rem; display: block; }
.bonus-link { display: inline-flex; align-items: center; gap: .4rem; color: var(--accent); font-weight: 500; border-bottom: 1px solid currentColor; cursor: pointer; margin-top: .4rem; }
`

const FragODJ = () => (
  <div className="fade-in">
    <div style={{fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-faint)',marginBottom:'1rem'}}>Fragment A — Ordre du jour · Réunion de coordination</div>
    <div className="odj-paper">
      <div className="odj-title">Pôle Santé Confluences · Réunion de coordination<br/>
        <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'.68rem'}}>Lundi 16 septembre · 12h00 · Salle de réunion</span>
      </div>
      {[
        ['1.','Tour de table — actualités du Pôle'],
        ['2.','Plannings de remplacement — octobre / novembre'],
        ['3.','Commande fournitures médicales — validation bons'],
        ['4.','Accueil secrétaire remplaçante — Mme Fabre'],
        ['5.','Renouvellement convention bâtiment — point DRH'],
      ].map(([n,t]) => (
        <div key={n} className="odj-item"><span className="odj-num">{n}</span><div className="odj-text">{t}</div></div>
      ))}
      <div className="odj-item hl"><span className="odj-num">6.</span><div className="odj-text">Budget outils numériques — point à faire en novembre</div></div>
      <div className="odj-note">voir si on peut faire autrement</div>
      <div className="odj-item"><span className="odj-num">7.</span><div className="odj-text">Divers</div></div>
    </div>
  </div>
)

const FragWA = () => (
  <div className="fade-in">
    <div style={{fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-faint)',marginBottom:'.6rem'}}>Fragment B — Fil WhatsApp</div>
    <div className="wa-phone">
      <div className="wa-header">
        <div className="wa-avatar">DL</div>
        <div><div className="wa-contact">Dr Leroux</div><div className="wa-status">Médecin généraliste · Pôle Santé Confluences</div></div>
      </div>
      <div className="wa-body">
        <div className="wa-erreur">Ce message vous a été transféré par inadvertance.</div>
        <div className="wa-msg them">Bon weekend ?<div className="wa-time">Sam 12 oct · 09h14</div></div>
        <div className="wa-msg me">Oui merci ! Toi ?<div className="wa-time">09h21</div></div>
        <div className="wa-msg them">Couci-couça. Dis, t'as vu le mail de ce matin ?<div className="wa-time">09h23</div></div>
        <div className="wa-msg me">Lequel 😅<div className="wa-time">09h24</div></div>
        <div className="wa-msg them">Doctolib. La tarification.<div className="wa-time">09h24</div></div>
        <div className="wa-msg me">Ah. Pas encore ouvert.<div className="wa-time">09h26</div></div>
        <div className="wa-msg them">Ouvre.<div className="wa-time">09h26</div></div>
        <div className="wa-msg me">...<div className="wa-time">09h31</div></div>
        <div className="wa-msg me">Ok je vois.<div className="wa-time">09h31</div></div>
        <div className="wa-msg them">+18% c'est pas rien<div className="wa-time">09h32</div></div>
        <div className="wa-msg me">Je sais pas trop quoi faire de ça pour l'instant<div className="wa-time">09h34</div></div>
        <div className="wa-msg them">On en parle en novembre non ? Tu peux préparer quelque chose ?<div className="wa-time">09h35</div></div>
        <div className="wa-msg me">Je vais regarder ce qui existe<div className="wa-time">09h37</div></div>
        <div className="wa-msg them">Parce que franchement si c'est pour payer plus cher un truc qui bug une fois sur trois...<div className="wa-time">09h38</div></div>
        <div className="wa-msg me">Haha ouais. Laisse-moi regarder<div className="wa-time">09h41</div></div>
        <div className="wa-msg them">T'as vu le post de Dupré sur LinkedIn au fait ?<div className="wa-time">09h42</div></div>
      </div>
    </div>
  </div>
)

const FragLinkedIn = () => (
  <div className="fade-in">
    <div style={{fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-faint)',marginBottom:'.75rem'}}>Fragment C — Post LinkedIn</div>
    <div className="li-post">
      <div className="li-author">
        <div className="li-avatar">FD</div>
        <div>
          <div className="li-name">François Dupré</div>
          <div className="li-role">Directeur · MSP Les Herbiers · 847 abonnés</div>
          <div className="li-date">Il y a 3 semaines</div>
        </div>
      </div>
      <div className="li-title">Quitter Doctolib ? Qui aurait l'audace de le faire ?</div>
      <div className="li-body">
        <p>Nous l'avons fait. En janvier dernier, après six ans d'utilisation et une nouvelle révision tarifaire que nous n'avions pas anticipée.</p>
        <p>Ce n'était pas une décision idéologique. C'était une décision de gestion. Quand le coût d'un outil dépasse ce qu'il produit en valeur réelle pour votre structure — et pour vos patients — il faut se poser la question.</p>
        <p>Nous avons pris trois mois pour faire le tour du marché. Les alternatives existent. Elles ne sont pas toutes au même niveau de maturité. Certaines ont des lacunes sur l'interopérabilité, d'autres sur la conformité HDS. Mais certaines sont sérieuses, moins chères, et franchement plus réactives sur le support.</p>
        <p>Ce qui m'a le plus surpris : la migration a pris deux semaines. Nos patients ont été informés. Deux ou trois ont appelé pour demander comment ça marchait. C'est tout.</p>
        <p style={{color:'var(--ink-dim)',fontStyle:'italic'}}>DM ouverts si vous êtes dans la même réflexion.</p>
      </div>
      <div className="li-stats"><span>👍 312</span><span>💬 47 commentaires</span><span>↗ 28 republications</span></div>
    </div>
  </div>
)

const FragBonus = () => (
  <div className="fade-in">
    <div style={{fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-faint)',marginBottom:'.75rem'}}>Fragment D — Article de presse</div>
    <div className="bonus-wrap">
      <span className="bonus-tag">Bonus · Presse professionnelle santé</span>
      <p style={{lineHeight:1.6,marginBottom:'.5rem'}}>Un article de <em>What's Up Doc</em> analyse les évolutions tarifaires des plateformes de prise de rendez-vous médical et les stratégies de sortie adoptées par certaines structures.</p>
      <a className="bonus-link" href="https://www.whatsupdoc-lemag.fr" target="_blank" rel="noreferrer">↗ Lire sur whatsupdoc-lemag.fr</a>
    </div>
  </div>
)

const FRAG_COMPONENTS = { a: FragODJ, b: FragWA, c: FragLinkedIn, d: FragBonus }

export default function ScreenM3({ mailOpened }) {
  const [active, setActive] = useState('a')
  const [opened, setOpened] = useState({ a: false, b: false, c: false })

  function open(id) {
    if (id === 'd' && !bonusUnlocked) return
    setActive(id)
    setOpened(o => ({ ...o, [id]: true }))
  }

  const bonusUnlocked = opened.a && opened.b && opened.c && mailOpened

  const tabs = [
    { id: 'a', label: 'Ordre du jour', sub: 'Réunion coordination' },
    { id: 'b', label: 'Fil WhatsApp', sub: 'Transféré par erreur' },
    { id: 'c', label: 'Post LinkedIn', sub: 'Directeur MSP Les Herbiers' },
    { id: 'd', label: 'Article presse', sub: 'Bonus · What\'s Up Doc', bonus: true },
  ]

  const FragComponent = FRAG_COMPONENTS[active]

  return (
    <>
      <style>{styles}</style>
      <div className="frags-layout">
        <div className="frag-sidebar">
          <div className="frag-sidebar-title">Éléments disponibles</div>
          {tabs.map(t => {
            const isLocked = t.bonus && !bonusUnlocked
            const isUnread = !opened[t.id] && !isLocked
            return (
              <div
                key={t.id}
                className={'frag-tab' + (active === t.id ? ' active' : '') + (isLocked ? ' locked' : '') + (isUnread ? ' unread' : '')}
                onClick={() => open(t.id)}
              >
                <span>{t.label}<br/><span style={{fontSize:'.58rem',opacity:.7}}>{t.sub}</span></span>
                <span className="ft-badge">{t.id.toUpperCase()}</span>
              </div>
            )
          })}
        </div>
        <div className="frag-content">
          {FragComponent && <FragComponent />}
        </div>
      </div>
    </>
  )
}
