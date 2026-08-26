import { Language } from "@community-kitchens/apiinterfaces";

const LanguageSwitch = ({
  setLanguage,
  language,
}: {
  setLanguage: (newLanguage: Language) => void;
  language: Language;
}) => {
  return (
    <div className="form-switch">
      <input
        data-testid="language-btn-english"
        type="radio"
        name="language"
        id="english"
        onChange={(e) => {
          if (e.target.checked) {
            setLanguage("English");
          }
        }}
      />
      <label
        htmlFor="english"
        className={language === "English" ? "form-switch-selected" : ""}
      >
        English
      </label>

      <input
        data-testid="language-btn-spanish"
        type="radio"
        name="language"
        id="spanish"
        onChange={(e) => {
          if (e.target.checked) {
            setLanguage("Spanish");
          }
        }}
      />
      <label
        htmlFor="spanish"
        className={language === "Spanish" ? "form-switch-selected" : ""}
      >
        Español
      </label>

      <input
        data-testid="language-btn-chinese"
        type="radio"
        name="language"
        id="chinese"
        onChange={(e) => {
          if (e.target.checked) {
            setLanguage("Chinese");
          }
        }}
      />
      <label
        htmlFor="chinese"
        className={language === "Chinese" ? "form-switch-selected" : ""}
      >
        中文
      </label>
    </div>
  );
};

export default LanguageSwitch;
