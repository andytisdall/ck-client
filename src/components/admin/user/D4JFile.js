import { connect } from 'react-redux';
import { useState } from 'react';

import * as actions from '../../../actions';
import FileInput from '../../reusable/FileInput';

const D4JFile = ({ uploadFileToD4JVisit }) => {
  const [file, setFile] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    uploadFileToD4JVisit(file);
  };

  return (
    <form onSubmit={onSubmit}>
      <FileInput label="Receipt" data="receipt" file={file} setFile={setFile} />
      <input type="submit" />
    </form>
  );
};

export default connect(null, actions)(D4JFile);
