import { FormEventHandler, useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSubmitFormMutation } from "../../../state/apis/formApi";
import { setError } from "../../../state/apis/slices/errorSlice";
import Loading from "../../reusable/loading/Loading";
import RadioFormSet from "../reusable/MealSurvey/RadioFormSet";
import MultiSelectSet from "../reusable/MealSurvey/MultiSelect";
import LanguageSwitch from "../reusable/MealSurvey/LanguageSwitch";
import { questionsByLanguage } from "./mealSurveyQuestions/mealSurveyQuestionsV3";
import { Language } from "@community-kitchens/apiinterfaces";
import MultiRadioSet from "../reusable/MealSurvey/MultiRadioSet";

const NewMealSurvey = () => {
  const [queryParams] = useSearchParams();

  const [language, setLanguage] = useState<Language>("English");

  // About
  const [age, setAge] = useState<number>();
  const [ethnicity, setEthnicity] = useState<number>();
  const [preferredLanguage, setPreferredLanguage] = useState<number>();
  const [otherPreferredLanguage, setOtherPreferredLanguage] = useState("");
  const [zip, setZip] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState<number>();
  const [children, setChildren] = useState<number>();

  // Housing
  const [homelessness, setHomelessness] = useState<number>();
  const [homelessnessOther, setHomelessnessOther] = useState("");
  const [cookingItems, setCookingItems] = useState<number[]>([]);
  const [cookingItemsOther, setCookingItemsOther] = useState("");

  // Health
  const [healthConcerns, setHealthConcerns] = useState<number[]>([]);
  const [dietary, setDietary] = useState<number[]>([]);
  const [dietaryOther, setDietaryOther] = useState("");

  // Food
  const [fruit, setFruit] = useState<number>();
  const [favorites, setFavorites] = useState<Record<number, number[]>>({});

  // Resources
  const [calfresh, setCalfresh] = useState<number>();
  const [resources, setResources] = useState<number[]>([]);
  const [resourcesOther, setResourcesOther] = useState("");

  // Feedback
  const [rating, setRating] = useState<number>();
  const [skip, setSkip] = useState<number>();
  const [location, setLocation] = useState<number[]>([]);
  const [locationOther, setLocationOther] = useState("");
  const [access, setAccess] = useState<number>();

  // Errors
  const [unanswered, setUnanswered] = useState<number[]>([]);

  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = useLocation();

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
      } else if (q === undefined) {
        currentlyUnanswered.push(i);
      } else if (typeof q === "string" && !q) {
        currentlyUnanswered.push(i);
      } else if (
        // validate that food favorites matrix is complete
        (typeof q !== "number" &&
          typeof q !== "string" &&
          Object.keys(q).length !== 7) ||
        !Object.values(q).every((arr) => arr.length === 1)
      ) {
        currentlyUnanswered.push(i);
      }
    });

    if (currentlyUnanswered.length) {
      dispatch(setError(errors.incomplete));
      return setUnanswered(currentlyUnanswered);
    }

    const englishQuestions = questionsByLanguage.English.questions;

    const favoriteKeys = Object.keys(favorites);
    const favoriteOptions = englishQuestions[11].options;
    const newFavs: Record<string, number> = {};
    favoriteKeys.forEach((index) => {
      const cuisine = favoriteOptions[parseInt(index)];
      newFavs[cuisine] = favorites[parseInt(index)][0];
    });

    // detect link source from query params
    const source = queryParams.get("source") || undefined;

    await submitForm({
      formData: {
        language,
        age: englishQuestions[0].options[age!],
        ethnicity: englishQuestions[1].options[ethnicity!],
        preferredLanguage: englishQuestions[2].options[preferredLanguage!],
        otherPreferredLanguage,
        zip,
        numberOfPeople: englishQuestions[4].options[numberOfPeople!],
        children: englishQuestions[5].options[children!],
        homelessness: englishQuestions[6].options[homelessness!],
        homelessnessOther,
        cookingItems: cookingItems.map((i) => englishQuestions[7].options[i]),
        cookingItemsOther,
        healthConcerns: healthConcerns.map(
          (i) => englishQuestions[8].options[i],
        ),
        dietary: dietary.map((i) => englishQuestions[9].options[i]),
        dietaryOther,
        fruit: englishQuestions[10].options[fruit!],
        favorites: newFavs,
        calfresh: englishQuestions[12].options[calfresh!],
        resources: resources.map((i) => englishQuestions[13].options[i]),
        resourcesOther,
        rating: englishQuestions[14].options[rating!],
        skip: englishQuestions[15].options[skip!],
        location: location.map((i) => englishQuestions[16].options[i]),
        locationOther,
        access: englishQuestions[17].options[access!],
        source,
      },
      name: "MEAL_SURVEY_V3",
    }).unwrap();

    navigate("/forms/form-sent", {
      state: {
        title: successHeader,
        message: successText,
        redirect: url.pathname,
      },
    });
  };

  const requiredAsterisk = <span className="required">*</span>;

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
          error={unanswered.includes(0) ? errors.required : undefined}
        />

        <RadioFormSet
          name="ethnicity"
          setValue={setEthnicity}
          question={questions[1]}
          error={unanswered.includes(1) ? errors.required : undefined}
        />

        <RadioFormSet
          name="preferredLanguage"
          setValue={setPreferredLanguage}
          question={questions[2]}
          customAnswer={otherPreferredLanguage}
          setCustomAnswer={setOtherPreferredLanguage}
          error={unanswered.includes(2) ? errors.required : undefined}
        />

        <div
          className={`form-item ${unanswered.includes(3) ? "form-error" : ""}`}
        >
          <label htmlFor="zip">
            {questions[3].question}
            {requiredAsterisk}
          </label>
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
          error={unanswered.includes(4) ? errors.required : undefined}
        />

        <RadioFormSet
          name="children"
          setValue={setChildren}
          question={questions[5]}
          error={unanswered.includes(5) ? errors.required : undefined}
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
          error={unanswered.includes(6) ? errors.required : undefined}
        />
        <MultiSelectSet
          setValue={setCookingItems}
          question={questions[7]}
          setCustomAnswer={setCookingItemsOther}
          customAnswer={cookingItemsOther}
          error={unanswered.includes(7) ? errors.required : undefined}
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
          error={unanswered.includes(8) ? errors.required : undefined}
        />

        <MultiSelectSet
          question={questions[9]}
          setValue={setDietary}
          customAnswer={dietaryOther}
          setCustomAnswer={setDietaryOther}
          error={unanswered.includes(9) ? errors.required : undefined}
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
          error={unanswered.includes(10) ? errors.required : undefined}
        />

        <MultiRadioSet
          question={questions[11]}
          setValue={setFavorites}
          value={favorites as Record<string, number[]>}
          columnError={errors.ratingError}
          error={unanswered.includes(11) ? errors.required : undefined}
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
          error={unanswered.includes(12) ? errors.required : undefined}
        />

        <MultiSelectSet
          setValue={setResources}
          question={questions[13]}
          customAnswer={resourcesOther}
          setCustomAnswer={setResourcesOther}
          error={unanswered.includes(13) ? errors.required : undefined}
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
          error={unanswered.includes(14) ? errors.required : undefined}
        />
        <RadioFormSet
          name="skip"
          setValue={setSkip}
          question={questions[15]}
          error={unanswered.includes(15) ? errors.required : undefined}
        />
        <MultiSelectSet
          setValue={setLocation}
          question={questions[16]}
          customAnswer={locationOther}
          setCustomAnswer={setLocationOther}
          error={unanswered.includes(16) ? errors.required : undefined}
        />
        <RadioFormSet
          name="access"
          setValue={setAccess}
          question={questions[17]}
          error={unanswered.includes(17) ? errors.required : undefined}
        />

        {!isLoading ? <input type="submit" value={submitText} /> : <Loading />}
      </form>
    </>
  );
};

export default NewMealSurvey;
