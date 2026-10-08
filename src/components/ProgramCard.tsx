import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  PlayCircle,
  HelpCircle,
  ChevronRight,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { Program, ProgramStatus } from '../types';

interface ProgramCardProps {
  program: Program;
  status: ProgramStatus;
  isWeak?: boolean;
  onToggleWeak?: (e: React.MouseEvent) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  status,
  isWeak,
  onToggleWeak
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'Mastered':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
          label: 'Mastered',
          className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
        };
      case 'Practiced':
        return {
          icon: <PlayCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
          label: 'Practiced',
          className: 'bg-blue-500/10 text-blue-400 border-blue-500/25'
        };
      case 'In Progress':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
          label: 'In Progress',
          className: 'bg-amber-500/10 text-amber-400 border-amber-500/25'
        };
      default:
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />,
          label: 'Not Started',
          className: 'bg-slate-800/80 text-slate-400 border-slate-700/60'
        };
    }
  };

  const getDifficultyBadge = () => {
    switch (program.difficulty) {
      case 'Beginner':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Intermediate':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Advanced':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  const statusConfig = getStatusBadge();

  return (
    <div className="relative group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 sm:p-4 transition-all shadow-sm active:scale-[0.99]">
      <Link
        to={`/program/${program.id}`}
        className="block"
        aria-label={`View program ${program.code}: ${program.title}`}
      >
        {/* Top Meta row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs sm:text-sm px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {program.code}
            </span>
            <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded font-medium border ${getDifficultyBadge()}`}>
              {program.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Status indicator with icon & text */}
            <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium border ${statusConfig.className}`}>
              {statusConfig.icon}
              <span>{statusConfig.label}</span>
            </span>

            {/* Toggle Weak / Flag button */}
            {onToggleWeak && (
              <button
                type="button"
                onClick={onToggleWeak}
                title={isWeak ? 'Marked as weak topic' : 'Flag for review'}
                className={`p-1 rounded-md transition-colors ${
                  isWeak ? 'text-amber-400 hover:text-amber-300' : 'text-slate-500 hover:text-slate-300'
                }`}
                aria-label="Flag as weak program"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isWeak ? 'fill-amber-400' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Program Title */}
        <h4 className="font-semibold text-slate-100 text-sm sm:text-base group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
          {program.title}
        </h4>

        {/* Program Objective / Snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {program.objective}
        </p>

        {/* Bottom row: Topics and Action arrow */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 flex-wrap">
            {program.topics.map((t) => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400 border border-slate-800">
                {t}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-medium text-blue-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform shrink-0">
            Learn <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
};
