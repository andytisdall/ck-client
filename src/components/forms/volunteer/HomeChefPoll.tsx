import { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setError } from "../../../state/apis/slices/errorSlice";
import { useSubmitFormMutation } from "../../../state/apis/formApi";
import Loading from "../../reusable/loading/Loading";

const HomeChefPoll = () => {
  const [city, setCity] = useState("");
  const [miles, setMiles] = useState("");
  const [active, setActive] = useState<boolean>();
  const [support, setSupport] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (active === undefined) {
      return dispatch(setError("Please fill out all required fields"));
    }
    await submitForm({
      name: "HOME_CHEF_POLL",
      formData: {
        city,
        miles,
        active,
        support,
      },
    }).unwrap();
    navigate("/forms/form-sent");
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-item">
        <label>
          What city do you live in? <span className="required">*</span>
        </label>
        <input
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label>
          How many miles would you travel to drop off meals?{" "}
          <span className="required">*</span>
        </label>
        <input
          required
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label>
          Are you currently an active home chef (Delivered at least once in
          2026)? <span className="required">*</span>
        </label>
        <div className="form-checkout">
          <input
            type="radio"
            name="active"
            id="active-yes"
            onChange={(e) => setActive(e.target.checked)}
          />
          <label htmlFor="active-yes">Yes</label>
        </div>
        <div className="form-checkout">
          <input
            type="radio"
            name="active"
            id="active-no"
            onChange={(e) => setActive(!e.target.checked)}
          />
          <label htmlFor="active-no">No</label>
        </div>
      </div>
      <div className="form-item">
        <label>
          If inactive, how can we support getting you involved again?
        </label>
        <textarea
          value={support}
          onChange={(e) => setSupport(e.target.value)}
        />
      </div>
      {isLoading ? <Loading /> : <input type="submit" />}
    </form>
  );
};

export default HomeChefPoll;
