type ProgramsObj = {
  homeChef: boolean;
  ckKitchen: boolean;
};

const ProgramSelect = ({
  programs,
  setPrograms,
}: {
  programs: ProgramsObj;
  setPrograms: (setState: (newPrograms: ProgramsObj) => ProgramsObj) => void;
}) => {
  return (
    <>
      <h3>
        Which CK volunteer program(s) are you interested in? Select all that
        apply.
      </h3>

      <div className="vol-intake-form-checkbox">
        <input
          type="checkbox"
          checked={programs.ckKitchen}
          onChange={(e) => {
            setPrograms((currentPrograms) => ({
              ...currentPrograms,
              ckKitchen: e.target.checked,
            }));
          }}
        />
        <label>
          <b>CK Central Kitchen Volunteers</b>
        </label>
      </div>
      <p className="vol-intake-form-description">
        Central Kitchen volunteers work in teams to help prepare and package
        meals for special events, youth programs and curbside communities.
        Shifts are 2-3 hours long with convenient slots throughout the week. The
        CK Central Kitchen is located at 2270 Telegraph in Oakland.
      </p>
      <div className="vol-intake-form-checkbox">
        <input
          type="checkbox"
          checked={programs.homeChef}
          onChange={(e) => {
            setPrograms((currentPrograms) => ({
              ...currentPrograms,
              homeChef: e.target.checked,
            }));
          }}
        />
        <label>
          <b>CK Home Chef Volunteers</b>
        </label>
      </div>
      <p className="vol-intake-form-description">
        Home Chef volunteers work with friends and family to prepare meals in
        their own homes. Home Chefs help stock Town Fridge pantries throughout
        Oakland with free and nutritious home-cooked meals. We off in person and
        zoom training once a month. Sign up for upcoming sessions below!
      </p>
    </>
  );
};

export default ProgramSelect;
