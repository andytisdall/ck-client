const FileUpload = ({ doc }) => {
  return (
    <div className="file-upload">
      <label htmlFor={doc.data}>{doc.name}</label>
      <input type="file" name={doc.data} />
    </div>
  );
};
export default FileUpload;
