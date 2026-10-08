import React, { useState } from 'react';
import {
  Code,
  RotateCcw,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Terminal,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeEditorProps {
  programId: string;
  solutionCode: string;
  sampleInput: string;
  sampleOutput: string;
  commonMistakes: string[];
  examTips: string[];
  savedCode?: string;
  onSaveCode: (code: string) => void;
  onMarkMastered: () => void;
  isMastered: boolean;
}

export const PracticeEditor: React.FC<PracticeEditorProps> = ({
  programId,
  solutionCode,
  sampleInput,
  sampleOutput,
  commonMistakes,
  examTips,
  savedCode,
  onSaveCode,
  onMarkMastered,
  isMastered
}) => {
  const defaultStarter = `#include <stdio.h>

int main(void)
{
    // Write your solution here
    
    return 0;
}`;

  const [code, setCode] = useState(savedCode || defaultStarter);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'output' | 'hints'>('editor');
  const [saveToast, setSaveToast] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onSaveCode(newCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enable Tab indentation inside textarea
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = '    ';
      const updated = code.substring(0, start) + spaces + code.substring(end);
      setCode(updated);
      onSaveCode(updated);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
      }, 0);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset editor to initial starter template? Your current edits will be cleared.')) {
      setCode(defaultStarter);
      onSaveCode(defaultStarter);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleMasteredClick = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
    onMarkMastered();
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden my-4 shadow-lg">
      {/* Top Banner */}
      <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-slate-100 text-sm">Practice Editor</h3>
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            Self-Check Studio
          </span>
        </div>

        {/* Tab Controls for mobile switching */}
        <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'editor'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('output')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'output'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Expected Output
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hints')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'hints'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hints ({commonMistakes.length})
          </button>
        </div>
      </div>

      {/* Editor Tab */}
      {activeTab === 'editor' && (
        <div>
          {/* Action toolbar */}
          <div className="px-3.5 py-2 bg-slate-900/50 border-b border-slate-800/80 flex items-center justify-between text-xs flex-wrap gap-2">
            <span className="text-slate-400 font-mono text-[11px]">
              Lines: {lineCount} | Tab = 4 spaces
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 inline-flex items-center gap-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 inline-flex items-center gap-1"
                title="Reset code"
              >
                <RotateCcw className="w-3 h-3 text-amber-400" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 inline-flex items-center gap-1"
              >
                {showSolution ? <EyeOff className="w-3 h-3 text-cyan-400" /> : <Eye className="w-3 h-3 text-cyan-400" />}
                <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
              </button>
            </div>
          </div>

          {/* Textarea Editor */}
          <div className="relative">
            <textarea
              value={code}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              rows={12}
              aria-label="C code practice editor"
              placeholder="// Type your C program here..."
              className="w-full bg-[#070b14] text-slate-100 font-mono text-xs sm:text-sm p-4 outline-none resize-y border-none leading-relaxed selection:bg-blue-600/60 focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          {/* Solution Modal / Drawer if toggled */}
          {showSolution && (
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Reference Solution for Self-Comparison:
                </span>
                <button
                  type="button"
                  onClick={() => setShowSolution(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
              <pre className="p-3 bg-[#0a0f1d] border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto max-h-64">
                <code>{solutionCode.trim()}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Expected Output Tab */}
      {activeTab === 'output' && (
        <div className="p-4 bg-slate-950 space-y-4 text-xs sm:text-sm">
          <div>
            <div className="flex items-center gap-1.5 text-slate-300 font-medium mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Sample Input for Testing:</span>
            </div>
            <pre className="p-3 bg-[#0a0f1d] border border-slate-800 rounded-lg font-mono text-amber-300 text-xs overflow-x-auto">
              <code>{sampleInput || 'No input required.'}</code>
            </pre>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-300 font-medium mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Expected Output:</span>
            </div>
            <pre className="p-3 bg-[#0a0f1d] border border-slate-800 rounded-lg font-mono text-emerald-300 text-xs overflow-x-auto whitespace-pre-wrap">
              <code>{sampleOutput}</code>
            </pre>
          </div>

          <div className="p-3 bg-blue-950/20 border border-blue-900/40 rounded-lg text-xs text-blue-300/90 leading-relaxed">
            <strong>Self-Check Tip:</strong> Trace your code manually on paper with the sample input above. Verify each variable value iteration-by-iteration to match the expected output.
          </div>
        </div>
      )}

      {/* Hints & Common Mistakes Tab */}
      {activeTab === 'hints' && (
        <div className="p-4 bg-slate-950 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-amber-300 font-medium text-xs mb-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Common Pitfalls & Mistakes for this Program:</span>
          </div>
          <ul className="space-y-2">
            {commonMistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>

          {examTips.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-emerald-300 font-medium text-xs mb-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Exam & Viva Secrets:</span>
              </div>
              <ul className="space-y-2">
                {examTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed bg-emerald-950/20 p-2.5 rounded border border-emerald-900/30">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Bottom Footer Actions */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2.5">
        <span className="text-[11px] text-slate-400">
          Changes auto-save locally to your browser.
        </span>

        <button
          type="button"
          onClick={handleMasteredClick}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95 shadow ${
            isMastered
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{isMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
        </button>
      </div>
    </div>
  );
};
