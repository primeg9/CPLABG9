import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  FolderCode,
  GraduationCap,
  Sparkles,
  BarChart3,
  Search,
  Menu,
  X,
  Code2,
  RotateCcw,
  Layers,
  Award
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ConfirmDialog } from './ConfirmDialog';
import { useProgress } from '../hooks/useProgress';
import { Analytics } from '@vercel/analytics/react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { stats, resetProgress } = useProgress();
  const location = useLocation();

  const handleResetConfirm = () => {
    resetProgress();
    setIsResetDialogOpen(false);
    setIsDrawerOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Home, exact: true },
    { to: '/part-a', label: 'Part A', badge: '15', icon: BookOpen },
    { to: '/part-b', label: 'Part B', badge: '13', icon: FolderCode },
    { to: '/topics', label: 'Topics', icon: Layers },
    { to: '/exam', label: 'Exam Mode', icon: GraduationCap },
    { to: '/revision', label: 'Quick Revision', icon: Sparkles },
    { to: '/progress', label: 'Progress', icon: BarChart3 }
  ];

  // Primary mobile bottom navigation items
  const bottomNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/part-a', label: 'Part A', icon: BookOpen },
    { to: '/part-b', label: 'Part B', icon: FolderCode },
    { to: '/exam', label: 'Exam', icon: GraduationCap },
    { to: '/progress', label: 'Progress', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3.5 sm:px-6 py-2.5 sm:py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group active:scale-95 transition-transform"
            aria-label="CPLABG9 Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 transition-colors shadow-sm">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                  CPLAB<span className="text-blue-500">G9</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  V1.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium -mt-0.5 hidden xs:block">
                C Programming Lab Practice Hub
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-all active:scale-95"
              aria-label="Search all programs"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline text-slate-400">Search programs...</span>
            </button>

            {/* Quick Mastered Pill */}
            <Link
              to="/progress"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/15 transition-all"
              title="Programs mastered out of 28"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{stats.totalMastered} / 28</span>
            </Link>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white md:hidden active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {isDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden animate-in fade-in duration-150">
          <div 
            className="fixed top-14 left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 max-h-[80vh] overflow-y-auto shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar Summary in Drawer */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Lab Journal Progress</span>
                <span className="text-emerald-400 font-bold">{stats.totalMastered} / 28 Mastered</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((stats.totalMastered / 28) * 100)}%` }}
                />
              </div>
            </div>

            {/* Nav list */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-950/60 border border-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Danger / Reset action */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsResetDialogOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 p-2 rounded-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset My Local Progress</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 py-1.5 px-2 md:hidden"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
                  isActive
                    ? 'text-blue-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 font-normal'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.3]' : 'stroke-[1.7]'}`} />
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Global Modals */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <ConfirmDialog
        isOpen={isResetDialogOpen}
        title="Reset Progress?"
        message="Are you sure you want to reset all your progress? This will reset all your mastered programs, checklist ticks, and exam attempts. This action cannot be undone."
        confirmLabel="Reset only progress"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetDialogOpen(false)}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
};
