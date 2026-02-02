import React, { useState } from 'react';

const ActivityInput = ({ data, onComplete }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('pending'); // pending, success, error

  const checkInput = () => {
    if (input.trim() === data.targetText) {
      setStatus('success');
      onComplete(10); // 10 Points
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-6">{data.title}</h2>
      
      <div className="bg-surface p-6 rounded-xl border border-gray-600 w-full mb-6">
        <p className="text-gray-400 mb-2">Type this exactly:</p>
        <p className="text-2xl font-mono font-bold text-white bg-black/30 p-4 rounded border-l-4 border-accent select-none">
          {data.targetText}
        </p>
      </div>

      <textarea
        className="w-full p-4 text-xl rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-primary outline-none"
        rows="3"
        placeholder="Type here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={status === 'success'}
      />

      <div className="mt-6">
        {status === 'pending' || status === 'error' ? (
          <button onClick={checkInput} className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition">
            Check Accuracy
          </button>
        ) : (
          <div className="text-green-400 text-2xl font-bold flex items-center gap-2 animate-bounce">
            ✅ Perfect Match! (+10 Points)
          </div>
        )}
        
        {status === 'error' && (
          <p className="text-red-400 mt-2 font-semibold">Mismatch. Check spelling and punctuation.</p>
        )}
      </div>
    </div>
  );
};
export default ActivityInput;