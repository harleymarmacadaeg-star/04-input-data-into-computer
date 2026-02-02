import React from 'react';
import { Printer, Award, Trash2 } from 'lucide-react';

const Scoreboard = ({ scores, onReset }) => {
  const softwareSelection = scores.act1 || 0;
  const wordProcessing   = scores.act2 || 0;
  const excelComputation = scores.act3 || 0;
  const storageHierarchy = scores.act4 || 0;
  const ergoAudit        = scores.act5 || 0;
  const precisionTyping  = scores.act6 || 0;
  const quiz             = scores.quiz || 0;

  const total = softwareSelection + wordProcessing + excelComputation + storageHierarchy + ergoAudit + precisionTyping + quiz;
  const max = 95; 
  const percentage = Math.round((total / max) * 100);

  let remarks = "Needs Improvement";
  let color = "text-red-500";
  if (percentage >= 75) { remarks = "Satisfactory"; color = "text-amber-500"; }
  if (percentage >= 90) { remarks = "Excellent"; color = "text-emerald-500"; }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl animate-fade-in">
      <div className="no-print text-center w-full bg-slate-900/50 p-8 rounded-3xl border-2 border-slate-700 shadow-2xl">
        <Award size={64} className="text-blue-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white mb-2 uppercase tracking-tighter">Official Performance Record</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8 mt-6">
          <div className="bg-black/30 p-5 rounded-xl border border-slate-700">
            <h3 className="text-blue-500 font-black uppercase text-xs mb-4 tracking-widest">Theoretical & Safety</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300"><span>Precision Typing:</span> <span>{precisionTyping} / 10</span></div>
              <div className="flex justify-between text-slate-300"><span>Storage Hierarchy:</span> <span>{storageHierarchy} / 15</span></div>
              <div className="flex justify-between text-slate-300"><span>Ergo Audit:</span> <span>{ergoAudit} / 10</span></div>
              <div className="flex justify-between font-bold pt-2 border-t border-slate-800 text-blue-400">
                <span>Final Quiz:</span> <span>{quiz} / 15</span>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-5 rounded-xl border border-slate-700">
            <h3 className="text-emerald-500 font-black uppercase text-xs mb-4 tracking-widest">Practical Applications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300"><span>Software Choice:</span> <span>{softwareSelection} / 15</span></div>
              <div className="flex justify-between text-slate-300"><span>Word Processing:</span> <span>{wordProcessing} / 15</span></div>
              <div className="flex justify-between text-slate-300"><span>Excel Computation:</span> <span>{excelComputation} / 15</span></div>
              <div className="mt-6 p-2 bg-emerald-500/10 rounded border border-emerald-500/20 text-center">
                <span className="text-[10px] text-emerald-500 font-black uppercase">Practical Mastery: {Math.round(((softwareSelection+wordProcessing+excelComputation)/45)*100)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <p className="text-slate-500 uppercase text-xs font-black tracking-widest">Total Points Earned</p>
          <p className="text-8xl font-black text-white tracking-tighter my-2">
            {total} <span className="text-3xl text-slate-600 font-normal">/ {max}</span>
          </p>
          <p className={`text-4xl font-black uppercase ${color} tracking-tight`}>{remarks}</p>
        </div>

        <div className="flex gap-4 mt-8">
            <button onClick={() => window.print()} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition shadow-lg active:scale-95">
              <Printer size={20} /> PRINT REPORT
            </button>
            <button onClick={onReset} className="px-6 bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400 rounded-2xl border border-slate-700 transition active:scale-95">
              <Trash2 size={24} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;