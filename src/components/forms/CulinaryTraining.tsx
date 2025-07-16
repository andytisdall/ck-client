import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setError } from "../../state/apis/slices/errorSlice";
import { useSubmitFormMutation } from "../../state/apis/formApi";
import Loading from "../reusable/loading/Loading";

const programRequirements = {
  eighteen: false,
  eligible: false,
  available: false,
  able: false,
  english: false,
  transportation: false,
};

const CulinaryTraining = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [internet, setInternet] = useState<boolean>();
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [requirements, setRequirements] = useState(programRequirements);

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (internet === undefined) {
      return dispatch(
        setError("Please fill out every question before submitting")
      );
    }

    if (!Object.values(requirements).every((r) => r)) {
      return dispatch(
        setError("You must meet all program requirements to apply")
      );
    }

    submitForm({
      formData: {
        email,
        firstName,
        lastName,
        phone,
        address,
        internet,
        description,
        source,
      },
      name: "CULINARY_TRAINING",
    })
      .unwrap()
      .then(() => {
        navigate("/forms/form-sent", {
          state: {
            message:
              "Thanks for submitting your information! We will get in touch with you to discuss your application.",
          },
        });
      });
  };

  const header = () => {
    return (
      <div className="form-item">
        <h1>Community Kitchens Culinary Training Application</h1>

        <br />
        <p>Thank you for your interest in the CK Culinary Training Program!</p>
        <br />
        <p>
          The CK Culinary Training Program provides 8-weeks of culinary
          education to participants through training and hands-on experience in
          order to build a broad range of skills for employment in the food and
          hospitality sector. During the first 6-weeks of the Program, CK trains
          participants at the CK Central Kitchen on kitchen operations, knife
          skills, food safety, proper food handling & storage techniques,
          various cooking methods, following large-scale recipes and standards
          of professional behavior. During the last 2-weeks/48 hours of
          training, interns are partnered with food service businesses who are
          willing to provide hands-on work experience to participants. The CK
          Culinary Training Program includes career readiness support and job
          placement assistance within CK’s extensive network of Oakland
          restaurant partners.
        </p>
        <br />
        <p>
          <strong>Program Details</strong>
        </p>
        <ul>
          <li>
            <strong>Compensation: </strong>$20/hour stipend - 24 hours/week for
            8 weeks
          </li>
          <li>
            <strong>Culinary Training Dates: </strong>August 11 - Sept. 19,
            2025, Community Kitchens Central Kitchen, 2270 Telegraph Ave,
            Oakland
          </li>
          <li>
            <strong>Schedule: </strong>Monday - Friday, 5:00 - 9:00 PM (led by a
            bilingual chef - Spanish & English)
          </li>
          <li>
            <strong>Career Readiness + Homework: </strong>4 Hours
          </li>
          <li>
            <strong>Individual internship location and schedule TBD</strong>
          </li>
        </ul>
        <br />
        <p>
          Please reach out to Mollye Chuacoff at{" "}
          <a href="mailto:mollye@ckoakland.org" className="retro-link">
            mollye@ckoakland.org
          </a>{" "}
          with any questions. We are looking forward to reviewing your
          application!
        </p>
        <br />
        <p>
          Best, Mollye Chudacoff
          <br />
          Sr. Program & Volunteer Manager
          <br />
          Community Kitchens
          <br />
          <a href="ckoakland.org/volunteer" className="retro-link">
            ckoakland.org/volunteer
          </a>
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
            Mailing Address<span className="required">*</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label>
            Phone Number<span className="required">*</span>
          </label>
          <input
            required
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>
            Please check the boxes below to indicate that you meet each of the
            following program requirements: <span className="required">*</span>
          </label>
          <div className="form-checkbox">
            <input
              type="checkbox"
              onChange={(e) =>
                setRequirements((current) => ({
                  ...current,
                  eighteen: e.target.checked,
                }))
              }
            />
            <label>I am at least 18 years of age</label>
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              onChange={(e) =>
                setRequirements((current) => ({
                  ...current,
                  eligible: e.target.checked,
                }))
              }
            />
            <label>I am legally eligible to work in the United States</label>
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              onChange={(e) =>
                setRequirements((current) => ({
                  ...current,
                  available: e.target.checked,
                }))
              }
            />
            <label>
              I am available to attend during the designated hours for the
              entirety of the program: August 11 - September 12
            </label>
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              onChange={(e) =>
                setRequirements((current) => ({
                  ...current,
                  able: e.target.checked,
                }))
              }
            />
            <label>
              I am able to stand up to 4 hours and lift up to 25 lbs
            </label>
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              onChange={(e) =>
                setRequirements((current) => ({
                  ...current,
                  english: e.target.checked,
                }))
              }
            />
            <label>
              I have basic understanding of English to follow instructions.
            </label>
          </div>
          <div className="form-checkbox">
            <input
              type="checkbox"
              onChange={(e) =>
                setRequirements((current) => ({
                  ...current,
                  transportation: e.target.checked,
                }))
              }
            />
            <label>
              I have reliable transportation for the duration of the program,
              including access to public transportation.
            </label>
          </div>
        </div>

        <div className="form-item">
          <label>
            Do you have access to a computer and reliable internet?
            <span className="required">*</span>
          </label>
          <div className="form-checkbox">
            <input
              type="radio"
              name="internet"
              onChange={(e) => {
                if (e.target.checked) {
                  setInternet(true);
                }
              }}
            />
            <label>Yes</label>
          </div>
          <div className="form-checkbox">
            <input
              type="radio"
              name="internet"
              onChange={(e) => {
                if (e.target.checked) {
                  setInternet(false);
                }
              }}
            />
            <label>
              No (I would like to use computer facilities at Community Kitchens
              Central Kitchen)
            </label>
          </div>
        </div>

        <div className="form-item">
          <label>
            Tell us a bit about yourself, why you're interested in the CK
            Culinary Training Program, and what goals you have for the future.
            <span className="required">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>
            How did you hear about this program?
            <span className="required">*</span>
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </>
  );
};

export default CulinaryTraining;
