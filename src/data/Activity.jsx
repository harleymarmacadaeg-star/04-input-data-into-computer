import React, { useState, useEffect } from 'react';
import { Keyboard, Monitor, FileText, Cpu, Coffee, Gamepad, Zap, Trash2, Eye, Shield, CheckCircle, XCircle } from 'lucide-react';

const Activity = ({ mode = "hardware" }) => { // Receives mode prop from App
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Reset state when mode changes (slide change)
  useEffect(() => {
    setSelected([]);
    setSubmitted(false);
  }, [mode]);

  // CONFIGURATION FOR MODES
  const configs = {
    hardware: {
      title: "Hardware Setup",
      instruction: "Select the 4 ESSENTIAL HARDWARE items for typing.",
      correct: ['Keyboard', 'Monitor', 'System Unit', 'Mouse'],
      items: [
        { name: 'Keyboard', icon: Keyboard },
        { name: 'Coffee', icon: Coffee },
        { name: 'Monitor', icon: Monitor },
        { name: 'Gamepad', icon: Gamepad },
        { name: 'Mouse', icon: FileText }, // Using generic icon
        { name: 'System Unit', icon: Cpu },
      ]
    },
    safety: {
      title: "Hazard Identification",
      instruction: "Select the 3 UNSAFE HABITS or HAZARDS.",
      correct: ['Exposed Wires', 'Food on Desk', 'Slouching'],
      items: [
        { name: 'Exposed Wires', icon: Zap },
        { name: 'Cleaning Up', icon: Trash2 },
        { name: 'Food on Desk', icon: Coffee },
        { name: 'Slouching', icon: XCircle },
        { name: 'Straight Back', icon: CheckCircle },
        { name: 'Scanning USB', icon: Shield },
      ]
    }
  };

  const currentConfig = configs[mode] || configs.hardware;

  const toggleSelect = (name) => {
    if (submitted) return;
    if (selected.includes(name)) {
      setSelected(selected.filter(item => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const isCorrect = () => {
    if (selected.length !== currentConfig.correct.length) return false;
    return selected.every(item => currentConfig.correct.includes(item));
  };

  return (
    <div className="flex flex-col items-center h-full max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-black text-primary mb-4 uppercase">{currentConfig.title}</h2>
      
      <p className="text-xl text-white mb-8 bg-surface p-6 rounded-xl border-l-8 border-primary w-full shadow-card">
        📝 Task: {currentConfig.instruction}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 w-full">
        {currentConfig.items.map((opt) => (
          <button
            key={opt.name}
            onClick={() => toggleSelect(opt.name)}
            className={`p-6 rounded-xl flex flex-col items-center gap-3 border-4 transition-all shadow-card ${
              selected.includes(opt.name) 
                ? 'border-primary bg-gray-700 text-white shadow-glow transform scale-105' 
                : 'border-gray-600 bg-surface text-gray-400 hover:border-gray-400'
            }`}
          >
            <opt.icon size={48} className={selected.includes(opt.name) ? 'text-primary' : 'text-gray-500'} />
            <span className="font-bold text-lg">{opt.name}</span>
          </button>
        ))}
      </div>

      {!submitted ? (
        <button 
          onClick={() => setSubmitted(true)}
          className="bg-primary text-black px-12 py-4 rounded-xl text-2xl font-black hover:bg-yellow-300 transition shadow-glow uppercase tracking-wider"
        >
          Submit Answers
        </button>
      ) : (
        <div className={`text-2xl font-bold text-center p-6 rounded-xl border-4 shadow-card w-full ${isCorrect() ? 'border-green-500 bg-green-900/20 text-green-400' : 'border-red-500 bg-red-900/20 text-red-400'}`}>
          {isCorrect() ? "✅ PERFECT! You identified them correctly." : "❌ INCORRECT. Review and try again."}
          {!isCorrect() && (
            <button 
              onClick={() => { setSubmitted(false); setSelected([]); }}
              className="block mt-4 text-base text-white underline mx-auto hover:text-primary"
            >
              Reset Activity
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Activity;