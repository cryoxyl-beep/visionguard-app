import React from 'react';
import { CaseData, CaseId } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { Folder, Lock, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface Props {
  cases: CaseData[];
  completedCaseIds: CaseId[];
  onSelectCase: (caseId: CaseId) => void;
  onClose: () => void;
}

export const CaseSelectModal: React.FC<Props> = ({
  cases,
  completedCaseIds,
  onSelectCase,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-noir-900 border border-brass/50 rounded-2xl shadow-noir-card p-6 flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-brass/30">
          <h2 className="text-base font-bold text-ivory tracking-wide uppercase font-cinzel flex items-center gap-2">
            <Folder className="w-5 h-5 text-brass" />
            <span>State Bureau Case Archive</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-noir-400 hover:text-ivory hover:bg-noir-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case List */}
        <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
          {cases.map((c, index) => {
            // Unlocked if it's case1, or if previous case is completed
            const prevCaseId = index > 0 ? cases[index - 1].id : null;
            const isUnlocked = index === 0 || (prevCaseId && completedCaseIds.includes(prevCaseId));
            const isCompleted = completedCaseIds.includes(c.id);

            return (
              <div
                key={c.id}
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.playPaperRustle();
                    onSelectCase(c.id);
                  }
                }}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-noir-950 border-noir-700 hover:border-brass hover:bg-noir-850 cursor-pointer shadow-noir-card'
                    : 'bg-noir-950/40 border-noir-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs font-mono-code ${
                      isCompleted
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                        : isUnlocked
                        ? 'bg-brass/20 border border-brass/40 text-brass'
                        : 'bg-noir-800 text-noir-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isUnlocked ? `0${c.caseNumber}` : <Lock className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ivory font-cinzel">{c.title}</span>
                      <span className="text-[10px] font-mono-code uppercase px-1.5 py-0.5 rounded bg-noir-800 text-brass-light border border-brass/20">
                        {c.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-noir-400 mt-1 line-clamp-1">{c.subtitle}</p>
                  </div>
                </div>

                {isUnlocked && (
                  <button className="px-3 py-1.5 rounded-lg bg-brass/20 hover:bg-brass text-brass hover:text-noir-950 text-xs font-semibold uppercase tracking-wider transition">
                    Open File
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
