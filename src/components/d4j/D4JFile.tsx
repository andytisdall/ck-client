import { useState, FormEventHandler } from 'react';

import { useUploadReceiptMutation } from '../../state/apis/d4jApi';
import FileInput from '../reusable/file/FileInput';
import Loading from '../reusable/loading/Loading';

const D4JFile = () => {
  const [file, setFile] = useState<string | File>();

  const [uploadReceipt, { isLoading }] = useUploadReceiptMutation();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (file instanceof File) {
      uploadReceipt({ receipt: file, id: '0067900000DNCCGAA5' });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FileInput label="Receipt" data="receipt" file={file} setFile={setFile} />
      {isLoading ? <Loading /> : <input type="submit" />}
    </form>
  );
};

export default D4JFile;
