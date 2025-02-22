import { useState } from "react";
// components
import QuizQues from "./QuizQues";
// data & type
import { questions } from "./data";
import { OptionsType } from "./type";

const QuizApp = () => {
  const [optionSelected, setOptionSelected] = useState<OptionsType>(null);

  const handleOptionSelected = (
    queNo: number,
    queName: string,
    selectedOption: number,
    isCorrect: boolean
  ) => {
    setOptionSelected((state) => {
      return {
        ...state,
        [queNo]: { queName, optionNo: selectedOption, isCorrect },
      };
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
