import React, { useState } from 'react';
import { CaseData, GameView } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { 
  Eye, 
  Brain, 
  MessageSquare, 
  Clock, 
  Settings, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  FolderOpen,
  ArrowLeft
} from 'lucide-react';

interface Props {
  currentCase: CaseData;
  currentView: GameView;
  examinedCluesCount: number;
  totalCluesCount: number;
  onChangeView: (view: GameView) => void;
  onOpenSettings: () => void;
  onReturnToMenu: () => void;
}

export const HeaderHUD: React.FC<Props> = ({
  currentCase,
  currentView,
  examinedCluesCount,
  totalCluesCount,
  onChangeView,
  onOpenSettings,
  onReturnToMenu
}) => {
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [hintModalOpen, setHintModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const getHintText = () => {
    switch (hintLevel) {
      case 1: return currentCase.hints.level1_nudge;
      case 2: return currentCase.hints.level2_category;
      case 3: return currentCase.hints.level3_connection;
      case 4: return currentCase.hints.level4_solution;
      default: return 'Need a mentalist nudge? Advance hint level below.';
    }
  };

  return (
    <>
      <header className="w-full bg-noir-950/95 border-b border-brass/30 px-4 py-2.5 flex items-center justify-between z-40 backdrop-blur select-none">
        {/* Left: Case Info & Back Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToMenu}
            className="p-1.5 rounded-lg text-noir-400 hover:text-ivory hover:bg-noir-850 transition"
            title="Return to Menu"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-brass">
                Case {currentCase.caseNumber}
              </span>
              <span className="text-[10px] text-noir-500">•</span>
              <span className="text-xs font-bold text-ivory tracking-wide font-cinzel">
                {currentCase.title}
              </span>
            </div>
            <p className="text-[11px] text-noir-400 hidden sm:block">
              Evidence Logged: {examinedCluesCount}/{totalCluesCount}
            </p>
          </div>
        </div>

        {/* Center: View Navigation Buttons */}
        <div className="flex items-center gap-1.5 bg-noir-900/90 p-1 rounded-xl border border-noir-800">
          <button
            onClick={() => onChangeView('investigation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              currentView === 'investigation'
                ? 'bg-brass text-noir-950 shadow-noir-glow font-bold'
                : 'text-noir-300 hover:text-ivory hover:bg-noir-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Investigate</span>
          </button>

          <button
            onClick={() => onChangeView('mindpalace')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              currentView === 'mindpalace'
                ? 'bg-brass text-noir-950 shadow-noir-glow font-bold'
                : 'text-noir-300 hover:text-ivory hover:bg-noir-800'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mind Palace</span>
          </button>

          <button
            onClick={() => onChangeView('interrogation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              currentView === 'interrogation'
                ? 'bg-brass text-noir-950 shadow-noir-glow font-bold'
                : 'text-noir-300 hover:text-ivory hover:bg-noir-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Interrogate</span>
          </button>

          <button
            onClick={() => onChangeView('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              currentView === 'timeline'
                ? 'bg-brass text-noir-950 shadow-noir-glow font-bold'
                : 'text-noir-300 hover:text-ivory hover:bg-noir-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Timeline</span>
          </button>
        </div>

        {/* Right: Hint, Audio & Settings */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHintModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-noir-900 hover:bg-noir-800 border border-noir-700 text-amber-400 text-xs font-semibold uppercase tracking-wider transition"
            title="Detective Hint"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Hint</span>
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-lg bg-noir-900 hover:bg-noir-800 border border-noir-700 text-noir-300 hover:text-ivory transition"
            title="Toggle Mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-brass" />}
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-noir-900 hover:bg-noir-800 border border-noir-700 text-noir-300 hover:text-ivory transition"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Detective Hint Modal */}
      {hintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-noir-900 border border-brass/50 rounded-xl shadow-noir-card p-6 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-brass/30">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brass font-cinzel flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>Julian's Progressive Insight</span>
              </h3>
              <span className="text-[10px] font-mono-code text-noir-400">
                Level {hintLevel} / 4
              </span>
            </div>

            <div className="p-4 rounded-lg bg-noir-950 border border-noir-800 text-xs text-noir-200 leading-relaxed min-h-[80px]">
              {getHintText()}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={hintLevel >= 4}
                onClick={() => setHintLevel(Math.min(4, hintLevel + 1))}
                className="px-3 py-1.5 rounded bg-brass/20 hover:bg-brass/30 text-brass border border-brass/40 text-xs font-semibold uppercase disabled:opacity-40 transition"
              >
                Deepen Insight (+1)
              </button>

              <button
                onClick={() => setHintModalOpen(false)}
                className="px-4 py-1.5 rounded bg-noir-800 hover:bg-noir-700 text-xs text-noir-300 uppercase transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
