import { useState, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setError } from "../../../state/apis/slices/errorSlice";
import Loading from "../../reusable/loading/Loading";
import { useSubmitFormMutation } from "../../../state/apis/formApi";
import VolunteerFormHeader from "./VolunteerFormHeader";

const successMessage =
  "A Community Kitchens staff member will be in touch with you. Thanks for helping out!";

const InterestForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");

  const [phoneError, setPhoneError] = useState("");

  const [source, setSource] = useState("");
  const [corporate, setCorporate] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const formattedPhoneNumber = phoneNumber
      .replace(/-/g, "")
      .replace(/ /g, "")
      .replace(/\(|\)/g, "");

    let phoneErrorText = "";

    if (formattedPhoneNumber.length > 10) {
      phoneErrorText = "Please enter a 10 digit phone number";
    }
    if (formattedPhoneNumber[0] === "1") {
      phoneErrorText =
        "Please remove the 1 from the beginning of your phone number";
    }
    if (formattedPhoneNumber.length < 10) {
      phoneErrorText = "Please enter your full phone number with area code";
    }
    if (formattedPhoneNumber.match(/[a-zA-Z]+/)) {
      phoneErrorText = "Invalid phone number: No letters allowed";
    }
    if (phoneErrorText) {
      setPhoneError(phoneErrorText);
      return dispatch(setError(phoneErrorText));
    }

    await submitForm({
      formData: {
        email,
        firstName,
        lastName,
        phoneNumber,
        instagramHandle,
        corporate,
        source,
        extraInfo,
      },
      name: "VOLUNTEER_INTEREST",
    });

    navigate("/forms/form-sent", { state: { message: successMessage } });
  };

  return (
    <>
      <VolunteerFormHeader />
      <form onSubmit={onSubmit}>
        <div className="form-item">
          <label htmlFor="email">
            Email<span className="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            maxLength={200}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="firstName">
            First Name<span className="required">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            maxLength={40}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="lastName">
            Last Name<span className="required">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            required
            maxLength={80}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="phoneNumber">
            Phone Number<span className="required">*</span>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => {
              setPhoneError("");
              setPhoneNumber(e.target.value);
            }}
            className={phoneError ? "form-phone-error" : ""}
          />
          {phoneError && <div className="required">{phoneError}</div>}
        </div>

        <div className="form-item">
          <label htmlFor="instagramHandle">Instagram Handle</label>
          <input
            id="instagramHandle"
            type="text"
            maxLength={40}
            value={instagramHandle}
            onChange={(e) => setInstagramHandle(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="corporate">
            Are you interested in organizing a volunteer day for a corporate or
            community group at the CK Kitchen? We'd love to host you! Please
            provide the name of your organization or group below, and email
            Mollye at{" "}
            <a href="mailto:mollye@ckoakland.org" className="retro-link">
              mollye@ckoakland.org
            </a>{" "}
            for more information and scheduling.
          </label>
          <input
            id="corporate"
            value={corporate}
            onChange={(e) => setCorporate(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="source">
            How did you hear about Community Kitchens?
          </label>
          <input
            id="source"
            maxLength={200}
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="extraInfo">
            Anything else you would like us to know?
          </label>
          <input
            id="extraInfo"
            maxLength={1000}
            type="text"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </div>

        {!isLoading ? <input type="submit" value="Submit" /> : <Loading />}
      </form>
    </>
  );
};

export default InterestForm;
