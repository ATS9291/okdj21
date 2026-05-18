const NORIGAE_SVG = `<svg width="44" height="77" viewBox="0 0 36 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ng" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#7A8C2E"/>
      <stop offset="100%" stop-color="#242D0C"/>
    </radialGradient>
  </defs>
  <ellipse cx="18" cy="8" rx="9" ry="7" fill="#4B5520" stroke="#242D0C" stroke-width="1.5"/>
  <path d="M9,8 Q18,1 27,8 Q18,15 9,8Z" fill="#6B7A28" opacity="0.7"/>
  <path d="M18,1 Q25,8 18,15 Q11,8 18,1Z" fill="#6B7A28" opacity="0.7"/>
  <circle cx="18" cy="8" r="3" fill="#242D0C"/>
  <rect x="17" y="15" width="2" height="7" rx="1" fill="#3A4518"/>
  <path d="M18,22 L33,31 L18,40 L3,31 Z" fill="#6B7A28" stroke="#242D0C" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M18,22 L33,31 L18,40 L3,31 Z" fill="url(#ng)" opacity="0.5"/>
  <ellipse cx="18" cy="31" rx="4" ry="9" fill="#4B5520"/>
  <circle cx="18" cy="31" r="3" fill="#242D0C"/>
  <circle cx="18" cy="31" r="1.5" fill="#7A8C2E"/>
  <line x1="12" y1="40" x2="9"  y2="61" stroke="#3A4518" stroke-width="2"   stroke-linecap="round"/>
  <line x1="15" y1="40" x2="13" y2="63" stroke="#6B7A28" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="18" y1="40" x2="18" y2="64" stroke="#4B5520" stroke-width="2"   stroke-linecap="round"/>
  <line x1="21" y1="40" x2="23" y2="63" stroke="#6B7A28" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="24" y1="40" x2="27" y2="61" stroke="#3A4518" stroke-width="2"   stroke-linecap="round"/>
  <circle cx="9"  cy="61" r="2"   fill="#8A9C35"/>
  <circle cx="13" cy="63" r="1.5" fill="#8A9C35"/>
  <circle cx="18" cy="64" r="2"   fill="#8A9C35"/>
  <circle cx="23" cy="63" r="1.5" fill="#8A9C35"/>
  <circle cx="27" cy="61" r="2"   fill="#8A9C35"/>
</svg>`;

export const NORIGAE_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(NORIGAE_SVG)}") 22 5, crosshair`;
