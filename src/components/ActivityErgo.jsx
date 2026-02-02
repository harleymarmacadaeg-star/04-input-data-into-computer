import React, { useState } from 'react';

const ActivityErgo = ({ onComplete }) => {
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);

  // Expanded Checklist (5 Correct, 3 Wrong)
  const items = [
    { id: 1, text: "Monitor at eye level", correct: true },
    { id: 2, text: "Feet dangling off chair", correct: false },
    { id: 3, text: "20-20-20 Rule for eyes", correct: true },
    { id: 4, text: "Wrists bent upwards 45°", correct: false },
    { id: 5, text: "Regular stretch breaks", correct: true },
    { id: 6, text: "Screen brightness maxed out", correct: false },
    { id: 7, text: "Elbows at 90-degree angle", correct: true },
    { id: 8, text: "Anti-glare lighting", correct: true },
  ];

  const toggle = (id) => {
    if (done) return;
    if (selected.includes(id)) setSelected(selected.filter(i => i !== id));
    else setSelected([...selected, id]);
  };

  const submit = () => {
    setDone(true);
    const correctIds = items.filter(i => i.correct).map(i => i.id);
    const userCorrect = selected.filter(id => correctIds.includes(id)).length;
    const userWrong = selected.filter(id => !correctIds.includes(id)).length;

    // Scoring: 10 Points Max. 2 points per correct item found, minus 1 for errors.
    let score = (userCorrect * 2) - userWrong;
    if (score < 0) score = 0;
    if (score > 10) score = 10;
    
    onComplete(score);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-accent mb-2 text-center">Activity 3: Workspace Audit</h2>
      <p className="text-center mb-8 text-gray-400">Select ALL the <span className="text-green-400 font-bold">Good Habits</span> (There are 5).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {items.map(item => (
          <div 
            key={item.id} 
            onClick={() => toggle(item.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer flex justify-between items-center transition ${selected.includes(item.id) ? 'border-accent bg-accent/20' : 'border-gray-600 bg-surface hover:bg-gray-700'}`}
          >
            <span className="text-base font-semibold text-gray-200">{item.text}</span>
            {done && (
              <span className={item.correct ? "text-green-400" : "text-red-400"}>
                {item.correct ? "✔" : "✘"}
              </span>
            )}
          </div>
        ))}
      </div>

      {!done ? (
        <button onClick={submit} className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition">
          Audit Workspace
        </button>
      ) : (
        <p className="text-center text-xl font-bold text-white">Audit Recorded.</p>
      )}
    </div>
  );
};
export default ActivityErgo;