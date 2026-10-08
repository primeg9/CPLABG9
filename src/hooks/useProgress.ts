import { useState, useEffect, useCallback } from 'react';
import { UserProgress, ProgramStatus, ProgramChecklist, ExamAttempt } from '../types';
import {
  getSavedProgress,
  updateProgramStatus as setProgramStatus,
  updateChecklistItem as setChecklistItem,
  recordPracticeAttempt,
  toggleWeakProgram as toggleWeak,
  saveExamAttempt as addExamAttempt,
  resetAllProgress
} from '../utils/storage';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getSavedProgress);

  const refreshProgress = useCallback(() => {
    setProgress(getSavedProgress());
  }, []);

  useEffect(() => {
    const handleUpdate = () => refreshProgress();
    window.addEventListener('cplabg9_progress_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('cplabg9_progress_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refreshProgress]);

  const updateStatus = useCallback((programId: string, status: ProgramStatus) => {
    const next = setProgramStatus(programId, status);
    setProgress(next);
  }, []);

  const updateChecklist = useCallback((programId: string, key: keyof ProgramChecklist, val: boolean) => {
    const next = setChecklistItem(programId, key, val);
    setProgress(next);
  }, []);

  const recordPractice = useCallback((programId: string, code?: string) => {
    const next = recordPracticeAttempt(programId, code);
    setProgress(next);
  }, []);

  const toggleWeakStatus = useCallback((programId: string) => {
    const next = toggleWeak(programId);
    setProgress(next);
  }, []);

  const saveExam = useCallback((attempt: ExamAttempt) => {
    const next = addExamAttempt(attempt);
    setProgress(next);
  }, []);

  const resetProgress = useCallback(() => {
    resetAllProgress();
    setProgress(getSavedProgress());
  }, []);

  // Compute stats helper
  const stats = {
    totalMastered: Object.values(progress.programStatus).filter(s => s === 'Mastered').length,
    totalPracticed: Object.values(progress.programStatus).filter(s => s === 'Practiced').length,
    totalInProgress: Object.values(progress.programStatus).filter(s => s === 'In Progress').length,
    totalNotStarted: 28 - Object.values(progress.programStatus).filter(s => s !== 'Not Started').length,
    partAMastered: Object.entries(progress.programStatus).filter(([id, s]) => id.startsWith('a') && s === 'Mastered').length,
    partBMastered: Object.entries(progress.programStatus).filter(([id, s]) => id.startsWith('b') && s === 'Mastered').length,
    weakCount: progress.weakProgramIds.length,
    examsCompleted: progress.examHistory.length
  };

  return {
    progress,
    stats,
    updateStatus,
    updateChecklist,
    recordPractice,
    toggleWeakStatus,
    saveExam,
    resetProgress,
    refreshProgress
  };
}
