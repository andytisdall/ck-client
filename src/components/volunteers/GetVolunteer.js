import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import Loading from '../reusable/Loading';
import useLoading from '../../hooks/useLoading';
import EnterEmail from './EnterEmail';
import EnterName from './EnterName';
import * as actions from 'actions';

const GetVolunteer = ({ getVolunteer, volunteer, createVolunteer }) => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    if (volunteer === null && emailSubmitted) {
      setLoading(false);
      setShowNameFields(true);
    }
  }, [volunteer, emailSubmitted, setLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailSubmitted) {
      getVolunteer(email);
      setEmailSubmitted(true);
    } else {
      createVolunteer(email, firstName, lastName);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <EnterEmail email={email} setEmail={setEmail} />
        {showNameFields && (!loading || volunteer === null) && (
          <EnterName
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
          />
        )}
        {loading ? <Loading /> : <input type="submit" />}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { volunteer: state.volunteers.volunteer };
};

export default connect(mapStateToProps, actions)(GetVolunteer);
