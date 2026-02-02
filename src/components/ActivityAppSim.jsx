import React, { useState, useEffect } from 'react';
import { FileText, Table, Globe, CheckCircle, XCircle, Timer } from 'lucide-react';

const ActivityAppSim = ({ onComplete }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per task

  const tasks = [
    {
      scenario: "Scenario 1: You are instructed to draft a formal 'Memorandum' for the school's upcoming Intramurals.",
      correct: "word",
      hint: "Memos are text-heavy documents. Word Processors are best for formatting text."
    },
    {
      scenario: "Scenario 2: The school canteen needs a 'Monthly Sales Report' with automatic total calculations and charts.",
      correct: "excel",
      hint: "Lists with numbers and formulas belong in a Spreadsheet."
    },
    {
      scenario: "Scenario 3: A student needs to access the 'DepEd Commons' portal to download a learning module.",
      correct: "chrome",
      hint: "Online portals and websites require a Web Browser."
    }
  ];

  // TIMER LOGIC
  useEffect(() => {
    if (finished || feedback) return;

    if (timeLeft === 0) {
      handleChoice('timeout'); // Force timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finished, feedback]);

  const handleChoice = (choice) => {
    if (feedback) return;

    setSelectedIcon(choice);
    const isCorrect = choice === tasks[currentTask].correct;
    
    if (isCorrect) setScore(s => s + 1);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback(null);
      setSelectedIcon(null);
      setTimeLeft(15); // Reset timer for next task
      
      if (currentTask < tasks.length - 1) {
        setCurrentTask(c => c + 1);
      } else {
        setFinished(true);
        const finalScore = isCorrect ? (score + 1) * 5 : score * 5;
        onComplete(finalScore);
      }
    }, 2500);
  };

  if (finished) {
    return (
      <div className="text-center p-10 bg-surface rounded-3xl border-4 border-secondary animate-fade-in shadow-2xl">
        <CheckCircle size={80} className="text-secondary mx-auto mb-4" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Application Mastery Complete!</h2>
        <p className="text-xl text-gray-400 mt-4">Final Score: <span className="text-secondary font-bold">{score * 5} / 15</span></p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-primary uppercase">Software Challenge</h2>
          <p className="text-gray-400 text-sm italic">Identify the correct tool before time runs out!</p>
        </div>
        
        {/* TIMER DISPLAY */}
        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all ${timeLeft <= 5 ? 'border-red-500 bg-red-900/20 animate-pulse' : 'border-gray-700 bg-gray-800'}`}>
          <Timer className={timeLeft <= 5 ? 'text-red-500' : 'text-accent'} />
          <span className={`text-2xl font-black ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>
      </div>

      {/* Progress Bar Shading Area */}
      <div className="w-full bg-gray-800 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500' : 'bg-accent'}`}
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        ></div>
      </div>

      <div className="bg-surface p-8 rounded-2xl border-2 border-gray-600 mb-10 relative shadow-2xl">
        <div className="absolute left-0 top-0 h-full w-3 bg-accent"></div>
        <p className="text-2xl font-bold text-white leading-relaxed">
          {tasks[currentTask].scenario}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { id: 'word', name: 'MS WORD', icon: FileText, color: 'text-blue-500' },
          { id: 'excel', name: 'MS EXCEL', icon: Table, color: 'text-secondary' },
          { id: 'chrome', name: 'CHROME', icon: Globe, color: 'text-accent' }
        ].map((app) => (
          <button
            key={app.id}
            onClick={() => handleChoice(app.id)}
            disabled={feedback !== null}
            className={`p-10 rounded-3xl border-4 transition-all duration-300 flex flex-col items-center gap-4 bg-gray-800/50 shadow-lg ${
              feedback && tasks[currentTask].correct === app.id ? 'border-green-500 bg-green-900/20 scale-105' : 
              feedback === 'incorrect' && selectedIcon === app.id ? 'border-red-500 bg-red-900/20' : 
              feedback ? 'opacity-30 border-transparent' : 'border-gray-700 hover:border-white'
            }`}
          >
            <app.icon size={70} className={app.color} />
            <span className="font-black text-xl text-white">{app.name}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`mt-10 text-center text-2xl font-black py-4 rounded-xl border-2 animate-bounce ${feedback === 'correct' ? 'border-green-500 text-green-400 bg-green-900/10' : 'border-red-500 text-red-400 bg-red-900/10'}`}>
          {selectedIcon === 'timeout' ? "⏰ TIME'S UP!" : feedback === 'correct' ? "✅ WELL DONE!" : `❌ WRONG. ${tasks[currentTask].hint}`}
        </div>
      )}
    </div>
  );
};

export default ActivityAppSim;