import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAlert } from "../../state/apis/slices/alertSlice";
import {
  Days,
  Items,
  Times,
  useSubmitSurveyMutation,
} from "../../state/apis/volunteerApi/homeChefApi";
import "../forms/Form.css";
import Loading from "../reusable/loading/Loading";

const TIMES: Times = { "9": false, "2": false, "4": false };

export const INITIAL_TIME_STATE: Days = {
  sun: TIMES,
  mon: TIMES,
  tues: TIMES,
  wed: TIMES,
  thurs: TIMES,
};

export const INITIAL_ITEM_STATE: Items = {
  "Grains (rice, pasta)": false,
  "Legumes (beans, lentils)": false,
  "Animal protein (chicken, beef)": false,
  "Non-animal protein (tofu, seitan)": false,
  Cheese: false,
  Eggs: false,
};

const ITEMS = Object.keys(INITIAL_ITEM_STATE) as (keyof Items)[];
const DAYS = Object.keys(INITIAL_TIME_STATE) as (keyof Days)[];

const HomeChefSurvey = () => {
  const [more, setMore] = useState<"items" | "dates">();
  const [times, setTimes] = useState(INITIAL_TIME_STATE);
  const [otherTime, setOtherTime] = useState("");
  const [items, setItems] = useState(INITIAL_ITEM_STATE);
  const [otherItem, setOtherItem] = useState("");

  const [submitSurvey, { isLoading }] = useSubmitSurveyMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await submitSurvey({
      times,
      more,
      items,
      otherItem,
      otherTime,
    }).unwrap();
    navigate("../signup/list");
    dispatch(setAlert("You have submitted your survey, thanks!"));
  };

  const renderHeader = () => {
    return (
      <div className="form-item">
        <h1>Home Chef Supply Pick Up Survey</h1>
        <p>Hello CK Home Chefs!</p>
        <br />
        <p>
          Did you know that CK offers produce and supply pick-ups for Home Chefs
          at our CK Central Kitchen once a month? While containers and labels
          can always be ordered through your portal and picked up at your
          convenience,{" "}
          <strong>
            produce pick-ups are currently offered in person on a specific date
            only.
          </strong>{" "}
          These pick-ups are typically scheduled for the{" "}
          <strong>second Wednesday of each month.</strong>
        </p>
        <br />
        <p>
          Thanks to a generous donation from{" "}
          <strong>Ava Community Energy</strong>, we're able to continue these
          pick-ups and would love your feedback to help make them as useful and
          accessible as possible. Your input will help ensure everyone can
          benefit from these resources as we continue supporting our community
          with delicious, nourishing meals.
        </p>
        <br />
        <p>
          Please take a moment to share your availability and preferences using
          the form below.
        </p>
        <br />
        <p>
          Thank you so much for all that you do,
          <br />
          <strong>The CK Team</strong>
        </p>
        <img
          className="home-chef-supply-photo"
          src="/images/home-chef/home-chef-supply-pickup.jpg"
          alt="Home Chef Supply Pickup"
        />
      </div>
    );
  };

  // const d: string[] = [];

  // (Object.keys(times) as typeof DAYS).forEach((day) =>
  //   (Object.keys(times[day]) as (keyof typeof TIMES)[]).forEach((time) =>
  //     times[day][time] ? d.push(`${day} ${time}`) : null,
  //   ),
  // );

  // console.log(d);

  const renderDay = (day: keyof typeof INITIAL_TIME_STATE) => {
    const timeOptions = ["9", "2", "4"] as (keyof Times)[];
    return (
      <Fragment key={day}>
        <label>{day[0].toUpperCase() + day.slice(1)}</label>
        {timeOptions.map((time) => (
          <div key={day + time}>
            <input
              type="checkbox"
              checked={times[day][time]}
              onChange={(e) => {
                console.log(`${day} ${time}`);
                setTimes({
                  ...times,
                  [day]: { ...times[day], [time]: e.target.checked },
                });
              }}
            />
          </div>
        ))}
      </Fragment>
    );
  };

  return (
    <div className="home-chef-survey-container">
      <div className="form">
        {renderHeader()}
        <div className="form-item">
          <label>
            Which would you prefer:{" "}
            <strong>more items available at each pick-up</strong>, or{" "}
            <strong>more pick-up dates per month?</strong> (we currently hold
            one pick up per month)
          </label>
          <div className="form-checkbox">
            <input
              id="items"
              type="radio"
              name="more"
              onChange={(e) => {
                if (e.target.checked) {
                  setMore("items");
                }
              }}
            />
            <label htmlFor="items">More items available</label>
          </div>
          <div className="form-checkbox">
            <input
              id="dates"
              type="radio"
              name="more"
              onChange={(e) => {
                if (e.target.checked) {
                  setMore("dates");
                }
              }}
            />
            <label htmlFor="dates">More pick up dates per month</label>
          </div>
        </div>

        <div className="form-item">
          <label>
            Our current produce pick-ups are held on the{" "}
            <strong>2nd Wednesday of the month from 4:00-6:00 PM.</strong> Which
            pick-up time(s) work for you?
          </label>
          <div className="form-grid">
            <label></label>
            <label>9am - 11am</label>
            <label>2pm - 4pm</label>
            <label>4pm - 6pm</label>

            {DAYS.map((day) => renderDay(day))}
          </div>
          <div>
            <label>Other: </label>
            <input
              type="text"
              value={otherTime}
              onChange={(e) => setOtherTime(e.target.value)}
            />
          </div>
        </div>

        <div className="form-item">
          <label>
            In addition to produce, which items would you be most interested in
            receiving? (Select all that apply)
          </label>
          {ITEMS.map((option) => (
            <div className="form-checkbox" key={option}>
              <input
                id={option}
                type="checkbox"
                checked={items[option]}
                onChange={(e) =>
                  setItems({ ...items, [option]: e.target.checked })
                }
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
          <div>
            <label>Other: </label>
            <input
              type="text"
              value={otherItem}
              onChange={(e) => setOtherItem(e.target.value)}
            />
          </div>
        </div>
        <div className="form-submit">
          {isLoading ? (
            <Loading />
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeChefSurvey;
