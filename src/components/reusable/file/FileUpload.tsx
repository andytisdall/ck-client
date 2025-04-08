import { useState } from 'react';

import FileInput from './FileInput';
import './FileUpload.css';

const FileUpload = ({ doc }: { doc: { name: string; data: string } }) => {
  const [file, setFile] = useState<File | string>();

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
