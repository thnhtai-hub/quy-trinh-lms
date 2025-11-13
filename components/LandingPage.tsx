import React from 'react';

interface LandingPageProps {
  onNavigate: (page: 'workflow' | 'guide') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center font-sans px-4">
      <div className="text-center p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-4">Chào mừng quý Thầy/Cô!</h1>
        <p className="text-slate-600 text-xl mb-12">Tập huấn, triển khai quy trình học tập trực tuyến (LMS)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => onNavigate('guide')}
            className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-left"
          >
            <h2 className="text-3xl font-semibold text-slate-800 mb-2">Hướng dẫn đăng nhập</h2>
            <p className="text-slate-500 text-lg">Quy trình đăng nhập và sử dụng hệ thống LMS.</p>
          </button>
          <button
            onClick={() => onNavigate('workflow')}
            className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-left"
          >
            <h2 className="text-3xl font-semibold text-slate-800 mb-2">Quy trình học tập trực tuyến</h2>
            <p className="text-slate-500 text-lg">Sơ đồ nghiệp vụ chi tiết cho các vai trò.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;