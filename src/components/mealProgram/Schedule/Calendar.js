import { connect } from 'react-redux';
import { useMemo, useCallback } from 'react';
import moment from 'moment';

import Calendar from '../../reusable/Calendar';
import Loading from '../../reusable/Loading';

const MealProgramCalendar = ({ schedule, accounts }) => {
  const orderedDeliveries = useMemo(() => {
    if (!schedule) {
      return;
    }
    const orderedByDate = {};
    schedule.forEach((delivery) => {
      const formattedTime = moment(delivery.date, 'YYYY-MM-DD').format(
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

      if (orderedDeliveries[day] && accounts) {
        deliveries = orderedDeliveries[day]
          .sort((a, b) => (Date(a.time) > Date(b.time) ? 1 : -1))
          .map((delivery, i) => {
            return (
              <div
                key={delivery.id}
                className={`calendar-item calendar-color-${i}`}
              >
                <div className="calendar-meal-program-text">
                  {delivery.time}
                </div>
                <div className="calendar-meal-program-text">
                  {accounts[delivery.restaurant].name}
                </div>
                <div className="calendar-meal-program-text">
                  {accounts[delivery.cbo].name}
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

export default connect(mapStateToProps)(MealProgramCalendar);
