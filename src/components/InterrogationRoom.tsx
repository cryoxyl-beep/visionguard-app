import React, { useState, useEffect } from 'react';
import { CaseData, Clue, DialogueChoice, DialogueNode, Suspect } from '../types/game';
import { CharacterPortrait } from '../utils/visualAssets';
import { audioEngine } from '../audio/audioEngine';
import { 
  Heart, 
  Eye, 
  Flame, 
  HelpCircle, 
  ShieldAlert, 
  CornerDownRight, 
  Volume2, 
  History, 
  UserCheck, 
  Brain,
  Search,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface Props {
  currentCase: CaseData;
  examinedClueIds: string[];
  activeSuspectId: string | null;
  currentDialogueNodeId: string | null;
  onSelectSuspect: (suspectId: string) => void;
  onAdvanceDialogue: (nodeId: string) => void;
  onRecordBluff: (bluffId: string) => void;
  onBackToScene: () => void;
}

export const InterrogationRoom: React.FC<Props> = ({
  currentCase,
  examinedClueIds,
  activeSuspectId,
  currentDialogueNodeId,
  onSelectSuspect,
  onAdvanceDialogue,
  onRecordBluff,
  onBackToScene
}) => {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect>(() => {
    if (activeSuspectId) {
      const s = currentCase.suspects.find(x => x.id === activeSuspectId);
      if (s) return s;
    }
    return currentCase.suspects[0];
  });

  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [baselineScanActive, setBaselineScanActive] = useState(false);
  const [dialogueHistory, setDialogueHistory] = useState<{ speaker: string; text: string }[]>([]);

  // Get active interrogation tree for this suspect
  const interrogationData = currentCase.interrogations[selectedSuspect.id];
  const currentNodeId = currentDialogueNodeId || (interrogationData ? interrogationData.rootDialogueId : '');
  const currentNode: DialogueNode | undefined = interrogationData ? interrogationData.nodes[currentNodeId] : undefined;

  useEffect(() => {
    if (currentNode && !dialogueHistory.some(d => d.text === currentNode.text)) {
      setDialogueHistory(prev => [...prev.slice(-8), { speaker: currentNode.speaker, text: currentNode.text }]);
      audioEngine.playTypewriter();
    }
  }, [currentNode]);

  const handleChoiceClick = (choice: DialogueChoice) => {
    if (choice.type === 'baseline') {
      audioEngine.playHeartbeat();
      setBaselineScanActive(true);
      setTimeout(() => setBaselineScanActive(false), 3000);
    } else if (choice.type === 'bluff') {
      audioEngine.playBluffStinger(choice.bluffSuccess ?? true);
      onRecordBluff(choice.id);
    } else if (choice.type === 'coldread') {
      audioEngine.playPaperRustle();
    }

    if (choice.expressionChange) {
      selectedSuspect.currentExpression = choice.expressionChange;
    }

    onAdvanceDialogue(choice.nextDialogueId);
  };

  const handleSuspectSwitch = (s: Suspect) => {
    setSelectedSuspect(s);
    onSelectSuspect(s.id);
    const newInterrogation = currentCase.interrogations[s.id];
    if (newInterrogation) {
      onAdvanceDialogue(newInterrogation.rootDialogueId);
    }
    setDialogueHistory([]);
  };

  const handlePresentEvidenceClue = (clue: Clue) => {
    setEvidenceModalOpen(false);
    audioEngine.playPaperRustle();

    // Check if the current dialogue has a choice matching this evidence
    if (currentNode) {
      const matchChoice = currentNode.choices.find(c => c.requiredClueId === clue.id);
      if (matchChoice) {
        handleChoiceClick(matchChoice);
        return;
      }
    }

    // Generic suspect reaction to irrelevant evidence
    setDialogueHistory(prev => [
      ...prev,
      { speaker: 'Julian', text: `[Presents ${clue.title}] "Explain this item."` },
      { speaker: selectedSuspect.name, text: `"I fail to see what that has to do with my statement, Detective."` }
    ]);
  };

  const examinedClues = currentCase.clues.filter(c => examinedClueIds.includes(c.id));

  return (
    <div className="relative w-full h-full flex flex-col bg-noir-950 text-ivory overflow-hidden">
      {/* Top Header / Suspect Switcher */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-noir-900 border-b border-brass/30 z-10 shadow-noir-card">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-brass/20 text-brass border border-brass/40">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-wide uppercase font-cinzel text-brass-light">
              The Mentalist's Matrix: Interrogation Room
            </h2>
            <p className="text-xs text-noir-400 font-mono-code">
              Detect physiological baseline anomalies, deploy tactical bluffs, and expose contradictions.
            </p>
          </div>
        </div>

        {/* Suspect Switcher Tabs */}
        <div className="flex items-center gap-2">
          {currentCase.suspects.map((suspect) => (
            <button
              key={suspect.id}
              onClick={() => handleSuspectSwitch(suspect)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                selectedSuspect.id === suspect.id
                  ? 'bg-brass text-noir-950 font-bold shadow-noir-glow'
                  : 'bg-noir-800 text-noir-300 hover:bg-noir-700 border border-noir-700'
              }`}
            >
              {suspect.name.split(' ')[0]}
            </button>
          ))}

          <button
            onClick={onBackToScene}
            className="ml-3 px-3 py-1.5 rounded bg-noir-800 hover:bg-noir-700 text-xs font-semibold uppercase tracking-wider text-noir-200 border border-noir-600 transition"
          >
            Crime Scene
          </button>
        </div>
      </div>

      {/* Main Interrogation Arena */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Suspect Portrait & Bio & Baseline Monitor */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-noir-800 bg-noir-900/70 p-5 overflow-y-auto">
          {/* Character Portrait */}
          <div className="flex justify-center mb-4">
            <CharacterPortrait
              suspectId={selectedSuspect.id}
              expression={selectedSuspect.currentExpression}
              size={210}
            />
          </div>

          {/* Suspect Info */}
          <div className="border-b border-noir-800 pb-3 mb-3">
            <h3 className="text-base font-bold text-ivory font-cinzel">{selectedSuspect.name}</h3>
            <p className="text-xs text-brass-light font-mono-code">{selectedSuspect.title}</p>
            <p className="text-xs text-noir-300 mt-2 leading-relaxed">{selectedSuspect.bio}</p>
          </div>

          {/* Baseline Physiology & Heart Rate Monitor */}
          <div className="p-3 rounded-lg bg-noir-950 border border-noir-700/80 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 font-mono-code flex items-center gap-1.5">
                <Heart className={`w-3.5 h-3.5 text-rose-500 ${baselineScanActive ? 'animate-heart-pulse' : ''}`} />
                <span>Autonomic Pulse</span>
              </span>
              <span className="text-xs font-mono-code font-bold text-rose-300">
                {baselineScanActive
                  ? `${selectedSuspect.baselineHeartRate + Math.floor(Math.random() * 8 - 4)} BPM`
                  : `${selectedSuspect.baselineHeartRate} BPM`}
              </span>
            </div>

            {/* Simulated ECG Line */}
            <div className="h-6 w-full bg-noir-900 rounded overflow-hidden flex items-center px-1 border border-rose-950">
              <svg viewBox="0 0 100 20" className="w-full h-full text-rose-500 stroke-current fill-none">
                <polyline
                  points="0,10 20,10 25,2 30,18 35,6 40,10 65,10 70,2 75,18 80,6 85,10 100,10"
                  strokeWidth="1.5"
                  className={baselineScanActive ? 'animate-pulse' : ''}
                />
              </svg>
            </div>
          </div>

          {/* Psychological Profile Box */}
          <div className="p-3 rounded-lg bg-noir-950/80 border border-noir-800 space-y-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono-code text-noir-400 block">Vulnerability:</span>
              <p className="text-noir-200 text-[11px]">{selectedSuspect.psychologicalProfile.vulnerability}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono-code text-noir-400 block">Defense Mechanism:</span>
              <p className="text-noir-200 text-[11px]">{selectedSuspect.psychologicalProfile.habitualDefense}</p>
            </div>
          </div>
        </div>

        {/* Right: Dialogue Box & Mentalist Tactical Actions */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden bg-noir-950">
          {/* Spoken Dialogue History & Current Statement */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
            {dialogueHistory.slice(0, -1).map((entry, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-2xl text-xs leading-relaxed opacity-60 ${
                  entry.speaker === 'Julian' || entry.speaker === 'Clara'
                    ? 'ml-auto bg-noir-800 text-noir-200 border border-noir-700'
                    : 'bg-noir-900 text-noir-200 border border-noir-800'
                }`}
              >
                <span className="font-semibold text-brass-light block text-[10px] uppercase font-cinzel">
                  {entry.speaker}
                </span>
                <p>{entry.text}</p>
              </div>
            ))}

            {/* Current Active Statement */}
            {currentNode && (
              <div className="p-5 rounded-xl bg-noir-900 border border-brass/40 shadow-noir-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brass tracking-wider uppercase font-cinzel">
                    {currentNode.speaker}
                  </span>
                  {currentNode.speakerTitle && (
                    <span className="text-[10px] font-mono-code text-noir-400">
                      {currentNode.speakerTitle}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-ivory leading-relaxed font-sans">
                  "{currentNode.text}"
                </p>
              </div>
            )}
          </div>

          {/* Tactical Action Choice Buttons */}
          <div className="border-t border-noir-800 pt-4 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-noir-400 font-cinzel">
                Tactical Responses
              </span>
              <button
                onClick={() => setEvidenceModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-brass/20 hover:bg-brass/30 text-brass-light border border-brass/40 text-xs font-semibold uppercase tracking-wider transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Present Evidence</span>
              </button>
            </div>

            {currentNode && currentNode.choices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentNode.choices.map((choice) => {
                  const getChoiceStyle = () => {
                    switch (choice.type) {
                      case 'bluff':
                        return 'border-rose-800/80 hover:border-rose-500 bg-rose-950/20 hover:bg-rose-950/40 text-rose-200';
                      case 'coldread':
                        return 'border-cyan-800/80 hover:border-cyan-500 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-200';
                      case 'baseline':
                        return 'border-emerald-800/80 hover:border-emerald-500 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-200';
                      case 'presentEvidence':
                        return 'border-amber-800/80 hover:border-amber-500 bg-amber-950/20 hover:bg-amber-950/40 text-amber-200';
                      default:
                        return 'border-noir-700 hover:border-brass/50 bg-noir-900 hover:bg-noir-850 text-noir-100';
                    }
                  };

                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceClick(choice)}
                      className={`p-3 text-left rounded-lg border text-xs font-medium transition leading-snug flex items-start gap-2 ${getChoiceStyle()}`}
                    >
                      <CornerDownRight className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-60" />
                      <span>{choice.text}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center rounded-lg bg-noir-900 border border-noir-800 text-xs text-noir-400">
                Interrogation line concluded. You can select another suspect or return to the crime scene.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Present Evidence Archive Modal */}
      {evidenceModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl bg-noir-900 border border-brass/50 rounded-xl shadow-noir-card p-6 max-h-[85vh] flex flex-col">
            <h3 className="text-base font-bold text-ivory tracking-wide uppercase font-cinzel mb-2">
              Present Clue to {selectedSuspect.name}
            </h3>
            <p className="text-xs text-noir-400 mb-4">
              Select a piece of gathered evidence to confront the suspect's testimony or expose a lie.
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {examinedClues.map((clue) => (
                <div
                  key={clue.id}
                  onClick={() => handlePresentEvidenceClue(clue)}
                  className="p-3 rounded-lg border border-noir-700 bg-noir-950 hover:border-brass hover:bg-noir-850 cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono-code text-brass-dark">
                      {clue.category}
                    </span>
                    <h4 className="text-xs font-semibold text-ivory">{clue.title}</h4>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-brass/20 text-brass text-[11px] font-semibold uppercase">
                    Present
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setEvidenceModalOpen(false)}
              className="w-full py-2 rounded-lg bg-noir-800 hover:bg-noir-700 text-xs text-noir-300 uppercase tracking-wider transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
