import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  BookOpen,
  FolderCode,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Flame,
  Bookmark
} from 'lucide-react';
import { allPrograms, partAPrograms, partBPrograms } from '../data/programs';
import { useProgress } from '../hooks/useProgress';

export const RevisionPage: React.FC = () => {
  const { progress } = useProgress();
  const [activeTab, setActiveTab] = useState<'all' | 'part-a' | 'part-b' | 'weak'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  let displayedPrograms = allPrograms;
  if (activeTab === 'part-a') displayedPrograms = partAPrograms;
  if (activeTab === 'part-b') displayedPrograms = partBPrograms;
  if (activeTab === 'weak') {
    displayedPrograms = allPrograms.filter(p => progress.weakProgramIds.includes(p.id));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayedPrograms = displayedPrograms.filter(
      p =>
        p.code.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.quickRevision.purpose.toLowerCase().includes(q) ||
        p.quickRevision.coreLogic.toLowerCase().includes(q)
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Pre-Exam Revision Cards
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Quick Lab Exam Revision
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Designed for the 15 minutes before your lab exam. Revise core logic, key syntaxes, functions, and common mistakes in 60 seconds per program.
        </p>

        {/* Tab & Filter Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All 28
            </button>
            <button
              onClick={() => setActiveTab('part-a')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'part-a'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Part A (15)
            </button>
            <button
              onClick={() => setActiveTab('part-b')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'part-b'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Part B (13)
            </button>
            <button
              onClick={() => setActiveTab('weak')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1 ${
                activeTab === 'weak'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>Weak ({progress.weakProgramIds.length})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter revision cards..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Revision Cards Grid */}
      {displayedPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedPrograms.map((program) => {
            const rev = program.quickRevision;
            const status = progress.programStatus[program.id] || 'Not Started';

            return (
              <div
                key={program.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                        {program.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Part {program.part}
                      </span>
                    </div>

                    <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-slate-800 text-slate-300">
                      {status}
                    </span>
                  </div>

                  {/* Title & Purpose */}
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-1">
                    {program.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    <strong>Purpose:</strong> {rev.purpose}
                  </p>

                  {/* Core Logic Box */}
                  <div className="p-3 bg-[#0a0f1d] border border-slate-800/80 rounded-xl text-xs font-mono text-emerald-300 mb-3 overflow-x-auto">
                    <span className="text-[10px] text-slate-500 uppercase font-sans font-bold block mb-1">
                      Core Logic / Formula:
                    </span>
                    <code>{rev.coreLogic}</code>
                  </div>

                  {/* Syntax & Key Function */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2.5 bg-slate-950/60 border border-slate-800/60 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">
                        Key Syntax:
                      </span>
                      <span className="text-slate-200 font-mono text-[11px] block truncate">
                        {rev.importantSyntax}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-950/60 border border-slate-800/60 rounded-xl">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">
                        Key Function:
                      </span>
                      <span className="text-slate-200 font-mono text-[11px] block truncate">
                        {rev.importantFunction}
                      </span>
                    </div>
                  </div>

                  {/* Common Mistake Warning */}
                  <div className="p-2.5 bg-rose-950/20 border border-rose-900/30 rounded-xl text-xs text-rose-300/90 flex items-start gap-2 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      <strong>Mistake:</strong> {rev.commonMistake}
                    </span>
                  </div>

                  {/* Exam Reminder */}
                  <div className="p-2.5 bg-amber-950/20 border border-amber-900/30 rounded-xl text-xs text-amber-300/90 flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      <strong>Exam Tip:</strong> {rev.examReminder}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end">
                  <Link
                    to={`/program/${program.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>View Full Code & Practice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-200">No programs match your revision filter.</p>
          <button
            onClick={() => {
              setActiveTab('all');
              setSearchQuery('');
            }}
            className="mt-3 px-3.5 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Show All 28 Programs
          </button>
        </div>
      )}
    </div>
  );
};
