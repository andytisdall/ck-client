const WorkOnFeet = ({ setFeet }: { setFeet: (bool: boolean) => void }) => {
  return (
    <>
      <h3>
        Are you able to work on your feet for a 2-3 hour cooking shift at the CK
        Kitchen?
      </h3>
      <div className="vol-intake-form-checkbox">
        <input
          type="radio"
          name="feet"
          id="feetyes"
          onChange={(e) => {
            if (e.target.checked) {
              setFeet(true);
            }
          }}
        />
        <label htmlFor="feetyes">Yes</label>
      </div>
      <div className="vol-intake-form-checkbox">
        <input
          type="radio"
          name="feet"
          id="feetno"
          onChange={(e) => {
            if (e.target.checked) {
              setFeet(false);
            }
          }}
        />
        <label htmlFor="feetno">No</label>
      </div>
    </>
  );
};

export default WorkOnFeet;
