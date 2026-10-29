import React from 'react';
import { Expression } from '../types/game';

interface PortraitProps {
  suspectId: string;
  expression?: Expression;
  className?: string;
  size?: number;
}

export const CharacterPortrait: React.FC<PortraitProps> = ({
  suspectId,
  expression = 'neutral',
  className = '',
  size = 220
}) => {
  // Neo-noir vector portraits with moody lighting, shadow masks, and expressive eye/mouth shifts
  const getColors = () => {
    switch (suspectId) {
      case 'marcus_vance':
        return { coat: '#1a2238', shirt: '#e2e8f0', hair: '#1c1917', tie: '#991b1b', skin: '#d4b996' };
      case 'evelyn_pendelton':
        return { coat: '#0f172a', shirt: '#475569', hair: '#78350f', tie: '#be123c', skin: '#e2c7a9' };
      case 'sofia_cruz':
        return { coat: '#334155', shirt: '#f8fafc', hair: '#18181b', tie: '#0284c7', skin: '#c8a27e' };
      case 'henri_laurent':
        return { coat: '#2e1065', shirt: '#e2e8f0', hair: '#94a3b8', tie: '#831843', skin: '#cfb190' };
      case 'vivienne_moreau':
        return { coat: '#09090b', shirt: '#71717a', hair: '#172554', tie: '#6b21a8', skin: '#dfcaa8' };
      case 'lucian_dupuis':
        return { coat: '#1e293b', shirt: '#ffffff', hair: '#451a03', tie: '#0f766e', skin: '#dab794' };
      case 'dr_simon_finch':
        return { coat: '#18181b', shirt: '#cbd5e1', hair: '#64748b', tie: '#1e3a8a', skin: '#cbb092' };
      case 'damian_cole':
        return { coat: '#292524', shirt: '#dc2626', hair: '#0a0a0a', tie: '#44403c', skin: '#d6b492' };
      case 'veronica_vance_hill':
        return { coat: '#312e81', shirt: '#f1f5f9', hair: '#713f12', tie: '#a21caf', skin: '#decaa9' };
      case 'rachel_vance_kemp':
        return { coat: '#0f172a', shirt: '#047857', hair: '#020617', tie: '#0284c7', skin: '#caa888' };
      case 'sarah_chen':
        return { coat: '#374151', shirt: '#f3f4f6', hair: '#09090b', tie: '#db2777', skin: '#cfb095' };
      case 'gregory_vance':
        return { coat: '#172554', shirt: '#e0e7ff', hair: '#475569', tie: '#b91c1c', skin: '#d8ba9a' };
      case 'dr_alistair_finch':
        return { coat: '#020617', shirt: '#1e293b', hair: '#e2e8f0', tie: '#7f1d1d', skin: '#d0b395' };
      case 'senator_eleanor_grey':
        return { coat: '#4c0519', shirt: '#fecdd3', hair: '#581c87', tie: '#c026d3', skin: '#e2c6a8' };
      case 'maestro_victor_vance':
        return { coat: '#0a0a0a', shirt: '#fafafa', hair: '#71717a', tie: '#e11d48', skin: '#d2b290' };
      case 'julian_cross':
        return { coat: '#0b0f19', shirt: '#d1d5db', hair: '#111827', tie: '#b45309', skin: '#d5b799' };
      case 'clara_vance':
        return { coat: '#1e293b', shirt: '#f8fafc', hair: '#7c2d12', tie: '#0369a1', skin: '#e0c4a6' };
      default:
        return { coat: '#1e293b', shirt: '#94a3b8', hair: '#18181b', tie: '#b45309', skin: '#d4b996' };
    }
  };

  const c = getColors();

  // Eyebrow and eye transformations based on expression
  const getEyePath = () => {
    switch (expression) {
      case 'nervous':
      case 'shocked':
        return (
          <>
            <circle cx="85" cy="100" r="7" fill="#ffffff" />
            <circle cx="85" cy="100" r="3.5" fill="#0f172a" />
            <circle cx="135" cy="100" r="7" fill="#ffffff" />
            <circle cx="135" cy="100" r="3.5" fill="#0f172a" />
            <path d="M 75 88 Q 85 82 97 86" stroke="#c5a059" strokeWidth="2.5" fill="none" />
            <path d="M 123 86 Q 135 82 145 88" stroke="#c5a059" strokeWidth="2.5" fill="none" />
          </>
        );
      case 'defensive':
        return (
          <>
            <ellipse cx="85" cy="101" rx="6" ry="4" fill="#ffffff" />
            <circle cx="85" cy="101" r="3" fill="#0f172a" />
            <ellipse cx="135" cy="101" rx="6" ry="4" fill="#ffffff" />
            <circle cx="135" cy="101" r="3" fill="#0f172a" />
            <path d="M 75 92 L 97 96" stroke="#c5a059" strokeWidth="3" fill="none" />
            <path d="M 123 96 L 145 92" stroke="#c5a059" strokeWidth="3" fill="none" />
          </>
        );
      case 'calculating':
        return (
          <>
            <ellipse cx="85" cy="102" rx="7" ry="3.5" fill="#ffffff" />
            <circle cx="86" cy="102" r="2.8" fill="#1e293b" />
            <ellipse cx="135" cy="102" rx="7" ry="3.5" fill="#ffffff" />
            <circle cx="134" cy="102" r="2.8" fill="#1e293b" />
            <path d="M 76 91 Q 86 91 96 93" stroke="#c5a059" strokeWidth="2.5" fill="none" />
            <path d="M 124 90 Q 134 87 144 91" stroke="#c5a059" strokeWidth="2.5" fill="none" />
          </>
        );
      case 'defeated':
        return (
          <>
            <ellipse cx="85" cy="103" rx="6" ry="3" fill="#cbd5e1" />
            <circle cx="85" cy="104" r="2" fill="#0f172a" />
            <ellipse cx="135" cy="103" rx="6" ry="3" fill="#cbd5e1" />
            <circle cx="135" cy="104" r="2" fill="#0f172a" />
            <path d="M 76 93 Q 86 96 96 94" stroke="#71717a" strokeWidth="2.5" fill="none" />
            <path d="M 124 94 Q 134 96 144 93" stroke="#71717a" strokeWidth="2.5" fill="none" />
          </>
        );
      default: // neutral
        return (
          <>
            <ellipse cx="85" cy="100" rx="6.5" ry="4.5" fill="#ffffff" />
            <circle cx="85" cy="100" r="3.2" fill="#0f172a" />
            <ellipse cx="135" cy="100" rx="6.5" ry="4.5" fill="#ffffff" />
            <circle cx="135" cy="100" r="3.2" fill="#0f172a" />
            <path d="M 76 90 Q 86 88 96 91" stroke="#c5a059" strokeWidth="2.5" fill="none" />
            <path d="M 124 91 Q 134 88 144 90" stroke="#c5a059" strokeWidth="2.5" fill="none" />
          </>
        );
    }
  };

  const getMouthPath = () => {
    switch (expression) {
      case 'shocked':
        return <ellipse cx="110" cy="142" rx="6" ry="8" fill="#18181b" stroke="#8e6e30" strokeWidth="1.5" />;
      case 'nervous':
        return <path d="M 100 144 Q 106 141 112 144 T 120 142" stroke="#451a03" strokeWidth="2" fill="none" />;
      case 'defensive':
        return <path d="M 100 144 L 120 142" stroke="#451a03" strokeWidth="2.5" fill="none" />;
      case 'calculating':
        return <path d="M 102 142 Q 112 141 120 139" stroke="#451a03" strokeWidth="2" fill="none" />;
      case 'defeated':
        return <path d="M 102 146 Q 110 142 118 146" stroke="#451a03" strokeWidth="2" fill="none" />;
      default: // neutral
        return <path d="M 102 142 Q 110 144 118 142" stroke="#451a03" strokeWidth="2" fill="none" />;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-lg border border-brass/40 bg-noir-900 shadow-noir-card ${className}`}>
      <svg
        viewBox="0 0 220 260"
        width={size}
        height={size * 1.18}
        className="w-full h-auto block select-none pointer-events-none"
      >
        <defs>
          <linearGradient id={`bgGrad_${suspectId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0e1320" />
            <stop offset="100%" stopColor="#06080d" />
          </linearGradient>
          <linearGradient id={`lightShaft_${suspectId}`} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#c5a059" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#c5a059" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id={`shadowMask_${suspectId}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* Noir Vignette Background */}
        <rect width="220" height="260" fill={`url(#bgGrad_${suspectId})`} />
        <polygon points="0,0 120,0 180,260 0,260" fill={`url(#lightShaft_${suspectId})`} />

        {/* Silhouette / Shoulders Coat */}
        <path
          d="M 20 260 L 50 190 Q 75 175 110 178 Q 145 175 170 190 L 200 260 Z"
          fill={c.coat}
          stroke="#000000"
          strokeWidth="2"
        />

        {/* Collar & Shirt */}
        <polygon points="90,176 110,210 130,176" fill={c.shirt} />
        {/* Tie / Ascot */}
        <polygon points="107,185 113,185 116,230 110,240 104,230" fill={c.tie} />
        {/* Lapels */}
        <polygon points="50,190 85,225 92,176" fill={c.coat} stroke="#090d16" strokeWidth="1.5" />
        <polygon points="170,190 135,225 128,176" fill={c.coat} stroke="#090d16" strokeWidth="1.5" />

        {/* Neck */}
        <rect x="96" y="145" width="28" height="35" rx="4" fill={c.skin} />
        {/* Shadow on Neck */}
        <polygon points="96,155 124,155 124,175 96,170" fill="rgba(0,0,0,0.22)" />

        {/* Head / Face */}
        <path
          d="M 72 85 Q 70 135 110 162 Q 150 135 148 85 Q 146 45 110 45 Q 74 45 72 85 Z"
          fill={c.skin}
          stroke="#1e1b18"
          strokeWidth="1.5"
        />

        {/* Half-Face Noir Shadow (Rembrandt lighting) */}
        <path
          d="M 110 45 Q 146 45 148 85 Q 150 135 110 162 Z"
          fill="rgba(8, 12, 22, 0.45)"
        />

        {/* Hair */}
        <path
          d="M 68 85 Q 65 42 110 38 Q 155 42 152 85 Q 145 55 110 52 Q 75 55 68 85 Z"
          fill={c.hair}
        />

        {/* Eyes & Eyebrows */}
        {getEyePath()}

        {/* Nose */}
        <path d="M 110 98 L 107 124 L 114 125" stroke="#8e6e30" strokeWidth="1.8" fill="none" />

        {/* Mouth */}
        {getMouthPath()}

        {/* Glasses for Finch / Specialist */}
        {(suspectId === 'dr_simon_finch' || suspectId === 'dr_alistair_finch') && (
          <g stroke="#c5a059" strokeWidth="1.8" fill="none">
            <circle cx="85" cy="100" r="14" />
            <circle cx="135" cy="100" r="14" />
            <line x1="99" y1="99" x2="121" y2="99" />
            <line x1="71" y1="98" x2="60" y2="92" />
            <line x1="149" y1="98" x2="160" y2="92" />
          </g>
        )}

        {/* Cigarette smoke or dramatic mist overlay */}
        <rect width="220" height="260" fill={`url(#shadowMask_${suspectId})`} pointerEvents="none" />
      </svg>

      {/* Expression badge */}
      <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded bg-noir-950/90 border border-brass/30 text-[10px] uppercase tracking-wider text-brass font-mono-code">
        {expression}
      </div>
    </div>
  );
};
