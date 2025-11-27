import { useState, useEffect, useRef } from "react";

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const resetTimer = () => {
    setSecondsLeft(FOCUS_TIME);
    setIsRunning(false);
  };

  return (
    <div className="glass rounded-2xl p-8 border border-gray-200 text-center max-w-md mx-auto">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-black">Pomodoro Timer</h2>
      </div>
      
      <div className="mb-6">
        <div className={`text-6xl font-bold font-mono mb-4 ${secondsLeft === 0 ? 'text-red-600' : 'text-black'}`}>
          {formatTime(secondsLeft)}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-1000"
            style={{ width: `${(secondsLeft / FOCUS_TIME) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-3">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Pause</span>
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-xl border border-gray-300 transition-all transform hover:scale-105 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
