import AddPhone from './AddPhone';
import DeletePhone from './DeletePhone';
import './Phone.css';

const Phone = () => {
  return (
    <div className="phone">
      <AddPhone />
      <DeletePhone />
    </div>
  );
};

export default Phone;
