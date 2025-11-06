const EnterName = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}: {
  firstName: string;
  lastName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <div>
        <strong>Please enter your name for our records</strong>
        <div>In the future you'll only need to enter your email</div>
      </div>
      <div className="volunteers-signin-field-name">
        <div className="volunteers-signin-field">
          <label htmlFor="firstName">First Name:</label>
          <input
            autoFocus
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="volunteers-signin-field">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EnterName;
