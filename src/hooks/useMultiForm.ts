import { useState } from "react";

export const useMultiForm = <T>(data: T[]) => {
  const [section, setSection] = useState(0);

  const handleNext = () => {
    setSection((prev) => {
      if (prev === data?.length - 1) return prev;
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setSection((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  };

  const handleJumpToAny = (idx: number) => {
    if (idx < 0 || idx >= data.length) return;
    setSection(idx);
  };

  return {
    prev: handlePrev,
    next: handleNext,
    section: section + 1,
    jumpTo: handleJumpToAny,
    isStart: section === 0,
    totalSections: data?.length ?? 0,
    isLast: section === data?.length - 1,
  };
};
