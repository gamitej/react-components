import { useTimer } from "@/hooks/useTimer";
import { QuizQuesProps } from "./type";
import { useMultiForm } from "@/hooks/useMultiForm";
import { useEffect } from "react";
import ShowResult from "./ShowResult";

const QuizQues = ({
  optionSelected,
  questions = [],
  handleOptionSelected,
}: QuizQuesProps) => {
  const { isFinished, minutes, seconds, start } = useTimer({
    timeNo: 10,
    timerType: "sec",
  });

  const {
    next,
    prev,
    isLast,
    isStart,
    section: pageNo,
    selectedPageData,
    totalSections: totalPages,
  } = useMultiForm(questions);

  useEffect(() => {
    start();
  }, []);

  if (isFinished) {
    return (
      <ShowResult result={optionSelected ?? {}} questionAnswers={questions} />
    );
  }

  /**
   * TSX
   */
  return (
    <div className="relative w-[40rem] flex flex-col justify-center items-center bg-white px-12 pt-6 pb-4 gap-4 rounded-md shadow">
      <span className="absolute top-4 right-4 text-gray-400 text-xl font-[550]">
        {pageNo}/{totalPages}
      </span>
      <span className="absolute top-4 left-4 text-white text-lg font-[550] bg-blue-500 rounded-sm px-2 py-1 flex justify-center items-center">
        {minutes} : {seconds}
      </span>
      <div className="flex flex-col justify-center items-center">
        <div
          key={selectedPageData.question}
          className="w-full flex flex-col justify-center items-center gap-8"
        >
          <h2 className="text-gray-600 text-2xl font-[550]">
            {selectedPageData.question}
          </h2>
          <div className="w-full grid grid-cols-2 gap-4">
            {selectedPageData.options.map(({ option, isCorrect }, optionNo) => (
              <p
                key={option}
                onClick={() =>
                  handleOptionSelected(
                    pageNo,
                    selectedPageData.question,
                    optionNo,
                    isCorrect
                  )
                }
                aria-selected={
                  optionSelected
                    ? optionSelected[pageNo]?.optionNo === optionNo
                      ? true
                      : false
                    : false
                }
                className="aria-selected:bg-blue-300 col-span-1 min-w-[15rem] bg-gray-200 px-4 py-2 text-center rounded-sm text-gray-600 cursor-pointer hover:ring-2 hover:ring-gray-400 duration-300 ease-in-out aria"
              >
                {option}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 mt-5 text-lg">
        <button
          onClick={prev}
          disabled={isStart}
          className="px-4 py-1 bg-gray-500 text-white shadow rounded-sm uppercase disabled:bg-gray-200 hover:bg-gray-400"
        >
          prev
        </button>
        {isLast ? (
          <button
            onClick={next}
            className="px-4 py-1 bg-blue-500 text-white shadow rounded-sm uppercase hover:bg-blue-600"
          >
            finish
          </button>
        ) : (
          <button
            onClick={next}
            className="px-4 py-1 bg-gray-500 text-white shadow rounded-sm uppercase hover:bg-gray-400"
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQues;
