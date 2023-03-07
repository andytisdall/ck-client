import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { requiredDocuments } from './requiredDocuments';
import FileUpload from '../../reusable/FileUpload';
import * as actions from '../../../actions';
import Loading from '../../reusable/Loading';
import useLoading from '../../../hooks/useLoading';

const UploadFoodHandler = ({ uploadFiles }) => {
  const [loading, setLoading] = useLoading();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadFiles(e.target, 'contact');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FileUpload doc={requiredDocuments.foodHandler} />
        {loading ? <Loading /> : <input type="submit" />}
      </form>
      <p>
        Don't have your food handler certificate yet?{' '}
        <Link className="retro-link" to="">
          Click here to apply.
        </Link>
      </p>
    </div>
  );
};

export default connect(null, actions)(UploadFoodHandler);
