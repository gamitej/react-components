import { useEffect, useState } from "react";

interface UseTimerProps {
  timeNo: number;
  timerType: "sec" | "min";
}

export const useTimer = ({ timeNo, timerType }: UseTimerProps) => {
  // Initialize time based on timerType
  const initialTime = timeNo * (timerType === "min" ? 60000 : 1000);
  const [time, setTimer] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const clearTimerInterval = setInterval(() => {
      setTimer((state) => Math.max(state - 1000, 0)); // Prevent negative time
    }, 1000);

    return () => {
      clearInterval(clearTimerInterval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(initialTime);
  };

  // Convert time to minutes and seconds
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return {
    minutes,
    seconds,
    stop: handleStop,
    start: handleStart,
    reset: handleReset,
    isFinished: time === 0,
  };
};
