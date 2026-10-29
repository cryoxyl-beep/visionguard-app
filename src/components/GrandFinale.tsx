import React, { useState } from 'react';
import { audioEngine } from '../audio/audioEngine';
import { Sparkles, Award, ArrowLeft, Heart, Shield, CheckCircle } from 'lucide-react';

interface Props {
  onReturnToMenu: () => void;
}

export const GrandFinale: React.FC<Props> = ({ onReturnToMenu }) => {
  const [step, setStep] = useState<'epilogue' | 'credits'>('epilogue');

  const handleShowCredits = () => {
    audioEngine.playTypewriter();
    setStep('credits');
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-noir-950 text-ivory p-6 overflow-y-auto">
      {step === 'epilogue' ? (
        <div className="relative w-full max-w-3xl bg-noir-900 border-2 border-brass/50 rounded-2xl shadow-noir-card p-8 sm:p-12 flex flex-col space-y-6 my-auto">
          {/* Epilogue Title */}
          <div className="text-center pb-4 border-b border-brass/30">
            <span className="text-xs font-mono-code uppercase tracking-widest text-brass">
              Epilogue • Midnight at the Orpheum
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-ivory tracking-wide font-cinzel mt-1">
              The Strings Are Cut
            </h1>
          </div>

          {/* Epilogue Narrative */}
          <div className="space-y-4 text-xs sm:text-sm text-noir-200 leading-relaxed">
            <p>
              The sirens of the State Bureau echoed down the rain-slicked boulevard outside the Orpheum Opera House. The eight hundred guests had departed into the damp night, murmuring in disbelief as federal marshals escorted Dr. Alistair Finch away in handcuffs.
            </p>
            <p>
              Julian Cross stood alone in the dim amber glow of Box Suite A. In his hand lay the wax-sealed origami crane, folded from the yellowed page of the State Penal Code.
            </p>
            <div className="p-4 rounded-xl bg-noir-950 border border-brass/40 italic text-brass-light text-center font-serif text-sm">
              "For seven years, I was told Leo died in disgrace—a mad researcher who overstepped human ethics. But inside this crane, in Alistair Finch's own meticulous hand, was the confidential board protocol proving Leo was the whistleblower who tried to stop the experiments."
            </div>
            <p>
              Clara Vance stepped through the velvet curtain, holding a signed dispatch from the State Supreme Court.
            </p>
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 font-mono-code text-xs text-emerald-300">
              "Detective Cross. Chief Justice Sterling's emergency replacement has officially signed the posthumous exoneration. Leo Cross's record is clean. The state has issued a formal apology. Your family's name is restored."
            </div>
            <p>
              Julian looked out across the empty auditorium toward the silent stage. He let the paper crane rest gently upon the railing.
            </p>
            <p className="italic text-cyan-200">
              "Every puppet dances when the strings are cut, Clara. But a man who sees through the illusions... finally learns how to walk on his own."
            </p>
          </div>

          {/* Proceed to Credits */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleShowCredits}
              className="px-8 py-3 rounded-lg bg-brass hover:bg-brass-light text-noir-950 font-bold text-xs uppercase tracking-widest transition shadow-noir-glow"
            >
              Roll Credits
            </button>
          </div>
        </div>
      ) : (
        /* Credits Sequence */
        <div className="relative w-full max-w-2xl text-center space-y-8 py-10 my-auto">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-brass tracking-wider font-cinzel">
              MIND PALACE: THE COLD READ
            </h1>
            <p className="text-xs text-noir-400 font-mono-code uppercase tracking-widest">
              A Complete Neo-Noir Detective & Psychological Thriller Experience
            </p>
          </div>

          <div className="space-y-6 text-xs text-noir-300 font-sans">
            <div>
              <h3 className="text-brass font-bold uppercase tracking-wider font-cinzel mb-1 text-sm">
                Written & Directed By
              </h3>
              <p className="text-ivory font-semibold">Narrative Design & Engineering Team</p>
            </div>

            <div>
              <h3 className="text-brass font-bold uppercase tracking-wider font-cinzel mb-1 text-sm">
                Case Chronology
              </h3>
              <p>Case 1: The Staged Solo — Arthur Pendelton & Marcus Vance</p>
              <p>Case 2: Vintage Blood — The Castille Winery & Gabriel Moreau</p>
              <p>Case 3: The Sightless Mirror — Julianne Sterling & Dr. Simon Finch</p>
              <p>Case 4: The Architect's Proxy — Nolan Burke & Rachel Vance-Kemp</p>
              <p>Case 5: The Grand Theater — The Orpheum & Dr. Alistair Finch</p>
            </div>

            <div>
              <h3 className="text-brass font-bold uppercase tracking-wider font-cinzel mb-1 text-sm">
                Core Protagonists
              </h3>
              <p>Detective Julian Cross — The Mentalist</p>
              <p>Detective Clara Vance — The Forensic Scientist</p>
            </div>

            <div>
              <h3 className="text-brass font-bold uppercase tracking-wider font-cinzel mb-1 text-sm">
                Atmospheric Audio & Sound Design
              </h3>
              <p>Procedural Neo-Noir Web Audio Synthesis Engine</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onReturnToMenu}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-noir-800 hover:bg-brass hover:text-noir-950 text-brass border border-brass/50 font-bold text-xs uppercase tracking-widest transition shadow-noir-card"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Title Screen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
