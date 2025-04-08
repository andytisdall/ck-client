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
    <div className="volunteers-signin-field">
      <h4>
        Please enter your name for our records (in the future you'll only need
        to enter your email):
      </h4>
      <div className="volunteers-signin-field-item">
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
      <div className="volunteers-signin-field-item">
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
  );
};

export default EnterName;
