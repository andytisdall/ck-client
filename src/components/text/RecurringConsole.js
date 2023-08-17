import { connect } from 'react-redux';
import { useEffect } from 'react';

import * as actions from '../../actions';
import './RecurringConsole.css';

const RecurringConsole = ({
  scheduledTexts,
  getScheduledTexts,
  deleteScheduledText,
}) => {
  useEffect(() => {
    getScheduledTexts();
  }, [getScheduledTexts]);

  return (
    <ul>
      {scheduledTexts?.map((txt) => {
        return (
          <li className="scheduled-text" key={txt.sid}>
            {txt.body}
            <button
              className="cancel"
              onClick={() => deleteScheduledText(txt.sid)}
            >
              cancel
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return { scheduledTexts: state.text.scheduledTexts };
};

export default connect(mapStateToProps, actions)(RecurringConsole);
