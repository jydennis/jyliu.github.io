
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import PhotoGallery from './components/PhotoGallery';
import ProjectSection from './components/ProjectSection';
import AboutSection from './components/AboutSection';
import ProjectDetail from './components/ProjectDetail';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView('project-detail');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onProjectSelect={handleProjectSelect} />;
      case 'photos':
        return <PhotoGallery onProjectSelect={handleProjectSelect} />;
      case 'projects':
        return <ProjectSection onProjectSelect={handleProjectSelect} />;
      case 'project-detail':
        return selectedProjectId ? (
          <ProjectDetail 
            projectId={selectedProjectId} 
            onBack={() => setCurrentView('projects')} 
          />
        ) : <ProjectSection onProjectSelect={handleProjectSelect} />;
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
