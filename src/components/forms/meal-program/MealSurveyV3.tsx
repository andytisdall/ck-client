import { FormEventHandler, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  useSubmitFormMutation,
  FavoriteOptions,
} from "../../../state/apis/formApi";
import Loading from "../../reusable/loading/Loading";
import RadioFormSet from "../reusable/MealSurvey/RadioFormSet";
import MultiSelectSet from "../reusable/MealSurvey/MultiSelect";
import LanguageSwitch from "../reusable/MealSurvey/LanguageSwitch";
import { questionsByLanguage } from "./mealSurveyQuestions/mealSurveyQuestionsV3";
import { Language } from "./types";
import MultiRadioSet from "../reusable/MealSurvey/MultiRadioSet";

const NewMealSurvey = () => {
  const [language, setLanguage] = useState<Language>("English");

  // About
  const [age, setAge] = useState<string>();
  const [ethnicity, setEthnicity] = useState<string>();
  const [preferredLanguage, setPreferredLanguage] = useState<string>();
  const [otherPreferredLanguage, setOtherPreferredLanguage] = useState("");
  const [zip, setZip] = useState<string>();
  const [numberOfPeople, setNumberOfPeople] = useState<string>();
  const [children, setChildren] = useState<string>();

  // Housing
  const [homelessness, setHomelessness] = useState<string>();
  const [homelessnessOther, setHomelessnessOther] = useState("");
  const [cookingItems, setCookingItems] = useState<string[]>([]);
  const [cookingItemsOther, setCookingItemsOther] = useState("");

  // Health
  const [healthConcerns, setHealthConcerns] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [dietaryOther, setDietaryOther] = useState("");

  // Food
  const [fruit, setFruit] = useState<string>();
  const [favorites, setFavorites] = useState<FavoriteOptions>({});

  // Resources
  const [calfresh, setCalfresh] = useState<string>();
  const [resources, setResources] = useState<string[]>([]);

  // Feedback
  const [rating, setRating] = useState<string>();
  const [skip, setSkip] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [access, setAccess] = useState<string>();

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const {
    questions,
    title,
    headerText,
    submitText,
    headers,
    requiredText,
    successText,
  } = questionsByLanguage[language];

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await submitForm({
      formData: {
        language,
        age,
        ethnicity,
        preferredLanguage,
        otherPreferredLanguage,
        zip,
        numberOfPeople,
        children,
        homelessness,
        homelessnessOther,
        cookingItems,
        cookingItemsOther,
        healthConcerns,
        dietary,
        dietaryOther,
        fruit,
        favorites,
        calfresh,
        resources,
        rating,
        skip,
        location,
        access,
      },
      name: "NEW_MEAL_SURVEY",
    }).unwrap();

    navigate("/forms/form-sent", {
      state: {
        message: successText,
        redirect: "/forms/meal-survey",
      },
    });
  };

  return (
    <>
      <div className="form-item">
        <h1>{title}</h1>
        <div className="form-content">
          {headerText}
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
        <p className="required">{requiredText}</p>
      </div>

      <form onSubmit={onSubmit}>
        {
          // About
        }

        <div className="form-item">
          <strong>{headers[0]}</strong>
        </div>

        <RadioFormSet name="age" setValue={setAge} question={questions[0]} />

        <RadioFormSet
          name="ethnicity"
          setValue={setEthnicity}
          question={questions[1]}
        />

        <RadioFormSet
          name="preferredLanguage"
          setValue={setPreferredLanguage}
          question={questions[2]}
          customAnswer={otherPreferredLanguage}
          setCustomAnswer={setOtherPreferredLanguage}
        />

        <div className="form-item">
          <label htmlFor="zip">{questions[3].question}</label>
          <input
            id="zip"
            maxLength={5}
            value={zip}
            type="text"
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        <RadioFormSet
          name="number-of-people"
          setValue={setNumberOfPeople}
          question={questions[4]}
        />

        <RadioFormSet
          name="children"
          setValue={setChildren}
          question={questions[5]}
        />

        {
          // Housing
        }

        <div className="form-item">
          <strong>{headers[1]}</strong>
        </div>

        <RadioFormSet
          name="homelessness"
          setValue={setHomelessness}
          question={questions[6]}
          customAnswer={homelessnessOther}
          setCustomAnswer={setHomelessnessOther}
        />
        <MultiSelectSet
          setValue={setCookingItems}
          question={questions[7]}
          setCustomAnswer={setCookingItemsOther}
          customAnswer={cookingItemsOther}
        />

        {
          // Health
        }

        <div className="form-item">
          <strong>{headers[2]}</strong>
        </div>

        <MultiSelectSet setValue={setHealthConcerns} question={questions[8]} />

        <MultiSelectSet
          question={questions[9]}
          setValue={setDietary}
          customAnswer={dietaryOther}
          setCustomAnswer={setDietaryOther}
        />

        {
          // Food
        }
        <div className="form-item">
          <strong>{headers[3]}</strong>
        </div>

        <RadioFormSet
          name="fruit"
          question={questions[10]}
          setValue={setFruit}
        />

        <MultiRadioSet
          question={questions[11]}
          setValue={setFavorites}
          value={favorites as Record<string, number[]>}
        />

        {
          // Resources
        }
        <div className="form-item">
          <strong>{headers[4]}</strong>
        </div>

        <RadioFormSet
          name="calfresh"
          setValue={setCalfresh}
          question={questions[12]}
        />

        <RadioFormSet
          name="resources"
          setValue={setResources}
          question={questions[13]}
        />

        {
          // Feedback
        }
        <div className="form-item">
          <strong>{headers[5]}</strong>
        </div>

        <RadioFormSet
          name="rating"
          setValue={setRating}
          question={questions[14]}
        />
        <RadioFormSet name="skip" setValue={setSkip} question={questions[16]} />
        <RadioFormSet
          name="location"
          setValue={setLocation}
          question={questions[15]}
        />
        <RadioFormSet
          name="access"
          setValue={setAccess}
          question={questions[16]}
        />

        {!isLoading ? <input type="submit" value={submitText} /> : <Loading />}
      </form>
    </>
  );
};

export default NewMealSurvey;
