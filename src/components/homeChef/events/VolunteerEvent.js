import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import * as actions from '../../../actions';
import './VolunteerEvent.css';
import Loading from '../../reusable/Loading';

const VolunteerEvent = ({ hours, getEventHours, campaigns }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEventHours(id);
  }, [getEventHours, id]);

  const hoursList = hours
    ? Object.values(hours).filter((hour) => hour.campaign === id)
    : null;
  const hour = hoursList?.length ? hoursList[0] : null;

  useEffect(() => {
    if (hour) {
      navigate('../signup-confirm/' + hour.id);
    }
  }, [navigate, hour]);

  const campaign = campaigns?.find((c) => c.id === id);

  if (!campaign) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{campaign.name}</h1>
      <p>{campaign.description}</p>
      <h4>Sign Up for a Job</h4>
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { hours: state.event.hours, campaigns: state.event.campaigns };
};

export default connect(mapStateToProps, actions)(VolunteerEvent);
