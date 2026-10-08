import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Layers,
  ChevronRight,
  BookOpen,
  FolderCode,
  Terminal,
  Grid,
  Filter
} from 'lucide-react';
import { topicsList } from '../data/topics';
import { allPrograms, getProgramsByTopic } from '../data/programs';
import { ProgramCard } from '../components/ProgramCard';
import { useProgress } from '../hooks/useProgress';

export const TopicsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFromUrl = searchParams.get('selected');
  const [selectedTopic, setSelectedTopic] = useState<string>(selectedFromUrl || 'Basics');
  const { progress, toggleWeakStatus } = useProgress();

  useEffect(() => {
    if (selectedFromUrl) {
      setSelectedTopic(selectedFromUrl);
    }
  }, [selectedFromUrl]);

  const handleSelectTopic = (topicName: string) => {
    setSelectedTopic(topicName);
    setSearchParams({ selected: topicName });
  };

  const programsInTopic = getProgramsByTopic(selectedTopic);
  const currentTopicInfo = topicsList.find(t => t.name.toLowerCase() === selectedTopic.toLowerCase()) || topicsList[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5" />
          Syllabus Explorer • 16 Topics
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          C Programming Topics & Concepts
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Browse all 28 BCA college lab programs organized by core programming concepts, from primitive arithmetic to recursive algorithms and structures.
        </p>
      </div>

      {/* Topics Selector Pills (Mobile Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {topicsList.map((topic) => {
          const isSelected = topic.name.toLowerCase() === selectedTopic.toLowerCase();
          const count = allPrograms.filter(p => p.topics.includes(topic.name)).length;
          return (
            <button
              key={topic.id}
              onClick={() => handleSelectTopic(topic.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{topic.name}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Topic Summary Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-base sm:text-lg font-bold text-white">
                {currentTopicInfo.name}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                {programsInTopic.length} Lab Program{programsInTopic.length !== 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              {currentTopicInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Programs List for Selected Topic */}
      {programsInTopic.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {programsInTopic.map((program) => (
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
        <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-xs">No programs categorized under &quot;{selectedTopic}&quot;.</p>
        </div>
      )}
    </div>
  );
};
