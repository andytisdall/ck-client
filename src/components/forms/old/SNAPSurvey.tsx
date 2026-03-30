import { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setError } from "../../../state/apis/slices/errorSlice";
import { useSubmitFormMutation } from "../../../state/apis/formApi";
import YesOrNo from "../reusable/YesOrNo";
import DateEntry from "../reusable/DateEntry";
import NumberEntry from "../reusable/NumberEntry";
import Loading from "../../reusable/loading/Loading";
import FormHeader from "../reusable/MealSurvey/FormHeader";

const SNAPSurvey = () => {
  const [receiveSNAP, setReceiveSNAP] = useState<boolean>();
  const [november, setNovember] = useState<boolean>();
  const [whatDay, setWhatDay] = useState<string>();
  const [howMuch, setHowMuch] = useState<string>();
  const [reduce, setReduce] = useState<boolean>();

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (receiveSNAP === undefined) {
      return dispatch(setError("Please fill out the required questions"));
    }
    await submitForm({
      formData: {
        receiveSNAP,
        november,
        whatDay,
        howMuch,
        reduce,
      },
      name: "SNAP_SURVEY",
    }).unwrap();
    navigate("/forms/form-sent");
  };

  return (
    <form onSubmit={onSubmit}>
      <FormHeader title="SNAP Benefits Survey">
        <div>
          Thank you for filling out this form about your SNAP benefits. Your
          answers will help CK better serve the community. Your data is
          completely anonymous and will not be sold.
        </div>
      </FormHeader>
      <YesOrNo
        question="Do you currently receive SNAP benefits?"
        setValue={setReceiveSNAP}
        name="snap"
        required
      />

      <YesOrNo
        question="Did you get your November 2025 benefits?"
        setValue={setNovember}
        name="nov"
      />

      <DateEntry
        value={whatDay}
        setValue={setWhatDay}
        name="what-day"
        question="What day did you get your benefits?"
      />
      <NumberEntry
        value={howMuch}
        setValue={setHowMuch}
        name="how-much"
        question="How much (dollar value) benefits did you receive?"
      />
      <YesOrNo
        setValue={setReduce}
        name="reduce"
        question="Is your November benefit amount less than what you received in October?"
      />

      {isLoading ? <Loading /> : <input type="submit" />}
    </form>
  );
};

export default SNAPSurvey;
