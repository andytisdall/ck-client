import { FormEventHandler, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  useSubmitFormMutation,
  FavoriteOptions,
} from "../../../state/apis/formApi";
import { setError } from "../../../state/apis/slices/errorSlice";
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
  const [zip, setZip] = useState("");
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
  const [resourcesOther, setResourcesOther] = useState("");

  // Feedback
  const [rating, setRating] = useState<string>();
  const [skip, setSkip] = useState<string>();
  const [location, setLocation] = useState<string[]>([]);
  const [locationOther, setLocationOther] = useState("");
  const [access, setAccess] = useState<string>();

  const [unanswered, setUnanswered] = useState<number[]>([]);

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { questions, displayText, errors } = questionsByLanguage[language];

  const {
    title,
    headerText,
    submitText,
    successHeader,
    headers,
    requiredText,
    successText,
  } = displayText;

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const currentlyUnanswered: number[] = [];

    [
      age,
      ethnicity,
      preferredLanguage,
      zip,
      numberOfPeople,
      children,
      homelessness,
      cookingItems,
      healthConcerns,
      dietary,
      fruit,
      favorites,
      calfresh,
      resources,
      rating,
      skip,
      location,
      access,
    ].forEach((q, i) => {
      if (Array.isArray(q)) {
        if (q.length === 0) {
          currentlyUnanswered.push(i);
        }
      } else if (!q) {
        currentlyUnanswered.push(i);
      } else if (
        (typeof q !== "string" && Object.keys(q).length !== 7) ||
        !Object.values(q).every((arr) => arr.length === 1)
      ) {
        currentlyUnanswered.push(i);
      }
    });

    if (currentlyUnanswered.length) {
      console.log(currentlyUnanswered);
      dispatch(setError(errors.incomplete));
      return setUnanswered(currentlyUnanswered);
    }

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
        resourcesOther,
        rating,
        skip,
        location,
        locationOther,
        access,
      },
      name: "MEAL_SURVEY_V3",
    }).unwrap();

    navigate("/forms/form-sent", {
      state: {
        title: successHeader,
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

        <RadioFormSet
          name="age"
          setValue={setAge}
          question={questions[0]}
          error={unanswered.includes(0)}
        />

        <RadioFormSet
          name="ethnicity"
          setValue={setEthnicity}
          question={questions[1]}
          error={unanswered.includes(1)}
        />

        <RadioFormSet
          name="preferredLanguage"
          setValue={setPreferredLanguage}
          question={questions[2]}
          customAnswer={otherPreferredLanguage}
          setCustomAnswer={setOtherPreferredLanguage}
          error={unanswered.includes(2)}
        />

        <div
          className={`form-item ${unanswered.includes(3) ? "form-error" : ""}`}
        >
          <label htmlFor="zip">{questions[3].question}</label>
          <input
            data-testid="zip"
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
          error={unanswered.includes(4)}
        />

        <RadioFormSet
          name="children"
          setValue={setChildren}
          question={questions[5]}
          error={unanswered.includes(5)}
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
          error={unanswered.includes(6)}
        />
        <MultiSelectSet
          setValue={setCookingItems}
          question={questions[7]}
          setCustomAnswer={setCookingItemsOther}
          customAnswer={cookingItemsOther}
          error={unanswered.includes(7)}
        />

        {
          // Health
        }

        <div className="form-item">
          <strong>{headers[2]}</strong>
        </div>

        <MultiSelectSet
          setValue={setHealthConcerns}
          question={questions[8]}
          error={unanswered.includes(8)}
        />

        <MultiSelectSet
          question={questions[9]}
          setValue={setDietary}
          customAnswer={dietaryOther}
          setCustomAnswer={setDietaryOther}
          error={unanswered.includes(9)}
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
          error={unanswered.includes(10)}
        />

        <MultiRadioSet
          question={questions[11]}
          setValue={setFavorites}
          value={favorites as Record<string, number[]>}
          errorMsg={errors.ratingError}
          error={unanswered.includes(6)}
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
          error={unanswered.includes(12)}
        />

        <MultiSelectSet
          setValue={setResources}
          question={questions[13]}
          customAnswer={resourcesOther}
          setCustomAnswer={setResourcesOther}
          error={unanswered.includes(13)}
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
          error={unanswered.includes(14)}
        />
        <RadioFormSet
          name="skip"
          setValue={setSkip}
          question={questions[15]}
          error={unanswered.includes(15)}
        />
        <MultiSelectSet
          setValue={setLocation}
          question={questions[16]}
          customAnswer={locationOther}
          setCustomAnswer={setLocationOther}
          error={unanswered.includes(16)}
        />
        <RadioFormSet
          name="access"
          setValue={setAccess}
          question={questions[17]}
          error={unanswered.includes(17)}
        />

        {!isLoading ? <input type="submit" value={submitText} /> : <Loading />}
      </form>
    </>
  );
};

export default NewMealSurvey;
