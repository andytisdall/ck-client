import { connect } from 'react-redux';
import { useEffect } from 'react';

import Loading from '../../reusable/Loading';
import * as actions from '../../../actions';

const Schedule = ({ getMealProgramSchedule, schedule, accounts }) => {
  useEffect(() => {
    getMealProgramSchedule();
  }, [getMealProgramSchedule]);

  const renderSchedule = () => {
    return schedule.map((delivery) => {
      return (
        <div key={delivery.Id}>
          {delivery.Date__c} {accounts[delivery.CBO__c].Name}{' '}
          {accounts[delivery.Restaurant__c].Name}
        </div>
      );
    });
  };

  if (!schedule || !accounts) {
    return <Loading />;
  }

  return <div>{renderSchedule()}</div>;
};

const mapStateToProps = (state) => {
  return {
    schedule: state.mealProgram.schedule,
    accounts: state.mealProgram.accounts,
  };
};

export default connect(mapStateToProps, actions)(Schedule);
