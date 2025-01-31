import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSubmitFormMutation } from '../../../state/apis/formApi';
import FormHeader from './../reusable/FormHeader';
import Loading from '../../reusable/loading/Loading';
import RadioFormSet from './../reusable/RadioFormSet';
import MultiSelectSet from './../reusable/MultiSelect';
import LanguageSwitch from './../reusable/LanguageSwitch';
import { questions } from './mealSurveyQuestions';

const NewMealSurvey = () => {
  const [age, setAge] = useState<string>();
  const [ethnicity, setEthnicity] = useState<string>();
  const [zip, setZip] = useState<string>();

  const [language, setLanguage] = useState<'English' | 'Spanish'>('English');
  const [microwave, setMicrowave] = useState<boolean>();
  const [utensils, setUtensils] = useState<boolean>();
  const [numberOfPeople, setNumberOfPeople] = useState<string>();
  const [children, setChildren] = useState<boolean>();
  const [time, setTime] = useState<string>();
  const [mealType, setMealType] = useState<string>();
  const [mealType2, setMealType2] = useState<string>();
  const [dietary, setDietary] = useState([]);
  const [fruit, setFruit] = useState<boolean>();
  const [taste, setTaste] = useState<boolean>();
  const [access, setAccess] = useState<boolean>();
  const [skip, setSkip] = useState<string>();

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const title = 'Meal Quality Survey';
  const headerText = '';

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await submitForm({
      formData: {
        age,
        ethnicity,
        zip,
        microwave,
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
      },
      name: 'NEW_MEAL_SURVEY',
    }).unwrap();
    navigate('/forms/form-sent', {
      state: {
        message:
          'Thank you for filling out this survey! We will use your info to improve our free meal program.',
        reload: true,
      },
    });
  };

  return (
    <>
      <FormHeader title={title}>
        {headerText}
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
          <label htmlFor="zip">What is your zip code?</label>
          <input
            id="zip"
            maxLength={5}
            value={zip}
            type="text"
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

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
          options={questions[9].options![language]}
          setValue={setDietary}
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

        {!isLoading ? <input type="submit" value="Submit" /> : <Loading />}
      </form>
    </>
  );
};

export default NewMealSurvey;
