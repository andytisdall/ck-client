import "./FileInput.css";

interface FileInputProps {
  file?: File;
  setFile: (file: File | undefined) => void;
  label?: string;
}

const FileInput = ({ file, setFile, label }: FileInputProps) => {
  const processFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const displayName = () => {
    if (typeof file !== "string") {
      return file?.name.slice(0, 15) + "...";
    }
  };

  const style = file ? "file-present" : "";

  return (
    <div className={`file-upload ${style}`}>
      <label htmlFor={label} className="file-label">
        {label}
      </label>
      <div className="file-input-container">
        <label htmlFor={label} className="file-input">
          choose file
        </label>
        {file ? (
          <>
            <div className="file-name">{displayName()}</div>
            <div onClick={() => setFile(undefined)} className="file-delete">
              x
            </div>
          </>
        ) : null}
      </div>
      <input
        type="file"
        id={label}
        className="file-hidden"
        onChange={processFile}
      />
    </div>
  );
};

export default FileInput;
