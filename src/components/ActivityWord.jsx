import React, { useState } from 'react';
import { Bold, AlignCenter, Type, List, Save, Info } from 'lucide-react';

const ActivityWord = ({ onComplete }) => {
  const [tasks, setTasks] = useState({ bold: false, center: false, uppercase: false, bulleted: false });
  const [submitted, setSubmitted] = useState(false);

  const checkSuccess = () => {
    // Requirements: Bold, Centered, Uppercase Title + Bulleted List
    const isCorrect = tasks.bold && tasks.center && tasks.uppercase && tasks.bulleted;
    setSubmitted(true);
    // Award 15 points for perfecting the professional memo
    onComplete(isCorrect ? 15 : 0);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-slate-300">
      <div className="bg-slate-100 p-4 border-b flex gap-4 items-center">
        <button onClick={() => setTasks({...tasks, bold: !tasks.bold})} className={`p-2 rounded ${tasks.bold ? 'bg-blue-200 ring-1 ring-blue-500' : 'hover:bg-slate-200'}`}><Bold size={20}/></button>
        <button onClick={() => setTasks({...tasks, center: !tasks.center})} className={`p-2 rounded ${tasks.center ? 'bg-blue-200 ring-1 ring-blue-500' : 'hover:bg-slate-200'}`}><AlignCenter size={20}/></button>
        <button onClick={() => setTasks({...tasks, uppercase: !tasks.uppercase})} className={`p-2 rounded ${tasks.uppercase ? 'bg-blue-200 ring-1 ring-blue-500' : 'hover:bg-slate-200'}`}><Type size={20}/></button>
        <button onClick={() => setTasks({...tasks, bulleted: !tasks.bulleted})} className={`p-2 rounded ${tasks.bulleted ? 'bg-blue-200 ring-1 ring-blue-500' : 'hover:bg-slate-200'}`}><List size={20}/></button>
      </div>

      <div className="p-10 min-h-[400px] text-slate-900 bg-white font-serif">
        <div className={`transition-all ${tasks.center ? 'text-center' : 'text-left'} ${tasks.bold ? 'font-bold' : ''} ${tasks.uppercase ? 'uppercase' : ''} text-2xl mb-6`}>
          Monthly Faculty Meeting
        </div>
        <div className="text-sm border-b border-slate-200 pb-2 mb-4 italic">Date: Feb 02, 2026 | Location: Conference Room</div>
        <div className="text-base">
          Please be guided by the following agenda items:
          <ul className={`mt-2 ${tasks.bulleted ? 'list-disc ml-8' : 'list-none'}`}>
            <li>Review of Student Quarterly Grades</li>
            <li>CSS NC II Pre-Assessment Schedule</li>
            <li>Maintenance of Computer Lab 1</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t flex justify-center">
        {!submitted ? (
          <button onClick={checkSuccess} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-blue-700 shadow-lg">
            <Save size={18}/> FINAL CHECK & SAVE
          </button>
        ) : (
          <div className={`text-xl font-bold ${tasks.bold && tasks.center && tasks.uppercase && tasks.bulleted ? 'text-emerald-600' : 'text-red-600'}`}>
            {tasks.bold && tasks.center && tasks.uppercase && tasks.bulleted ? '✅ Word Processing: Correct (+15)' : '❌ Formatting Errors Found.'}
          </div>
        )}
      </div>
    </div>
  );
};
export default ActivityWord;