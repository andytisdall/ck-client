import { Link } from 'react-router-dom';

const HomeChefDocuments = () => {
  return (
    <div>
      <h2>Upload Your Documents</h2>
      <div className="col">
        <Link to="../docusign/login" className="home-link">
          Sign the Volunteer Agreement
        </Link>
        <Link to="../upload-food-handler" className="home-link">
          Upload Your Food Handler Certification
        </Link>
        <Link className="home-link">
          Apply for your Food Handler Ceritifcation
        </Link>
      </div>
    </div>
  );
};

// volunteer agreement upload
// food handler sign up link
// food handler upload

export default HomeChefDocuments;
