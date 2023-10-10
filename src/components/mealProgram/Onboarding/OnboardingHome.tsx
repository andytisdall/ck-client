import { Link } from 'react-router-dom';

import TextButton from '../../reusable/TextButton';
import { uploadDocuments, signDocuments } from './requiredDocuments';
import { useGetRestaurantInfoQuery } from '../../../state/apis/mealProgramApi';
import { UploadFilesResponse } from '../../../state/apis/fileApi';

const OnboardingHome = () => {
  const restaurantInfo = useGetRestaurantInfoQuery().data;
  const renderChecklist = () => {
    const renderCompleteItem = (doc: string) => {
      return <li key={doc}>{doc}</li>;
    };

    const renderIncompleteItem = (doc: UploadFilesResponse) => {
      let url;
      if (uploadDocuments.map((d) => d.data).includes(doc.docType)) {
        url = 'upload-documents';
      }
      if (signDocuments.map((d) => d.data).includes(doc.docType)) {
        url = 'sign-documents';
      }
      if (url) {
        return (
          <Link to={url} key={doc.docType}>
            <li>{doc.title}</li>
          </Link>
        );
      }
    };

    if (!restaurantInfo?.remainingDocs.length) {
      return (
        <div className="meal-program-status-active">
          <span className="bold">Your status:</span> You have completed all
          onboarding tasks and are eligible to provide meals.
          <Link to="/meal-program">
            <button className="nav-button">Go to Meal Program Home</button>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <div className="meal-program-checklist onboarding-checklist">
          <h3 className="meal-program-checklist-title">Onboarding Checklist</h3>
          {restaurantInfo.completedDocs?.length > 0 && (
            <>
              <div>Completed Documents:</div>
              <ul className="completed-doc">
                {restaurantInfo.completedDocs.map(renderCompleteItem)}
              </ul>
            </>
          )}

          <div>Documents to Complete:</div>
          <ul className="incomplete-doc">
            {restaurantInfo.remainingDocs.map(renderIncompleteItem)}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3>Onboarding Your Restaurant for the Meal Program</h3>
      {renderChecklist()}

      <TextButton
        to="upload-documents"
        buttonText="Upload Documents"
        descriptionText="Provide the documents you need to get started in the meal program"
      />

      <TextButton
        to="sign-documents"
        buttonText="Submit Forms"
        descriptionText="Fill out the forms required of new meal program participants"
      />
    </div>
  );
};

export default OnboardingHome;
