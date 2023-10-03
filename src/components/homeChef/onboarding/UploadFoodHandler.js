import { connect } from 'react-redux';

import { requiredDocuments } from './requiredDocuments';
import FileUpload from '../../reusable/file/FileUpload';
import * as actions from '../../../actions';
import Loading from '../../reusable/loading/Loading';
import useLoading from '../../../hooks/useLoading';
import { FOOD_HANDLER_URL } from './HomeChefDocuments';

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
        {loading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
      <p>
        Don't have your food handler certificate yet?{' '}
        <a className="retro-link" href={FOOD_HANDLER_URL}>
          Click here to apply.
        </a>
      </p>
    </div>
  );
};

export default connect(null, actions)(UploadFoodHandler);
