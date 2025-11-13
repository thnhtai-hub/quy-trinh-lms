import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import WorkflowPage from './components/WorkflowPage';
import LoginPageGuide from './components/LoginPageGuide';

type Page = 'landing' | 'workflow' | 'guide';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'workflow':
        return <WorkflowPage onNavigateBack={() => handleNavigate('landing')} />;
      case 'guide':
        return <LoginPageGuide onNavigateBack={() => handleNavigate('landing')} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return <>{renderPage()}</>;
};

export default App;
