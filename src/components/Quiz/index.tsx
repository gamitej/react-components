import { useState } from "react";
import { questions } from "./data";
import QuizQues from "./QuizQues";

const QuizApp = () => {
  const [optionSelected, setOptionSelected] = useState<Record<
    number,
    any
  > | null>(null);

  const handleOptionSelected = (
    queNo: number,
    queName: string,
    selectedOption: number
  ) => {
    setOptionSelected((state) => {
      if (!state) return { [queNo]: { queName, optionNo: selectedOption } };

      if (state[queNo])
        return {
          ...state,
          [queNo]: { ...state[queNo], queName, optionNo: selectedOption },
        };

      return { ...state, [queNo]: { queName, optionNo: selectedOption } };
    });
  };

  /**
   * TSX
   */
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <QuizQues
        questions={questions}
        optionSelected={optionSelected}
        handleOptionSelected={handleOptionSelected}
      />
    </div>
  );
};

export default QuizApp;
