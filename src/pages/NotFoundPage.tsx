import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-16 text-center space-y-4 max-w-md mx-auto animate-in fade-in">
      <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 text-blue-400 flex items-center justify-center mx-auto mb-2">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-white tracking-tight">
        404 • Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        The requested syllabus route or program ID could not be found. Use the links below to return to the practice hub.
      </p>

      <div className="flex items-center justify-center gap-2 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
        >
          <Home className="w-4 h-4" />
          <span>Home Hub</span>
        </Link>
        <Link
          to="/part-a"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
        >
          <span>Part A (15)</span>
        </Link>
        <Link
          to="/part-b"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
        >
          <span>Part B (13)</span>
        </Link>
      </div>
    </div>
  );
};
