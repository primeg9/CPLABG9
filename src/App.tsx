import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { PartAPage } from './pages/PartAPage';
import { PartBPage } from './pages/PartBPage';
import { ProgramDetail } from './pages/ProgramDetail';
import { TopicsPage } from './pages/TopicsPage';
import { RevisionPage } from './pages/RevisionPage';
import { ExamMode } from './pages/ExamMode';
import { ProgressPage } from './pages/ProgressPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <AppShell>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/part-a" element={<PartAPage />} />
        <Route path="/part-b" element={<PartBPage />} />
        <Route path="/program/:id" element={<ProgramDetail />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/revision" element={<RevisionPage />} />
        <Route path="/exam" element={<ExamMode />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
};

export default App;
