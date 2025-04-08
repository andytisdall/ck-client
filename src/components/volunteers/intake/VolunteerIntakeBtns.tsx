import { FormPage } from './IntakeBase';

const VolunteerIntakeBtns = ({
  pages,
  index,
  handleSubmit,
  nextPage,
  prevPage,
}: {
  pages: FormPage[];
  index: number;
  handleSubmit: () => void;
  nextPage: () => void;
  prevPage: () => void;
}) => {
  const validateFunc = pages[index].validate;
  const valid = validateFunc ? validateFunc() : true;

  return (
    <div className="vol-intake-form-btns">
      {index !== 0 && <button onClick={prevPage}>Prev</button>}

      {index !== pages.length - 1 && valid && (
        <button onClick={nextPage}>Next</button>
      )}

      {index === pages.length - 1 && valid && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default VolunteerIntakeBtns;
