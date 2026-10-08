import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  PlayCircle,
  Bookmark,
  Share2,
  HelpCircle,
  Terminal,
  AlertCircle,
  Lightbulb,
  Sparkles,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { getProgramById, getNextProgram, getPreviousProgram } from '../data/programs';
import { CodeBlock } from '../components/CodeBlock';
import { Checklist } from '../components/Checklist';
import { PracticeEditor } from '../components/PracticeEditor';
import { useProgress } from '../hooks/useProgress';
import { defaultChecklist } from '../utils/storage';
import confetti from 'canvas-confetti';

export const ProgramDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const program = getProgramById(id || '');

  const {
    progress,
    updateStatus,
    updateChecklist,
    recordPractice,
    toggleWeakStatus
  } = useProgress();

  // Collapsible section toggles (mobile friendliness)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    logic: true,
    journal: true,
    practice: true,
    explanation: false,
    example: true,
    mistakes: false,
    viva: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!program) {
    return (
      <div className="py-12 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Program Not Found</h2>
        <p className="text-sm text-slate-400">
          Program with ID &quot;{id}&quot; does not exist in the CPLABG9 journal syllabus.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>
      </div>
    );
  }

  const status = progress.programStatus[program.id] || 'Not Started';
  const checklist = progress.checklists[program.id] || { ...defaultChecklist };
  const isWeak = progress.weakProgramIds.includes(program.id);
  const nextProg = getNextProgram(program.id);
  const prevProg = getPreviousProgram(program.id);

  const handleMarkMastered = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    updateStatus(program.id, 'Mastered');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Top Breadcrumb & Next/Prev Navigation */}
      <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Hub</Link>
          <span>/</span>
          <Link
            to={program.part === 'A' ? '/part-a' : '/part-b'}
            className="hover:text-white transition-colors"
          >
            Part {program.part}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-mono font-bold">{program.code}</span>
        </div>

        {/* Quick Program Switcher */}
        <div className="flex items-center gap-1">
          {prevProg ? (
            <Link
              to={`/program/${prevProg.id}`}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 flex items-center gap-1 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{prevProg.code}</span>
            </Link>
          ) : (
            <span className="px-2.5 py-1 text-slate-600 text-xs">Start</span>
          )}

          {nextProg ? (
            <Link
              to={`/program/${nextProg.id}`}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 flex items-center gap-1 transition-all"
            >
              <span>{nextProg.code}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="px-2.5 py-1 text-slate-600 text-xs">End</span>
          )}
        </div>
      </div>

      {/* Program Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-sm bg-blue-600/20 text-blue-400 border border-blue-500/30">
                {program.code}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                Part {program.part} • #{program.number}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {program.difficulty}
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {program.title}
            </h1>
          </div>

          {/* Action Flags */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWeakStatus(program.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                isWeak
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isWeak ? 'fill-amber-400' : ''}`} />
              <span>{isWeak ? 'Flagged Weak' : 'Flag as Weak'}</span>
            </button>

            <button
              onClick={handleMarkMastered}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 ${
                status === 'Mastered'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{status === 'Mastered' ? 'Mastered ✓' : 'Mark Mastered'}</span>
            </button>
          </div>
        </div>

        {/* Objective */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Lab Objective:
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {program.objective}
          </p>
        </div>

        {/* Concepts */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 mr-1">Concepts:</span>
          {program.concepts.map((concept) => (
            <span
              key={concept}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Logic Section (Collapsible) */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('logic')}
          className="w-full flex items-center justify-between p-4 bg-slate-900 text-left hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white">Algorithm & Quick Logic</h2>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transform transition-transform ${
              openSections.logic ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.logic && (
          <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40">
            <ol className="space-y-2 text-xs sm:text-sm text-slate-300 mt-3 list-decimal list-inside">
              {program.logic.map((step, idx) => (
                <li key={idx} className="leading-relaxed pl-1">
                  <span className="text-slate-200 font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {/* Code Implementations (Journal Version + Practice Version) */}
      <section className="space-y-4">
        {/* Journal Version */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('journal')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">Journal Version</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                College Lab Reference
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transform transition-transform ${
                openSections.journal ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.journal && (
            <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40">
              <CodeBlock
                code={program.journalCode}
                language="c"
                badge="Journal Reference"
                badgeType="journal"
                note={program.journalNote || "Journal reference — may use older compiler-specific C syntax (Turbo C / DOS)."}
              />
            </div>
          )}
        </div>

        {/* Practice Version */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('practice')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">Practice Version</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Modern Standard C
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transform transition-transform ${
                openSections.practice ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.practice && (
            <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40">
              <CodeBlock
                code={program.practiceCode}
                language="c"
                badge="Modern C (C99/C11)"
                badgeType="practice"
                note="Adapted for modern compilers: standard int main(), portable headers, safe I/O, return 0."
              />
            </div>
          )}
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('explanation')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white">Detailed Explanation</h2>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transform transition-transform ${
              openSections.explanation ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.explanation && (
          <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p className="mt-3">{program.explanation}</p>
          </div>
        )}
      </section>

      {/* Sample Input & Output */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('example')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Sample Input & Output</h2>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transform transition-transform ${
              openSections.example ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.example && (
          <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40 space-y-3">
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Sample Input:
              </span>
              <pre className="p-3 bg-[#0a0f1d] border border-slate-800 rounded-xl text-xs font-mono text-amber-300 overflow-x-auto">
                <code>{program.sampleInput}</code>
              </pre>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Expected Output:
              </span>
              <pre className="p-3 bg-[#0a0f1d] border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                <code>{program.sampleOutput}</code>
              </pre>
            </div>
          </div>
        )}
      </section>

      {/* Common Mistakes & Exam Tips */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('mistakes')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white">Common Mistakes & Exam Secrets</h2>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transform transition-transform ${
              openSections.mistakes ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.mistakes && (
          <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40 space-y-4">
            <div className="mt-3 space-y-2">
              <span className="text-xs font-bold text-rose-400 block">
                Common Student Mistakes in Lab:
              </span>
              <ul className="space-y-1.5">
                {program.commonMistakes.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-rose-400 font-bold shrink-0">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">
                Practical Exam & Answer Booklet Tips:
              </span>
              <ul className="space-y-1.5">
                {program.examTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Viva Questions Accordion */}
      {program.vivaQuestions.length > 0 && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('viva')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white">Lab Viva Questions & Answers ({program.vivaQuestions.length})</h2>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transform transition-transform ${
                openSections.viva ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.viva && (
            <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40 space-y-3">
              <div className="mt-3 space-y-3">
                {program.vivaQuestions.map((vq, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm">
                    <span className="font-semibold text-purple-300 block mb-1">
                      Q: {vq.question}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      <strong>A:</strong> {vq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Practice Checklist */}
      <Checklist
        programId={program.id}
        checklist={checklist}
        onToggle={(key, val) => updateChecklist(program.id, key, val)}
        onMastered={handleMarkMastered}
      />

      {/* Interactive Practice Editor */}
      <PracticeEditor
        programId={program.id}
        solutionCode={program.practiceCode}
        sampleInput={program.sampleInput}
        sampleOutput={program.sampleOutput}
        commonMistakes={program.commonMistakes}
        examTips={program.examTips}
        savedCode={progress.savedCode[program.id]}
        onSaveCode={(code) => recordPractice(program.id, code)}
        onMarkMastered={handleMarkMastered}
        isMastered={status === 'Mastered'}
      />

      {/* Bottom Navigation between programs */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800 gap-3">
        {prevProg ? (
          <Link
            to={`/program/${prevProg.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <span className="text-[10px] text-slate-500 block">Previous</span>
              <span>{prevProg.code} — {prevProg.shortTitle}</span>
            </div>
          </Link>
        ) : <div />}

        {nextProg ? (
          <Link
            to={`/program/${nextProg.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold active:scale-95 transition-all text-right"
          >
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">Next</span>
              <span>{nextProg.code} — {nextProg.shortTitle}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};
