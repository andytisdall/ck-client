import "./FileInput.css";

interface FileInputProps {
  file?: File | FileList;
  setFile: (file: File | FileList | undefined) => void;
  label?: string;
}

const FileInput = ({ file, setFile, label }: FileInputProps) => {
  const processFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files) {
      if (!files[1]) {
        setFile(files[0]);
      } else {
        setFile(files);
      }
    }
  };

  const displayName = () => {
    if (file instanceof File) {
      return file?.name.slice(0, 15) + "...";
    }
    if (file instanceof FileList) {
      return file[0]?.name.slice(0, 15) + "...";
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
        multiple
      />
    </div>
  );
};

export default FileInput;
