const EnterName = ({
  firstName,
  lastName,
  calfresh,
  setFirstName,
  setLastName,
  setCalfresh,
}: {
  firstName: string;
  lastName: string;
  calfresh: boolean;
  setFirstName: (fn: string) => void;
  setLastName: (ln: string) => void;
  setCalfresh: (cf: boolean) => void;
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
        <div>
          <input
            id="calfresh"
            type="checkbox"
            checked={calfresh}
            onChange={(e) => setCalfresh(e.target.checked)}
          />
          <label htmlFor="calfresh">
            I am volunteering in order to meet Calfresh certification
            requirements
          </label>
        </div>
      </div>
    </div>
  );
};

export default EnterName;
