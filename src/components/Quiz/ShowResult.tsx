import { useState } from "react";
import { QuestionsType } from "./type";
import { useNavigate } from "react-router-dom";
import { useMultiForm } from "@/hooks/useMultiForm";

const ShowResult = ({
  result,
  questionAnswers,
}: {
  result: Record<number, any>;
  questionAnswers: QuestionsType[];
}) => {
  const navigate = useNavigate();
  const [showAnswers, setShowAnswers] = useState(false);

  const handleNavigateToHomePage = () => {
    navigate("/");
  };

  const {
    next,
    prev,
    isLast,
    isStart,
    section: pageNo,
    selectedPageData,
    totalSections: totalPages,
  } = useMultiForm(questionAnswers);

  if (!showAnswers) {
    const res = Object.entries(result).reduce((score: number, [, value]) => {
      if (value.isCorrect) score += 1;
      return score;
    }, 0);

    return (
      <div className="w-[20rem] p-4 rounded-md shadow bg-white">
        <h3 className="text-xl font-bold mb-2 pb-2 border-b text-gray-600 uppercase flex justify-center items-center">
          Result 🥳
        </h3>
        <div className="flex justify-center items-center gap-2 pb-4 pt-6">
          <h4 className="text-xl  text-blue-500 font-semibold">
            Your have Scored :
          </h4>
          <p className="text-xl text-gray-500 font-semibold">
            {res * 100}/{totalPages * 100}
          </p>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={() => setShowAnswers(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Show Answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[25rem]">
      {/* ==================== to check score ====================== */}
      <div className="py-2">
        <button
          onClick={() => setShowAnswers(false)}
          className="bg-green-400 text-white font-semibold px-4 py-2 rounded-md border-2 border-green-500 uppercase"
        >
          Check Score{" "}
        </button>
      </div>

      {/* ===================== questions with answers ======================= */}
      <div
        key={pageNo}
        className="flex flex-col gap-2 bg-white p-4 rounded-md shadow"
      >
        <h3 className="text-xl font-semibold text-gray-600">
          {selectedPageData.question} ({pageNo} / {totalPages})
        </h3>

        <div className="flex flex-col gap-2">
          {selectedPageData.options.map((opt, index) => (
            <p
              key={index}
              className={`px-2 py-2 rounded-md shadow ${
                opt.isCorrect ? "bg-green-300 border-2 border-green-500" : ""
              }`}
            >
              <span className="px-3 py-2 mr-2">{index + 1}.</span> {opt.option}
            </p>
          ))}
        </div>
        {/* ===================== user selected option ======================= */}
        <p className="text-blue-500 font-semibold text-center py-2">
          {result[pageNo] ? (
            <>
              {result[pageNo].isCorrect ? (
                <span className="font-semibold text-lg text-green-400 mr-2">
                  (Correct)
                </span>
              ) : (
                <span className="font-semibold text-lg text-red-400 mr-2">
                  (Wrong)
                </span>
              )}
              You selected option - {result[pageNo].optionNo + 1}{" "}
            </>
          ) : (
            "No option was selected"
          )}
        </p>
      </div>

      {/* ===================== next , prev buttons ======================= */}

      <div className="flex justify-between items-center gap-2 mt-5 text-lg">
        <button
          onClick={prev}
          disabled={isStart}
          className="px-4 py-1 bg-gray-500 text-white shadow rounded-sm uppercase disabled:bg-gray-300 hover:bg-gray-400"
        >
          Prev
        </button>

        {isLast ? (
          <button
            onClick={handleNavigateToHomePage}
            className="px-4 py-1 bg-blue-500 text-white shadow rounded-sm uppercase hover:bg-blue-600"
          >
            Home Page
          </button>
        ) : (
          <button
            onClick={next}
            className="px-4 py-1 bg-gray-500 text-white shadow rounded-sm uppercase hover:bg-gray-400"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowResult;
