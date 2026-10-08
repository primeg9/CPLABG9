import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchPrograms } from '../data/programs';
import { Program } from '../types';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Program[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }
    const matched = searchPrograms(text);
    setResults(matched);
  };

  const handleSelect = (program: Program) => {
    onClose();
    navigate(`/program/${program.id}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mt-6 sm:mt-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search programs (e.g. A01, matrix, recursion, prime, struct)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 outline-none"
          />
          {query ? (
            <button
              onClick={() => handleSearch('')}
              className="p-1 rounded-md text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white"
            >
              Esc
            </button>
          )}
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-2">Suggested Searches:</span>
              <div className="flex flex-wrap gap-1.5">
                {['recursion', 'matrix', 'string', 'prime', 'struct', 'switch', 'array', 'A05', 'B12'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {results.length} Matching Program{results.length > 1 ? 's' : ''}
              </div>
              {results.map((program) => (
                <button
                  key={program.id}
                  onClick={() => handleSelect(program)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 active:bg-slate-800 text-left transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        {program.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
                        {program.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {program.objective}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {program.topics.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {t}
                        </span>
                      ))}
                      <span className="text-[10px] text-slate-500">
                        Part {program.part}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0 transform group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-300">No matching programs found.</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for a different keyword, program number (e.g. A04), or topic.
              </p>
              <button
                onClick={() => handleSearch('')}
                className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:text-white"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Search across all 28 programs</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Press Enter or tap to view
          </span>
        </div>
      </div>
    </div>
  );
};
