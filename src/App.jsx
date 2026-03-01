import React from 'react';
import HeroSection from './components/HeroSection';
import './App.css';

function App() {
  return (
    <div className="min-h-[200vh]">
      <HeroSection />
      <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-slate-900 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-8 drop-shadow-2xl">
            Pure Scroll Magic ✨
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Interactive particles, speedometer stats, car headlights, mouse sparks, 
            and velocity-based speed lines. Production-ready performance at 60fps.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
