import { connect } from 'react-redux';
import { useState } from 'react';

import Loading from '../reusable/Loading';
import * as actions from '../../actions';
import useLoading from '../../hooks/useLoading';
import ZipCodeSelector from '../reusable/ZipCodeSelector';

const successMessage = 'Thank you for providing this information.';

const CBOReport = ({ submitForm }) => {
  const [month, setMonth] = useState('');
  const [name, setName] = useState('');
  const [CBOName, setCBOName] = useState('');

  const [percentWOAccess, setPercentWOAccess] = useState('');
  const [mealsProvided, setMealsProvided] = useState('');
  const [unusable, setUnusable] = useState('');
  const [postcards, setPostcards] = useState('');
  const [calfreshApps, setCalfreshApps] = useState('');
  const [SSA, setSSA] = useState('');

  const [age17, setAge17] = useState('');
  const [age26, setAge26] = useState('');
  const [age50, setAge50] = useState('');
  const [age60, setAge60] = useState('');
  const [ageOver60, setAgeOver60] = useState('');
  const [ageUnknown, setAgeUnknown] = useState('');

  const [raceAfrican, setRaceAfrican] = useState('');
  const [raceLatin, setRaceLatin] = useState('');
  const [raceAsian, setRaceAsian] = useState('');
  const [raceNativeAmerican, setRaceNativeAmerican] = useState('');
  const [raceWhite, setRaceWhite] = useState('');
  const [raceDecline, setRaceDecline] = useState('');
  const [raceUnknown, setRaceUnknown] = useState('');
  const [raceOther, setRaceOther] = useState('');
  const [raceOtherText, setRaceOtherText] = useState('');
  const [raceMixed, setRaceMixed] = useState('');
  const [raceMixedText, setRaceMixedText] = useState('');

  const [households, setHouseholds] = useState('');

  const [zips, setZips] = useState({});
  const [numberOfZips, setNumberOfZips] = useState(0);

  const [loading, setLoading] = useLoading();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const age = { age17, age26, age50, age60, ageOver60, ageUnknown };

    const race = {
      raceAfrican,
      raceLatin,
      raceAsian,
      raceNativeAmerican,
      raceWhite,
      raceDecline,
      raceUnknown,
      raceOther,
      raceOtherText,
      raceMixed,
      raceMixedText,
    };

    const performanceMeasures = {
      percentWOAccess,
      mealsProvided,
      unusable,
      postcards,
      calfreshApps,
      SSA,
    };

    submitForm(
      {
        month,
        name,
        CBOName,
        performanceMeasures,
        age,
        race,
        households,
        zips,
      },
      { name: 'CBO_REPORT', successMessage }
    );
  };

  const monthOptions = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const renderZipInputs = () => {
    const zipList = [];
    for (let i = 0; i < numberOfZips; i++) {
      zipList.push(
        <ZipCodeSelector zips={zips} setZips={setZips} key={'ziplist-' + i} />
      );
    }
    return zipList;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <h1>Community Kitchens Survey</h1>
      </div>
      <div className="form-item">
        <label htmlFor="cbo-name">CBO Name</label>
        <input
          id="cbo-name"
          type="text"
          value={CBOName}
          onChange={(e) => setCBOName(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="name">Report Completed By</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <label htmlFor="month">Month</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          {monthOptions.map((mo) => {
            return (
              <option value={mo} key={mo}>
                {mo}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-item">
        <label htmlFor="access">
          % unduplicated individuals served without access to a kitchen to
          prepare meals
        </label>
        <input
          id="access"
          type="number"
          min={0}
          max={100}
          value={percentWOAccess}
          onChange={(e) => setPercentWOAccess(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="meals"># of CK Meals provided</label>
        <input
          id="meals"
          type="number"
          min={0}
          value={mealsProvided}
          onChange={(e) => setMealsProvided(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="unusable"># of unusable meals</label>
        <input
          id="unusable"
          type="number"
          min={0}
          value={unusable}
          onChange={(e) => setUnusable(e.target.value)}
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
        <label htmlFor="postcards">
          # prescreened CalFresh applications sent to SSA each month
        </label>
        <input
          id="postcards"
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
            id="age50"
            type="number"
            min={0}
            value={age50}
            onChange={(e) => setAge50(e.target.value)}
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
        <label htmlFor="households">
          # of unduplicated households provided food in the month
        </label>
        <input
          id="households"
          type="number"
          min={0}
          value={households}
          onChange={(e) => setHouseholds(e.target.value)}
        />
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
      {!loading ? <input type="submit" value="Submit" /> : <Loading />}
    </form>
  );
};

export default connect(null, actions)(CBOReport);
