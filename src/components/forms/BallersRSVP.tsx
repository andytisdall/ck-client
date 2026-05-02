import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../reusable/loading/Loading";
import { useSubmitFormMutation } from "../../state/apis/formApi";

const BallersRSVP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [additional, setAdditional] = useState(false);
  const [numberOfAdditional, setNumberOfAdditional] = useState("");

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await submitForm({
      formData: { name, email, numberOfPeople, additional, numberOfAdditional },
      name: "BALLERS_RSVP",
    }).unwrap();
    navigate("../form-sent");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>Oakland Ballers Ultimate Tailgate & Game</h1>
        <img src="/images/logos/ballers.jpg" alt="Oakland Ballers" />
        <div className="form-center-text">
          <br />
          <div>
            <strong>Saturday, July 11th</strong>
          </div>
          <br />
          <div>
            <strong>Tailgate</strong>
          </div>
          <div>1601 18th Street, 2pm - 4:30pm</div>
          <br />
          <div>
            <strong>Ballers Game</strong>
          </div>
          <div>Raimondi Park, 4:35pm</div>
        </div>
        <br />
        <br />
        <div>
          RSVP below for your purchased tickets to this event. You can also
          request additional tickets.
        </div>
        <br />
        <p className="required">* Indicates required question</p>
      </div>
      <div className="form-item">
        <label htmlFor="name">
          Name:<span className="required">*</span>
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="email">
          Email:<span className="required">*</span>
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="people">
          Number of people in your party:<span className="required">*</span>
        </label>
        <input
          id="people"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label>
          Would you like to purchase additional tickets?
          <span className="required">*</span>
        </label>
        <div className="form-checkbox">
          <input
            type="radio"
            name="additional"
            id="yes"
            checked={additional}
            onChange={(e) => setAdditional(e.target.checked)}
          />
          <label htmlFor="yes">Yes</label>
        </div>
        <div className="form-checkbox">
          <input
            type="radio"
            name="additional"
            id="no"
            checked={!additional}
            onChange={(e) => setAdditional(!e.target.checked)}
          />
          <label htmlFor="no">No</label>
        </div>
        {additional && (
          <>
            <br />
            <label htmlFor="numAdditional">Number of additional tickets:</label>
            <input
              id="numAdditional"
              value={numberOfAdditional}
              onChange={(e) => setNumberOfAdditional(e.target.value)}
            />
          </>
        )}
      </div>
      {isLoading ? <Loading /> : <input type="submit" />}
    </form>
  );
};

export default BallersRSVP;
