import React, { useState } from 'react';
import { BookOpen, Search, CheckCircle2, Filter, Award } from 'lucide-react';
import { partAPrograms } from '../data/partA';
import { ProgramCard } from '../components/ProgramCard';
import { useProgress } from '../hooks/useProgress';
import { ProgramStatus } from '../types';

export const PartAPage: React.FC = () => {
  const { progress, stats, toggleWeakStatus } = useProgress();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = partAPrograms.filter((program) => {
    const status = progress.programStatus[program.id] || 'Not Started';
    const matchesFilter = filterStatus === 'all' || status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      program.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const partAPercent = Math.round((stats.partAMastered / 15) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Part A Syllabus • 15 Programs
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Part A: Core C Programming
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Programs A01 through A15 covering circle area, interest, conditionals, switch calculator, quadratic roots, loops, GCD, primes, digit extraction, strings, and 1D arrays.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 sm:p-4 min-w-[200px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 font-medium">Part A Progress</span>
              <span className="text-blue-400 font-bold">{stats.partAMastered} / 15</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${partAPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1.5 block text-right font-medium">
              {partAPercent}% Mastered
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter Part A programs..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {['all', 'Mastered', 'In Progress', 'Not Started'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  filterStatus.toLowerCase() === status.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'All (15)' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Program Cards Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              status={progress.programStatus[program.id] || 'Not Started'}
              isWeak={progress.weakProgramIds.includes(program.id)}
              onToggleWeak={(e) => {
                e.preventDefault();
                toggleWeakStatus(program.id);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-200">No matching Part A programs found</p>
          <p className="text-xs text-slate-400 mt-1">Try clearing your search query or status filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
            }}
            className="mt-3 px-3.5 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
