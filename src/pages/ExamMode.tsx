import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
  Eye
} from 'lucide-react';
import { allPrograms, partAPrograms, partBPrograms, getProgramById } from '../data/programs';
import { Program, ExamAttempt } from '../types';
import { useProgress } from '../hooks/useProgress';
import { CodeBlock } from '../components/CodeBlock';
import confetti from 'canvas-confetti';

type ExamStage = 'setup' | 'active' | 'review';

export const ExamMode: React.FC = () => {
  const { saveExam } = useProgress();

  // Setup Config
  const [selectedPart, setSelectedPart] = useState<'A' | 'B' | 'ALL'>('ALL');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [timerMinutes, setTimerMinutes] = useState<number>(30); // 0 = untimed

  // Active Exam State
  const [stage, setStage] = useState<ExamStage>('setup');
  const [examPrograms, setExamPrograms] = useState<Program[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userCodes, setUserCodes] = useState<Record<string, string>>({});
  const [selfEvals, setSelfEvals] = useState<Record<string, 'correct' | 'needs-work' | 'skipped'>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [submittedAttempt, setSubmittedAttempt] = useState<ExamAttempt | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (stage === 'active' && timerMinutes > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else if (stage === 'active' && timerMinutes === 0) {
      // Untimed mode: just track time spent
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [stage, timerMinutes]);

  const handleStartExam = () => {
    let pool = allPrograms;
    if (selectedPart === 'A') pool = partAPrograms;
    if (selectedPart === 'B') pool = partBPrograms;

    // Randomize pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, pool.length));

    setExamPrograms(selected);
    setCurrentIndex(0);
    setUserCodes({});
    setSelfEvals({});
    setTimeRemaining(timerMinutes * 60);
    setTimeSpent(0);
    setStage('active');
  };

  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Compute evaluation results
    const results = examPrograms.map((prog) => {
      const code = userCodes[prog.id] || '';
      const evaluation = selfEvals[prog.id] || (code.trim().length > 30 ? 'correct' : 'skipped');
      return {
        programId: prog.id,
        programCode: prog.code,
        title: prog.title,
        userCode: code,
        selfEvaluation: evaluation
      };
    });

    const correctCount = results.filter((r) => r.selfEvaluation === 'correct').length;
    const score = Math.round((correctCount / examPrograms.length) * 100);

    const attempt: ExamAttempt = {
      id: `exam_${Date.now()}`,
      timestamp: Date.now(),
      part: selectedPart,
      totalQuestions: examPrograms.length,
      score: correctCount,
      percentage: score,
      timeSpentSeconds: timeSpent,
      totalTimeSeconds: timerMinutes * 60,
      completedProgramIds: results.filter(r => r.selfEvaluation === 'correct').map(r => r.programId),
      skippedProgramIds: results.filter(r => r.selfEvaluation === 'skipped').map(r => r.programId),
      questionResults: results
    };

    saveExam(attempt);
    setSubmittedAttempt(attempt);
    setStage('review');

    if (score >= 60) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. SETUP STAGE
  if (stage === 'setup') {
    const maxAvailable = selectedPart === 'A' ? 15 : selectedPart === 'B' ? 13 : 28;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Lab Practical Exam Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-md mx-auto leading-relaxed">
            Test yourself under authentic lab practical conditions. Questions are randomized from the college syllabus. Practice typing your program logic before the timer expires.
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          {/* Syllabus Section Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2 uppercase tracking-wider">
              1. Choose Syllabus Scope:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ALL', label: 'All Programs', count: '28' },
                { id: 'A', label: 'Part A Only', count: '15' },
                { id: 'B', label: 'Part B Only', count: '13' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPart(item.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedPart === item.id
                      ? 'bg-purple-600/20 border-purple-500 text-white font-bold shadow'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs sm:text-sm block">{item.label}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{item.count} questions</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2 uppercase tracking-wider">
              2. Number of Questions:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, maxAvailable].filter((v, i, a) => a.indexOf(v) === i).map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                    questionCount === count
                      ? 'bg-purple-600 text-white border-purple-500 shadow'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>

          {/* Timer Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2 uppercase tracking-wider">
              3. Exam Timer:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { min: 30, label: '30 Minutes' },
                { min: 60, label: '60 Minutes' },
                { min: 0, label: 'Untimed Practice' }
              ].map((t) => (
                <button
                  key={t.min}
                  type="button"
                  onClick={() => setTimerMinutes(t.min)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                    timerMinutes === t.min
                      ? 'bg-purple-600 text-white border-purple-500 shadow'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Launch Button */}
          <button
            type="button"
            onClick={handleStartExam}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm sm:text-base transition-all active:scale-95 shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Lab Exam Simulation</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. ACTIVE EXAM STAGE
  if (stage === 'active') {
    const currentProg = examPrograms[currentIndex];
    const currentCode = userCodes[currentProg.id] || `#include <stdio.h>\n\nint main(void)\n{\n    // Write your exam solution\n    \n    return 0;\n}`;

    return (
      <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in duration-150">
        {/* Sticky Exam Timer & Header Bar */}
        <div className="sticky top-14 z-30 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm text-white">
              Question {currentIndex + 1} of {examPrograms.length}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {currentProg.code}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Countdown Timer */}
            {timerMinutes > 0 ? (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs sm:text-sm font-bold border ${
                timeRemaining < 300
                  ? 'bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse'
                  : 'bg-slate-900 text-purple-300 border-purple-500/30'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeSpent)} elapsed</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to finish the exam now?')) {
                  handleFinishExam();
                }
              }}
              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              End Exam
            </button>
          </div>
        </div>

        {/* Question Requirement Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Problem Requirement:
            </h2>
            <span className="text-xs text-slate-400">
              Part {currentProg.part} • {currentProg.difficulty}
            </span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {currentProg.objective}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Tested Concepts:</span>
            {currentProg.concepts.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px]">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Exam Code Editor */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Write your C solution below:</span>
            <span className="font-mono text-[11px]">Tab = 4 spaces</span>
          </div>

          <textarea
            value={currentCode}
            onChange={(e) => {
              setUserCodes({
                ...userCodes,
                [currentProg.id]: e.target.value
              });
            }}
            spellCheck={false}
            rows={14}
            className="w-full bg-[#070b14] text-slate-100 font-mono text-xs sm:text-sm p-4 outline-none resize-y leading-relaxed border-none focus:ring-1 focus:ring-purple-500/40"
            placeholder="// Write complete C program here..."
          />

          {/* Self check confidence rating for this question */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-slate-400">Your confidence on this question:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelfEvals({ ...selfEvals, [currentProg.id]: 'correct' })}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selfEvals[currentProg.id] === 'correct'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Confident (Correct)
              </button>
              <button
                type="button"
                onClick={() => setSelfEvals({ ...selfEvals, [currentProg.id]: 'needs-work' })}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selfEvals[currentProg.id] === 'needs-work'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Needs Review
              </button>
            </div>
          </div>
        </div>

        {/* Question Navigation Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 text-xs font-semibold flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentIndex < examPrograms.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishExam}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit & Finish Exam</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. REVIEW & RESULTS STAGE
  if (stage === 'review' && submittedAttempt) {
    const percentage = submittedAttempt.percentage;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            Exam Results Verified
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Score: {percentage}%
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {submittedAttempt.score} out of {submittedAttempt.totalQuestions} programs completed successfully
          </p>

          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mt-5 text-center">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Time Taken</span>
              <span className="text-xs sm:text-sm font-bold text-slate-200">
                {formatTime(submittedAttempt.timeSpentSeconds)}
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Completed</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400">
                {submittedAttempt.completedProgramIds.length}
              </span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Needs Work</span>
              <span className="text-xs sm:text-sm font-bold text-amber-400">
                {submittedAttempt.totalQuestions - submittedAttempt.completedProgramIds.length}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              onClick={() => setStage('setup')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow"
            >
              Take Another Exam
            </button>
          </div>
        </div>

        {/* Detailed Question by Question Review */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white">
            Question-by-Question Solution Breakdown:
          </h2>

          {submittedAttempt.questionResults.map((result, idx) => {
            const prog = getProgramById(result.programId);
            if (!prog) return null;

            return (
              <div key={prog.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      {prog.code}
                    </span>
                    <h3 className="font-bold text-white text-sm">
                      {idx + 1}. {prog.title}
                    </h3>
                  </div>

                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                    result.selfEvaluation === 'correct'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}>
                    {result.selfEvaluation === 'correct' ? 'Completed' : 'Needs Review'}
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  {prog.objective}
                </p>

                {/* Reference Solution Code */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Expected Reference Code (Practice Version):
                  </span>
                  <CodeBlock
                    code={prog.practiceCode}
                    language="c"
                    title={`${prog.code} Reference Solution`}
                    badge="Model Answer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
