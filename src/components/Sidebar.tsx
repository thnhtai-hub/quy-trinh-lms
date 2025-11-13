import React from 'react';
import type { Step, Actor } from '../types';

interface SidebarProps {
  steps: Step[];
  activeStepId: number;
  onSelectStep: (id: number) => void;
}

const ACTOR_LINE_COLORS: Record<Actor, string> = {
    'Giáo viên': 'before:bg-orange-400',
    'Học sinh': 'before:bg-green-400',
    'Phụ huynh': 'before:bg-purple-400',
};


const Sidebar: React.FC<SidebarProps> = ({ steps, activeStepId, onSelectStep }) => {
  return (
    <aside className="w-full md:w-96 flex-shrink-0 md:sticky md:top-32">
        <div className="relative pl-12 pr-2 py-2">
            <div className="absolute left-[35px] top-7 bottom-7 w-0.5 bg-slate-200" aria-hidden="true" />

            <div className="space-y-3">
            {steps.map((step) => {
                const isActive = step.id === activeStepId;
                const actor = step.title;
                
                return (
                <div key={step.id} className="flex items-center">
                    {/* Circle Number */}
                    <div className={`z-10 flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full font-bold text-2xl transition-all duration-300 ${
                        isActive ? 'bg-white border-4 border-blue-600 text-blue-600' : 'bg-white border-2 border-slate-300 text-slate-500'
                    }`}
                    >
                    {step.id}
                    </div>
                    {/* Text Content */}
                    <button
                    onClick={() => onSelectStep(step.id)}
                    className={`relative w-full text-left ml-4 rounded-lg p-3 transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-1 before:rounded-full ${
                        isActive ? 'bg-blue-600 text-white shadow-lg' : `hover:bg-slate-50 ${ACTOR_LINE_COLORS[actor]}`
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                    >
                    <p className={`font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                        {step.title}
                    </p>
                    <p className={`text-base ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                        {step.subtitle}
                    </p>
                    </button>
                </div>
                );
            })}
            </div>
      </div>
    </aside>
  );
};

export default Sidebar;
