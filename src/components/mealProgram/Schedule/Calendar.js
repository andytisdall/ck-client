import { connect } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';

import Calendar from '../../reusable/Calendar';
import Loading from '../../reusable/Loading';

const MealProgramCalendar = ({ schedule, accounts }) => {
  const orderedDeliveries = useMemo(() => {
    if (!schedule) {
      return;
    }
    const orderedByDate = {};
    schedule.forEach((delivery) => {
      const formattedTime = format(
        utcToZonedTime(delivery.date, 'America/Los_Angeles'),
        'yyyy-MM-dd'
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
          .sort((a, b) =>
            new Date(`${day} ${a.time}`) > new Date(`${day} ${b.time}`) ? 1 : -1
          )

          .map((delivery, i) => {
            return (
              <Link key={delivery.id} to={'../' + delivery.id}>
                <div className={`calendar-item calendar-color-${i}`}>
                  <div className="calendar-meal-program-text">
                    {format(
                      utcToZonedTime(delivery.time, 'America/Los_Angeles'),
                      'h:mm a'
                    )}
                    - {accounts[delivery.restaurant]?.name} to{' '}
                    {accounts[delivery.cbo]?.name}
                  </div>
                </div>
              </Link>
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
