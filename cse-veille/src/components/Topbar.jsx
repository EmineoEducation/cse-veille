// Topbar.jsx — barre de navigation partagée

export default function Topbar({ current, navigate }) {
  const screens = [
    { id: 'bts',  label: 'Accueil',       hideUntil: null },
    { id: 'm2',   label: 'Vanessa',        hideUntil: 'm2' },
    { id: 'm3',   label: 'Fragments',      hideUntil: 'm3' },
    { id: 'm4',   label: 'Mail prestataire', hideUntil: 'm4' },
    { id: 'm5',   label: 'Veille',         hideUntil: 'm5' },
  ]

  const ORDER = ['bts','m1','m2','m3','m4','m5','m6','m7']
  const currentIdx = ORDER.indexOf(current)
  const visible = screens.filter(s => !s.hideUntil || ORDER.indexOf(s.hideUntil) <= currentIdx)

  if (current === 'bts' || current === 'm1') return null

  return (
    <div className="topbar">
      <span className="tb-logo">Pôle Santé Confluences</span>
      <div className="tb-sep" />
      <span className="tb-crumb">
        <span>{screens.find(s => s.id === current)?.label || '—'}</span>
      </span>
      <div className="tb-right">
        {visible.map(s => (
          <button
            key={s.id}
            className={'nav-pill' + (s.id === current ? ' active' : '')}
            onClick={() => navigate(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
