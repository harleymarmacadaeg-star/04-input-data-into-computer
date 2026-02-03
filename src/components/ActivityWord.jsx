import React, { useState } from 'react';
import { Bold, AlignCenter, Type, List, Save, Italic, Baseline, Palette, AlignLeft, MousePointerClick, CheckCircle, AlertCircle } from 'lucide-react';

const ActivityWord = ({ onComplete }) => {
  // We track the style state for EACH section independently
  const [styles, setStyles] = useState({
    header: { bold: false, center: false, uppercase: false, blue: false, italic: false, bullets: false, doubleSpace: false },
    meta:   { bold: false, center: false, uppercase: false, blue: false, italic: false, bullets: false, doubleSpace: false },
    body:   { bold: false, center: false, uppercase: false, blue: false, italic: false, bullets: false, doubleSpace: false },
  });

  const [activeSection, setActiveSection] = useState(null); // 'header', 'meta', or 'body'
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Helper to toggle a specific style for the CURRENTLY selected section
  const toggleStyle = (styleKey) => {
    if (!activeSection) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000); // Flash warning
      return;
    }

    setStyles(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        [styleKey]: !prev[activeSection][styleKey]
      }
    }));
  };

  // Validation Logic
  const checkSuccess = () => {
    setSubmitted(true);
    
    // Exact requirements for perfect score
    const headerCorrect = styles.header.bold && styles.header.center && styles.header.uppercase && styles.header.blue;
    const metaCorrect   = styles.meta.italic && !styles.meta.bold; // Ensure they didn't bold the date too!
    const bodyCorrect   = styles.body.bullets && styles.body.doubleSpace;

    const isCorrect = headerCorrect && metaCorrect && bodyCorrect;
    
    if (onComplete) onComplete(isCorrect ? 30 : 0);
  };

  // Common Button Style
  const Btn = ({ icon: Icon, onClick, active, label }) => (
    <button 
      onClick={onClick}
      title={label}
      className={`p-2 rounded border transition-all duration-200 flex items-center justify-center
        ${active ? 'bg-blue-600 text-white border-blue-700 shadow-inner' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 shadow-sm'}
      `}
    >
      <Icon size={18} strokeWidth={2.5} />
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-slate-50 rounded-xl shadow-2xl border border-slate-300 overflow-hidden font-sans">
      
      {/* --- TOOLBAR --- */}
      <div className="bg-white p-3 border-b border-slate-300 flex flex-wrap gap-4 items-center shadow-sm sticky top-0 z-10">
        
        {/* Font Group */}
        <div className="flex gap-1 pr-4 border-r border-slate-200">
          <Btn icon={Bold} label="Bold" onClick={() => toggleStyle('bold')} active={activeSection && styles[activeSection].bold} />
          <Btn icon={Italic} label="Italic" onClick={() => toggleStyle('italic')} active={activeSection && styles[activeSection].italic} />
          <Btn icon={Palette} label="Blue Color" onClick={() => toggleStyle('blue')} active={activeSection && styles[activeSection].blue} />
          <Btn icon={Type} label="Uppercase" onClick={() => toggleStyle('uppercase')} active={activeSection && styles[activeSection].uppercase} />
        </div>

        {/* Paragraph Group */}
        <div className="flex gap-1 pr-4 border-r border-slate-200">
          <Btn icon={AlignLeft} label="Align Left" onClick={() => toggleStyle('center')} active={activeSection && !styles[activeSection].center} />
          <Btn icon={AlignCenter} label="Align Center" onClick={() => toggleStyle('center')} active={activeSection && styles[activeSection].center} />
        </div>

        {/* Layout Group */}
        <div className="flex gap-1">
          <Btn icon={List} label="Bullets" onClick={() => toggleStyle('bullets')} active={activeSection && styles[activeSection].bullets} />
          <Btn icon={Baseline} label="Double Space" onClick={() => toggleStyle('doubleSpace')} active={activeSection && styles[activeSection].doubleSpace} />
        </div>

        {/* Selection Indicator (Helper) */}
        <div className={`ml-auto text-sm font-semibold px-3 py-1 rounded-full transition-colors ${activeSection ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
          {activeSection ? `Editing: ${activeSection.toUpperCase()}` : '⚠️ Select text to edit'}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        
        {/* --- DOCUMENT CANVAS --- */}
        <div className="flex-1 bg-slate-200 p-8 min-h-[500px] flex justify-center overflow-y-auto">
          <div className="bg-white w-full max-w-[8.5in] min-h-[11in] shadow-lg p-12 text-slate-900 cursor-default relative">
            
            {/* Warning Toast */}
            {showHint && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm flex items-center gap-2 animate-bounce z-20">
                <MousePointerClick size={16}/> Click a section of text first!
              </div>
            )}

            {/* SECTION 1: HEADER */}
            <div 
              onClick={() => setActiveSection('header')}
              className={`mb-6 p-2 rounded border-2 border-dashed transition-all hover:bg-blue-50 cursor-pointer
                ${activeSection === 'header' ? 'border-blue-500 bg-blue-50/50' : 'border-transparent'}
                ${styles.header.center ? 'text-center' : 'text-left'}
                ${styles.header.bold ? 'font-bold' : 'font-normal'}
                ${styles.header.italic ? 'italic' : 'not-italic'}
                ${styles.header.uppercase ? 'uppercase' : 'normal-case'}
                ${styles.header.blue ? 'text-blue-700' : 'text-slate-900'}
              `}
            >
              <h1 className="text-3xl m-0 select-none">Administrative Memo</h1>
            </div>

            {/* SECTION 2: META DATA */}
            <div 
              onClick={() => setActiveSection('meta')}
              className={`mb-8 p-2 rounded border-2 border-dashed transition-all hover:bg-blue-50 cursor-pointer
                ${activeSection === 'meta' ? 'border-blue-500 bg-blue-50/50' : 'border-transparent'}
                ${styles.meta.center ? 'text-center' : 'text-left'}
                ${styles.meta.bold ? 'font-bold' : 'font-normal'}
                ${styles.meta.italic ? 'italic text-slate-600' : 'not-italic text-slate-400'}
                ${styles.meta.uppercase ? 'uppercase' : 'normal-case'}
                ${styles.meta.blue ? 'text-blue-700' : ''}
              `}
            >
              <p className="text-sm border-b pb-2 select-none">Date: February 03, 2026 | Ref: internal-042</p>
            </div>

            {/* SECTION 3: BODY */}
            <div 
              onClick={() => setActiveSection('body')}
              className={`p-2 rounded border-2 border-dashed transition-all hover:bg-blue-50 cursor-pointer
                ${activeSection === 'body' ? 'border-blue-500 bg-blue-50/50' : 'border-transparent'}
                ${styles.body.center ? 'text-center' : 'text-left'}
                ${styles.body.bold ? 'font-bold' : 'font-normal'}
                ${styles.body.italic ? 'italic' : 'not-italic'}
                ${styles.body.uppercase ? 'uppercase' : 'normal-case'}
                ${styles.body.blue ? 'text-blue-700' : 'text-slate-900'}
                ${styles.body.doubleSpace ? 'leading-[3rem]' : 'leading-normal'}
              `}
            >
              <p className="mb-4 select-none">The following protocols must be strictly implemented for the upcoming semester:</p>
              
              {styles.body.bullets ? (
                <ul className="list-disc ml-8 select-none">
                  <li>Hardware diagnostic checks for Lab 1-4</li>
                  <li>Software license renewal (Creative Suite)</li>
                  <li>Network security audit and firewall update</li>
                  <li>Faculty training for Hybrid Learning modules</li>
                </ul>
              ) : (
                <div className="select-none">
                  <p>Hardware diagnostic checks for Lab 1-4</p>
                  <p>Software license renewal (Creative Suite)</p>
                  <p>Network security audit and firewall update</p>
                  <p>Faculty training for Hybrid Learning modules</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* --- INSTRUCTIONS SIDEBAR --- */}
        <div className="w-full md:w-80 bg-slate-50 border-l border-slate-300 p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
            <List size={20}/> Requirements
          </h3>
          
          <div className="space-y-4 text-sm text-slate-600 mb-auto">
            <InstructionItem 
              label="Title Formatting" 
              desc="Make the title Bold, Uppercase, Centered, and Blue."
              isMet={styles.header.bold && styles.header.uppercase && styles.header.center && styles.header.blue}
            />
            <InstructionItem 
              label="Reference Line" 
              desc="The date/ref line should be Italicized only."
              isMet={styles.meta.italic && !styles.meta.bold && !styles.meta.uppercase}
            />
            <InstructionItem 
              label="Body Text" 
              desc="Apply Bullet Points and Double Spacing to the list."
              isMet={styles.body.bullets && styles.body.doubleSpace}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
             {!submitted ? (
              <button 
                onClick={checkSuccess} 
                className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-900 hover:shadow-lg transition-all"
              >
                <Save size={18}/> SUBMIT WORK
              </button>
            ) : (
              <div className="text-center p-4 bg-white rounded-lg border shadow-sm">
                {(styles.header.bold && styles.header.center && styles.header.uppercase && styles.header.blue && styles.meta.italic && styles.body.bullets && styles.body.doubleSpace) ? (
                  <div className="text-emerald-600 font-bold flex flex-col items-center gap-2">
                    <CheckCircle size={32}/>
                    <span>Excellent! Format Correct.</span>
                    <span className="text-xs text-slate-500">Score: 30/30</span>
                  </div>
                ) : (
                  <div className="text-red-500 font-bold flex flex-col items-center gap-2">
                    <AlertCircle size={32}/>
                    <span>Revisions Needed.</span>
                    <span className="text-xs text-slate-400">Check the requirement list.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper for checklist items
const InstructionItem = ({ label, desc, isMet }) => (
  <div className={`p-3 rounded-lg border transition-colors ${isMet ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
    <div className="flex items-center gap-2 mb-1">
      {isMet ? <CheckCircle size={16} className="text-emerald-600"/> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"/>}
      <span className={`font-semibold ${isMet ? 'text-emerald-700' : 'text-slate-700'}`}>{label}</span>
    </div>
    <p className="text-xs text-slate-500 pl-6">{desc}</p>
  </div>
);

export default ActivityWord;