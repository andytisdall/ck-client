import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Loading from '../../reusable/loading/Loading';
import { setAlert } from '../../../state/apis/slices/alertSlice';
import { NotificationArgs } from '../../../state/apis/volunteerApi';

const D4J_SCREENS = {
  Restaurants: {
    RestaurantHome: undefined,
    RestaurantDetail: 'id',
    RestaurantMap: 'id',
  },
  Events: { EventsHome: undefined, EventDetail: 'id' },
  Rewards: { RewardsHome: undefined, GetContact: undefined },
};

type D4JScreen = keyof typeof D4J_SCREENS;
type D4JSubScreen =
  | keyof typeof D4J_SCREENS.Restaurants
  | keyof typeof D4J_SCREENS.Events
  | keyof typeof D4J_SCREENS.Rewards;

const NotificationForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (args: NotificationArgs) => {
    unwrap: () => Promise<null>;
  };
  isLoading: boolean;
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [screen, setScreen] = useState<D4JScreen>();
  const [subScreen, setSubScreen] = useState<D4JSubScreen>();
  const [paramsValue, setParamsValue] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const paramsKey =
      //@ts-ignore
      screen && subScreen ? D4J_SCREENS[screen][subScreen] : undefined;
    onSubmit({
      title,
      message,
      screen,
      subScreen,
      params: paramsKey ? { [paramsKey]: paramsValue } : undefined,
    })
      .unwrap()
      .then(() => {
        dispatch(setAlert('Notification Sent'));
        setTitle('');
        setMessage('');
      });
  };
  const renderSetScreenSelect = () => {
    return (
      <>
        <label>Screen:</label>
        <select
          value={screen}
          onChange={(e) => {
            const scr = e.target.value;
            //@ts-ignore
            setScreen(scr);
            setParamsValue('');
          }}
        >
          <option value={undefined}>Select a Screen</option>
          {Object.keys(D4J_SCREENS).map((scr) => (
            <option value={scr} key={scr}>
              {scr}
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderSubScreenSelect = () => {
    if (screen && D4J_SCREENS[screen]) {
      return (
        <>
          <label>Sub-Screen (optional):</label>
          <select
            value={subScreen}
            onChange={(e) => {
              const scr = e.target.value;
              //@ts-ignore
              setSubScreen(scr);
            }}
          >
            <option value={undefined}>Select a Sub-Screen</option>
            {Object.keys(D4J_SCREENS[screen]).map((scr) => (
              <option key={scr} value={scr}>
                {scr}
              </option>
            ))}
          </select>
        </>
      );
    }
  };

  const renderParamsSelect = () => {
    //@ts-ignore
    if (screen && subScreen && D4J_SCREENS[screen][subScreen]) {
      return (
        <>
          <label>
            {
              //@ts-ignore
              <>{D4J_SCREENS[screen][subScreen]}</>
            }
          </label>
          <input
            value={paramsValue}
            onChange={(e) => setParamsValue(e.target.value)}
          />
        </>
      );
    }
  };

  return (
    <div className="admin-form">
      <label>Title:</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={40}
      />

      <label>Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={150}
      />
      <div></div>
      <h2>
        Optional- navigate user to screen when they press the notification:
      </h2>

      {renderSetScreenSelect()}
      {renderSubScreenSelect()}
      {renderParamsSelect()}

      {isLoading ? (
        <Loading />
      ) : (
        <div className="button cancel" onClick={handleSubmit}>
          Send Notification
        </div>
      )}
    </div>
  );
};

export default NotificationForm;
