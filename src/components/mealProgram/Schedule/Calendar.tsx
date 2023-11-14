import { useMemo, useCallback } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';

import Calendar from '../../reusable/calendar/Calendar';
import Loading from '../../reusable/loading/Loading';
import {
  useGetMealProgramScheduleQuery,
  MealDelivery,
} from '../../../state/apis/mealProgramApi';

const MealProgramCalendar = () => {
  const { data, isLoading } = useGetMealProgramScheduleQuery();
  const schedule = data?.deliveries;
  const accounts = data?.accounts;

  const orderedDeliveries = useMemo(() => {
    if (!schedule) {
      return;
    }
    const orderedByDate: Record<string, MealDelivery[]> = {};
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
    (day: string) => {
      let deliveries: JSX.Element[] = [];

      if (orderedDeliveries && orderedDeliveries[day] && accounts) {
        deliveries = orderedDeliveries[day]
          .sort((a, b) =>
            new Date(`${day} ${a.time}`) > new Date(`${day} ${b.time}`) ? 1 : -1
          )

          .map((delivery, i) => {
            const time = new Date();
            const [hours, minutes] = delivery.time.split(':');
            time.setHours(parseInt(hours));
            time.setMinutes(parseInt(minutes));

            return (
              <Link key={delivery.id} to={'../' + delivery.id}>
                <div className={`calendar-item calendar-color-${i}`}>
                  <div className="calendar-meal-program-text">
                    {format(time, 'h:mm a')}-{' '}
                    {accounts[delivery.restaurant]?.name} to{' '}
                    {accounts[delivery.cbo]?.name}
                  </div>
                </div>
              </Link>
            );
          });
      }
      return deliveries;
    },
    [accounts, orderedDeliveries]
  );

  if (isLoading) {
    return <Loading />;
  }

  return <Calendar renderItems={renderDay} />;
};

export default MealProgramCalendar;
