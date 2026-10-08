import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Award,
  BookOpen,
  FolderCode,
  RotateCcw,
  CheckCircle2,
  Clock,
  Bookmark,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { getProgramById, allPrograms } from '../data/programs';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Program } from '../types';

export const ProgressPage: React.FC = () => {
  const { stats, progress, resetProgress, toggleWeakStatus } = useProgress();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const totalPercent = Math.round((stats.totalMastered / 28) * 100);
  const partAPercent = Math.round((stats.partAMastered / 15) * 100);
  const partBPercent = Math.round((stats.partBMastered / 13) * 100);

  const recentPrograms: Program[] = progress.recentProgramIds
    .map(id => getProgramById(id))
    .filter((p): p is Program => Boolean(p));

  const weakPrograms: Program[] = progress.weakProgramIds
    .map(id => getProgramById(id))
    .filter((p): p is Program => Boolean(p));

  const handleResetConfirm = () => {
    resetProgress();
    setIsResetDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Local Progress Tracker
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Your Lab Preparation Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Track programs mastered, practice frequency, weak areas flagged for revision, and your simulated exam scores. Stored offline in your browser.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsResetDialogOpen(true)}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 hover:text-rose-300 hover:border-rose-900/40 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Overall Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Overall Mastered
            </span>
            <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              {totalPercent}%
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {stats.totalMastered}
            </span>
            <span className="text-xs text-slate-400">/ 28 Programs</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-800 text-center text-[11px]">
            <div>
              <span className="text-slate-500 block">Mastered</span>
              <span className="text-emerald-400 font-bold">{stats.totalMastered}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Practiced</span>
              <span className="text-blue-400 font-bold">{stats.totalPracticed}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Remaining</span>
              <span className="text-slate-400 font-bold">{stats.totalNotStarted}</span>
            </div>
          </div>
        </div>

        {/* Part A Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-slate-200">Part A Progress</span>
            </div>
            <span className="text-xs font-bold text-blue-400">
              {partAPercent}%
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {stats.partAMastered}
            </span>
            <span className="text-xs text-slate-400">/ 15 Programs</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${partAPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Core Lab Programs</span>
            <Link to="/part-a" className="text-blue-400 font-semibold hover:underline">
              View Part A →
            </Link>
          </div>
        </div>

        {/* Part B Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderCode className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-slate-200">Part B Progress</span>
            </div>
            <span className="text-xs font-bold text-purple-400">
              {partBPercent}%
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {stats.partBMastered}
            </span>
            <span className="text-xs text-slate-400">/ 13 Programs</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${partBPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Advanced Lab Programs</span>
            <Link to="/part-b" className="text-purple-400 font-semibold hover:underline">
              View Part B →
            </Link>
          </div>
        </div>
      </div>

      {/* Weak Programs List */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              Flagged Weak Programs ({weakPrograms.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400">Focus on these before your lab practical</span>
        </div>

        {weakPrograms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {weakPrograms.map((prog) => (
              <div
                key={prog.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {prog.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      {prog.shortTitle}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Part {prog.part}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    to={`/program/${prog.id}`}
                    className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs hover:bg-blue-600/30 font-medium"
                  >
                    Study
                  </Link>
                  <button
                    onClick={() => toggleWeakStatus(prog.id)}
                    className="p-1 text-slate-500 hover:text-slate-300"
                    title="Remove flag"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic py-2">
            No weak programs flagged yet. You can flag difficult programs while studying or from exam reviews.
          </p>
        )}
      </section>

      {/* Exam Simulation History */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              Recent Exam History ({progress.examHistory.length})
            </h2>
          </div>
          <Link
            to="/exam"
            className="text-xs text-purple-400 font-semibold hover:underline"
          >
            Take New Exam →
          </Link>
        </div>

        {progress.examHistory.length > 0 ? (
          <div className="space-y-2">
            {progress.examHistory.slice(0, 5).map((attempt) => (
              <div
                key={attempt.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-200">
                    Scope: Part {attempt.part} ({attempt.totalQuestions} Questions)
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {new Date(attempt.timestamp).toLocaleDateString()} • {Math.round(attempt.timeSpentSeconds / 60)} mins
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-bold text-emerald-400 block">
                      Score: {attempt.percentage}%
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {attempt.completedProgramIds.length} / {attempt.totalQuestions} Passed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic py-2">
            No simulated lab exams taken yet. Launch Exam Mode to test yourself!
          </p>
        )}
      </section>

      {/* Confirmation Dialog for Progress Reset */}
      <ConfirmDialog
        isOpen={isResetDialogOpen}
        title="Reset All Progress?"
        message="Are you sure you want to reset all your progress data? This will reset all your checklist checks, mastered statuses, and exam history. This action cannot be reversed."
        confirmLabel="Reset only progress"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetDialogOpen(false)}
      />
    </div>
  );
};
