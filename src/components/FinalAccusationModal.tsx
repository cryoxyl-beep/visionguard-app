import React, { useState } from 'react';
import { CaseData } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { ShieldAlert, CheckCircle, AlertTriangle, Scale, ArrowRight, X } from 'lucide-react';

interface Props {
  currentCase: CaseData;
  onAccusationSuccess: () => void;
  onCancel: () => void;
}

export const FinalAccusationModal: React.FC<Props> = ({
  currentCase,
  onAccusationSuccess,
  onCancel
}) => {
  const config = currentCase.accusationConfig.options;

  const [selectedCulprit, setSelectedCulprit] = useState<string>('');
  const [selectedMotive, setSelectedMotive] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedClue, setSelectedClue] = useState<string>('');
  const [selectedStaged, setSelectedStaged] = useState<string>('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitAccusation = () => {
    if (!selectedCulprit || !selectedMotive || !selectedMethod || !selectedClue || !selectedStaged) {
      setValidationError('Please complete all 5 pillars of the formal accusation before presenting.');
      return;
    }

    setIsSubmitting(true);

    const culpritObj = config.culprits.find(c => c.id === selectedCulprit);
    const motiveObj = config.motives.find(m => m.id === selectedMotive);
    const methodObj = config.methods.find(m => m.id === selectedMethod);
    const clueObj = config.decisiveClues.find(d => d.id === selectedClue);
    const stagedObj = config.stagedEvidenceExplanations.find(s => s.id === selectedStaged);

    const isAllCorrect = 
      culpritObj?.isCorrect &&
      motiveObj?.isCorrect &&
      methodObj?.isCorrect &&
      clueObj?.isCorrect &&
      stagedObj?.isCorrect;

    if (isAllCorrect) {
      audioEngine.playAccusationStrike();
      setValidationError(null);
      setTimeout(() => {
        onAccusationSuccess();
      }, 1200);
    } else {
      audioEngine.playBluffStinger(false);
      // Give constructive feedback on where the argument fails
      let feedback = 'The theory is rejected by the State Bureau. ';
      if (!culpritObj?.isCorrect) feedback += culpritObj?.feedback + ' ';
      else if (!motiveObj?.isCorrect) feedback += motiveObj?.feedback + ' ';
      else if (!methodObj?.isCorrect) feedback += methodObj?.feedback + ' ';
      else if (!clueObj?.isCorrect) feedback += clueObj?.feedback + ' ';
      else if (!stagedObj?.isCorrect) feedback += stagedObj?.feedback;

      setValidationError(feedback);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-noir-900 border border-brass/60 rounded-2xl shadow-noir-card p-6 sm:p-8 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brass/30 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-burgundy/40 text-rose-300 border border-burgundy">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ivory tracking-wide uppercase font-cinzel">
                Formal Accusation: {currentCase.title}
              </h2>
              <p className="text-xs text-noir-400 font-mono-code">
                Construct the 5 pillars of proof required to establish guilt beyond reasonable doubt.
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-noir-400 hover:text-ivory hover:bg-noir-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Pillars Selection Body */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2 text-xs">
          {/* Pillar 1: The Accused Culprit */}
          <div>
            <label className="text-brass font-bold uppercase tracking-wider block mb-2 font-cinzel">
              1. The Accused Culprit
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {config.culprits.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCulprit(item.id)}
                  className={`p-3 text-left rounded-lg border transition ${
                    selectedCulprit === item.id
                      ? 'bg-brass/25 border-brass text-ivory font-semibold shadow-noir-glow'
                      : 'bg-noir-950 border-noir-700/80 text-noir-300 hover:border-brass/40'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pillar 2: The Motive */}
          <div>
            <label className="text-brass font-bold uppercase tracking-wider block mb-2 font-cinzel">
              2. The Underlying Motive
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {config.motives.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMotive(item.id)}
                  className={`p-3 text-left rounded-lg border transition ${
                    selectedMotive === item.id
                      ? 'bg-brass/25 border-brass text-ivory font-semibold shadow-noir-glow'
                      : 'bg-noir-950 border-noir-700/80 text-noir-300 hover:border-brass/40'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          {/* Pillar 3: The True Method */}
          <div>
            <label className="text-brass font-bold uppercase tracking-wider block mb-2 font-cinzel">
              3. The True Murder Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {config.methods.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMethod(item.id)}
                  className={`p-3 text-left rounded-lg border transition ${
                    selectedMethod === item.id
                      ? 'bg-brass/25 border-brass text-ivory font-semibold shadow-noir-glow'
                      : 'bg-noir-950 border-noir-700/80 text-noir-300 hover:border-brass/40'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          {/* Pillar 4: Decisive Forensic Clue */}
          <div>
            <label className="text-brass font-bold uppercase tracking-wider block mb-2 font-cinzel">
              4. The Decisive Forensic Clue
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {config.decisiveClues.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedClue(item.id)}
                  className={`p-3 text-left rounded-lg border transition ${
                    selectedClue === item.id
                      ? 'bg-brass/25 border-brass text-ivory font-semibold shadow-noir-glow'
                      : 'bg-noir-950 border-noir-700/80 text-noir-300 hover:border-brass/40'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Pillar 5: Misleading / Staged Contradiction */}
          <div>
            <label className="text-brass font-bold uppercase tracking-wider block mb-2 font-cinzel">
              5. Explanation of Misleading Staged Evidence
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {config.stagedEvidenceExplanations.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedStaged(item.id)}
                  className={`p-3 text-left rounded-lg border transition ${
                    selectedStaged === item.id
                      ? 'bg-brass/25 border-brass text-ivory font-semibold shadow-noir-glow'
                      : 'bg-noir-950 border-noir-700/80 text-noir-300 hover:border-brass/40'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Validation / Error Feedback */}
        {validationError && (
          <div className="mt-4 p-3 rounded-lg bg-rose-950/70 border border-rose-500/70 text-rose-200 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{validationError}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-t border-brass/30 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-noir-800 hover:bg-noir-700 text-xs font-semibold uppercase tracking-wider text-noir-300 transition"
          >
            Review Evidence
          </button>

          <button
            onClick={handleSubmitAccusation}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-burgundy hover:bg-burgundy-light text-white font-bold text-xs uppercase tracking-wider transition shadow-noir-glow disabled:opacity-50"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Present Formal Indictment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
