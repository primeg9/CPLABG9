import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FolderCode,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Flame,
  Terminal,
  Zap
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { getProgramById, allPrograms } from '../data/programs';
import { topicsList } from '../data/topics';
import { ProgramCard } from '../components/ProgramCard';
import { Program } from '../types';

export const Home: React.FC = () => {
  const { stats, progress, toggleWeakStatus } = useProgress();
  const navigate = useNavigate();

  // Find last practiced program
  const lastPracticedId = progress.recentProgramIds[0] || 'a01';
  const lastProgram = getProgramById(lastPracticedId);

  // Find weak programs
  const weakPrograms: Program[] = progress.weakProgramIds
    .map(id => getProgramById(id))
    .filter((p): p is Program => Boolean(p));

  const partAPercent = Math.round((stats.partAMastered / 15) * 100);
  const partBPercent = Math.round((stats.partBMastered / 13) * 100);
  const totalPercent = Math.round((stats.totalMastered / 28) * 100);

  // Featured quick topics
  const quickTopics = [
    'Basics',
    'Conditions',
    'Loops',
    'Arrays',
    'Strings',
    'Functions',
    'Recursion',
    'Matrices',
    'Structures',
    'Unions'
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Compact Brand / Header */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Terminal className="w-3.5 h-3.5" />
              BCA Lab Journal Syllabus • 28 Programs
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              C Programming Lab Practice Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              Learn your lab programs. Practice the logic. Prepare for the lab exam. Dual Journal & Practice code, checklists, and exam simulator.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 sm:flex items-center gap-2">
            <Link
              to="/part-a"
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all active:scale-95 text-center shadow-md shadow-blue-600/20"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Start Learning</span>
            </Link>
            <Link
              to="/exam"
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all active:scale-95 text-center shadow-md shadow-purple-600/20"
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Exam Mode</span>
            </Link>
            <Link
              to="/revision"
              className="flex flex-col sm:flex-row items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all active:scale-95 text-center"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Revision</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Progress Summary Dashboard (Mobile First) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Overall Mastered Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Overall Progress
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {totalPercent}%
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {stats.totalMastered}
              </span>
              <span className="text-slate-400 text-xs sm:text-sm font-medium">
                / 28 Programs Mastered
              </span>
            </div>
            {/* Visual progress bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <span>{stats.totalPracticed} Practiced</span>
            <span>{stats.totalNotStarted} Remaining</span>
          </div>
        </div>

        {/* Part A Card */}
        <Link
          to="/part-a"
          className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200">Part A Programs</span>
            </div>
            <span className="text-xs font-bold text-blue-400">
              {stats.partAMastered} / 15
            </span>
          </div>

          <div className="my-2">
            <div className="text-xs text-slate-400 mb-2">
              Basics, loops, conditionals, arrays & strings (A01 - A15)
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${partAPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-blue-400 font-medium pt-2 border-t border-slate-800/80">
            <span>{partAPercent}% Complete</span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Part A <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Part B Card */}
        <Link
          to="/part-b"
          className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <FolderCode className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200">Part B Programs</span>
            </div>
            <span className="text-xs font-bold text-purple-400">
              {stats.partBMastered} / 13
            </span>
          </div>

          <div className="my-2">
            <div className="text-xs text-slate-400 mb-2">
              Functions, recursion, matrices, structs & unions (B01 - B13)
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${partBPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-purple-400 font-medium pt-2 border-t border-slate-800/80">
            <span>{partBPercent}% Complete</span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Part B <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </Link>
      </section>

      {/* 3. Continue Learning Banner */}
      {lastProgram && (
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Continue Where You Left Off
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-100 truncate block">
                  {lastProgram.code} — {lastProgram.title}
                </span>
              </div>
            </div>

            <Link
              to={`/program/${lastProgram.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold active:scale-95 transition-all shadow"
            >
              <span>Resume Program</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* 4. Weak Programs Section (if any flagged) */}
      {weakPrograms.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm sm:text-base font-bold text-white">
                Weak Programs / Need Review ({weakPrograms.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">Programs marked for extra practice</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {weakPrograms.slice(0, 3).map((prog) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                status={progress.programStatus[prog.id] || 'Not Started'}
                isWeak={true}
                onToggleWeak={(e) => {
                  e.preventDefault();
                  toggleWeakStatus(prog.id);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Quick Topics Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              Syllabus Topics
            </h2>
          </div>
          <Link
            to="/topics"
            className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
          >
            All 16 Topics <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {quickTopics.map((topicName) => {
            const topicInfo = topicsList.find(t => t.name === topicName);
            const count = allPrograms.filter(p => p.topics.includes(topicName)).length;
            return (
              <Link
                key={topicName}
                to={`/topics?selected=${encodeURIComponent(topicName)}`}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-left transition-all active:scale-95 group"
              >
                <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 block truncate transition-colors">
                  {topicName}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {count} program{count !== 1 ? 's' : ''}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. Exam Mode Call-to-Action */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/20 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            Lab Practical Simulator
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Simulate Your C Practical Lab Exam
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
            Test yourself under real exam conditions: random question pick, timed countdown, code writing, and comprehensive evaluation review.
          </p>
        </div>

        <Link
          to="/exam"
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 text-center shadow-lg shadow-purple-600/30 shrink-0"
        >
          Launch Exam Mode →
        </Link>
      </section>

      {/* 7. Compact Academic Footer */}
      <footer className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-400">
          CPLABG9 • C Programming Lab Practice Hub
        </p>
        <p>
          College BCA Lab Journal syllabus — Part A (15) & Part B (13). Offline localStorage progress.
        </p>
      </footer>
    </div>
  );
};
