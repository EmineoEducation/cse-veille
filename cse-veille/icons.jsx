// ══════════════════════════════════════════════════════════════
//  CSE VEILLE — icons.jsx
// ══════════════════════════════════════════════════════════════

function MailIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="10" fill="url(#mailGrad)"/>
      <defs>
        <linearGradient id="mailGrad" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="#1a5c9a"/>
          <stop offset="100%" stopColor="#0d3d6e"/>
        </linearGradient>
      </defs>
      <rect x="8" y="13" width="28" height="19" rx="3" fill="white" opacity="0.95"/>
      <polyline points="8,13 22,24 36,13" stroke="#1a5c9a" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}
window.MailIcon = MailIcon;

function BrowserIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="10" fill="url(#browserGrad)"/>
      <defs>
        <linearGradient id="browserGrad" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="#34a8d4"/>
          <stop offset="100%" stopColor="#1a6a9a"/>
        </linearGradient>
      </defs>
      <rect x="7" y="11" width="30" height="22" rx="3" fill="white" opacity="0.15" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      <rect x="7" y="11" width="30" height="8" rx="3" fill="white" opacity="0.2"/>
      <circle cx="12" cy="15" r="1.5" fill="white" opacity="0.7"/>
      <circle cx="17" cy="15" r="1.5" fill="white" opacity="0.7"/>
      <rect x="21" y="13" width="13" height="4" rx="2" fill="white" opacity="0.3"/>
      <rect x="11" y="23" width="22" height="1.5" rx="1" fill="white" opacity="0.4"/>
      <rect x="11" y="27" width="16" height="1.5" rx="1" fill="white" opacity="0.3"/>
    </svg>
  );
}
window.BrowserIcon = BrowserIcon;

function NotesIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="10" fill="url(#notesGrad)"/>
      <defs>
        <linearGradient id="notesGrad" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="#f5c842"/>
          <stop offset="100%" stopColor="#e0a020"/>
        </linearGradient>
      </defs>
      <rect x="9" y="9" width="26" height="26" rx="3" fill="white" opacity="0.95"/>
      <rect x="13" y="14" width="18" height="2" rx="1" fill="#e0a020" opacity="0.7"/>
      <rect x="13" y="19" width="18" height="2" rx="1" fill="#e0a020" opacity="0.5"/>
      <rect x="13" y="24" width="13" height="2" rx="1" fill="#e0a020" opacity="0.4"/>
    </svg>
  );
}
window.NotesIcon = NotesIcon;

function LivrableIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="10" fill="url(#livrableGrad)"/>
      <defs>
        <linearGradient id="livrableGrad" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="#1a3a2e"/>
          <stop offset="100%" stopColor="#0d2018"/>
        </linearGradient>
      </defs>
      <rect x="10" y="8" width="24" height="28" rx="3" fill="white" opacity="0.95"/>
      <rect x="14" y="13" width="16" height="1.8" rx="1" fill="#1a3a2e" opacity="0.5"/>
      <rect x="14" y="17" width="16" height="1.8" rx="1" fill="#1a3a2e" opacity="0.4"/>
      <rect x="14" y="21" width="12" height="1.8" rx="1" fill="#1a3a2e" opacity="0.3"/>
      <path d="M28 28 L32 32" stroke="#a8d4b8" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="26" cy="27" r="4" stroke="#a8d4b8" strokeWidth="1.8" fill="none"/>
    </svg>
  );
}
window.LivrableIcon = LivrableIcon;

function FinderIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="10" fill="url(#finderGrad)"/>
      <defs>
        <linearGradient id="finderGrad" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="#5ac8fa"/>
          <stop offset="100%" stopColor="#007aff"/>
        </linearGradient>
      </defs>
      <ellipse cx="22" cy="22" rx="11" ry="10" fill="white" opacity="0.9"/>
      <circle cx="18" cy="21" r="3.5" fill="#007aff" opacity="0.8"/>
      <circle cx="26" cy="21" r="3.5" fill="#007aff" opacity="0.8"/>
      <path d="M14 27 Q18 31 22 27 Q26 31 30 27" stroke="#007aff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
window.FinderIcon = FinderIcon;

function TrashIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="10" fill="url(#trashGrad)"/>
      <defs>
        <linearGradient id="trashGrad" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="#8e9eb0"/>
          <stop offset="100%" stopColor="#5a6a7a"/>
        </linearGradient>
      </defs>
      <rect x="13" y="16" width="18" height="16" rx="2" fill="white" opacity="0.9"/>
      <rect x="10" y="13" width="24" height="3" rx="1.5" fill="white" opacity="0.7"/>
      <rect x="17" y="10" width="10" height="3" rx="1.5" fill="white" opacity="0.6"/>
      <rect x="17" y="20" width="2" height="8" rx="1" fill="#5a6a7a" opacity="0.5"/>
      <rect x="21" y="20" width="2" height="8" rx="1" fill="#5a6a7a" opacity="0.5"/>
      <rect x="25" y="20" width="2" height="8" rx="1" fill="#5a6a7a" opacity="0.5"/>
    </svg>
  );
}
window.TrashIcon = TrashIcon;

function FolderIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <path d="M6 16 Q6 13 9 13 L18 13 L20 16 L38 16 Q41 16 41 19 L41 34 Q41 37 38 37 L6 37 Q3 37 3 34 L3 19 Q3 16 6 16Z" fill="url(#folderGrad)"/>
      <defs>
        <linearGradient id="folderGrad" x1="0" y1="13" x2="0" y2="37">
          <stop offset="0%" stopColor="#5ac8fa"/>
          <stop offset="100%" stopColor="#007aff"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
window.FolderIcon = FolderIcon;
