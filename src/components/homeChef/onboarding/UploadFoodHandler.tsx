import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import './Orientation.css';
import { requiredDocuments } from './requiredDocuments';
import FileUpload from '../../reusable/file/FileUpload';
import Loading from '../../reusable/loading/Loading';
import { FOOD_HANDLER_URL } from './HomeChefOnboarding';
import { useUploadFilesMutation } from '../../../state/apis/fileApi';

const UploadFoodHandler = () => {
  const [uploadFiles, { isLoading }] = useUploadFilesMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Array.from(e.currentTarget.elements).forEach((input) => {
      // if (input.name === 'HD') {
      //   if (
      //     (input.files?.length && !expiration) ||
      //     (expiration && !input.files?.length)
      //   ) {
      //     throw Error(
      //       'Health Department Permit and Expiration Date must be updated at the same time'
      //     );
      //   }
      //   if (new Date(expiration) < new Date()) {
      //     throw Error(
      //       'Health Department Permit Expiration Date Must Be in the Future'
      //     );
      //   }
      // }
      if (input instanceof HTMLInputElement && input.files?.length) {
        formData.append(input.name, input.files[0]);
      }
    });
    uploadFiles({ formData, accountType: 'contact' })
      .unwrap()
      .then((response) => navigate('../file-success/' + response.length));
  };

  return (
    <div>
      <h1>Upload your food handler certificate</h1>
      <p className="food-handler">
        Don't have your food handler certificate yet?{' '}
        <a className="retro-link" href={FOOD_HANDLER_URL}>
          Click here to apply.
        </a>
      </p>
      <form onSubmit={onSubmit}>
        <FileUpload doc={requiredDocuments.foodHandler} />
        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </div>
  );
};

export default UploadFoodHandler;
