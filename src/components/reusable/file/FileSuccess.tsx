import { Link, useParams } from 'react-router-dom';

const FileSuccess = ({ returnLink }: { returnLink: string }) => {
  const { filesUploaded } = useParams();

  const message = !filesUploaded
    ? 'Upload Successful.'
    : filesUploaded === '1'
    ? 'Successfully uploaded 1 file.'
    : `Successfully uploaded ${filesUploaded} files.`;

  return (
    <div>
      <h1>Success!</h1>
      <div className="file-success">{message}</div>
      <Link to={returnLink}>
        <button className="nav-button">Back to Onboarding Home</button>
      </Link>
    </div>
  );
};

export default FileSuccess;
