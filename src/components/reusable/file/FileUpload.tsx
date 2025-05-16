import { useState } from "react";

import FileInput from "./FileInput";
import "./FileUpload.css";

const FileUpload = ({ label, doc }: { label: string; doc: string }) => {
  const [file, setFile] = useState<File | string>();

  const style = file ? "file-present" : "";

  return (
    <div className={`file-upload ${style}`}>
      <FileInput file={file} setFile={setFile} label={label} doc={doc} />
    </div>
  );
};
export default FileUpload;
