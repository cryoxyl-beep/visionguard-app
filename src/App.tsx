import React, { useState, useEffect } from 'react';
import { CaseData, CaseId, GameSettings, GameView, SaveState } from './types/game';
import { allCases, caseList } from './data/cases';
import { audioEngine } from './audio/audioEngine';
import { HeaderHUD } from './components/HeaderHUD';
import { InvestigationScene } from './components/InvestigationScene';
import { MindPalaceBoard } from './components/MindPalaceBoard';
import { InterrogationRoom } from './components/InterrogationRoom';
import { TimelineReconstruction } from './components/TimelineReconstruction';
import { FinalAccusationModal } from './components/FinalAccusationModal';
import { CaseBriefing } from './components/CaseBriefing';
import { CaseResolution } from './components/CaseResolution';
import { GrandFinale } from './components/GrandFinale';
import { MainMenu } from './components/MainMenu';
import { CaseSelectModal } from './components/CaseSelectModal';
import { SettingsModal } from './components/SettingsModal';

const SAVE_KEY = 'MIND_PALACE_COLD_READ_SAVE_v1';

const defaultSettings: GameSettings = {
  masterVolume: 80,
  musicVolume: 60,
  sfxVolume: 75,
  textSpeed: 'fast',
  highContrast: false,
  screenShake: true,
  showSubtitles: true,
};

export const App: React.FC = () => {
  // Master Game State
  const [currentCaseId, setCurrentCaseId] = useState<CaseId>('case1');
  const [currentView, setCurrentView] = useState<GameView>('menu');
  const [discoveredClueIds, setDiscoveredClueIds] = useState<string[]>([]);
  const [examinedClueIds, setExaminedClueIds] = useState<string[]>([]);
  const [unlockedDeductionIds, setUnlockedDeductionIds] = useState<string[]>([]);
  const [completedCaseIds, setCompletedCaseIds] = useState<CaseId[]>([]);
  const [bluffsTriggered, setBluffsTriggered] = useState<Record<string, boolean>>({});
  const [activeSuspectId, setActiveSuspectId] = useState<string | null>(null);
  const [currentDialogueNodeId, setCurrentDialogueNodeId] = useState<string | null>(null);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  // Modals
  const [isCaseSelectOpen, setIsCaseSelectOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccusationModalOpen, setIsAccusationModalOpen] = useState(false);

  // Load save on boot if available
  const [hasSaveGame, setHasSaveGame] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        setHasSaveGame(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Autosave whenever key progression states change
  useEffect(() => {
    if (currentView !== 'menu' && currentView !== 'credits') {
      const stateToSave: SaveState = {
        version: 1,
        currentCaseId,
        currentSceneId: 'main',
        currentView,
        discoveredClueIds,
        examinedClueIds,
        unlockedDeductionIds,
        completedCaseIds,
        bluffsTriggered,
        revealedTimelineIds: [],
        solvedTimelineSlots: {},
        activeSuspectId,
        currentDialogueNodeId,
        disclosedInformation: {},
        settings,
        timestamp: new Date().toISOString()
      };
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
        setHasSaveGame(true);
      } catch (err) {
        console.error('Autosave error:', err);
      }
    }
  }, [
    currentCaseId,
    currentView,
    discoveredClueIds,
    examinedClueIds,
    unlockedDeductionIds,
    completedCaseIds,
    bluffsTriggered,
    activeSuspectId,
    currentDialogueNodeId,
    settings
  ]);

  const currentCase: CaseData = allCases[currentCaseId];

  // Actions
  const handleStartNewGame = () => {
    setCurrentCaseId('case1');
    setDiscoveredClueIds([]);
    setExaminedClueIds([]);
    setUnlockedDeductionIds([]);
    setBluffsTriggered({});
    setActiveSuspectId(null);
    setCurrentDialogueNodeId(null);
    setCurrentView('briefing');
    audioEngine.startNoirAmbience();
  };

  const handleContinueGame = () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const data: SaveState = JSON.parse(saved);
        setCurrentCaseId(data.currentCaseId || 'case1');
        setDiscoveredClueIds(data.discoveredClueIds || []);
        setExaminedClueIds(data.examinedClueIds || []);
        setUnlockedDeductionIds(data.unlockedDeductionIds || []);
        setCompletedCaseIds(data.completedCaseIds || []);
        setBluffsTriggered(data.bluffsTriggered || {});
        setActiveSuspectId(data.activeSuspectId || null);
        setCurrentDialogueNodeId(data.currentDialogueNodeId || null);
        setSettings(data.settings || defaultSettings);
        setCurrentView(data.currentView === 'menu' ? 'investigation' : data.currentView);
        audioEngine.startNoirAmbience();
      } else {
        handleStartNewGame();
      }
    } catch {
      handleStartNewGame();
    }
  };

  const handleSelectCase = (caseId: CaseId) => {
    setCurrentCaseId(caseId);
    setDiscoveredClueIds([]);
    setExaminedClueIds([]);
    setUnlockedDeductionIds([]);
    setBluffsTriggered({});
    setActiveSuspectId(null);
    setCurrentDialogueNodeId(null);
    setCurrentView('briefing');
    setIsCaseSelectOpen(false);
    audioEngine.startNoirAmbience();
  };

  const handleDiscoverClue = (clueId: string) => {
    if (!discoveredClueIds.includes(clueId)) {
      setDiscoveredClueIds(prev => [...prev, clueId]);
    }
  };

  const handleExamineClue = (clueId: string) => {
    handleDiscoverClue(clueId);
    if (!examinedClueIds.includes(clueId)) {
      setExaminedClueIds(prev => [...prev, clueId]);
    }
  };

  const handleUnlockDeduction = (deductionId: string) => {
    if (!unlockedDeductionIds.includes(deductionId)) {
      setUnlockedDeductionIds(prev => [...prev, deductionId]);
    }
  };

  const handleRecordBluff = (bluffId: string) => {
    setBluffsTriggered(prev => ({ ...prev, [bluffId]: true }));
  };

  const handleAccusationSuccess = () => {
    setIsAccusationModalOpen(false);
    if (!completedCaseIds.includes(currentCaseId)) {
      setCompletedCaseIds(prev => [...prev, currentCaseId]);
    }
    setCurrentView('resolution');
  };

  const handleNextCase = () => {
    const caseOrder: CaseId[] = ['case1', 'case2', 'case3', 'case4', 'case5'];
    const currentIdx = caseOrder.indexOf(currentCaseId);
    if (currentIdx < caseOrder.length - 1) {
      const nextId = caseOrder[currentIdx + 1];
      setCurrentCaseId(nextId);
      setDiscoveredClueIds([]);
      setExaminedClueIds([]);
      setUnlockedDeductionIds([]);
      setBluffsTriggered({});
      setActiveSuspectId(null);
      setCurrentDialogueNodeId(null);
      setCurrentView('briefing');
    } else {
      // Completed Case 5 -> Grand Finale
      setCurrentView('epilogue');
    }
  };

  const handleExportSave = () => {
    const data = localStorage.getItem(SAVE_KEY);
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mind_palace_save_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
    }
  };

  const handleImportSave = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      localStorage.setItem(SAVE_KEY, JSON.stringify(parsed));
      handleContinueGame();
    } catch {
      alert('Invalid save file JSON.');
    }
  };

  const handleResetProgress = () => {
    localStorage.removeItem(SAVE_KEY);
    setHasSaveGame(false);
    setCompletedCaseIds([]);
    setDiscoveredClueIds([]);
    setExaminedClueIds([]);
    setUnlockedDeductionIds([]);
    setBluffsTriggered({});
    setCurrentCaseId('case1');
    setCurrentView('menu');
  };

  return (
    <div className="w-full h-full flex flex-col bg-noir-950 text-ivory overflow-hidden select-none">
      {/* Top HUD (during investigation / case flow) */}
      {currentView !== 'menu' && currentView !== 'epilogue' && currentView !== 'credits' && currentView !== 'briefing' && currentView !== 'resolution' && (
        <HeaderHUD
          currentCase={currentCase}
          currentView={currentView}
          examinedCluesCount={examinedClueIds.length}
          totalCluesCount={currentCase.clues.length}
          onChangeView={setCurrentView}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onReturnToMenu={() => setCurrentView('menu')}
        />
      )}

      {/* View Router */}
      <main className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
        {currentView === 'menu' && (
          <MainMenu
            hasSaveGame={hasSaveGame}
            onNewGame={handleStartNewGame}
            onContinue={handleContinueGame}
            onOpenCaseFiles={() => setIsCaseSelectOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onShowCredits={() => setCurrentView('credits')}
          />
        )}

        {currentView === 'briefing' && (
          <CaseBriefing
            currentCase={currentCase}
            onBeginInvestigation={() => setCurrentView('investigation')}
          />
        )}

        {currentView === 'investigation' && (
          <InvestigationScene
            currentCase={currentCase}
            discoveredClueIds={discoveredClueIds}
            examinedClueIds={examinedClueIds}
            onDiscoverClue={handleDiscoverClue}
            onExamineClue={handleExamineClue}
            onOpenMindPalace={() => setCurrentView('mindpalace')}
            highContrast={settings.highContrast}
          />
        )}

        {currentView === 'mindpalace' && (
          <MindPalaceBoard
            currentCase={currentCase}
            examinedClueIds={examinedClueIds}
            unlockedDeductionIds={unlockedDeductionIds}
            onUnlockDeduction={handleUnlockDeduction}
            onProceedToAccusation={() => setIsAccusationModalOpen(true)}
            onProceedToInterrogation={() => setCurrentView('interrogation')}
          />
        )}

        {currentView === 'interrogation' && (
          <InterrogationRoom
            currentCase={currentCase}
            examinedClueIds={examinedClueIds}
            activeSuspectId={activeSuspectId}
            currentDialogueNodeId={currentDialogueNodeId}
            onSelectSuspect={setActiveSuspectId}
            onAdvanceDialogue={setCurrentDialogueNodeId}
            onRecordBluff={handleRecordBluff}
            onBackToScene={() => setCurrentView('investigation')}
          />
        )}

        {currentView === 'timeline' && (
          <TimelineReconstruction
            currentCase={currentCase}
            onBackToScene={() => setCurrentView('investigation')}
          />
        )}

        {currentView === 'resolution' && (
          <CaseResolution
            currentCase={currentCase}
            bluffsTriggeredCount={Object.keys(bluffsTriggered).length}
            onNextCase={handleNextCase}
            isFinalCase={currentCaseId === 'case5'}
          />
        )}

        {(currentView === 'epilogue' || currentView === 'credits') && (
          <GrandFinale onReturnToMenu={() => setCurrentView('menu')} />
        )}
      </main>

      {/* Final Accusation Modal */}
      {isAccusationModalOpen && (
        <FinalAccusationModal
          currentCase={currentCase}
          onAccusationSuccess={handleAccusationSuccess}
          onCancel={() => setIsAccusationModalOpen(false)}
        />
      )}

      {/* Case Select Modal */}
      {isCaseSelectOpen && (
        <CaseSelectModal
          cases={caseList}
          completedCaseIds={completedCaseIds}
          onSelectCase={handleSelectCase}
          onClose={() => setIsCaseSelectOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => setIsSettingsOpen(false)}
          onResetProgress={handleResetProgress}
          onExportSave={handleExportSave}
          onImportSave={handleImportSave}
        />
      )}
    </div>
  );
};
export default App;
