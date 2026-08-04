import { useState, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../reusable/loading/Loading";
import ZipCodeSelector from "../../reusable/form/ZipCodeSelector";
import { ZipCode } from "../../../state/apis/mealProgramApi/cboApi";
import { useSubmitFormMutation } from "../../../state/apis/formApi";

const successMessage = "Thank you for providing this information.";

const CBOReport = () => {
  const [month, setMonth] = useState("");
  const [name, setName] = useState("");
  const [cboName, setCboName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("2026");

  const [withoutAccess, setWithoutAccess] = useState("");
  const [lowIncome, setLowIncome] = useState("");
  const [mealsProvided, setMealsProvided] = useState("");
  const [unusable, setUnusable] = useState("");
  const [postcards, setPostcards] = useState("");
  const [calfreshApps, setCalfreshApps] = useState("");
  const [SSA, setSSA] = useState("");

  const [age17, setAge17] = useState("");
  const [age26, setAge26] = useState("");
  const [age49, setAge49] = useState("");
  const [age60, setAge60] = useState("");
  const [ageOver60, setAgeOver60] = useState("");
  const [ageUnknown, setAgeUnknown] = useState("");

  const [raceAfrican, setRaceAfrican] = useState("");
  const [raceLatin, setRaceLatin] = useState("");
  const [raceAsian, setRaceAsian] = useState("");
  const [raceNativeAmerican, setRaceNativeAmerican] = useState("");
  const [raceWhite, setRaceWhite] = useState("");
  const [raceDecline, setRaceDecline] = useState("");
  const [raceUnknown, setRaceUnknown] = useState("");
  const [raceOther, setRaceOther] = useState("");
  const [raceOtherText, setRaceOtherText] = useState("");
  const [raceMixed, setRaceMixed] = useState("");
  const [raceMixedText, setRaceMixedText] = useState("");

  const [individuals, setIndividuals] = useState("");
  const [households, setHouseholds] = useState("");

  const [zips, setZips] = useState({});
  const [numberOfZips, setNumberOfZips] = useState(0);

  const [feedback, setFeedback] = useState("");

  const [waters, setWaters] = useState("");
  const [juices, setJuices] = useState("");
  const [socks, setSocks] = useState("");
  const [granolaBars, setGranolaBars] = useState("");
  const [tortillaChips, setTortillaChips] = useState("");

  const [extraItem, setExtraItem] = useState("");
  const [extraItemAmount, setExtraItemAmount] = useState("");

  const [mobileOasisSectionOpen, setMobileOasisSectionOpen] = useState(false);

  const [submitForm, { isLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const age = {
      age17: parseInt(age17),
      age26: parseInt(age26),
      age49: parseInt(age49),
      age60: parseInt(age60),
      ageOver60: parseInt(ageOver60),
      ageUnknown: parseInt(ageUnknown),
    };

    const race = {
      raceAfrican: parseInt(raceAfrican),
      raceLatin: parseInt(raceLatin),
      raceAsian: parseInt(raceAsian),
      raceNativeAmerican: parseInt(raceNativeAmerican),
      raceWhite: parseInt(raceWhite),
      raceDecline: parseInt(raceDecline),
      raceUnknown: parseInt(raceUnknown),
      raceOther: parseInt(raceOther),
      raceOtherText,
      raceMixed: parseInt(raceMixed),
      raceMixedText,
    };

    const performanceMeasures = {
      withoutAccess: parseInt(withoutAccess),
      lowIncome: parseInt(lowIncome),
      mealsProvided: parseInt(mealsProvided),
      unusable: parseInt(unusable),
      postcards: parseInt(postcards),
      calfreshApps: parseInt(calfreshApps),
      SSA: parseInt(SSA),
    };

    await submitForm({
      formData: {
        month,
        name,
        cboName,
        performanceMeasures,
        age,
        race,
        individuals: parseInt(individuals),
        households: parseInt(households),
        zips: zips as Record<ZipCode, number>,
        feedback,
        phone,
        email,
        year,
        waters,
        juices,
        socks,
        granolaBars,
        tortillaChips,
        extraItem,
        extraItemAmount,
      },
      name: "CBO_REPORT",
    }).unwrap();

    navigate("/forms/form-sent", { state: { message: successMessage } });
  };

  const monthOptions = [
    { name: "", value: "" },
    { name: "January", value: 0 },
    { name: "February", value: 1 },
    { name: "March", value: 2 },
    { name: "April", value: 3 },
    { name: "May", value: 4 },
    { name: "June", value: 5 },
    { name: "July", value: 6 },
    { name: "August", value: 7 },
    { name: "September", value: 8 },
    { name: "October", value: 9 },
    { name: "November", value: 10 },
    { name: "December", value: 11 },
  ];

  const renderZipInputs = () => {
    const zipList = [];
    for (let i = 0; i < numberOfZips; i++) {
      zipList.push(
        <ZipCodeSelector
          zips={zips}
          setZips={setZips}
          testId={"ziplist-" + i}
          key={"ziplist-" + i}
        />,
      );
    }
    return zipList;
  };

  return (
    <form onSubmit={onSubmit} className="cbo-form">
      <div className="form-item">
        <h1>CBO Monthly Report</h1>
        <p>Please fill out and submit this form by the 3rd of every month.</p>
        <br />
        <p className="required">* Indicates required question</p>
      </div>
      <div className="form-item">
        <label htmlFor="cbo-name">
          CBO Name<span className="required">*</span>
        </label>
        <input
          id="cbo-name"
          type="text"
          value={cboName}
          onChange={(e) => setCboName(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="month">
          Month<span className="required">*</span>
        </label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          data-testid="monthselect"
          required
        >
          {monthOptions.map((mo) => {
            return (
              <option value={mo.value} key={mo.value}>
                {mo.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-item">
        <label htmlFor="year">
          Year<span className="required">*</span>
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        >
          <option value="2025">2026</option>
          <option value="2024">2025</option>
        </select>
      </div>
      <div className="form-item">
        <label htmlFor="name">
          Report Completed By<span className="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-item">
        <label htmlFor="phone">Phone Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          id="phone"
        />
      </div>

      <div className="form-item">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="meals">
          # of meals CK provided<span className="required">*</span>
          <div className="form-label-subheader">
            Record all prepared meals distributed to individuals and households
            for the reporting period.
          </div>
        </label>

        <input
          id="meals"
          type="number"
          required
          min={0}
          value={mealsProvided}
          onChange={(e) => setMealsProvided(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="unusable">
          # of meals procured that were wasted or undelivered due to spoilage
          <span className="required">*</span>
          <div className="form-label-subheader">
            Record number of spoiled meals (spoilage). Spoilage is defined as
            "any food that is left out for too long or not suitable to serve”.
          </div>
        </label>
        <input
          id="unusable"
          required
          type="number"
          min={0}
          value={unusable}
          onChange={(e) => setUnusable(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="individuals">
          # of unduplicated individuals provided food in the month
          <span className="required">*</span>
          <div className="form-label-subheader">
            Record only the first time an individual receives a prepared meal
            during the reporting period (month). If the same individual receives
            meals at multiple events in the same month, do not record subsequent
            interactions.
          </div>
        </label>
        <input
          id="individuals"
          type="number"
          required
          min={0}
          value={individuals}
          onChange={(e) => setIndividuals(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="households">
          # of unduplicated households provided food in the month
          <span className="required">*</span>
          <div className="form-label-subheader">
            Record only the first time a household receives a prepared meal
            during the reporting period (month). If the same household receives
            meals at multiple events in the same month, do not record subsequent
            interactions. A household may be a person or group who live together
            and purchases/prepares meals together.
          </div>
        </label>
        <input
          id="households"
          required
          type="number"
          min={0}
          value={households}
          onChange={(e) => setHouseholds(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="access">
          # unduplicated individuals served without access to a kitchen to
          prepare meals
        </label>
        <input
          id="access"
          type="number"
          min={0}
          value={withoutAccess}
          onChange={(e) => setWithoutAccess(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="low-income">
          # of unduplicated households served without access to a kitchen to
          prepare meals
        </label>
        <input
          id="low-income"
          type="number"
          min={0}
          value={lowIncome}
          onChange={(e) => setLowIncome(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="postcards">
          # Cal Fresh postcards distributed with meals
        </label>
        <input
          id="postcards"
          type="number"
          min={0}
          value={postcards}
          onChange={(e) => setPostcards(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="calfresh">
          # unduplicated individuals assisted with CalFresh applications
        </label>
        <input
          id="calfresh"
          type="number"
          min={0}
          value={calfreshApps}
          onChange={(e) => setCalfreshApps(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="ssa">
          # prescreened CalFresh applications sent to SSA each month
        </label>
        <input
          id="ssa"
          type="number"
          min={0}
          value={SSA}
          onChange={(e) => setSSA(e.target.value)}
        />
      </div>
      <div className="form-item">
        <div className="demo-title">Age</div>
        <div className="form-instructions">
          Enter the number of individuals from each age group.
        </div>
        <div className="demo-item">
          <label htmlFor="age17">0-17</label>
          <input
            id="age17"
            type="number"
            min={0}
            value={age17}
            onChange={(e) => setAge17(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="age26">18-26</label>
          <input
            id="age26"
            type="number"
            min={0}
            value={age26}
            onChange={(e) => setAge26(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="age49">27-49</label>
          <input
            id="age49"
            type="number"
            min={0}
            value={age49}
            onChange={(e) => setAge49(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="age60">50-60</label>
          <input
            id="age60"
            type="number"
            min={0}
            value={age60}
            onChange={(e) => setAge60(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="ageOver60">Over 60</label>
          <input
            id="ageOver60"
            type="number"
            min={0}
            value={ageOver60}
            onChange={(e) => setAgeOver60(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="ageUnknown">Unknown</label>
          <input
            id="ageUnknown"
            type="number"
            min={0}
            value={ageUnknown}
            onChange={(e) => setAgeUnknown(e.target.value)}
          />
        </div>
      </div>
      <div className="form-item">
        <div className="demo-title">Race</div>
        <div className="demo-item">
          <label htmlFor="raceAfrican">African-American / Black</label>
          <input
            id="raceAfrican"
            type="number"
            min={0}
            value={raceAfrican}
            onChange={(e) => setRaceAfrican(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="raceLatin">Latina / Latino</label>
          <input
            id="raceLatin"
            type="number"
            min={0}
            value={raceLatin}
            onChange={(e) => setRaceLatin(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="raceAsian">Asian / Pacific Islander</label>
          <input
            id="raceAsian"
            type="number"
            min={0}
            value={raceAsian}
            onChange={(e) => setRaceAsian(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="raceNativeAmerican">
            Native American / American Indian
          </label>
          <input
            id="raceNativeAmerican"
            type="number"
            min={0}
            value={raceNativeAmerican}
            onChange={(e) => setRaceNativeAmerican(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="raceWhite">White / Caucasian</label>
          <input
            id="raceWhite"
            type="number"
            min={0}
            value={raceWhite}
            onChange={(e) => setRaceWhite(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="raceMixed">Mixed Race</label>
          <input
            id="raceMixed"
            type="number"
            min={0}
            value={raceMixed}
            onChange={(e) => setRaceMixed(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <div className="demo-sub-item">
            <label htmlFor="raceMixedText">Specify Mixed Race</label>
            <input
              id="raceMixedText"
              type="text"
              value={raceMixedText}
              onChange={(e) => setRaceMixedText(e.target.value)}
            />
          </div>
        </div>
        <div className="demo-item">
          <label htmlFor="raceOther">Other</label>
          <input
            id="raceOther"
            type="number"
            min={0}
            value={raceOther}
            onChange={(e) => setRaceOther(e.target.value)}
          />
        </div>
        <div className="demo-item ">
          <div className="demo-sub-item">
            <label htmlFor="raceOtherText">Specify Other Race</label>
            <input
              id="raceOtherText"
              type="text"
              value={raceOtherText}
              onChange={(e) => setRaceOtherText(e.target.value)}
            />
          </div>
        </div>
        <div className="demo-item">
          <label htmlFor="raceDecline">Decline to State</label>
          <input
            id="raceDecline"
            type="number"
            min={0}
            value={raceDecline}
            onChange={(e) => setRaceDecline(e.target.value)}
          />
        </div>
        <div className="demo-item">
          <label htmlFor="raceUnknown">Unknown</label>
          <input
            id="raceUnknown"
            type="number"
            min={0}
            value={raceUnknown}
            onChange={(e) => setRaceUnknown(e.target.value)}
          />
        </div>
      </div>

      <div className="form-item">
        <div className="demo-title">Zip Code</div>
        <div className="form-instructions">
          Select one or more zip codes and enter the number of people from that
          zip code.
        </div>
        <div className="form-zip-btns">
          <div className="button" onClick={() => setNumberOfZips((z) => z + 1)}>
            Add a Zip Code
          </div>
          {numberOfZips > 0 && (
            <div
              className="button cancel"
              onClick={() => setNumberOfZips((z) => z + -1)}
            >
              Subtract a Zip Code
            </div>
          )}
        </div>
        <div>{renderZipInputs()}</div>
      </div>

      <div className="form-item">
        <label htmlFor="feedback">
          Do you have any feedback about the meals you've been receiving?
        </label>
        <input
          id="feedback"
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>

      <div className="form-item form-mobile-oasis">
        <div onClick={() => setMobileOasisSectionOpen(!mobileOasisSectionOpen)}>
          <h2>
            {mobileOasisSectionOpen ? (
              <span className="form-mobile-oasis-arrow">&darr;</span>
            ) : (
              <span className="form-mobile-oasis-arrow">&rarr;</span>
            )}
            CK Mobile Oasis drivers only
          </h2>
        </div>

        {mobileOasisSectionOpen && (
          <>
            <div className="form-item">
              <label htmlFor="waters"># of water bottles distributed</label>
              <input
                id="waters"
                type="number"
                min={0}
                value={waters}
                onChange={(e) => setWaters(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label htmlFor="juices"># of juice boxes distributed</label>
              <input
                id="juices"
                type="number"
                min={0}
                value={juices}
                onChange={(e) => setJuices(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label htmlFor="socks">Pairs of socks distributed</label>
              <input
                id="socks"
                type="number"
                min={0}
                value={socks}
                onChange={(e) => setSocks(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label htmlFor="granola">Granola bars distributed</label>
              <input
                id="granola"
                type="number"
                min={0}
                value={granolaBars}
                onChange={(e) => setGranolaBars(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label htmlFor="chips">Tortilla chip bags distributed</label>
              <input
                id="chips"
                type="number"
                min={0}
                value={tortillaChips}
                onChange={(e) => setTortillaChips(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label>
                If you distributed an item not on this form, enter it here
              </label>
              <div className="form-checkbox">
                <label htmlFor="xtra">Item Name</label>
                <input
                  id="xtra"
                  type="text"
                  value={extraItem}
                  onChange={(e) => setExtraItem(e.target.value)}
                />
                <label htmlFor="xtraAmount"># distributed</label>
                <input
                  id="xtraAmount"
                  type="number"
                  min={0}
                  value={extraItemAmount}
                  onChange={(e) => setExtraItemAmount(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {!isLoading ? <input type="submit" value="Submit" /> : <Loading />}
    </form>
  );
};

export default CBOReport;
