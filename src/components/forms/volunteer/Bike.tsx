import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSubmitFormMutation } from "../../../state/apis/formApi";
import Loading from "../../reusable/loading/Loading";

const Bike = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await submitForm({
      formData: {
        email,
        firstName,
        lastName,
      },
      name: "BIKE_SIGNUP",
    }).unwrap();
    navigate("/forms/form-sent", {
      state: {
        message:
          "Thanks for your interest! You will receive a confirmation email.",
      },
    });
  };

  const header = () => {
    return (
      <div className="form-item">
        <div className="form-bike-headline">
          <img
            src="/images/volunteers/drivers/vehicle-Bike.jpg"
            alt="bicycle"
          />
          <h1 className="form-center-text">CK Mobile Meal Team</h1>
          <img
            src="/images/volunteers/drivers/vehicle-Bike.jpg"
            alt="bicycle"
          />
        </div>
        <img
          className="form-img"
          src="https://storage.googleapis.com/coherent-vision-368820.appspot.com/burritoroll.jpeg"
          alt="CK Bike Volunteers"
        />
        <p>
          Next Date: <strong>Sunday, 8/10</strong> - 12pm - 2pm
        </p>
        <br />
        <p>
          Join our group of volunteers on bikes and help distribute meals to
          people in need. If you love biking and helping others, we'd love to
          get you on our team to help bring a little health and happiness to our
          neighbors living on the streets.
        </p>
        <br />
        <p>
          If you're interested in participating in a Mobile Meal Team event,
          please give us the following info.
        </p>
        <br />
        <p className="required">* Indicates required question</p>
      </div>
    );
  };

  return (
    <>
      {header()}
      <form onSubmit={onSubmit}>
        <div className="form-item">
          <label>
            Email<span className="required">*</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label>
            First Name<span className="required">*</span>
          </label>
          <input
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>
            Last Name<span className="required">*</span>
          </label>
          <input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default Bike;
