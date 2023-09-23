const EnterEmail = ({ email, setEmail }) => {
  return (
    <div>
      <input
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default EnterEmail;
