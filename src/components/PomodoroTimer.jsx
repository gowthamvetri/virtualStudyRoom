// components/PomodoroTimer.jsx
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
    <div className="bg-white p-6 rounded shadow text-center max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Pomodoro Timer</h2>
      <div className="text-4xl font-mono mb-4">{formatTime(secondsLeft)}</div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
