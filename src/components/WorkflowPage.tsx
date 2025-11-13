import React, { useState, useRef, useCallback } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import BackButton from './BackButton';
import { WORKFLOW_DATA } from '../constants';

interface WorkflowPageProps {
    onNavigateBack: () => void;
}

const WorkflowPage: React.FC<WorkflowPageProps> = ({ onNavigateBack }) => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  const HEADER_OFFSET = 96; // 6rem = 96px

  const handleSelectStep = (id: number) => {
    isClickScrolling.current = true;
    setActiveStepId(id);

    const targetElement = document.getElementById(`step-${id}`);
    if (targetElement) {
      const topPos = targetElement.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };
  
  const handleStepInView = useCallback((id: number) => {
      if (isClickScrolling.current) {
          return;
      }
      setActiveStepId(id);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <header className="py-8 bg-slate-50/80 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200">
        <div className="relative max-w-screen-xl mx-auto text-center px-4 md:px-8">
            <BackButton onClick={onNavigateBack} />
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Quy Trình Học Tập Trực Tuyến</h1>
            <p className="text-slate-500 mt-2 text-base md:text-lg">Sơ đồ quy trình nghiệp vụ chi tiết cho Giáo viên, Học sinh và Phụ huynh</p>
        </div>
      </header>
      <main className="max-w-screen-xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Sidebar
            steps={WORKFLOW_DATA}
            activeStepId={activeStepId}
            onSelectStep={handleSelectStep}
          />
          <Content steps={WORKFLOW_DATA} onStepInView={handleStepInView} />
        </div>
      </main>
    </div>
  );
};

export default WorkflowPage;
