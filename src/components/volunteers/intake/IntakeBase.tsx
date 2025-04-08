import { useState, useRef, useCallback, useMemo } from 'react';

import './Intake.css';
import ProgramSelect from './ProgramSelect';
import PersonalInfo from './PersonalInfo';
import HomeChefTrainingSelect from './HomeChefTrainingSelect';
import WorkOnFeet from './WorkOnFeet';
import { useSubmitFormMutation } from '../../../state/apis/formApi';
import VolunteerIntakeBtns from './VolunteerIntakeBtns';
import Loading from '../../reusable/loading/Loading';
import Confirmation from './Confirmation';

export type FormPage = { component: JSX.Element; validate?: () => boolean };

const ANIMATION_DURATION = 200;

const IntakeBase = () => {
  const [page, setPage] = useState(0);

  const [programs, setPrograms] = useState({
    homeChef: false,
    ckKitchen: false,
  });

  // personal info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // home chef training
  const [zoom, setZoom] = useState(false);
  const [inPerson, setInPerson] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  // ck kitchen info
  const [feet, setFeet] = useState<boolean>();

  const [source, setSource] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  const formRef = useRef<HTMLDivElement>(null);

  const [submitForm, { isLoading, isSuccess }] = useSubmitFormMutation();

  const handleSubmit = () => {
    // submitForm({
    //   formData: {
    //     firstName,
    //     lastName,
    //     email,
    //     phoneNumber: phone,
    //     zoom,
    //     inPerson,
    //     unavailable,
    //     feet,
    //     source,
    //     extraInfo,
    //     programs,
    //   },
    //   name: 'VOLUNTEER_INTEREST',
    // });
  };

  const validateEmail = (input: string) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return input.match(validRegex);
  };

  const transitionAnimation = useCallback((action: 'add' | 'sub') => {
    const width = window.outerWidth;
    const modifier = action === 'add' ? 1 : -1;

    formRef.current?.animate(
      [{}, { transform: `translateX(${width * -modifier}px)` }],
      ANIMATION_DURATION
    );

    setTimeout(
      () =>
        setPage((currentPage) => {
          formRef.current?.animate(
            [
              { transform: `translateX(${width * -modifier}px)` },
              { display: 'none' },
            ],
            10
          );
          formRef.current?.animate(
            [{ transform: `translateX(${width * modifier}px)` }, {}],
            ANIMATION_DURATION + 50
          );
          return currentPage + 1 * modifier;
        }),
      ANIMATION_DURATION
    );
  }, []);

  const sourceComponent = useMemo(() => {
    return (
      <>
        <label htmlFor="source">
          How did you hear about Community Kitchens?
        </label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </>
    );
  }, [source]);

  const extraInfoComponent = useMemo(() => {
    return (
      <>
        <label htmlFor="extrainfo">
          Anything else you would like us to know?
        </label>
        <input
          type="text"
          id="extrainfo"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
      </>
    );
  }, [extraInfo]);

  const pages = useMemo(() => {
    const pagesArray: FormPage[] = [
      {
        component: (
          <ProgramSelect programs={programs} setPrograms={setPrograms} />
        ),
        validate: () => !Object.values(programs).every((pr) => !pr),
      },
      {
        component: (
          <PersonalInfo
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPhone={setPhone}
          />
        ),
        validate: () =>
          firstName && lastName && validateEmail(email) && phone ? true : false,
      },
    ];

    if (programs.homeChef) {
      pagesArray.push({
        component: (
          <HomeChefTrainingSelect
            setZoom={setZoom}
            setInPerson={setInPerson}
            setUnavailable={setUnavailable}
          />
        ),
        validate: () => zoom || inPerson || unavailable,
      });
    }

    if (programs.ckKitchen) {
      pagesArray.push({
        component: <WorkOnFeet setFeet={setFeet} />,
        validate: () => feet !== undefined,
      });
    }

    pagesArray.push({ component: sourceComponent });
    pagesArray.push({ component: extraInfoComponent });
    return pagesArray;
  }, [
    email,
    feet,
    inPerson,
    zoom,
    lastName,
    unavailable,
    programs,
    firstName,
    phone,
    sourceComponent,
    extraInfoComponent,
  ]);

  if (isSuccess) {
    return <Confirmation />;
  }

  return (
    <div className="vol-intake-form" ref={formRef}>
      {pages[page].component}
      {isLoading ? (
        <Loading />
      ) : (
        <VolunteerIntakeBtns
          pages={pages}
          index={page}
          handleSubmit={handleSubmit}
          nextPage={() => transitionAnimation('add')}
          prevPage={() => transitionAnimation('sub')}
        />
      )}
    </div>
  );
};

export default IntakeBase;
