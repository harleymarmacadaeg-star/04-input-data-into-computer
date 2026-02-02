import React, { useState } from 'react';
import { Table as TableIcon, Zap, Info, Save } from 'lucide-react';

const ActivityExcel = ({ onComplete }) => {
  const [formulas, setFormulas] = useState({ total: '', average: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const checkExcel = () => {
    const cleanT = formulas.total.replace(/\s/g, '').toUpperCase();
    const cleanA = formulas.average.replace(/\s/g, '').toUpperCase();
    const isCorrect = (cleanT === '=SUM(B2:D2)' || cleanT === '=B2+C2+D2') && (cleanA === '=AVERAGE(B2:D2)' || cleanA === '=E2/3');
    setSubmitted(true);
    onComplete(isCorrect ? 15 : 0);
  };

  return (
    <div className="w-full max-w-5xl bg-[#1e7145] p-1 rounded-xl shadow-2xl relative">
      <div className="bg-slate-100 p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center px-1 mb-1">
          <span className="text-[10px] font-bold text-green-800 uppercase">Excel Formula Simulation</span>
          <button onClick={() => setShowInstructions(!showInstructions)} className="text-[10px] bg-white border border-green-700 px-2 py-0.5 rounded text-green-800 font-bold hover:bg-green-50">
            {showInstructions ? "HIDE INSTRUCTIONS" : "SHOW INSTRUCTIONS"}
          </button>
        </div>

        {showInstructions && (
          <div className="bg-green-800 text-white p-4 rounded mb-2 border-2 border-white animate-in slide-in-from-top">
            <h3 className="font-bold text-xs mb-2 underline">EXCEL TASK INSTRUCTIONS:</h3>
            <ul className="text-[11px] space-y-1 list-decimal ml-4 font-sans">
              <li>Open MS Excel and create a table for Kristin Macadaeg.</li>
              <li>Input Scores: 90, 92, and 88.</li>
              <li>In Cell E2, use <strong>=SUM(B2:D2)</strong> to get the Total.</li>
              <li>In Cell F2, use <strong>=AVERAGE(B2:D2)</strong> for the Grade.</li>
              <li>Save file as: <strong>Lastname_ActivityExcel.xlsx</strong>.</li>
            </ul>
          </div>
        )}

        <div className="flex gap-2">
           <div className="bg-white border px-4 py-1 font-mono text-slate-500 min-w-[60px] text-center">E2</div>
           <input 
             type="text" className="flex-1 border-2 border-slate-300 px-3 py-1 font-mono text-black outline-none focus:border-green-600"
             placeholder="Total Formula (e.g., =SUM...)" value={formulas.total} onChange={(e) => setFormulas({...formulas, total: e.target.value})} disabled={submitted}
           />
        </div>
        <div className="flex gap-2">
           <div className="bg-white border px-4 py-1 font-mono text-slate-500 min-w-[60px] text-center">F2</div>
           <input 
             type="text" className="flex-1 border-2 border-slate-300 px-3 py-1 font-mono text-black outline-none focus:border-green-600"
             placeholder="Average Formula (e.g., =AVERAGE...)" value={formulas.average} onChange={(e) => setFormulas({...formulas, average: e.target.value})} disabled={submitted}
           />
        </div>
      </div>
      
      <table className="w-full bg-white text-slate-900 border-collapse">
        <thead className="bg-slate-200 text-[10px] font-black uppercase">
          <tr>
            <th className="border border-slate-300 p-1 w-8"></th>
            <th className="border border-slate-300 p-1">A: Student</th>
            <th className="border border-slate-300 p-1">B: Q1</th>
            <th className="border border-slate-300 p-1">C: Q2</th>
            <th className="border border-slate-300 p-1">D: Q3</th>
            <th className="border border-slate-300 p-1 bg-blue-50">E: TOTAL</th>
            <th className="border border-slate-300 p-1 bg-yellow-50">F: AVG</th>
          </tr>
        </thead>
        <tbody className="font-mono text-xs">
          <tr>
            <td className="border border-slate-300 bg-slate-100 text-center font-bold italic">2</td>
            <td className="border border-slate-300 p-2">Kristin Macadaeg</td>
            <td className="border border-slate-300 p-2 text-center">90</td>
            <td className="border border-slate-300 p-2 text-center">92</td>
            <td className="border border-slate-300 p-2 text-center">88</td>
            <td className="border border-slate-300 p-2 text-center bg-blue-50 font-bold">{submitted ? '270' : '???'}</td>
            <td className="border border-slate-300 p-2 text-center bg-yellow-50 font-bold">{submitted ? '90' : '???'}</td>
          </tr>
        </tbody>
      </table>

      <div className="bg-slate-100 p-3 flex justify-center border-t">
        {!submitted ? (
          <button onClick={checkExcel} className="bg-[#1e7145] text-white px-10 py-2 rounded font-black hover:bg-green-800 flex items-center gap-2">
            <Save size={16}/> SUBMIT FORMULAS
          </button>
        ) : (
          <span className="font-bold text-green-700">Formula Check Complete!</span>
        )}
      </div>
    </div>
  );
};
export default ActivityExcel;