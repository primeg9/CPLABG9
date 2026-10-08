import React from 'react';
import { CheckCircle2, Circle, Award } from 'lucide-react';
import { ProgramChecklist } from '../types';
import confetti from 'canvas-confetti';

interface ChecklistProps {
  programId: string;
  checklist: ProgramChecklist;
  onToggle: (key: keyof ProgramChecklist, value: boolean) => void;
  onMastered?: () => void;
}

const CHECKLIST_ITEMS: { key: keyof ProgramChecklist; label: string; desc: string }[] = [
  {
    key: 'understandLogic',
    label: 'I understand the logic',
    desc: 'I know how the algorithm works step-by-step and why each variable is used.'
  },
  {
    key: 'writeSyntax',
    label: 'I can write the syntax',
    desc: 'I know the headers, main() signature, format specifiers, and C syntax.'
  },
  {
    key: 'codeWithoutLooking',
    label: 'I can write without seeing the solution',
    desc: 'I can reproduce this program on paper or editor from memory.'
  },
  {
    key: 'understandOutput',
    label: 'I understand the output',
    desc: 'I can dry-run sample inputs and predict exact output lines.'
  },
  {
    key: 'explainInViva',
    label: 'I can explain it in viva',
    desc: 'I know the viva concepts, compiler quirks, edge cases, and time complexity.'
  },
  {
    key: 'examReady',
    label: 'I can solve it under exam conditions',
    desc: 'I am confident of executing this error-free within the lab practical time.'
  }
];

export const Checklist: React.FC<ChecklistProps> = ({
  programId,
  checklist,
  onToggle,
  onMastered
}) => {
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const isAllComplete = completedCount === CHECKLIST_ITEMS.length;

  const handleToggle = (key: keyof ProgramChecklist) => {
    const nextVal = !checklist[key];
    onToggle(key, nextVal);

    // If checking this completes all 6 items, trigger celebration!
    if (nextVal && completedCount === CHECKLIST_ITEMS.length - 1) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
      if (onMastered) onMastered();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 my-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Award className={`w-5 h-5 ${isAllComplete ? 'text-emerald-400' : 'text-blue-400'}`} />
          <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
            Exam Readiness Checklist
          </h3>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
          isAllComplete
            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
            : 'bg-slate-800 text-slate-300 border-slate-700'
        }`}>
          {completedCount} / {CHECKLIST_ITEMS.length} Checked
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
        Self-evaluate your readiness before your lab practical. Ticking all boxes marks this program as <strong>Mastered</strong>.
      </p>

      <div className="space-y-2.5">
        {CHECKLIST_ITEMS.map(({ key, label, desc }) => {
          const isChecked = Boolean(checklist[key]);
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleToggle(key)}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-all active:scale-[0.99] ${
                isChecked
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <div className="min-w-0">
                <span className={`text-xs sm:text-sm font-medium block ${isChecked ? 'text-emerald-200' : 'text-slate-200'}`}>
                  {label}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 leading-tight block mt-0.5">
                  {desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
