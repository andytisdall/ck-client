import { Language } from "../../meal-program/types";

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
        className={
          language === "English"
            ? "form-switch-selected-english"
            : "form-switch-label"
        }
      >
        English
      </label>

      {/* <div
        className={`form-switch-toggle ${
          language === "Spanish" ? "form-switch-toggled" : ""
        }`}
        onClick={() => {
          if (language === "English") {
            setLanguage("Spanish");
          } else {
            setLanguage("English");
          }
        }}
      >
        <div className="form-switch-button"></div>
      </div>

      <input
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
        className={
          language === "Spanish"
            ? "form-switch-selected-spanish"
            : "form-switch-label"
        }
      >
        Español
      </label> */}
    </div>
  );
};

export default LanguageSwitch;
