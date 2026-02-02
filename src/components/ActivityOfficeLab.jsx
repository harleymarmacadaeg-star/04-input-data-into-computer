import React, { useState } from 'react';
import { FileText, Table, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const ActivityOfficeLab = ({ onComplete }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Create an Employee Payroll with Salary Formulas", type: "excel", solved: false },
    { id: 2, text: "Write a 3-page Narrative Report about a Seminar", type: "word", solved: false },
    { id: 3, text: "Design a Table to track Inventory of 1000 items", type: "excel", solved: false },
    { id: 4, text: "Draft an Application Letter for a Job", type: "word", solved: false }
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleDrop = (choice) => {
    if (feedback) return;

    const isCorrect = choice === tasks[currentIdx].type;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) setFinalScore(prev => prev + 5);

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx < tasks.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        // Activity complete - 20 points total
        onComplete(isCorrect ? finalScore + 5 : finalScore);
        setCurrentIdx(-1); // Signal finish
      }
    }, 1500);
  };

  if (currentIdx === -1) {
    return (
      <div className="text-center p-10 bg-surface rounded-3xl border-4 border-secondary animate-bounce shadow-2xl">
        <CheckCircle size={80} className="text-secondary mx-auto mb-4" />
        <h2 className="text-4xl font-black text-white">Office Lab Complete!</h2>
        <p className="text-xl text-gray-400 mt-4">Task Accuracy Points: {finalScore} / 20</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
      <h2 className="text-3xl font-black text-primary mb-2 uppercase italic">Workplace Task Simulator</h2>
      <p className="text-gray-400 mb-8 font-bold">Sort the tasks into the correct department.</p>

      {/* Task Card */}
      <div className="w-full bg-white p-10 rounded-2xl shadow-[10px_10px_0px_0px_rgba(59,130,246,1)] mb-12 border-4 border-primary">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-black uppercase">Incoming Task</span>
        </div>
        <p className="text-3xl font-bold text-background leading-tight">
          "{tasks[currentIdx].text}"
        </p>
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <button 
          onClick={() => handleDrop('word')}
          className={`group p-8 rounded-3xl border-4 flex flex-col items-center gap-4 transition-all ${
            feedback === 'correct' && tasks[currentIdx].type === 'word' ? 'bg-green-600 border-white' : 
            feedback === 'wrong' && tasks[currentIdx].type !== 'word' ? 'opacity-20 grayscale' : 'bg-surface border-blue-500 hover:scale-105'
          }`}
        >
          <FileText size={80} className="text-blue-500 group-hover:text-white" />
          <span className="text-2xl font-black text-white">MICROSOFT WORD</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest">(Document Processing)</span>
        </button>

        <button 
          onClick={() => handleDrop('excel')}
          className={`group p-8 rounded-3xl border-4 flex flex-col items-center gap-4 transition-all ${
            feedback === 'correct' && tasks[currentIdx].type === 'excel' ? 'bg-green-600 border-white' : 
            feedback === 'wrong' && tasks[currentIdx].type !== 'excel' ? 'opacity-20 grayscale' : 'bg-surface border-secondary hover:scale-105'
          }`}
        >
          <Table size={80} className="text-secondary group-hover:text-white" />
          <span className="text-2xl font-black text-white">MICROSOFT EXCEL</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest">(Data Calculation)</span>
        </button>
      </div>

      {feedback && (
        <div className={`mt-10 font-black text-3xl animate-pulse ${feedback === 'correct' ? 'text-green-400' : 'text-red-500'}`}>
          {feedback === 'correct' ? '✅ ACCURATE!' : '❌ WRONG TOOL!'}
        </div>
      )}
    </div>
  );
};

export default ActivityOfficeLab;