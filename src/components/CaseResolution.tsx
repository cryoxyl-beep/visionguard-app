import React from 'react';
import { CaseData } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { CheckCircle2, ArrowRight, ShieldCheck, FileCheck2, Award, Sparkles } from 'lucide-react';

interface Props {
  currentCase: CaseData;
  bluffsTriggeredCount: number;
  onNextCase: () => void;
  isFinalCase: boolean;
}

export const CaseResolution: React.FC<Props> = ({
  currentCase,
  bluffsTriggeredCount,
  onNextCase,
  isFinalCase
}) => {
  const story = currentCase.resolutionStory;

  const handleContinue = () => {
    audioEngine.playPaperRustle();
    onNextCase();
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-noir-950 p-4 sm:p-8 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-noir-900 border-2 border-emerald-500/50 rounded-2xl shadow-noir-card p-6 sm:p-10 flex flex-col my-auto space-y-6">
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-600/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-widest text-emerald-400">
                Case Closed • Guilt Established
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-ivory tracking-wide font-cinzel">
                {currentCase.title}: Solved
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-noir-950 border border-brass/40 text-xs font-mono-code text-brass">
            <Award className="w-4 h-4" />
            <span>Rating: Master Detective</span>
          </div>
        </div>

        {/* Narrative Breakdown */}
        <div className="space-y-4 text-xs leading-relaxed text-noir-200">
          <div className="p-4 rounded-xl bg-noir-950/80 border border-noir-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brass font-cinzel mb-1.5">
              The Resolution
            </h3>
            <p>{story.summary}</p>
          </div>

          <div className="p-4 rounded-xl bg-noir-950/80 border border-noir-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-cinzel mb-1.5">
              How the Crime Was Committed
            </h3>
            <p>{story.howCrimeWasCommitted}</p>
          </div>

          <div className="p-4 rounded-xl bg-noir-950/80 border border-noir-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-cinzel mb-1.5">
              Why the Culprit Failed
            </h3>
            <p>{story.whySuspectsFailed}</p>
          </div>

          {/* Julian's Philosophical Reflection */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 italic text-cyan-200">
            <p className="font-sans text-xs">
              {story.julianReflection}
            </p>
            <span className="block mt-1 text-[10px] uppercase font-mono-code text-cyan-400 not-italic font-semibold">
              — Detective Julian Cross
            </span>
          </div>

          {/* Clara's Forensic Conclusion */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-200 font-mono-code text-[11px]">
            <p>{story.claraClosingRemarks}</p>
            <span className="block mt-1 text-[10px] uppercase text-emerald-400 font-semibold">
              — Detective Clara Vance, State Bureau of Investigation
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-noir-400 font-mono-code">
            Evidence logged. Proceeding to campaign progression.
          </span>
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-noir-glow"
          >
            <span>{isFinalCase ? 'Witness the Grand Finale' : 'Proceed to Next Case'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
