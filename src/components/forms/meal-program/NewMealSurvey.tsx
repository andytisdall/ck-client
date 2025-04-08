import { FormEventHandler, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSubmitFormMutation } from "../../../state/apis/formApi";
import FormHeader from "./../reusable/FormHeader";
import Loading from "../../reusable/loading/Loading";
import RadioFormSet from "./../reusable/RadioFormSet";
import MultiSelectSet from "./../reusable/MultiSelect";
import LanguageSwitch from "./../reusable/LanguageSwitch";
import { questions } from "./mealSurveyQuestions";

const NewMealSurvey = () => {
  const [age, setAge] = useState<string>();
  const [ethnicity, setEthnicity] = useState<string>();
  const [zip, setZip] = useState<string>();

  const [language, setLanguage] = useState<"English" | "Spanish">("English");
  const [microwave, setMicrowave] = useState<boolean>();
  const [fridge, setFridge] = useState<boolean>();

  const [utensils, setUtensils] = useState<boolean>();
  const [numberOfPeople, setNumberOfPeople] = useState<string>();
  const [children, setChildren] = useState<boolean>();
  const [time, setTime] = useState<string>();
  const [mealType, setMealType] = useState<string>();
  const [mealType2, setMealType2] = useState<string>();
  const [dietary, setDietary] = useState<string[]>([]);
  const [fruit, setFruit] = useState<boolean>();
  const [taste, setTaste] = useState<boolean>();
  const [access, setAccess] = useState<boolean>();
  const [skip, setSkip] = useState<string>();
  const [diabetes, setDiabetes] = useState<boolean>();
  const [hbp, setHpb] = useState<boolean>();

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const title = {English: "Meal Quality Survey", Spanish: 'Encuesta de calidad de las comidas'}
  const headerText = {English: "Thank you for completing the Community Kitchens meal survey. Rest assured, your personal data will remain confidential. Your input is invaluable and plays a crucial role in securing funding to provide free meals to those in need.", Spanish: "Gracias por completar la encuesta sobre comidas de Community Kitchens. Tenga la seguridad de que sus datos personales se mantendrán confidenciales. Su aporte es invaluable y desempeña un papel crucial en la obtención de fondos para brindar comidas gratuitas a quienes las necesitan."}


  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await submitForm({
      formData: {
        language,
        age,
        ethnicity,
        zip,
        microwave,
        fridge,
        utensils,
        numberOfPeople,
        children,
        time,
        mealType,
        mealType2,
        dietary,
        fruit,
        taste,
        access,
        skip,
        diabetes,
        hbp,
      },
      name: "NEW_MEAL_SURVEY",
    }).unwrap();
    navigate("/forms/form-sent", {
      state: {
        message:
          "Thank you for filling out this survey! We will use your info to improve our free meal program.",
        reload: true,
      },
    });
  };

  return (
    <>
      <FormHeader title={title[language]} spanish={language==='Spanish'}>
        {headerText[language]}
        <LanguageSwitch language={language} setLanguage={setLanguage} />
      </FormHeader>

      <form onSubmit={onSubmit}>
        <RadioFormSet
          name="age"
          setValue={setAge}
          question={questions[0]}
          language={language}
        />
        <RadioFormSet
          name="ethnicity"
          setValue={setEthnicity}
          question={questions[1]}
          language={language}
        />
        <div className="form-item">
          <label htmlFor="zip">{questions[14][language]}</label>
          <input
            id="zip"
            maxLength={5}
            value={zip}
            type="text"
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <RadioFormSet
          name="fridge"
          setValue={setFridge}
          question={questions[15]}
          language={language}
        />
        <RadioFormSet
          name="microwave"
          setValue={setMicrowave}
          question={questions[2]}
          language={language}
        />
        <RadioFormSet
          name="utensils"
          setValue={setUtensils}
          question={questions[3]}
          language={language}
        />
        <RadioFormSet
          name="number-of-people"
          setValue={setNumberOfPeople}
          question={questions[4]}
          language={language}
        />
        <RadioFormSet
          name="children"
          setValue={setChildren}
          question={questions[5]}
          language={language}
        />
        <RadioFormSet
          name="time"
          question={questions[6]}
          language={language}
          setValue={setTime}
        />
        <RadioFormSet
          name="mealType"
          language={language}
          question={questions[7]}
          setValue={setMealType}
        />
        <RadioFormSet
          name="mealType2"
          language={language}
          question={questions[8]}
          setValue={setMealType2}
        />
        <MultiSelectSet
          label={questions[9][language]}
          question={questions[9]}
          setValue={setDietary}
          language={language}
        />
        <RadioFormSet
          name="fruit"
          setValue={setFruit}
          question={questions[10]}
          language={language}
        />
        <RadioFormSet
          name="taste"
          setValue={setTaste}
          question={questions[11]}
          language={language}
        />
        <RadioFormSet
          name="access"
          setValue={setAccess}
          question={questions[12]}
          language={language}
        />
        <RadioFormSet
          name="skip"
          setValue={setSkip}
          question={questions[13]}
          language={language}
        />
        <RadioFormSet
          name="diabetes"
          setValue={setDiabetes}
          question={questions[16]}
          language={language}
        />
        <RadioFormSet
          name="hbp"
          setValue={setHpb}
          question={questions[17]}
          language={language}
        />
        {!isLoading ? <input type="submit" value={language ==='Spanish' ? 'Enviar' : "Submit"} /> : <Loading />}
      </form>
    </>
  );
};

export default NewMealSurvey;
