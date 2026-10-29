import React, { useState } from 'react';
import { CaseData, TimelineEvent } from '../types/game';
import { audioEngine } from '../audio/audioEngine';
import { Clock, CheckCircle2, ArrowUpDown, Sparkles, Check, AlertCircle } from 'lucide-react';

interface Props {
  currentCase: CaseData;
  onTimelineComplete?: () => void;
  onBackToScene: () => void;
}

export const TimelineReconstruction: React.FC<Props> = ({
  currentCase,
  onTimelineComplete,
  onBackToScene
}) => {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    // Start with events shuffled or in initial state
    return [...currentCase.timelineEvents].sort(() => Math.random() - 0.5);
  });

  const [isSolved, setIsSolved] = useState<boolean>(() => {
    return currentCase.timelineEvents.every((e, idx) => e.correctSlotIndex === idx);
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  const moveEvent = (fromIdx: number, toIdx: number) => {
    if (isSolved) return;
    audioEngine.playPaperRustle();
    const updated = [...events];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setEvents(updated);
    checkSolution(updated);
  };

  const checkSolution = (currentList: TimelineEvent[]) => {
    const solved = currentList.every((item, idx) => item.correctSlotIndex === idx);
    if (solved) {
      setIsSolved(true);
      audioEngine.playEvidenceDiscovered();
      setFeedback('Chronological order verified! The timeline reconstructs the exact movements of the killer.');
      if (onTimelineComplete) onTimelineComplete();
    } else {
      setFeedback(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-noir-950 text-ivory overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-noir-900 border-b border-brass/30 z-10 shadow-noir-card">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-brass/20 text-brass border border-brass/40">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-wide uppercase font-cinzel text-brass-light">
              Timeline Reconstruction: {currentCase.title}
            </h2>
            <p className="text-xs text-noir-400 font-mono-code">
              Reorder known timestamps and forensic events into the true chronological sequence.
            </p>
          </div>
        </div>

        <button
          onClick={onBackToScene}
          className="px-3 py-1.5 rounded bg-noir-800 hover:bg-noir-700 text-xs font-semibold uppercase tracking-wider text-noir-200 border border-noir-600 transition"
        >
          Return to Investigation
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 p-6 overflow-y-auto max-w-4xl mx-auto w-full">
        {feedback && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/70 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="space-y-3">
          {events.map((event, index) => {
            const isCorrectPosition = isSolved || event.correctSlotIndex === index;

            return (
              <div
                key={event.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                  isSolved
                    ? 'bg-noir-900 border-emerald-600/70'
                    : isCorrectPosition
                    ? 'bg-noir-900/90 border-brass/40 shadow-noir-card'
                    : 'bg-noir-900/60 border-noir-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Slot Number */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs font-mono-code ${
                      isSolved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-brass/20 text-brass border border-brass/40'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Time Badge & Description */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono-code bg-noir-950 text-brass border border-brass/30">
                        {event.timeLabel}
                      </span>
                    </div>
                    <p className="text-xs text-noir-200 mt-1.5 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Move Controls */}
                {!isSolved && (
                  <div className="flex flex-col gap-1">
                    <button
                      disabled={index === 0}
                      onClick={() => moveEvent(index, index - 1)}
                      className="p-1 rounded bg-noir-800 hover:bg-noir-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs transition"
                      title="Move Earlier"
                    >
                      ▲
                    </button>
                    <button
                      disabled={index === events.length - 1}
                      onClick={() => moveEvent(index, index + 1)}
                      className="p-1 rounded bg-noir-800 hover:bg-noir-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs transition"
                      title="Move Later"
                    >
                      ▼
                    </button>
                  </div>
                )}

                {isSolved && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
