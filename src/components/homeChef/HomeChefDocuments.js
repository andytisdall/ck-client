import { Link } from 'react-router-dom';

const HomeChefDocuments = () => {
  return (
    <div>
      <h2>Upload Your Documents</h2>
      <div className="col">
        <Link to="../docusign/login">
          <button>Sign the Volunteer Agreement</button>
        </Link>
        <Link to="../upload-food-handler">
          <button>Upload Your Food Handler Certification</button>
        </Link>
        <Link>
          <button>Apply for your Food Handler Ceritifcation</button>
        </Link>
      </div>
    </div>
  );
};

// volunteer agreement upload
// food handler sign up link
// food handler upload

export default HomeChefDocuments;
