import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSubmitFormMutation } from "../../../state/apis/formApi";
import Loading from "../../reusable/loading/Loading";

const Bike = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bikeNotes, setBikeNotes] = useState("");

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    submitForm({
      formData: {
        email,
        firstName,
        lastName,
        bikeNotes,
      },
      name: "BIKE_SIGNUP",
    })
      .unwrap()
      .then(() => {
        navigate("/forms/form-sent", {
          state: {
            message:
              "Thanks for your interest! You will receive a confirmation email.",
          },
        });
      });
  };

  const header = () => {
    return (
      <div className="form-item">
        <h2>CK Bike Volunteers</h2>
        <img
          className="form-img"
          src="https://storage.googleapis.com/coherent-vision-368820.appspot.com/burritoroll.jpeg"
          alt="CK Bike Volunteers"
        />
        <p>
          Next Date: <strong>Sunday, 7/13</strong> - 1pm - 3pm
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
          To sign up for the next bike volunteer event, give us the following
          info.
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

        <div className="form-item">
          <label>
            Do you have any equipment on your bike that allows you to carry more
            cargo?
          </label>
          <input
            type="text"
            value={bikeNotes}
            onChange={(e) => setBikeNotes(e.target.value)}
            required
          />
        </div>

        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default Bike;
