import { useEffect, useState } from "react";

interface UseTimerProps {
  timeNo: number;
  timerType: "sec" | "min";
}

export const useTimer = ({ timeNo, timerType }: UseTimerProps) => {
  // Initialize time based on timerType
  const initialTime = timeNo * (timerType === "min" ? 60000 : 1000);
  const [time, setTimer] = useState(initialTime);

  useEffect(() => {
    const clearTimerInterval = setInterval(() => {
      setTimer((state) => Math.max(state - 1000, 0)); // Prevent negative time
    }, 1000);

    return () => clearInterval(clearTimerInterval);
  }, []);

  console.log("hi");

  // Convert time to minutes and seconds
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return { minutes, seconds, isFinished: time === 0 };
};
