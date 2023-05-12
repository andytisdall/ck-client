import './DownloadFile.css';

const DownloadFile = ({ children, filename }) => {
  return (
    <a
      href={`/images/meal-program/${filename}`}
      download
      className="meal-program-download"
    >
      <img
        src="/images/icons/download.svg"
        alt="download pdf"
        className="meal-program-download-icon"
      />
      <p>{children}</p>
    </a>
  );
};

export default DownloadFile;
