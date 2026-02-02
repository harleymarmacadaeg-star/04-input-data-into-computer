import React, { useState } from 'react';

const ActivityStorage = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Expanded List (6 Items)
  const items = [
    { id: 1, name: "Google Drive", correct: "cloud" },
    { id: 2, name: "RAM (Memory)", correct: "primary" },
    { id: 3, name: "SSD (Solid State)", correct: "secondary" },
    { id: 4, name: "CPU Cache", correct: "primary" },
    { id: 5, name: "USB Flash Drive", correct: "secondary" },
    { id: 6, name: "OneDrive / Dropbox", correct: "cloud" },
  ];

  const handleSelect = (id, type) => {
    if (submitted) return;
    setAnswers({ ...answers, [id]: type });
  };

  const checkAnswers = () => {
    setSubmitted(true);
    const correctCount = items.filter(i => answers[i.id] === i.correct).length;
    // 6 Items. 10 Points total. (Scale: ~1.6 points each, round to 10 if perfect)
    const score = correctCount === 6 ? 15 : Math.round((correctCount/6)*15); // Increased to 15 Points Max
    onComplete(score);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-secondary mb-8">Activity 2: Storage Classification</h2>
      <p className="mb-6 text-gray-400">Identify: Primary (Volatile), Secondary (Physical), or Cloud (Remote).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
        {items.map(item => (
          <div key={item.id} className="bg-surface p-5 rounded-xl border border-gray-600 flex flex-col items-center shadow-lg">
            <span className="font-bold text-lg mb-4 text-center text-white">{item.name}</span>
            <div className="flex flex-col gap-2 w-full">
              <button 
                onClick={() => handleSelect(item.id, 'primary')}
                className={`py-1 rounded text-sm font-bold transition ${answers[item.id] === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
              >
                Primary
              </button>
              <button 
                onClick={() => handleSelect(item.id, 'secondary')}
                className={`py-1 rounded text-sm font-bold transition ${answers[item.id] === 'secondary' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
              >
                Secondary
              </button>
              <button 
                onClick={() => handleSelect(item.id, 'cloud')}
                className={`py-1 rounded text-sm font-bold transition ${answers[item.id] === 'cloud' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
              >
                Cloud
              </button>
            </div>
            {submitted && (
              <div className={`mt-3 text-sm font-bold ${answers[item.id] === item.correct ? 'text-green-400' : 'text-red-400'}`}>
                {answers[item.id] === item.correct ? "✅ Correct" : `❌ (Ans: ${item.correct})`}
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <button onClick={checkAnswers} disabled={Object.keys(answers).length < 6} className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 disabled:opacity-50 transition">
          Submit Answers
        </button>
      )}
      {submitted && <p className="text-xl font-bold text-white">Activity Complete!</p>}
    </div>
  );
};
export default ActivityStorage;