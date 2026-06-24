export interface Question {
  question: string;
  options: string[];
}

export type Language = "English";

export interface LanguageText {
  displayText: {
    title: string;
    headerText: string;
    submitText: string;
    headers: string[];
    requiredText: string;
    successHeader: string;
    successText: string;
  };
  questions: Question[];
  errors: {
    incomplete: string;
    ratingError: string;
    required: string;
  };
}
