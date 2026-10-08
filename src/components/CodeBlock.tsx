import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import { Copy, Check, FileCode, Sparkles } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  badge?: string;
  badgeType?: 'journal' | 'practice' | 'default';
  note?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'c',
  title,
  badge,
  badgeType = 'default',
  note
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'journal':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'practice':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 shadow-md overflow-hidden text-sm my-3">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex-wrap gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
          {title && (
            <span className="font-medium text-slate-200 text-xs sm:text-sm truncate">
              {title}
            </span>
          )}
          {badge && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${getBadgeStyle()}`}>
              {badge}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all rounded-md border border-slate-700/60"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Note Banner if applicable */}
      {note && (
        <div className="px-3.5 py-2 bg-slate-900/40 border-b border-slate-800/60 text-xs text-amber-300/90 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{note}</span>
        </div>
      )}

      {/* Code Container */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0a0f1d] text-slate-200">
          <code className={`language-${language}`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
};
