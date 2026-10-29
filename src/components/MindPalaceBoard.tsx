import React, { useState } from 'react';
import { CaseData, Clue, DeductionNode } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { 
  Brain, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Link, 
  Unlink, 
  ArrowRight, 
  RotateCcw, 
  ShieldAlert,
  Search,
  FileText
} from 'lucide-react';

interface Props {
  currentCase: CaseData;
  examinedClueIds: string[];
  unlockedDeductionIds: string[];
  onUnlockDeduction: (deductionId: string) => void;
  onProceedToAccusation: () => void;
  onProceedToInterrogation: () => void;
}

export const MindPalaceBoard: React.FC<Props> = ({
  currentCase,
  examinedClueIds,
  unlockedDeductionIds,
  onUnlockDeduction,
  onProceedToAccusation,
  onProceedToInterrogation
}) => {
  const [selectedClueIds, setSelectedClueIds] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'warning' | 'info' } | null>(null);

  const availableClues = currentCase.clues.filter(c => examinedClueIds.includes(c.id));

  const toggleSelectClue = (clueId: string) => {
    audioEngine.playPaperRustle();
    if (selectedClueIds.includes(clueId)) {
      setSelectedClueIds(selectedClueIds.filter(id => id !== clueId));
    } else {
      if (selectedClueIds.length >= 3) {
        setSelectedClueIds([...selectedClueIds.slice(1), clueId]);
      } else {
        setSelectedClueIds([...selectedClueIds, clueId]);
      }
    }
  };

  const clearSelection = () => {
    setSelectedClueIds([]);
    setFeedbackMessage(null);
  };

  const handleSynthesizeTheory = () => {
    if (selectedClueIds.length < 2) {
      setFeedbackMessage({
        text: 'Select at least 2 discovered clues to formulate a deduction.',
        type: 'info'
      });
      return;
    }

    // Check if the selected clue IDs match any locked deduction
    const matchingDeduction = currentCase.deductions.find(d => {
      if (unlockedDeductionIds.includes(d.id)) return false;
      const req = d.requiredClueIds;
      // All required clues must be selected, and all selected clues must be in the required set
      const allReqPresent = req.every(id => selectedClueIds.includes(id));
      const noExtraneous = selectedClueIds.every(id => req.includes(id));
      return allReqPresent && noExtraneous;
    });

    if (matchingDeduction) {
      onUnlockDeduction(matchingDeduction.id);
      audioEngine.playNodeConnect();
      setFeedbackMessage({
        text: `Deduction Synthesized: "${matchingDeduction.title}"! Insight logged.`,
        type: 'success'
      });
      setSelectedClueIds([]);
    } else {
      audioEngine.playBluffStinger(false);
      // Give contextual detective feedback
      setFeedbackMessage({
        text: 'These pieces of evidence do not form a decisive contradiction or logical chain. Review Julian\'s psychological notes and Clara\'s forensics.',
        type: 'warning'
      });
    }
  };

  // Ready for final accusation if key deductions unlocked
  const isAccusationReady = currentCase.deductions
    .filter(d => d.leadsToAccusation)
    .every(d => unlockedDeductionIds.includes(d.id));

  return (
    <div className="relative w-full h-full flex flex-col bg-noir-950 text-ivory overflow-hidden">
      {/* Board Top Header */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-noir-900 border-b border-brass/30 z-10 shadow-noir-card">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-brass/20 text-brass border border-brass/40">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-wide uppercase font-cinzel text-brass-light">
              Mind Palace: The Deduction Matrix
            </h2>
            <p className="text-xs text-noir-400 font-mono-code">
              Synthesize observed anomalies and forensic evidence into irrefutable conclusions.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onProceedToInterrogation}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-noir-800 hover:bg-noir-700 text-xs font-semibold uppercase tracking-wider text-noir-200 border border-noir-600 transition"
          >
            Interrogation Room
          </button>

          {isAccusationReady && (
            <button
              onClick={onProceedToAccusation}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-burgundy hover:bg-burgundy-light text-xs font-bold uppercase tracking-wider text-white border border-rose-500 transition shadow-noir-glow animate-pulse"
            >
              <ShieldAlert className="w-4 h-4" />
              Final Accusation Ready
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Clue Bank (Evidence Cards) */}
        <div className="w-full lg:w-96 flex flex-col border-r border-noir-800 bg-noir-900/60 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brass font-cinzel flex items-center gap-2">
              <Search className="w-4 h-4 text-brass" />
              <span>Available Evidence ({availableClues.length})</span>
            </h3>
            {selectedClueIds.length > 0 && (
              <button
                onClick={clearSelection}
                className="text-[11px] text-noir-400 hover:text-rose-400 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" /> Clear Selection
              </button>
            )}
          </div>

          {availableClues.length === 0 ? (
            <div className="p-6 text-center rounded-lg border border-dashed border-noir-700 text-noir-500 text-xs">
              No evidence logged yet. Return to the crime scene and inspect hotspots to gather clues.
            </div>
          ) : (
            <div className="space-y-2.5">
              {availableClues.map((clue) => {
                const isSelected = selectedClueIds.includes(clue.id);
                return (
                  <div
                    key={clue.id}
                    onClick={() => toggleSelectClue(clue.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-brass/25 border-brass shadow-noir-glow scale-[1.02]'
                        : 'bg-noir-950/80 border-noir-700/80 hover:border-brass/40 hover:bg-noir-850'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono-code bg-noir-800 text-noir-300 border border-noir-700">
                          {clue.category}
                        </span>
                        <span className="text-xs font-semibold text-ivory">{clue.title}</span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected
                            ? 'bg-brass text-noir-950 border-brass font-bold'
                            : 'border-noir-600'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                    </div>
                    <p className="text-[11px] text-noir-300 mt-1 line-clamp-2">{clue.summary}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Synthesize Button */}
          <div className="mt-4 pt-3 border-t border-noir-800">
            <button
              onClick={handleSynthesizeTheory}
              disabled={selectedClueIds.length < 2}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                selectedClueIds.length >= 2
                  ? 'bg-brass hover:bg-brass-light text-noir-950 shadow-noir-glow'
                  : 'bg-noir-800 text-noir-500 cursor-not-allowed border border-noir-700'
              }`}
            >
              <Link className="w-4 h-4" />
              <span>Connect Clues ({selectedClueIds.length}/3)</span>
            </button>

            {feedbackMessage && (
              <div
                className={`mt-2.5 p-2.5 rounded text-xs leading-relaxed border ${
                  feedbackMessage.type === 'success'
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                    : feedbackMessage.type === 'warning'
                    ? 'bg-amber-950/60 border-amber-600 text-amber-200'
                    : 'bg-noir-800 border-noir-600 text-noir-300'
                }`}
              >
                {feedbackMessage.text}
              </div>
            )}
          </div>
        </div>

        {/* Right: Unlocked Deduction Graph Board */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col bg-noir-950">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brass font-cinzel">
                Synthesized Case Deductions ({unlockedDeductionIds.length} / {currentCase.deductions.length})
              </h3>
              <p className="text-xs text-noir-400">
                Major logical breakthroughs connecting the crime's motive, method, and contradictions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCase.deductions.map((deduction) => {
              const isUnlocked = unlockedDeductionIds.includes(deduction.id);
              return (
                <div
                  key={deduction.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isUnlocked
                      ? 'bg-noir-900 border-brass/60 shadow-noir-card'
                      : 'bg-noir-950/50 border-noir-800/80 opacity-40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-lg ${
                          isUnlocked ? 'bg-brass/20 text-brass' : 'bg-noir-800 text-noir-600'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-ivory tracking-wide font-cinzel">
                          {deduction.title}
                        </h4>
                        <span className="text-[10px] uppercase font-mono-code text-brass-dark">
                          {isUnlocked ? 'Verified Theory' : 'Locked Hypothesis'}
                        </span>
                      </div>
                    </div>

                    {deduction.leadsToAccusation && isUnlocked && (
                      <span className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono-code bg-burgundy/40 text-rose-300 border border-burgundy">
                        Critical Clue
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-noir-300 mt-2.5 leading-relaxed">
                    {isUnlocked ? deduction.unlockedInsight : deduction.hypothesis}
                  </p>

                  {/* Required Clues Preview */}
                  <div className="mt-3 pt-2.5 border-t border-noir-800/80 flex items-center gap-2 text-[11px] text-noir-400 font-mono-code">
                    <span>Required Evidence:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {deduction.requiredClueIds.map((cId) => {
                        const clueObj = currentCase.clues.find(c => c.id === cId);
                        const isDiscovered = examinedClueIds.includes(cId);
                        return (
                          <span
                            key={cId}
                            className={`px-1.5 py-0.5 rounded text-[10px] ${
                              isDiscovered
                                ? 'bg-noir-800 text-noir-200 border border-noir-700'
                                : 'bg-noir-950 text-noir-600 border border-noir-850'
                            }`}
                          >
                            {clueObj ? clueObj.title : cId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Accusation Gateway Banner */}
          {isAccusationReady && (
            <div className="mt-8 p-5 rounded-xl bg-burgundy/20 border border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-noir-glow">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-burgundy text-white">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-ivory tracking-wider font-cinzel">
                    All Critical Deductions Synthesized
                  </h4>
                  <p className="text-xs text-noir-200 mt-1">
                    You have established the culprit, motive, method, and unravelled the staged contradiction. You can now present the final accusation.
                  </p>
                </div>
              </div>
              <button
                onClick={onProceedToAccusation}
                className="px-6 py-2.5 rounded-lg bg-burgundy hover:bg-burgundy-light text-white font-bold text-xs uppercase tracking-wider transition shadow-noir-card whitespace-nowrap"
              >
                Confront Culprit Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
