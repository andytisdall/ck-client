import { Language } from "@community-kitchens/apiinterfaces";

import { LanguageText } from "../types";
import { English } from "./english";
import { Spanish } from "./spanish";
import { Chinese } from "./chinese";

export const questionsByLanguage: Record<Language, LanguageText> = {
  English,
  Spanish,
  Chinese,
};
