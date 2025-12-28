
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import PhotoGallery from './components/PhotoGallery';
import ResearchSection from './components/ResearchSection';
import AboutSection from './components/AboutSection';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'photos':
        return <PhotoGallery />;
      case 'research':
        return <ResearchSection />;
      case 'about':
        return <AboutSection />;
      default:
        return <HomeView />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
