import React from 'react';

interface BackButtonProps {
    onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
    <button 
        onClick={onClick}
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
        aria-label="Quay lại"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span className="hidden md:inline font-medium">Quay lại</span>
    </button>
);

export default BackButton;
