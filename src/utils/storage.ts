import { UserProgress, ProgramStatus, ProgramChecklist, ExamAttempt } from '../types';

const STORAGE_KEY = 'cplabg9_user_progress_v1';

export const defaultChecklist: ProgramChecklist = {
  understandLogic: false,
  writeSyntax: false,
  codeWithoutLooking: false,
  understandOutput: false,
  explainInViva: false,
  examReady: false
};

export const defaultProgress: UserProgress = {
  version: 1,
  programStatus: {},
  checklists: {},
  practiceCount: {},
  lastPracticed: {},
  recentProgramIds: [],
  weakProgramIds: [],
  savedCode: {},
  examHistory: []
};

// Safe localStorage wrapper
export function getSavedProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      programStatus: parsed.programStatus || {},
      checklists: parsed.checklists || {},
      practiceCount: parsed.practiceCount || {},
      lastPracticed: parsed.lastPracticed || {},
      recentProgramIds: parsed.recentProgramIds || [],
      weakProgramIds: parsed.weakProgramIds || [],
      savedCode: parsed.savedCode || {},
      examHistory: parsed.examHistory || []
    };
  } catch (error) {
    console.error('Failed to read CPLABG9 progress from localStorage:', error);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    // Dispatch custom event so listeners within the same tab update immediately
    window.dispatchEvent(new Event('cplabg9_progress_updated'));
    return true;
  } catch (error) {
    console.error('Failed to save CPLABG9 progress to localStorage:', error);
    return false;
  }
}

export function updateProgramStatus(programId: string, status: ProgramStatus): UserProgress {
  const current = getSavedProgress();
  const updated: UserProgress = {
    ...current,
    programStatus: {
      ...current.programStatus,
      [programId]: status
    },
    lastPracticed: {
      ...current.lastPracticed,
      [programId]: Date.now()
    }
  };

  // If marked mastered, remove from weak programs if present
  if (status === 'Mastered') {
    updated.weakProgramIds = updated.weakProgramIds.filter(id => id !== programId);
  }

  // Update recent list
  const recent = [programId, ...updated.recentProgramIds.filter(id => id !== programId)].slice(0, 8);
  updated.recentProgramIds = recent;

  saveProgress(updated);
  return updated;
}

export function updateChecklistItem(
  programId: string,
  key: keyof ProgramChecklist,
  value: boolean
): UserProgress {
  const current = getSavedProgress();
  const currentChecklist = current.checklists[programId] || { ...defaultChecklist };
  const updatedChecklist = { ...currentChecklist, [key]: value };

  const allTrue = Object.values(updatedChecklist).every(v => v === true);
  const anyTrue = Object.values(updatedChecklist).some(v => v === true);

  let newStatus: ProgramStatus = current.programStatus[programId] || 'Not Started';
  if (allTrue) {
    newStatus = 'Mastered';
  } else if (anyTrue && newStatus === 'Not Started') {
    newStatus = 'In Progress';
  }

  const updated: UserProgress = {
    ...current,
    checklists: {
      ...current.checklists,
      [programId]: updatedChecklist
    },
    programStatus: {
      ...current.programStatus,
      [programId]: newStatus
    }
  };

  saveProgress(updated);
  return updated;
}

export function recordPracticeAttempt(programId: string, code?: string): UserProgress {
  const current = getSavedProgress();
  const count = (current.practiceCount[programId] || 0) + 1;
  const currentStatus = current.programStatus[programId] || 'Not Started';
  const newStatus: ProgramStatus = currentStatus === 'Mastered' ? 'Mastered' : 'Practiced';

  const updated: UserProgress = {
    ...current,
    practiceCount: {
      ...current.practiceCount,
      [programId]: count
    },
    lastPracticed: {
      ...current.lastPracticed,
      [programId]: Date.now()
    },
    programStatus: {
      ...current.programStatus,
      [programId]: newStatus
    },
    recentProgramIds: [programId, ...current.recentProgramIds.filter(id => id !== programId)].slice(0, 8)
  };

  if (code !== undefined) {
    updated.savedCode = {
      ...updated.savedCode,
      [programId]: code
    };
  }

  saveProgress(updated);
  return updated;
}

export function toggleWeakProgram(programId: string): UserProgress {
  const current = getSavedProgress();
  const isWeak = current.weakProgramIds.includes(programId);
  const updatedWeak = isWeak
    ? current.weakProgramIds.filter(id => id !== programId)
    : [...current.weakProgramIds, programId];

  const updated: UserProgress = {
    ...current,
    weakProgramIds: updatedWeak
  };

  saveProgress(updated);
  return updated;
}

export function saveExamAttempt(attempt: ExamAttempt): UserProgress {
  const current = getSavedProgress();
  
  // Track weak programs from exam results (e.g., questions marked needs-work or skipped)
  const newlyWeak = attempt.questionResults
    .filter(q => q.selfEvaluation === 'needs-work' || q.selfEvaluation === 'skipped')
    .map(q => q.programId);

  const combinedWeak = Array.from(new Set([...current.weakProgramIds, ...newlyWeak]));

  const updated: UserProgress = {
    ...current,
    examHistory: [attempt, ...current.examHistory].slice(0, 20),
    weakProgramIds: combinedWeak
  };

  saveProgress(updated);
  return updated;
}

export function resetAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('cplabg9_progress_updated'));
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
}
