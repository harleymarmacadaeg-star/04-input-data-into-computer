import React, { useState } from 'react';
import { quizQuestions } from '../data/lo2Data';

const Quiz = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'
  const [selectedOpt, setSelectedOpt] = useState(null); // Track which button was clicked

  const handleAnswer = (idx) => {
    if (feedback) return; // Prevent double clicks

    setSelectedOpt(idx); // Remember what the user clicked
    const isCorrect = idx === quizQuestions[currentQ].answer;
    
    // Update Score immediately if correct
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Wait 2 seconds before moving to next question
    setTimeout(() => {
      setFeedback(null);
      setSelectedOpt(null);

      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(c => c + 1);
      } else {
        setShowResult(true);
        onComplete(newScore); // Send the final calculated score
      }
    }, 2000);
  };

  if (showResult) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-primary">Quiz Finished!</h2>
        <div className="text-7xl font-black text-white">{score} / {quizQuestions.length}</div>
        <p className="text-gray-400">Your score has been recorded.</p>
        <p className="text-sm text-gray-500">Go to the next slide to see your certificate.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex justify-between text-gray-400 mb-4 font-bold uppercase text-sm">
        <span>Question {currentQ + 1} of {quizQuestions.length}</span>
        <span>Score: {score}</span>
      </div>
      
      <div className="bg-surface p-8 rounded-2xl border border-gray-600 mb-6 min-h-[150px] flex items-center justify-center shadow-lg">
        <h3 className="text-2xl font-bold text-white text-center leading-relaxed">
          {quizQuestions[currentQ].question}
        </h3>
      </div>

      <div className="grid gap-4">
        {quizQuestions[currentQ].options.map((opt, idx) => {
          // Default Style
          let bgClass = "bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200";
          
          // Logic for Colors during Feedback
          if (feedback) {
            // 1. Always highlight the CORRECT answer in GREEN
            if (idx === quizQuestions[currentQ].answer) {
               bgClass = "bg-green-600 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]";
            }
            // 2. If you clicked the WRONG answer, make it RED
            else if (idx === selectedOpt) {
               bgClass = "bg-red-600 border-red-400 text-white";
            }
            // 3. Fade out the others
            else {
               bgClass = "bg-gray-800 opacity-40 border-transparent";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={feedback !== null}
              className={`w-full p-5 rounded-xl text-left font-bold text-lg border-2 transition-all duration-300 transform ${feedback && idx === selectedOpt ? 'scale-105' : ''} ${bgClass}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      
      {feedback && (
        <div className={`mt-6 text-center text-2xl font-black animate-bounce ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
          {feedback === 'correct' ? "✅ Correct!" : "❌ Incorrect"}
        </div>
      )}
    </div>
  );
};
export default Quiz;