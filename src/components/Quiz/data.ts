import { QuestionsType } from "./type";

export const questions: QuestionsType[] = [
  {
    question: "What is my name ?",
    options: [
      { option: "A", isCorrect: false },
      { option: "B", isCorrect: false },
      { option: "C", isCorrect: true },
      { option: "D", isCorrect: false },
    ],
  },
  {
    question: "What is dog pet name?",
    options: [
      { option: "A", isCorrect: false },
      { option: "Brunno", isCorrect: true },
      { option: "C", isCorrect: false },
      { option: "D", isCorrect: false },
    ],
  },
  {
    question: "Captical of M.P ?",
    options: [
      { option: "Agra", isCorrect: false },
      { option: "Chitrakoot", isCorrect: false },
      { option: "Delhi", isCorrect: false },
      { option: "Bhopal", isCorrect: true },
    ],
  },
];
