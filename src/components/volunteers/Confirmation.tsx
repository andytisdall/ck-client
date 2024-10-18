const Confirmation = ({ hour, shift, job, contactId }) => {
  const canceled = hour?.status === 'Canceled';

  const [cancelShift, { isLoading }] = useCancelVolunteerShiftMutation();

  const dispatch = useDispatch();

  const onCancel = () => {
    cancelShift({ hoursId: hour.id, contactId })
      .unwrap()
      .then(() => dispatch(setAlert('You have canceled your volunteer shift')));
  };

  const confirmMessage = <p>You have successfully signed up for this shift:</p>;

  const cancelMessage = (
    <p className="cancel-text">You have canceled this shift:</p>
  );

  const message = canceled ? cancelMessage : confirmMessage;

  const renderShiftDetails = () => {
    if (shift && job) {
      return (
        <div>
          {message}
          <ShiftInfo job={job} shift={shift} />
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

  const renderCancelButton = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (canceled) {
      return (
        <button onClick={onCancel} className="cancel">
          Cancel Your Booked Volunteer Time
        </button>
      );
    }
  };

  return (
    <div>
      <h1>Volunteer Sign Up Confirmation</h1>
      {renderShiftDetails()}
      <Link to="/volunteers">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
      {renderCancelButton()}
    </div>
  );
};
