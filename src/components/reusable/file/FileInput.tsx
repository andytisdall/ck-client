import './FileInput.css';

interface FileInputProps {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<string | File | undefined>>;
  label?: string;
  data?: string;
}

const FileInput = ({ file, setFile, label, data }: FileInputProps) => {
  const processFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const displayName = () => {
    return file?.name.slice(0, 15) + '...';
  };

  return (
    <>
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
        name={data}
        id={label}
        className="file-hidden"
        onChange={processFile}
      />
    </>
  );
};

export default FileInput;
