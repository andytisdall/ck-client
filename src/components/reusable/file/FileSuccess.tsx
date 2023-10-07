import { Link } from 'react-router-dom';

const FileSuccess = ({ returnLink }: { returnLink: string }) => {
  const message = 'You uploaded files';

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
