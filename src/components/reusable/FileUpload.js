import { useState } from 'react';

import FileInput from './FileInput';
import './FileUpload.css';

const FileUpload = ({ doc }) => {
  const [file, setFile] = useState(null);

  const style = file ? 'file-present' : '';

  return (
    <div className={`file-upload ${style}`}>
      <FileInput
        file={file}
        setFile={setFile}
        label={doc.name}
        data={doc.data}
      />
    </div>
  );
};
export default FileUpload;
