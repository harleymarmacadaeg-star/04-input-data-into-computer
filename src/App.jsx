import React, { useState } from 'react';
import { slides } from './data/lo2Data';
import Slide from './components/Slide';
import ActivityStorage from './components/ActivityStorage';
import ActivityErgo from './components/ActivityErgo';
import ActivityAppSim from './components/ActivityAppSim';
import ActivityWord from './components/ActivityWord';
import ActivityExcel from './components/ActivityExcel';
import ActivityInput from './components/ActivityInput';
import Quiz from './components/Quiz';
import Scoreboard from './components/Scoreboard';
import { ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';

function App() {
  const [index, setIndex] = useState(0);
  
  // INITIAL STATE OBJECT
  const initialScores = { act1: 0, act2: 0, act3: 0, act4: 0, act5: 0, act6: 0, quiz: 0 };
  const [scores, setScores] = useState(initialScores);

  const currentSlide = slides[index];

  const updateScore = (key, val) => {
    setScores(prev => ({ ...prev, [key]: val }));
  };

  // GLOBAL RESET FUNCTION
  const handleRestart = () => {
    if(window.confirm("This will clear all scores and progress. Continue?")) {
      setIndex(0);
      setScores(initialScores);
    }
  };

  const renderContent = () => {
    switch (currentSlide.type) {
      case 'activity_apps': return <ActivityAppSim onComplete={(s) => updateScore('act1', s)} />;
      case 'activity_word': return <ActivityWord onComplete={(s) => updateScore('act2', s)} />;
      case 'activity_excel': return <ActivityExcel onComplete={(s) => updateScore('act3', s)} />;
      case 'activity_storage': return <ActivityStorage onComplete={(s) => updateScore('act4', s)} />;
      case 'activity_ergo': return <ActivityErgo onComplete={(s) => updateScore('act5', s)} />;
      case 'activity_input': return <ActivityInput data={currentSlide} onComplete={(s) => updateScore('act6', s)} />;
      case 'quiz': return <Quiz onComplete={(s) => updateScore('quiz', s)} />;
      case 'scoreboard': return <Scoreboard scores={scores} onReset={handleRestart} />;
      default: return <Slide data={currentSlide} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-[#0f172a] text-white">
      <div className="w-full max-w-6xl flex justify-between items-center no-print">
        <div className="text-sm font-bold text-blue-500 uppercase tracking-widest">HJM-Built-It • CSS NC II</div>
        <div className="bg-blue-500/10 px-4 py-1 rounded-full text-blue-400 font-bold border border-blue-500/20">
          Slide {index + 1} / {slides.length}
        </div>
      </div>

      <main className="flex-1 w-full flex items-center justify-center">{renderContent()}</main>

      <div className="w-full max-w-6xl flex justify-between items-center no-print mt-8 border-t border-slate-800 pt-6">
        <button onClick={handleRestart} className="text-slate-500 hover:text-white flex items-center gap-2 uppercase text-xs font-black transition-colors">
          <RefreshCw size={16}/> Reset All
        </button>
        <div className="flex gap-4">
          <button onClick={() => setIndex(i => i - 1)} disabled={index === 0} className="px-8 py-2 rounded-xl border border-slate-700 disabled:opacity-20 hover:border-slate-400 transition-all font-bold">
            Back
          </button>
          <button onClick={() => setIndex(i => i + 1)} disabled={index === slides.length - 1} className="px-8 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-20 transition-all font-bold shadow-lg shadow-blue-600/20">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;