import { connect } from 'react-redux';
import { useEffect, useMemo, useCallback } from 'react';
import moment from 'moment';

import Calendar from '../../reusable/Calendar';
import Loading from '../../reusable/Loading';
import * as actions from '../../../actions';

const Schedule = ({ getMealProgramSchedule, schedule, accounts }) => {
  useEffect(() => {
    getMealProgramSchedule();
  }, [getMealProgramSchedule]);

  const orderedDeliveries = useMemo(() => {
    if (!schedule) {
      return;
    }
    const orderedByDate = {};
    schedule.forEach((delivery) => {
      const formattedTime = moment(delivery.Date__c, 'YYYY-MM-DD').format(
        'YYYY-MM-DD'
      );
      if (orderedByDate[formattedTime]) {
        orderedByDate[formattedTime].push(delivery);
      } else {
        orderedByDate[formattedTime] = [delivery];
      }
    });
    return orderedByDate;
  }, [schedule]);

  const renderDay = useCallback(
    (day) => {
      let deliveries = [];

      if (orderedDeliveries[day]) {
        deliveries = orderedDeliveries[day]
          .sort((a, b) => (Date(a.Time__c) > Date(b.Time__c) ? 1 : -1))
          .map((delivery, i) => {
            return (
              <div
                key={delivery.Id}
                className={`calendar-item calendar-color-${i}`}
              >
                <div className="calendar-meal-program-text">
                  {delivery.Time__c}
                </div>
                <div className="calendar-meal-program-text">
                  {accounts[delivery.Restaurant__c].Name}
                </div>
                <div className="calendar-meal-program-text">
                  {accounts[delivery.CBO__c].Name}
                </div>
              </div>
            );
          });
        return deliveries;
      }
    },
    [accounts, orderedDeliveries]
  );

  if (!schedule || !accounts) {
    return <Loading />;
  }

  if (!schedule || !accounts) {
    return <Loading />;
  }

  return <Calendar renderItems={renderDay} />;
};

const mapStateToProps = (state) => {
  return {
    schedule: state.mealProgram.schedule,
    accounts: state.mealProgram.accounts,
  };
};

export default connect(mapStateToProps, actions)(Schedule);
