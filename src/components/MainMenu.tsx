import React from 'react';
import { audioEngine } from '../audio/audioEngine';
import { Play, RotateCcw, FolderOpen, Sliders, Award, Sparkles } from 'lucide-react';

interface Props {
  hasSaveGame: boolean;
  onNewGame: () => void;
  onContinue: () => void;
  onOpenCaseFiles: () => void;
  onOpenSettings: () => void;
  onShowCredits: () => void;
}

export const MainMenu: React.FC<Props> = ({
  hasSaveGame,
  onNewGame,
  onContinue,
  onOpenCaseFiles,
  onOpenSettings,
  onShowCredits
}) => {
  const handleInteraction = () => {
    // Start ambient noir sound on first user touch/click
    audioEngine.startNoirAmbience();
  };

  return (
    <div
      onClick={handleInteraction}
      className="relative w-full h-full flex flex-col justify-between p-8 sm:p-14 bg-noir-950 text-ivory overflow-hidden select-none"
    >
      {/* Background Graphic Noir Illustration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg viewBox="0 0 1920 1080" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="mainMenuSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#04060a" />
              <stop offset="50%" stopColor="#0c111c" />
              <stop offset="100%" stopColor="#1a233a" />
            </linearGradient>
            <radialGradient id="streetLamp" cx="420" cy="380" r="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#c5a059" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#mainMenuSky)" />
          {/* Streetlamp Light Cone */}
          <circle cx="420" cy="380" r="280" fill="url(#streetLamp)" />
          <line x1="420" y1="380" x2="420" y2="880" stroke="#1c1917" strokeWidth="8" />
          {/* Victorian City Silhouette */}
          <polygon points="0,750 300,750 300,520 400,520 450,420 500,520 700,520 700,750 1920,750 1920,1080 0,1080" fill="#080a0f" />
          {/* Detective Julian Cross Silhouette under Lamp */}
          <path d="M 400 850 L 415 700 Q 425 650 440 700 L 455 850 Z" fill="#030407" />
          <circle cx="430" cy="670" r="16" fill="#030407" />
          <ellipse cx="430" cy="660" rx="26" ry="6" fill="#020305" />
        </svg>
      </div>

      {/* Atmospheric Rain Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="rain-particle"
            style={{
              left: `${(i * 3.3) % 100}%`,
              animationDelay: `${(i * 0.15) % 1.5}s`,
              animationDuration: `${0.8 + (i % 5) * 0.1}s`,
              height: `${25 + (i % 20)}px`,
            }}
          />
        ))}
      </div>

      {/* Top Header / Branding */}
      <div className="z-20">
        <span className="text-[11px] font-mono-code uppercase tracking-[0.25em] text-brass-light block mb-1">
          A Psychological Detective Thriller
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-ivory font-cinzel drop-shadow-md">
          MIND PALACE
        </h1>
        <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-brass uppercase font-cinzel mt-1">
          The Cold Read
        </h2>
      </div>

      {/* Main Action Menu */}
      <div className="z-20 max-w-sm space-y-3 my-8">
        {hasSaveGame && (
          <button
            onClick={() => {
              audioEngine.playPaperRustle();
              onContinue();
            }}
            className="w-full py-3.5 px-6 rounded-xl bg-brass hover:bg-brass-light text-noir-950 font-bold text-xs uppercase tracking-widest flex items-center justify-between transition shadow-noir-glow group"
          >
            <span className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4" />
              <span>Continue Case</span>
            </span>
            <span className="text-[10px] font-mono-code text-noir-800">Auto-Save Ready</span>
          </button>
        )}

        <button
          onClick={() => {
            audioEngine.playTypewriter();
            onNewGame();
          }}
          className={`w-full py-3.5 px-6 rounded-xl border flex items-center justify-between transition text-xs font-bold uppercase tracking-widest ${
            !hasSaveGame
              ? 'bg-brass hover:bg-brass-light text-noir-950 shadow-noir-glow'
              : 'bg-noir-900/90 hover:bg-noir-800 text-ivory border-brass/40 hover:border-brass'
          }`}
        >
          <span className="flex items-center gap-3">
            <Play className="w-4 h-4 text-brass" />
            <span>New Investigation</span>
          </span>
          <span className="text-[10px] font-mono-code text-brass-dark">Case 01</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playPaperRustle();
            onOpenCaseFiles();
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-noir-900/90 hover:bg-noir-800 text-noir-200 border border-noir-700/80 hover:border-brass/40 flex items-center justify-between transition text-xs font-semibold uppercase tracking-wider"
        >
          <span className="flex items-center gap-3">
            <FolderOpen className="w-4 h-4 text-brass" />
            <span>Case Files (5 Cases)</span>
          </span>
          <span className="text-[10px] font-mono-code text-noir-500">Archive</span>
        </button>

        <button
          onClick={() => {
            audioEngine.playPaperRustle();
            onOpenSettings();
          }}
          className="w-full py-3 px-6 rounded-xl bg-noir-900/90 hover:bg-noir-800 text-noir-300 border border-noir-800 hover:border-noir-600 flex items-center justify-between transition text-xs font-semibold uppercase tracking-wider"
        >
          <span className="flex items-center gap-3">
            <Sliders className="w-4 h-4 text-noir-400" />
            <span>Settings & Audio</span>
          </span>
        </button>

        <button
          onClick={() => {
            audioEngine.playPaperRustle();
            onShowCredits();
          }}
          className="w-full py-3 px-6 rounded-xl bg-noir-900/90 hover:bg-noir-800 text-noir-300 border border-noir-800 hover:border-noir-600 flex items-center justify-between transition text-xs font-semibold uppercase tracking-wider"
        >
          <span className="flex items-center gap-3">
            <Award className="w-4 h-4 text-noir-400" />
            <span>Credits & Dossier</span>
          </span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="z-20 flex flex-wrap items-center justify-between text-[11px] text-noir-500 font-mono-code border-t border-noir-850 pt-4 gap-2">
        <span>© State Bureau of Investigation • All 5 Cases Implemented</span>
        <span>Click anywhere to resume atmospheric audio</span>
      </div>
    </div>
  );
};
