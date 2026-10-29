export type CaseId = 'case1' | 'case2' | 'case3' | 'case4' | 'case5';

export type GameView = 
  | 'menu' 
  | 'caseSelect'
  | 'briefing' 
  | 'investigation' 
  | 'mindpalace' 
  | 'interrogation' 
  | 'timeline' 
  | 'accusation' 
  | 'resolution' 
  | 'epilogue' 
  | 'credits' 
  | 'settings';

export type ClueCategory = 
  | 'physical' 
  | 'psychological' 
  | 'document' 
  | 'testimony' 
  | 'timeline' 
  | 'contradiction' 
  | 'motive';

export interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  clueId: string;
  examinePrompt: string;
  icon?: string;
}

export interface Clue {
  id: string;
  title: string;
  category: ClueCategory;
  location: string;
  iconName: string;
  summary: string;
  fullDescription: string;
  julianObservation: string;
  claraForensics: string;
  isExamined: boolean;
  discovered: boolean;
  linkedClueIds?: string[];
  requiresBothPerspectives?: boolean;
  combinedDeductionTitle?: string;
  combinedDeductionText?: string;
}

export type Expression = 'neutral' | 'nervous' | 'defensive' | 'calculating' | 'shocked' | 'defeated';

export interface Suspect {
  id: string;
  name: string;
  title: string;
  age: number;
  bio: string;
  portrait: string;
  currentExpression: Expression;
  baselineHeartRate: number; // e.g. 72 bpm
  baselineTells: {
    label: string;
    description: string;
    triggerQuestionId?: string;
  }[];
  psychologicalProfile: {
    strengths: string;
    vulnerability: string;
    habitualDefense: string;
  };
  initialSuspicion: number; // 0 to 100
  disclosedInformation: string[];
}

export interface DialogueChoice {
  id: string;
  text: string;
  type: 'inquiry' | 'baseline' | 'coldread' | 'bluff' | 'presentEvidence';
  requiredClueId?: string;
  requiredCondition?: string;
  nextDialogueId: string;
  bluffSuccess?: boolean;
  bluffPenalty?: string;
  insightGained?: string;
  revealsClueId?: string;
  expressionChange?: Expression;
  suspicionDelta?: number;
}

export interface DialogueNode {
  id: string;
  speaker: 'Julian' | 'Clara' | string;
  speakerTitle?: string;
  text: string;
  expression?: Expression;
  audioStinger?: 'bluff' | 'contradiction' | 'tension' | 'realization';
  choices: DialogueChoice[];
  unlockedClueId?: string;
  disclosesFact?: string;
  bluffSuccess?: boolean;
  insightGained?: string;
}

export interface InterrogationData {
  suspectId: string;
  rootDialogueId: string;
  nodes: Record<string, DialogueNode>;
}

export interface DeductionNode {
  id: string;
  title: string;
  hypothesis: string;
  requiredClueIds: string[];
  unlockedInsight: string;
  isUnlocked: boolean;
  isContradiction?: boolean;
  contradictionExplanation?: string;
  leadsToAccusation?: boolean;
  position?: { x: number; y: number };
}

export interface TimelineEvent {
  id: string;
  timeLabel: string;
  description: string;
  sourceClueId: string;
  correctSlotIndex: number; // 0 to N
  currentSlotIndex?: number;
  revealed: boolean;
}

export interface FinalAccusationConfig {
  options: {
    culprits: { id: string; name: string; isCorrect: boolean; feedback: string }[];
    motives: { id: string; text: string; isCorrect: boolean; feedback: string }[];
    methods: { id: string; text: string; isCorrect: boolean; feedback: string }[];
    decisiveClues: { id: string; title: string; isCorrect: boolean; feedback: string }[];
    stagedEvidenceExplanations: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  };
  confrontationDialogueId: string;
}

export interface SceneLocation {
  id: string;
  name: string;
  subtitle: string;
  visualTheme: 'penthouse' | 'cellar' | 'gallery' | 'rooftop' | 'theater' | 'corridor' | 'office';
  hotspots: Hotspot[];
}

export interface CaseData {
  id: CaseId;
  caseNumber: number;
  title: string;
  subtitle: string;
  difficulty: 'Tutorial' | 'Intermediate' | 'Challenging' | 'Complex' | 'Master';
  location: string;
  victim: {
    name: string;
    age: number;
    occupation: string;
    apparentDeath: string;
  };
  actualCulprit: string;
  synopsis: string;
  scenes: SceneLocation[];
  clues: Clue[];
  suspects: Suspect[];
  interrogations: Record<string, InterrogationData>;
  deductions: DeductionNode[];
  timelineEvents: TimelineEvent[];
  accusationConfig: FinalAccusationConfig;
  briefingDialogue: { speaker: string; text: string }[];
  resolutionStory: {
    summary: string;
    howCrimeWasCommitted: string;
    whySuspectsFailed: string;
    julianReflection: string;
    claraClosingRemarks: string;
  };
  hints: {
    level1_nudge: string;
    level2_category: string;
    level3_connection: string;
    level4_solution: string;
  };
}

export interface GameSettings {
  masterVolume: number; // 0-100
  musicVolume: number;  // 0-100
  sfxVolume: number;    // 0-100
  textSpeed: 'instant' | 'fast' | 'normal' | 'slow';
  highContrast: boolean;
  screenShake: boolean;
  showSubtitles: boolean;
}

export interface SaveState {
  version: number;
  currentCaseId: CaseId;
  currentSceneId: string;
  currentView: GameView;
  discoveredClueIds: string[];
  examinedClueIds: string[];
  unlockedDeductionIds: string[];
  completedCaseIds: CaseId[];
  bluffsTriggered: Record<string, boolean>;
  revealedTimelineIds: string[];
  solvedTimelineSlots: Record<string, number>;
  activeSuspectId: string | null;
  currentDialogueNodeId: string | null;
  disclosedInformation: Record<string, string[]>;
  settings: GameSettings;
  timestamp: string;
}
