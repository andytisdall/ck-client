import { useRef, useState } from 'react';

import './FileUpload.css';

const FileUpload = ({ doc }) => {
  const [filePresent, setFilePresent] = useState(0);

  const fileRef = useRef();

  const getFileStatus = () => {
    setFilePresent(fileRef.current.files.length);
  };

  const style = filePresent ? 'file-present' : '';

  return (
    <div className={`file-upload ${style}`}>
      <label htmlFor={doc.data}>{doc.name}</label>
      <input
        type="file"
        name={doc.data}
        ref={fileRef}
        onChange={getFileStatus}
      />
    </div>
  );
};
export default FileUpload;
