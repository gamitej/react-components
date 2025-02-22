export interface QuestionsType {
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

export type OptionsType = Record<number, any> | null;

export interface QuizQuesProps {
  questions: QuestionsType[];
  optionSelected: OptionsType;
  handleOptionSelected: (
    queNo: number,
    queName: string,
    selectedOption: number,
    isCorrect: boolean
  ) => void;
}
