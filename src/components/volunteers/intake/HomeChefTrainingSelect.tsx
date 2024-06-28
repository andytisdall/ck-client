type BooleanStateSetter = (bool: boolean) => void;

const HomeChefTrainingSelect = ({
  setZoom,
  setInPerson,
  setUnavailable,
}: {
  setZoom: BooleanStateSetter;
  setInPerson: BooleanStateSetter;
  setUnavailable: BooleanStateSetter;
}) => {
  return (
    <>
      <h3>
        Sign up for a Home Chef training on Zoom and/or in person at the CK
        Central Kitchen. At the CK Central Kitchen we will be cooking a large
        batch meal together for Town Fridges.
      </h3>
      <div className="vol-intake-form-checkbox">
        <input
          type="checkbox"
          id="zoom"
          onChange={(e) => {
            if (e.target.checked) {
              setZoom(true);
            } else {
              setZoom(false);
            }
          }}
        />
        <label htmlFor="zoom">
          <b>ZOOM</b> - Monday, July 15 at 5:30 pm (Zoom link will be sent)
        </label>
      </div>
      <div className="vol-intake-form-checkbox">
        <input
          type="checkbox"
          id="inperson"
          onChange={(e) => {
            if (e.target.checked) {
              setInPerson(true);
            } else {
              setInPerson(false);
            }
          }}
        />
        <label htmlFor="inperson">
          <b>IN PERSON</b> - Saturday, July 27, 12:00 - 3:00 pm @ CK Kitchen,
          2270 Telegraph Ave
        </label>
      </div>
      <div className="vol-intake-form-checkbox">
        <input
          type="checkbox"
          id="unavailable"
          onChange={(e) => {
            if (e.target.checked) {
              setUnavailable(true);
            } else {
              setUnavailable(false);
            }
          }}
        />
        <label htmlFor="unavailable">
          I am not available for either, please send me a recording of the Zoom
          orientation.
        </label>
      </div>
    </>
  );
};

export default HomeChefTrainingSelect;
