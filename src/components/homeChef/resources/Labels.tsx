import DownloadFile from '../../reusable/file/DownloadFile';

const PDF_FILE = 'home-chef/food-label-template.pdf';
const DOC_FILE = 'home-chef/food-label-template.doc';

const Labels = () => {
  return (
    <div>
      <h4>Label Templates</h4>
      <p>Use this template with Avery 8162 shipping labels.</p>
      <img
        src="/images/food-label.png"
        alt="food label"
        className="label-photo"
      />
      <DownloadFile filename={PDF_FILE}>
        Download the label template as a PDF
      </DownloadFile>
      <DownloadFile filename={DOC_FILE}>
        Download the label template as a Word file
      </DownloadFile>
    </div>
  );
};

export default Labels;
