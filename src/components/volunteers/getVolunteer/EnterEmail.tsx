const EnterEmail = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="volunteers-signin-field">
      <label htmlFor="email">Email:</label>
      <input
        className="volunteers-email-field"
        type="email"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default EnterEmail;
