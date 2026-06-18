export interface Question {
  question: string;
  options: string[];
}

export type Language = "English";

export interface LanguageText {
  title: string;
  headerText: string;
  submitText: string;
  headers: string[];
  requiredText: string;
  successText: string;
  questions: {
    question: string;
    options: string[];
  }[];
}
