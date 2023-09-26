const EnterEmail = ({ email, setEmail }) => {
  return (
    <div>
      <label htmlFor="email">Enter your email:</label>
      <input
        type="text"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default EnterEmail;
