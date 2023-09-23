const EnterName = ({ firstName, lastName, setFirstName, setLastName }) => {
  return (
    <div>
      <input
        type="text"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  );
};

export default EnterName;
