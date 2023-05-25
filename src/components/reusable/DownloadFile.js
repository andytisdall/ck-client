import './DownloadFile.css';

const DownloadFile = ({ children, filename }) => {
  return (
    <a href={`/images/${filename}`} download className="download">
      <img
        src="/images/icons/download.svg"
        alt="download pdf"
        className="download-icon"
      />
      <p>{children}</p>
    </a>
  );
};

export default DownloadFile;
