import React, { useState } from 'react';
import { CaseData } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { Folder, ArrowRight, User, MapPin, Calendar, FileText } from 'lucide-react';

interface Props {
  currentCase: CaseData;
  onBeginInvestigation: () => void;
}

export const CaseBriefing: React.FC<Props> = ({ currentCase, onBeginInvestigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);

  const handleNextDialogue = () => {
    audioEngine.playPaperRustle();
    if (dialogueStep < currentCase.briefingDialogue.length - 1) {
      setDialogueStep(dialogueStep + 1);
    } else {
      audioEngine.playTypewriter();
      onBeginInvestigation();
    }
  };

  const currentLine = currentCase.briefingDialogue[dialogueStep];

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-noir-950 p-4 sm:p-8 overflow-y-auto">
      {/* Neo-Noir Case File Manila Folder */}
      <div className="relative w-full max-w-3xl bg-noir-900 border-2 border-brass/50 rounded-2xl shadow-noir-card p-6 sm:p-10 flex flex-col my-auto">
        {/* Top Case Label */}
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-brass/30 mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-brass/20 text-brass border border-brass/40">
              <Folder className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-widest text-brass">
                State Bureau of Investigation • Case #{currentCase.caseNumber}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-ivory tracking-wide font-cinzel">
                {currentCase.title}
              </h1>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-noir-950 border border-brass/30 text-xs font-mono-code text-brass-light uppercase">
            Difficulty: {currentCase.difficulty}
          </span>
        </div>

        {/* Case Dossier Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs bg-noir-950/70 p-4 rounded-xl border border-noir-800">
          <div>
            <span className="text-[10px] uppercase font-mono-code text-noir-400 block mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-brass" /> Victim Details:
            </span>
            <p className="font-semibold text-ivory text-sm">{currentCase.victim.name}, {currentCase.victim.age}</p>
            <p className="text-noir-300">{currentCase.victim.occupation}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono-code text-noir-400 block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brass" /> Crime Scene:
            </span>
            <p className="font-semibold text-ivory">{currentCase.location}</p>
            <p className="text-noir-300 mt-1">{currentCase.victim.apparentDeath}</p>
          </div>
        </div>

        {/* Briefing Dialogue Exchange between Julian and Clara */}
        <div className="p-5 rounded-xl bg-noir-950 border border-brass/30 mb-6 flex-1 flex flex-col justify-center min-h-[140px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-brass tracking-wider uppercase font-cinzel">
              {currentLine.speaker}
            </span>
            <span className="text-[10px] font-mono-code text-noir-500">
              Dialogue {dialogueStep + 1} of {currentCase.briefingDialogue.length}
            </span>
          </div>
          <p className="text-sm font-medium text-ivory leading-relaxed italic">
            "{currentLine.text}"
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-noir-500 font-mono-code">
            Press to advance dialogue or enter crime scene
          </span>
          <button
            onClick={handleNextDialogue}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brass hover:bg-brass-light text-noir-950 font-bold text-xs uppercase tracking-wider transition shadow-noir-glow"
          >
            <span>{dialogueStep < currentCase.briefingDialogue.length - 1 ? 'Continue Briefing' : 'Begin Investigation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
