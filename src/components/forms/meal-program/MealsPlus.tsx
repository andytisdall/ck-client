import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setError } from "../../../state/apis/slices/errorSlice";
import { useSubmitFormMutation } from "../../../state/apis/formApi";
import FormHeader from "../reusable/MealSurvey/FormHeader";
import { Service } from "../../../state/apis/formApi";
import Loading from "../../reusable/loading/Loading";

const defaultService: Service = {
  name: "",
  location: "",
  time: "",
  instructions: "",
  description: "",
};

const MealsPlus = () => {
  const [services, setServices] = useState<Service[]>([defaultService]);
  const [cbo, setCbo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [erroredServices, setErroredServices] = useState<number[]>([]);

  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!services.length) {
      return dispatch(setError("Please enter at least one service"));
    }

    const errors = [];
    for (const serv of services) {
      if (!serv.location || !serv.time || !serv.name) {
        errors.push(services.findIndex((s) => s === serv));
      }
    }
    if (errors.length) {
      dispatch(setError("Please enter all the required information"));
      return setErroredServices(errors);
    }

    await submitForm({
      name: "MEALS_PLUS",
      formData: {
        services,
        cbo,
        firstName,
        lastName,
        email,
      },
    }).unwrap();
    navigate("/forms/form-sent");
  };

  const renderServices = () => {
    return services.map((serv, i) => {
      const errored = erroredServices.includes(i);
      const style = errored ? "form-error" : "";
      return (
        <div
          key={"services-" + i}
          className={`form-item ${style}`}
          onClick={() =>
            setErroredServices(
              erroredServices.filter((_, index) => i !== index),
            )
          }
        >
          <div
            className="form-delete"
            onClick={() => {
              const newServices = [...services];
              newServices.splice(i, 1);
              setServices(newServices);
            }}
          >
            X
          </div>
          <div className="form-title">Service {i + 1}</div>
          <div className="form-horizontal">
            <label>
              <strong>Service Name:</strong>
              <span className="required">*</span>
            </label>
            <input
              value={serv.name}
              onChange={(e) => {
                const newServices = [...services];
                newServices[i] = { ...newServices[i], name: e.target.value };
                setServices(newServices);
              }}
            />
          </div>

          <div className="form-horizontal">
            <label>
              <strong>Location:</strong>
              <span className="required">*</span>
            </label>
            <input
              value={serv.location}
              onChange={(e) => {
                const newServices = [...services];
                newServices[i] = {
                  ...newServices[i],
                  location: e.target.value,
                };
                setServices(newServices);
              }}
            />
          </div>

          <div className="form-horizontal">
            <label>
              <strong>Time:</strong>
              <span className="required">*</span>
            </label>
            <input
              value={serv.time}
              onChange={(e) => {
                const newServices = [...services];
                newServices[i] = {
                  ...newServices[i],
                  time: e.target.value,
                };
                setServices(newServices);
              }}
            />
          </div>
          <div className="form-horizontal" />
          <label>
            <strong>Description</strong> (What other info do you want people to
            know about this service):
          </label>
          <input
            value={serv.description}
            onChange={(e) => {
              const newServices = [...services];
              newServices[i] = {
                ...newServices[i],
                description: e.target.value,
              };
              setServices(newServices);
            }}
          />

          <div className="form-horizontal" />
          <label>
            <strong>Instructions</strong> (How can people take advantage of this
            service? Include any sign up links, phone numbers to call, etc.):
          </label>
          <input
            value={serv.instructions}
            onChange={(e) => {
              const newServices = [...services];
              newServices[i] = {
                ...newServices[i],
                instructions: e.target.value,
              };
              setServices(newServices);
            }}
          />
        </div>
      );
    });
  };

  const renderAddBtn = () => {
    return (
      <div className="form-item">
        <div
          className="button"
          onClick={() => {
            setServices([...services, defaultService]);
          }}
        >
          + Add Service
        </div>
        {isLoading ? <Loading /> : <input type="submit" />}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <FormHeader title="Meals Plus Form">
        <p>
          The CK Meals Plus program sends out text message alerts to subscribers
          in the East Bay, informing the community of various services provided
          by local organizations. Each text alert will include information about
          a particular service; what it is, when and where to find it, and what
          people need to do to receive it.
        </p>
        <br />
        <p>
          Please use this form to submit information about services your
          organization provides that we can include in our regular schedule of
          announcements.
        </p>
      </FormHeader>

      <div className="form-item">
        <label>
          <strong>Organization Name:</strong>
          <span className="required">*</span>
        </label>
        <input value={cbo} onChange={(e) => setCbo(e.target.value)} required />
      </div>

      <div className="form-item">
        <label>
          <strong>Contact Info:</strong>
        </label>
        <div className="form-horizontal">
          <label>
            First Name:<span className="required">*</span>
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-horizontal">
          <label>
            Last Name:<span className="required">*</span>
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-horizontal">
          <label>
            Email:<span className="required">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-item">
        <h3>Enter Your Services Below</h3>
        <p>
          Include any services that you'd like to include on the announcement
          calendar.
          <p>
            <br />
          </p>
          To enter an additional service, click the "Add Service" button at the
          bottom.
        </p>
      </div>
      {renderServices()}
      {renderAddBtn()}
    </form>
  );
};

export default MealsPlus;
