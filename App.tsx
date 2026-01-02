
import React, { useState } from 'react';
import Poster from './components/Poster';
import VeoAnimator from './components/VeoAnimator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'poster' | 'animate'>('poster');

  return (
    <div className="min-h-screen pb-20">
      {/* Navigation Header */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-md">
                <i className="fa-solid fa-hands-holding-heart text-lg"></i>
              </div>
              <span className="font-bold text-xl text-blue-900 tracking-tight">WSW Portal</span>
            </div>
            <div className="flex space-x-1 md:space-x-4 items-center">
              <button 
                onClick={() => setActiveTab('poster')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'poster' 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <i className="fa-solid fa-file-image mr-2"></i>
                Organization Poster
              </button>
              <button 
                onClick={() => setActiveTab('animate')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'animate' 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
                Animate (Veo)
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'poster' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-8">
                <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Social Organization Poster</h2>
                <p className="text-slate-500 max-w-xl mx-auto">Our official digital identity representing the core values and mission of Women Social Workers globally.</p>
              </div>
              <Poster />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-8">
                <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">AI Animation Tool</h2>
                <p className="text-slate-500 max-w-xl mx-auto">Bring your community stories to life. Use Gemini Veo to animate photos of social workers in action.</p>
              </div>
              <VeoAnimator />
            </div>
          )}
        </div>
      </main>

      {/* Simplified Mobile Navigation for Accessibility */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-around items-center shadow-lg z-50">
        <button 
          onClick={() => setActiveTab('poster')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'poster' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <i className="fa-solid fa-image text-xl"></i>
          <span className="text-[10px] font-bold">POSTER</span>
        </button>
        <button 
          onClick={() => setActiveTab('animate')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'animate' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <i className="fa-solid fa-play text-xl"></i>
          <span className="text-[10px] font-bold">ANIMATE</span>
        </button>
      </div>

      <footer className="text-center text-slate-400 text-xs py-10">
        <p>&copy; 2024 Women Social Workers Organization. Empowering Communities Through Action.</p>
      </footer>
    </div>
  );
};

export default App;
