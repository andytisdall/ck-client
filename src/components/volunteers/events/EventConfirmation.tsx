import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setAlert } from '../../../state/apis/slices/alertSlice';
import {
  useGetEventsQuery,
  useGetEventHoursQuery,
  useCancelVolunteerShiftMutation,
} from '../../../state/apis/volunteerApi';
import Loading from '../../reusable/loading/Loading';
import ShiftInfo from '../ShiftInfo';

const Confirmation = () => {
  const { hoursId, campaignId, contactId } = useParams();
  const { data: events } = useGetEventsQuery();
  const hours = useGetEventHoursQuery({
    campaignId: campaignId || '',
    contactId: contactId || '',
  }).data;
  const campaign = events?.find((cam) => cam.id === campaignId);
  const jobs = campaign?.jobs;
  const shifts = campaign?.shifts;

  const hour = hours && hoursId ? hours.find((h) => h.id === hoursId) : null;

  const job = jobs?.find((j) => j.id === hour?.job);
  const shift = shifts?.find((sh) => sh.id === hour?.shift);
};

export default Confirmation;
