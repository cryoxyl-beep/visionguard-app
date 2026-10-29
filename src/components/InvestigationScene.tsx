import React, { useState } from 'react';
import { CaseData, Clue, Hotspot } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { 
  Eye, 
  Search, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  Brain, 
  X, 
  HelpCircle,
  FileText,
  Wine,
  Pill,
  Shield,
  Smartphone,
  Umbrella,
  Music,
  Radio
} from 'lucide-react';

interface Props {
  currentCase: CaseData;
  discoveredClueIds: string[];
  examinedClueIds: string[];
  onDiscoverClue: (clueId: string) => void;
  onExamineClue: (clueId: string) => void;
  onOpenMindPalace: () => void;
  highContrast: boolean;
}

export const InvestigationScene: React.FC<Props> = ({
  currentCase,
  discoveredClueIds,
  examinedClueIds,
  onDiscoverClue,
  onExamineClue,
  onOpenMindPalace,
  highContrast
}) => {
  const currentScene = currentCase.scenes[0];
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'julian' | 'clara'>('both');

  const getClueForHotspot = (hotspot: Hotspot): Clue | undefined => {
    return currentCase.clues.find(c => c.id === hotspot.clueId);
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    audioEngine.playPaperRustle();
    
    // Discover clue if not yet discovered
    if (!discoveredClueIds.includes(hotspot.clueId)) {
      onDiscoverClue(hotspot.clueId);
      audioEngine.playEvidenceDiscovered();
    }
  };

  const handleMarkExamined = (clueId: string) => {
    onExamineClue(clueId);
    audioEngine.playTypewriter();
  };

  // Render SVG/Canvas styled background based on case visualTheme
  const renderAtmosphericScene = () => {
    switch (currentCase.id) {
      case 'case1': // Penthouse Study
        return (
          <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="penthouseSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#090d16" />
                <stop offset="60%" stopColor="#141c2e" />
                <stop offset="100%" stopColor="#252a3a" />
              </linearGradient>
              <linearGradient id="penthouseDesk" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2b1408" />
                <stop offset="50%" stopColor="#451e0b" />
                <stop offset="100%" stopColor="#1e0c05" />
              </linearGradient>
            </defs>
            {/* Night Sky & Distant Towers through window */}
            <rect width="1000" height="600" fill="url(#penthouseSky)" />
            <polygon points="120,80 180,80 180,450 120,450" fill="#0d131f" opacity="0.6" />
            <polygon points="220,120 280,120 280,450 220,450" fill="#0b101b" opacity="0.7" />
            <polygon points="720,90 780,90 780,450 720,450" fill="#0c121e" opacity="0.6" />
            {/* Window Frames */}
            <line x1="80" y1="40" x2="920" y2="40" stroke="#1a202c" strokeWidth="8" />
            <line x1="80" y1="420" x2="920" y2="420" stroke="#1a202c" strokeWidth="12" />
            <line x1="320" y1="40" x2="320" y2="420" stroke="#1a202c" strokeWidth="6" />
            <line x1="680" y1="40" x2="680" y2="420" stroke="#1a202c" strokeWidth="6" />
            {/* Hardwood floor & Persian Rug */}
            <rect x="0" y="420" width="1000" height="180" fill="#0f0c08" />
            <ellipse cx="500" cy="510" rx="340" ry="70" fill="#4a151b" stroke="#8e6e30" strokeWidth="3" opacity="0.8" />
            {/* Side Bar Credenza */}
            <rect x="750" y="320" width="220" height="180" fill="#1b120c" stroke="#2f1f14" strokeWidth="2" />
            <rect x="780" y="270" width="40" height="50" rx="4" fill="#a5f3fc" opacity="0.25" />
            <circle cx="850" cy="305" r="8" fill="#fde047" opacity="0.4" />
            <circle cx="875" cy="305" r="8" fill="#fde047" opacity="0.4" />
            {/* Mahogany Desk */}
            <polygon points="260,380 740,380 820,530 180,530" fill="url(#penthouseDesk)" stroke="#8e6e30" strokeWidth="2" />
            {/* Leather Blotter */}
            <polygon points="360,400 640,400 660,480 340,480" fill="#111827" stroke="#374151" strokeWidth="1.5" />
            {/* Victim Silhouette Slumped */}
            <path d="M 460 380 Q 500 350 540 380 L 530 430 L 470 430 Z" fill="#080a0f" opacity="0.9" />
            <circle cx="500" cy="370" r="24" fill="#05070a" />
          </svg>
        );

      case 'case2': // Winery Cellar
        return (
          <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
            <rect width="1000" height="600" fill="#080709" />
            {/* Arched Stone Vaults */}
            <path d="M 0 350 Q 250 80 500 350 Q 750 80 1000 350 L 1000 600 L 0 600 Z" fill="#131015" stroke="#2d222b" strokeWidth="3" />
            <path d="M 150 350 Q 500 140 850 350" stroke="#3f2e3c" strokeWidth="8" fill="none" opacity="0.5" />
            {/* Wine Racks */}
            <rect x="40" y="220" width="160" height="260" fill="#18131c" stroke="#342232" strokeWidth="2" />
            <rect x="800" y="220" width="160" height="260" fill="#18131c" stroke="#342232" strokeWidth="2" />
            {/* Tasting Table */}
            <polygon points="200,380 800,380 880,540 120,540" fill="#1f1816" stroke="#c5a059" strokeWidth="2" />
            {/* Candles & Wine Glasses */}
            <circle cx="500" cy="370" r="16" fill="#f59e0b" opacity="0.3" filter="blur(4px)" />
            <circle cx="500" cy="370" r="4" fill="#fef08a" />
            <rect x="498" y="375" width="4" height="25" fill="#fef9c3" />
            {/* Decanter */}
            <path d="M 515 390 L 525 390 L 535 440 L 505 440 Z" fill="#991b1b" stroke="#f1f5f9" strokeWidth="1.5" opacity="0.8" />
          </svg>
        );

      case 'case3': // Art Atelier
        return (
          <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
            <rect width="1000" height="600" fill="#090a0f" />
            {/* Industrial Skylights */}
            <polygon points="100,20 400,20 350,150 50,150" fill="#1e293b" opacity="0.3" />
            <polygon points="500,20 800,20 750,150 450,150" fill="#1e293b" opacity="0.3" />
            {/* Marble Busts & Statues */}
            <rect x="120" y="260" width="80" height="200" fill="#1a1c23" stroke="#334155" strokeWidth="2" />
            <circle cx="160" cy="230" r="28" fill="#e2e8f0" opacity="0.4" />
            {/* Shattered Wall Mirror */}
            <polygon points="220,180 340,170 330,380 230,370" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            <line x1="220" y1="180" x2="330" y2="380" stroke="#f8fafc" strokeWidth="2" />
            <line x1="340" y1="170" x2="230" y2="370" stroke="#f8fafc" strokeWidth="2" />
            {/* Sculptor Workbench */}
            <polygon points="380,360 850,360 880,520 350,520" fill="#262626" stroke="#525252" strokeWidth="2" />
            <rect x="620" y="380" width="30" height="40" fill="#b45309" stroke="#d97706" />
          </svg>
        );

      case 'case4': // Rooftop Observatory
        return (
          <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="lightningSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#040711" />
                <stop offset="70%" stopColor="#0c172e" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            <rect width="1000" height="600" fill="url(#lightningSky)" />
            {/* Distant Lightning Bolt */}
            <polyline points="320,0 300,120 330,130 290,260" stroke="#93c5fd" strokeWidth="2" opacity="0.7" fill="none" />
            {/* Steel Towers and Antennas */}
            <line x1="150" y1="80" x2="150" y2="400" stroke="#334155" strokeWidth="4" />
            <line x1="850" y1="60" x2="850" y2="400" stroke="#334155" strokeWidth="5" />
            {/* Balustrade Glass and Steel Railing */}
            <polygon points="0,420 1000,420 1000,600 0,600" fill="#0b0f19" />
            <line x1="0" y1="420" x2="1000" y2="420" stroke="#475569" strokeWidth="6" />
            <rect x="200" y="320" width="600" height="100" fill="#38bdf8" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
            {/* Strobe Alarm Light */}
            <circle cx="750" cy="280" r="14" fill="#ef4444" opacity="0.7" className="animate-ping" />
            <circle cx="750" cy="280" r="6" fill="#f87171" />
          </svg>
        );

      case 'case5': // Orpheum Opera House
        return (
          <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
            <rect width="1000" height="600" fill="#080608" />
            {/* Gilded Balconies */}
            <path d="M 0 140 Q 500 200 1000 140 L 1000 220 Q 500 280 0 220 Z" fill="#2d1015" stroke="#c5a059" strokeWidth="3" />
            <path d="M 0 280 Q 500 340 1000 280 L 1000 360 Q 500 420 0 360 Z" fill="#2d1015" stroke="#c5a059" strokeWidth="3" />
            {/* Chandelier Glow */}
            <circle cx="500" cy="90" r="60" fill="#fde047" opacity="0.15" filter="blur(10px)" />
            <polygon points="460,70 540,70 520,130 480,130" fill="#eab308" stroke="#ca8a04" strokeWidth="2" opacity="0.8" />
            {/* VIP Box A (Left) */}
            <rect x="40" y="240" width="180" height="140" fill="#4c0519" stroke="#d4af37" strokeWidth="2" />
            <rect x="60" y="320" width="60" height="50" rx="6" fill="#881337" />
            {/* Orchestra Pit */}
            <ellipse cx="500" cy="520" rx="380" ry="60" fill="#030712" stroke="#1f2937" strokeWidth="3" />
            <rect x="480" y="460" width="40" height="50" fill="#111827" stroke="#c5a059" strokeWidth="1" />
          </svg>
        );

      default:
        return <div className="w-full h-full bg-noir-950" />;
    }
  };

  const getClueIcon = (category: string) => {
    switch (category) {
      case 'physical': return <Search className="w-5 h-5 text-amber-400" />;
      case 'psychological': return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'document': return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'contradiction': return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default: return <Sparkles className="w-5 h-5 text-brass" />;
    }
  };

  const activeClue = selectedHotspot ? getClueForHotspot(selectedHotspot) : null;
  const isSelectedExamined = activeClue ? examinedClueIds.includes(activeClue.id) : false;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-noir-950">
      {/* Scene Title Bar */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-3 px-4 py-2 rounded-lg bg-noir-950/85 backdrop-blur border border-brass/30 shadow-noir-card">
        <Eye className="w-4 h-4 text-brass" />
        <div>
          <h2 className="text-sm font-semibold text-ivory tracking-wider uppercase font-cinzel">
            {currentScene.name}
          </h2>
          <p className="text-xs text-noir-400 font-mono-code">{currentScene.subtitle}</p>
        </div>
      </div>

      {/* Quick Action to Mind Palace */}
      <div className="absolute top-3 right-4 z-20 flex items-center gap-2">
        <button
          onClick={onOpenMindPalace}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-brass/20 hover:bg-brass/30 border border-brass text-brass-light text-xs font-semibold tracking-wider uppercase transition shadow-noir-card"
        >
          <Brain className="w-4 h-4 text-brass" />
          <span>Mind Palace ({examinedClueIds.length} Examined)</span>
        </button>
      </div>

      {/* Main Interactive Scene Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {renderAtmosphericScene()}

        {/* Interactive Hotspots Layer */}
        {currentScene.hotspots.map((hotspot) => {
          const clue = getClueForHotspot(hotspot);
          const isDiscovered = clue ? discoveredClueIds.includes(clue.id) : false;
          const isExamined = clue ? examinedClueIds.includes(clue.id) : false;

          return (
            <div
              key={hotspot.id}
              onClick={() => handleHotspotClick(hotspot)}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
              }}
              className={`absolute cursor-pointer transition-all duration-300 rounded flex items-center justify-center group ${
                highContrast
                  ? 'border-2 border-amber-400 bg-amber-400/20'
                  : 'border border-brass/40 hover:border-brass hover:bg-brass/10'
              }`}
            >
              {/* Pulse Marker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-lg transition-transform transform group-hover:scale-125 ${
                  isExamined
                    ? 'bg-emerald-800/90 text-emerald-200 border border-emerald-400'
                    : isDiscovered
                    ? 'bg-amber-800/90 text-amber-200 border border-amber-400 animate-noir-pulse'
                    : 'bg-noir-900/90 text-brass border border-brass/70 animate-bounce'
                }`}
              >
                {isExamined ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 whitespace-nowrap px-2.5 py-1 rounded bg-noir-950/95 border border-brass/50 text-[11px] font-medium text-ivory tracking-wide shadow-noir-card">
                {hotspot.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspection Modal (Dual Perspective: Julian Mentalist vs Clara Forensics) */}
      {selectedHotspot && activeClue && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-noir-900 border border-brass/50 rounded-xl shadow-noir-card overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-noir-950 border-b border-brass/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-brass/15 border border-brass/40">
                  {getClueIcon(activeClue.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono-code bg-brass/20 text-brass-light border border-brass/30">
                      {activeClue.category}
                    </span>
                    <span className="text-xs text-noir-400">{activeClue.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-ivory tracking-wide font-cinzel">
                    {activeClue.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-1.5 rounded-lg text-noir-400 hover:text-ivory hover:bg-noir-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
              {/* Object Full Description */}
              <div className="p-4 rounded-lg bg-noir-950/70 border border-noir-700/60 leading-relaxed text-noir-200">
                <p>{activeClue.fullDescription}</p>
              </div>

              {/* Dual Perspective Switcher Tabs */}
              <div className="flex border-b border-noir-700">
                <button
                  onClick={() => setActiveTab('both')}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition border-b-2 ${
                    activeTab === 'both'
                      ? 'border-brass text-brass-light'
                      : 'border-transparent text-noir-400 hover:text-noir-200'
                  }`}
                >
                  Both Perspectives
                </button>
                <button
                  onClick={() => setActiveTab('julian')}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition border-b-2 ${
                    activeTab === 'julian'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-noir-400 hover:text-noir-200'
                  }`}
                >
                  Julian's Observation
                </button>
                <button
                  onClick={() => setActiveTab('clara')}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition border-b-2 ${
                    activeTab === 'clara'
                      ? 'border-emerald-400 text-emerald-300'
                      : 'border-transparent text-noir-400 hover:text-noir-200'
                  }`}
                >
                  Clara's Forensics
                </button>
              </div>

              {/* Julian's Psychological Insight */}
              {(activeTab === 'both' || activeTab === 'julian') && (
                <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40 relative">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase">
                    <Brain className="w-4 h-4" />
                    <span>Detective Julian Cross: Psychological Observation</span>
                  </div>
                  <p className="text-noir-100 italic leading-relaxed">
                    "{activeClue.julianObservation}"
                  </p>
                </div>
              )}

              {/* Clara's Forensic Analysis */}
              {(activeTab === 'both' || activeTab === 'clara') && (
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-800/40 relative">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                    <Search className="w-4 h-4" />
                    <span>Detective Clara Vance: Physical Forensics</span>
                  </div>
                  <p className="text-noir-100 leading-relaxed font-mono-code text-xs">
                    {activeClue.claraForensics}
                  </p>
                </div>
              )}

              {/* Combined Deduction Banner if unlocked */}
              {activeClue.requiresBothPerspectives && (
                <div className="p-3.5 rounded-lg bg-brass/15 border border-brass/50 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-brass mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-brass tracking-wider uppercase font-cinzel">
                      Combined Synthesis: {activeClue.combinedDeductionTitle}
                    </h4>
                    <p className="text-xs text-noir-200 mt-1">
                      {activeClue.combinedDeductionText}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-noir-950 border-t border-brass/30">
              <div className="flex items-center gap-2 text-xs text-noir-400">
                {isSelectedExamined ? (
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle className="w-4 h-4" /> Examined & Logged in Case Archive
                  </span>
                ) : (
                  <span className="text-amber-400/90">
                    * Click 'Log Clue' to register into Mind Palace deduction board
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {!isSelectedExamined ? (
                  <button
                    onClick={() => handleMarkExamined(activeClue.id)}
                    className="px-4 py-2 rounded-lg bg-brass hover:bg-brass-light text-noir-950 font-semibold text-xs uppercase tracking-wider transition shadow-noir-glow"
                  >
                    Log Clue into Mind Palace
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedHotspot(null);
                      onOpenMindPalace();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-noir-800 hover:bg-noir-700 text-brass border border-brass/40 font-semibold text-xs uppercase tracking-wider transition"
                  >
                    <Brain className="w-4 h-4" />
                    Open Mind Palace
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
