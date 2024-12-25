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
  const [language, setLanguage] = useState<'English' | 'Spanish'>('English');
  const [microwave, setMicrowave] = useState<boolean>();
  const [heatFood, setHeatFood] = useState<boolean>();
  const [utensils, setUtensils] = useState<boolean>();
  const [numberOfPeople, setNumberOfPeople] = useState<string>();
  const [children, setChildren] = useState<boolean>();
  const [time, setTime] = useState([]);
  const [mealType, setMealType] = useState([]);
  const [dietary, setDietary] = useState([]);
  const [protein, setProtein] = useState([]);
  const [fruit, setFruit] = useState<boolean>();
  const [salad, setSalad] = useState<boolean>();
  const [taste, setTaste] = useState<boolean>();
  const [access, setAccess] = useState<boolean>();
  const [skip, setSkip] = useState<boolean>();

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const title = 'Meal Quality Survey';
  const headerText = '';

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await submitForm({
      formData: {
        microwave,
        heatFood,
        utensils,
        numberOfPeople,
        children,
        time,
        mealType,
        dietary,
        protein,
        fruit,
        salad,
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
          name="microwave"
          setValue={setMicrowave}
          question={questions[0]}
          language={language}
        />

        {microwave === false && (
          <RadioFormSet
            name="heat-food"
            setValue={setHeatFood}
            question={questions[1]}
            language={language}
          />
        )}

        <RadioFormSet
          name="utensils"
          setValue={setUtensils}
          question={questions[2]}
          language={language}
        />

        <RadioFormSet
          name="number-of-people"
          setValue={setNumberOfPeople}
          question={questions[3]}
          language={language}
        />

        <RadioFormSet
          name="children"
          setValue={setChildren}
          question={questions[4]}
          language={language}
        />

        <MultiSelectSet
          label={questions[5][language]}
          options={questions[5].options![language]}
          setValue={setTime}
        />

        <MultiSelectSet
          label={questions[6][language]}
          options={questions[6].options![language]}
          setValue={setMealType}
        />

        <MultiSelectSet
          label={questions[7][language]}
          options={questions[7].options![language]}
          setValue={setDietary}
        />

        <MultiSelectSet
          label={questions[8][language]}
          options={questions[8].options![language]}
          setValue={setProtein}
        />

        <RadioFormSet
          name="fruit"
          setValue={setFruit}
          question={questions[9]}
          language={language}
        />

        <RadioFormSet
          name="salad"
          setValue={setSalad}
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
