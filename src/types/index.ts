export type ProgramPart = 'A' | 'B';

export type ProgramStatus = 'Not Started' | 'In Progress' | 'Practiced' | 'Mastered';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuickRevision {
  purpose: string;
  coreLogic: string;
  importantSyntax: string;
  importantFunction: string;
  commonMistake: string;
  examReminder: string;
}

export interface VivaQuestion {
  question: string;
  answer: string;
}

export interface Program {
  id: string; // 'a01', 'b05', etc.
  code: string; // 'A01', 'B05'
  part: ProgramPart;
  number: number;
  title: string;
  shortTitle: string;
  objective: string;
  concepts: string[];
  topics: string[];
  difficulty: DifficultyLevel;
  logic: string[];
  journalCode: string;
  journalNote?: string;
  practiceCode: string;
  explanation: string;
  sampleInput: string;
  sampleOutput: string;
  commonMistakes: string[];
  examTips: string[];
  vivaQuestions: VivaQuestion[];
  quickRevision: QuickRevision;
  keywords: string[];
  starterCode?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface ProgramChecklist {
  understandLogic: boolean;
  writeSyntax: boolean;
  codeWithoutLooking: boolean;
  understandOutput: boolean;
  explainInViva: boolean;
  examReady: boolean;
}

export interface ExamAttempt {
  id: string;
  timestamp: number;
  part: 'A' | 'B' | 'ALL';
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  totalTimeSeconds: number;
  completedProgramIds: string[];
  skippedProgramIds: string[];
  questionResults: {
    programId: string;
    programCode: string;
    title: string;
    userCode: string;
    selfEvaluation: 'correct' | 'needs-work' | 'skipped';
    notes?: string;
  }[];
}

export interface UserProgress {
  version: number;
  programStatus: Record<string, ProgramStatus>;
  checklists: Record<string, ProgramChecklist>;
  practiceCount: Record<string, number>;
  lastPracticed: Record<string, number>; // programId -> timestamp
  recentProgramIds: string[];
  weakProgramIds: string[];
  savedCode: Record<string, string>; // user's practice code per program
  examHistory: ExamAttempt[];
}

export interface TopicInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
  badgeColor: string;
}
