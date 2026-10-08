import { Program, ProgramPart } from '../types';
import { partAPrograms } from './partA';
import { partBPrograms } from './partB';

export { partAPrograms, partBPrograms };

export const allPrograms: Program[] = [...partAPrograms, ...partBPrograms];

export function getProgramById(id: string): Program | undefined {
  const cleanId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return allPrograms.find(p => p.id.toLowerCase() === cleanId || p.code.toLowerCase() === cleanId);
}

export function getProgramsByPart(part: ProgramPart): Program[] {
  return allPrograms.filter(p => p.part === part);
}

export function getProgramsByTopic(topicName: string): Program[] {
  const lowerTopic = topicName.toLowerCase().trim();
  return allPrograms.filter(p => 
    p.topics.some(t => t.toLowerCase() === lowerTopic) ||
    p.concepts.some(c => c.toLowerCase().includes(lowerTopic))
  );
}

export function searchPrograms(query: string): Program[] {
  const q = query.toLowerCase().trim();
  if (!q) return allPrograms;

  return allPrograms.filter(p => {
    return (
      p.code.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.shortTitle.toLowerCase().includes(q) ||
      p.objective.toLowerCase().includes(q) ||
      p.topics.some(t => t.toLowerCase().includes(q)) ||
      p.concepts.some(c => c.toLowerCase().includes(q)) ||
      p.keywords.some(k => k.toLowerCase().includes(q))
    );
  });
}

export function getNextProgram(currentId: string): Program | null {
  const currentIndex = allPrograms.findIndex(p => p.id === currentId.toLowerCase());
  if (currentIndex === -1 || currentIndex === allPrograms.length - 1) return null;
  return allPrograms[currentIndex + 1];
}

export function getPreviousProgram(currentId: string): Program | null {
  const currentIndex = allPrograms.findIndex(p => p.id === currentId.toLowerCase());
  if (currentIndex <= 0) return null;
  return allPrograms[currentIndex - 1];
}
