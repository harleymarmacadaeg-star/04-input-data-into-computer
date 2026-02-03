import React, { useState } from 'react';
import { Table as TableIcon, Zap, Save, CheckCircle, AlertCircle, Calculator } from 'lucide-react';

const ActivityExcel = ({ onComplete }) => {
  const [inputs, setInputs] = useState({
    weighted: '', // E2
    status: '',   // F2
    highest: ''   // B6
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const checkExcel = () => {
    let score = 0;
    let errors = [];

    // Normalize inputs: Remove spaces, uppercase, and unify quotes to double quotes
    const w = inputs.weighted.replace(/\s/g, '').toUpperCase();
    const s = inputs.status.replace(/\s/g, '').toUpperCase().replace(/'/g, '"');
    const h = inputs.highest.replace(/\s/g, '').toUpperCase();

    // 1. Weighted Grade: Must use Absolute Refs ($)
    const validWeighted = (w.includes('$I$1') && w.includes('$I$2') && w.includes('C2') && w.includes('D2'));
    if (validWeighted) score += 10;
    else errors.push("Weighted (E2): Missing Absolute References ($I$1, $I$2) or correct data cells (C2, D2).");

    // 2. Status: IF statement (Enhanced Logic)
    // Option A: =IF(E2>=75,"PASS","FAIL")
    const logicStandard = s.includes('IF(E2>=75,"PASS","FAIL")');
    // Option B: =IF(E2<75,"FAIL","PASS") (Your suggestion)
    const logicReverse = s.includes('IF(E2<75,"FAIL","PASS")');

    if (logicStandard || logicReverse) {
      score += 10;
    } else {
      errors.push("Status (F2): Incorrect logic. Use =IF(E2>=75,\"PASS\",\"FAIL\") OR =IF(E2<75,\"FAIL\",\"PASS\").");
    }

    // 3. Highest: MAX function
    const validHighest = (h.includes('=MAX(E2:E4)'));
    if (validHighest) score += 5;
    else errors.push("Highest (B6): Use =MAX(E2:E4) to find the top final grade.");

    setSubmitted(true);
    
    if (errors.length === 0) {
      setFeedback({ type: 'success', msg: 'Perfect! Logic Verified.' });
      if (onComplete) onComplete(25);
    } else {
      setFeedback({ type: 'error', msg: errors[0] });
      if (onComplete) onComplete(0);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 bg-slate-50 border border-slate-300 rounded-xl shadow-xl overflow-hidden font-sans">
      
      {/* --- RIBBON --- */}
      <div className="bg-[#107c41] text-white p-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <TableIcon size={20} />
          <span className="font-bold tracking-wider text-sm">EXCEL LAB: Weighted Grades & Logic</span>
        </div>
        <div className="text-[10px] bg-[#0c5e31] px-3 py-1 rounded border border-green-600 flex items-center gap-2">
          <span>Mode: Formula View</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full">
        
        {/* --- LEFT PANEL: CONTEXT & INPUTS --- */}
        <div className="w-full lg:w-[400px] bg-white border-r border-slate-200 p-6 flex flex-col gap-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          
          {/* Sample Data Breakdown */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
             <h3 className="font-bold text-amber-900 text-xs flex items-center gap-2 mb-3 uppercase tracking-wide">
              <Calculator size={14}/> Sample Computation (Row 2)
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-xs font-mono text-slate-600">
              <div className="text-slate-400">Student:</div>
              <div className="font-bold text-slate-800">Macadaeg, K.</div>

              <div className="text-slate-400">Written (C2):</div>
              <div className="font-bold text-red-600">90</div>

              <div className="text-slate-400">Perf (D2):</div>
              <div className="font-bold text-red-600">95</div>

              <div className="text-slate-400">Weight 1 (I1):</div>
              <div className="font-bold text-purple-700">60% <span className="text-[10px] text-slate-400 font-normal">($I$1)</span></div>

              <div className="text-slate-400">Weight 2 (I2):</div>
              <div className="font-bold text-purple-700">40% <span className="text-[10px] text-slate-400 font-normal">($I$2)</span></div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-amber-200">
              <div className="text-[10px] text-amber-800 mb-1 font-bold">MANUAL CHECK:</div>
              <code className="block bg-white px-2 py-1 rounded border border-amber-100 text-[10px] text-slate-500">
                (90 × 60%) + (95 × 40%) = <b className="text-blue-600">92</b>
              </code>
            </div>
          </div>

          {/* Formula Inputs */}
          <div className="space-y-4 flex-1">
            <h3 className="font-bold text-slate-800 text-sm border-b pb-2">Enter Formulas</h3>
            
            <div className="group">
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">Cell E2 (Weighted Score)</label>
              <input 
                value={inputs.weighted}
                onChange={(e) => setInputs({...inputs, weighted: e.target.value})}
                placeholder="=C2*..."
                className="w-full border border-slate-300 p-3 font-mono text-sm text-slate-900 rounded bg-slate-50 focus:bg-white focus:border-[#107c41] focus:ring-1 focus:ring-[#107c41] outline-none transition-all placeholder:text-slate-400"
              />
              <p className="text-[10px] text-slate-400 mt-1">Tip: Use <b>$</b> to lock the Weight cells (I1, I2).</p>
            </div>

            <div className="group">
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">Cell F2 (Pass/Fail)</label>
              <input 
                value={inputs.status}
                onChange={(e) => setInputs({...inputs, status: e.target.value})}
                placeholder='=IF(logical, "true", "false")'
                className="w-full border border-slate-300 p-3 font-mono text-sm text-slate-900 rounded bg-slate-50 focus:bg-white focus:border-[#107c41] focus:ring-1 focus:ring-[#107c41] outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="group">
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">Cell B6 (Highest in Class)</label>
              <input 
                value={inputs.highest}
                onChange={(e) => setInputs({...inputs, highest: e.target.value})}
                placeholder="=MAX(...)"
                className="w-full border border-slate-300 p-3 font-mono text-sm text-slate-900 rounded bg-slate-50 focus:bg-white focus:border-[#107c41] focus:ring-1 focus:ring-[#107c41] outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-auto pt-4">
             {feedback && (
              <div className={`mb-3 p-3 rounded text-xs font-bold flex gap-2 items-start animate-in fade-in slide-in-from-bottom-2
                ${feedback.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                {feedback.type === 'success' ? <CheckCircle size={16} className="shrink-0"/> : <AlertCircle size={16} className="shrink-0"/>}
                <span>{feedback.msg}</span>
              </div>
            )}
            <button 
              onClick={checkExcel}
              className={`w-full py-3 rounded-lg font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2
                ${submitted && feedback?.type === 'success' ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#107c41] hover:bg-[#0b552d] hover:-translate-y-0.5'}`}
            >
              <Save size={18}/> {submitted && feedback?.type === 'success' ? 'Activity Complete' : 'Validate Answers'}
            </button>
          </div>
        </div>

        {/* --- RIGHT PANEL: DATASET --- */}
        <div className="flex-1 bg-slate-100 p-6 overflow-x-auto overflow-y-auto">
          <div className="bg-white shadow-sm border border-slate-300 min-w-[700px]">
            
            {/* Header / Info */}
            <div className="p-2 bg-slate-50 border-b text-[10px] text-slate-400 flex justify-between">
              <span>Workbook: Grade_Computation_2026.xlsx</span>
              <span>Sheet1</span>
            </div>

            {/* Grid */}
            <table className="w-full border-collapse text-xs font-sans">
              <thead>
                <tr className="bg-slate-100 text-slate-500 font-bold text-center h-8">
                  <th className="border p-1 w-10 bg-slate-50"></th>
                  <th className="border p-1 w-12">A</th>
                  <th className="border p-1 w-32">B</th>
                  <th className="border p-1 w-20 bg-red-50 text-red-700">C</th>
                  <th className="border p-1 w-20 bg-red-50 text-red-700">D</th>
                  <th className="border p-1 w-24 bg-green-50 text-green-700 border-x-2 border-x-green-200">E</th>
                  <th className="border p-1 w-24 bg-green-50 text-green-700">F</th>
                  <th className="border p-1 w-8 bg-slate-50">...</th>
                  <th className="border p-1 w-24 bg-purple-50 text-purple-700 border-l-2 border-l-slate-300">I</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {/* Row 1 */}
                <tr className="h-8">
                  <td className="bg-slate-100 text-slate-500 font-bold text-center border">1</td>
                  <td className="border p-1 font-bold text-center text-slate-400">#</td>
                  <td className="border p-1 font-bold">Student Name</td>
                  <td className="border p-1 text-center font-bold text-red-600">Written</td>
                  <td className="border p-1 text-center font-bold text-red-600">Perf.</td>
                  <td className="border p-1 text-center font-bold bg-green-50 text-green-800 border-x-2 border-x-green-200">FINAL</td>
                  <td className="border p-1 text-center font-bold bg-green-50 text-green-800">STATUS</td>
                  <td className="border p-1 bg-slate-50"></td>
                  <td className="border p-1 bg-purple-50 text-right font-mono font-bold text-purple-700 border-l-2 border-l-slate-300 relative group cursor-help">
                    60%
                    <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                      Cell $I$1
                    </span>
                  </td>
                </tr>
                {/* Row 2 (Active) */}
                <tr className="h-10 bg-yellow-50/50">
                  <td className="bg-slate-100 text-slate-500 font-bold text-center border">2</td>
                  <td className="border p-1 text-center">1</td>
                  <td className="border p-1 font-medium">Macadaeg, K.</td>
                  <td className="border p-1 text-center bg-white">90</td>
                  <td className="border p-1 text-center bg-white">95</td>
                  <td className="border p-1 text-center font-bold bg-yellow-100 text-blue-700 border-2 border-blue-500">
                    {submitted && feedback?.type === 'success' ? '92' : '?'}
                  </td>
                  <td className="border p-1 text-center font-bold bg-yellow-100 text-blue-700 border-2 border-blue-500">
                    {submitted && feedback?.type === 'success' ? 'PASS' : '?'}
                  </td>
                  <td className="border p-1 bg-slate-50"></td>
                  <td className="border p-1 bg-purple-50 text-right font-mono font-bold text-purple-700 border-l-2 border-l-slate-300 relative group cursor-help">
                    40%
                    <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                      Cell $I$2
                    </span>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="h-8 hover:bg-slate-50">
                  <td className="bg-slate-100 text-slate-500 font-bold text-center border">3</td>
                  <td className="border p-1 text-center">2</td>
                  <td className="border p-1">Santos, J.</td>
                  <td className="border p-1 text-center">70</td>
                  <td className="border p-1 text-center">75</td>
                  <td className="border p-1 text-center text-slate-400">72</td>
                  <td className="border p-1 text-center text-slate-400">FAIL</td>
                  <td className="border p-1 bg-slate-50"></td>
                  <td className="border p-1 bg-purple-50 border-l-2 border-l-slate-300"></td>
                </tr>
                {/* Row 4 */}
                <tr className="h-8 hover:bg-slate-50">
                  <td className="bg-slate-100 text-slate-500 font-bold text-center border">4</td>
                  <td className="border p-1 text-center">3</td>
                  <td className="border p-1">Reyes, M.</td>
                  <td className="border p-1 text-center">85</td>
                  <td className="border p-1 text-center">80</td>
                  <td className="border p-1 text-center text-slate-400">83</td>
                  <td className="border p-1 text-center text-slate-400">PASS</td>
                  <td className="border p-1 bg-slate-50"></td>
                  <td className="border p-1 bg-purple-50 border-l-2 border-l-slate-300"></td>
                </tr>
                 {/* Row 5 */}
                <tr className="h-8 bg-slate-50">
                  <td className="bg-slate-100 text-slate-500 font-bold text-center border">5</td>
                  <td className="border p-1"></td>
                  <td className="border p-1"></td>
                  <td className="border p-1"></td>
                  <td className="border p-1"></td>
                  <td className="border p-1 bg-green-50 border-x-2 border-x-green-200"></td>
                  <td className="border p-1 bg-green-50"></td>
                  <td className="border p-1 bg-slate-50"></td>
                  <td className="border p-1 bg-purple-50 border-l-2 border-l-slate-300"></td>
                </tr>
                {/* Row 6 */}
                <tr className="h-10">
                  <td className="bg-slate-100 text-slate-500 font-bold text-center border">6</td>
                  <td className="border p-1 font-bold text-right text-xs" colSpan={2}>Highest Grade:</td>
                  <td className="border p-1 bg-slate-50" colSpan={5}>
                     <div className="w-24 bg-yellow-50 border border-dashed border-slate-400 text-center text-slate-500 text-[10px] py-1 mx-4">
                      {submitted && feedback?.type === 'success' ? '92' : 'Result of B6'}
                    </div>
                  </td>
                  <td className="border p-1 bg-slate-50"></td>
                  <td className="border p-1 bg-purple-50 border-l-2 border-l-slate-300"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityExcel;