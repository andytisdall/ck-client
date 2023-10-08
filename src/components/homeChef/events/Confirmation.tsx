import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import {
  useGetEventsQuery,
  useGetEventHoursQuery,
} from '../../../state/apis/volunteerApi';
import Loading from '../../reusable/loading/Loading';

const Confirmation = () => {
  const { hoursId, id } = useParams();

  const { data } = useGetEventsQuery();
  const campaign = data?.find((cam) => cam.id === id);
  const jobs = campaign?.jobs;
  const shifts = campaign?.shifts;
  const hours = useGetEventHoursQuery(id!).data;

  const hour = hours && hoursId ? hours[hoursId] : null;

  const renderShiftDetails = () => {
    const job = jobs?.find((j) => j.id === hour?.job);
    const shift = shifts?.find((sh) => sh.id === hour?.shift);
    if (hour && shift && job) {
      return (
        <div className="hc-confirm-details">
          <p>You have successfully signed up for this shift:</p>
          <ul>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Date:</span>
              {format(new Date(hour.time), 'dddd, M/D/yy')}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Time:</span>
              {format(new Date(shift.startTime), 'h:mm a')}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Duration:</span>
              {shift.duration} Hours
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Location:</span> {job.location}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Job:</span> {job.name}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Description:</span>
              {job.description}
            </li>
          </ul>
          <p>You have been sent an email with this information.</p>
        </div>
      );
    } else {
      return (
        <div className="hc-confirm-details">
          Could not find the details of this shift.
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Volunteer Sign Up Confirmation</h1>
      {!jobs || !hours ? <Loading /> : renderShiftDetails()}
      <Link to="/home-chef">
        <button className="hc-confirm-button">Home Chef Hub</button>
      </Link>
    </div>
  );
};

export default Confirmation;
