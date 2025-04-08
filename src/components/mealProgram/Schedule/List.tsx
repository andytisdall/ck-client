import Loading from '../../reusable/loading/Loading';
import { Fragment, useMemo, useState } from 'react';
import { format, addDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useParams } from 'react-router-dom';
import {
  useGetMealProgramScheduleQuery,
  MealDelivery,
} from '../../../state/apis/mealProgramApi';

const List = () => {
  const [dateRange, setDateRange] = useState('This Week');
  const { detailId } = useParams();

  const { data, isLoading } = useGetMealProgramScheduleQuery();
  const schedule = data?.deliveries;
  const accounts = data?.accounts;

  const getMonday = useMemo(() => {
    const monday = utcToZonedTime(new Date(), 'America/Los_Angeles');
    if (dateRange === 'This Week') {
      monday.setDate(monday.getDate() - (monday.getDay() || 7) + 1);
    }
    if (dateRange === 'Next Week') {
      monday.setDate(monday.getDate() + monday.getDay() + 1);
    }
    monday.setHours(0, 0, 0);
    return monday;
  }, [dateRange]);

  const sortedSchedule = useMemo(() => {
    if (!schedule) {
      return;
    }
    if (detailId) {
      const deliveryDetail = schedule.find((d) => d.id === detailId);
      if (deliveryDetail) {
        return [deliveryDetail];
      }
    }
    return [...schedule]
      .filter((del) => {
        if (dateRange === 'This Week') {
          return del.isThisWeek;
        }
        if (dateRange === 'Next Week') {
          return del.isNextWeek;
        }

        return false;
      })
      .sort((a, b) => {
        const [hoursA, minutesA] = a.time.split(':');
        const [hoursB, minutesB] = b.time.split(':');
        return a.date > b.date
          ? 1
          : b.date > a.date
          ? -1
          : parseInt(hoursA) > parseInt(hoursB)
          ? 1
          : parseInt(hoursB) > parseInt(hoursA)
          ? -1
          : parseInt(minutesA) > parseInt(minutesB)
          ? 1
          : -1;
      });
  }, [schedule, detailId, dateRange]);

  const renderList = () => {
    if (sortedSchedule && accounts && !isLoading) {
      return (
        <>
          {renderHeader()}
          {sortedSchedule.map(renderScheduleItem)}
        </>
      );
    }
    return <Loading />;
  };

  const renderHeader = () => {
    return (
      <>
        <div className="meal-program-list-item meal-program-list-header">
          Date
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Time
        </div>

        <div className="meal-program-list-item meal-program-list-header">
          Restaurant Name
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Restaurant Address
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Delivery Method
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Delivery Address
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Recipient
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Day of Week
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Qty Meat Meals
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Qty Veg Meals
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Notes
        </div>
        <div className="meal-program-list-item meal-program-list-header">
          Price Per Meal
        </div>
      </>
    );
  };

  const renderScheduleItem = (delivery: MealDelivery) => {
    const time = new Date();
    const [hours, minutes] = delivery.time.split(':');
    time.setHours(parseInt(hours));
    time.setMinutes(parseInt(minutes));

    return (
      <Fragment key={delivery.id}>
        <div className="meal-program-list-item">
          {format(
            utcToZonedTime(delivery.date, 'America/Los_Angeles'),
            'M/d/yy'
          )}
        </div>
        <div className="meal-program-list-item">{format(time, 'h:mm a')}</div>
        <div className="meal-program-list-item">
          {accounts![delivery.restaurant].name}
        </div>
        <div className="meal-program-list-item">
          {accounts![delivery.restaurant].address}
        </div>
        <div className="meal-program-list-item">{delivery.deliveryMethod}</div>
        <div className="meal-program-list-item">
          {accounts![delivery.cbo].address}
        </div>
        <div className="meal-program-list-item">
          {accounts![delivery.cbo].name}
        </div>
        <div className="meal-program-list-item">
          {format(utcToZonedTime(delivery.date, 'America/Los_Angeles'), 'eeee')}
        </div>
        <div className="meal-program-list-item">
          {delivery.numberOfMealsMeat}
        </div>

        <div className="meal-program-list-item">
          {delivery.numberOfMealsVeg}
        </div>
        <div className="meal-program-list-item">{delivery.notes}</div>
        <div className="meal-program-list-item">{delivery.price}</div>
      </Fragment>
    );
  };

  return (
    <div>
      {!detailId && (
        <>
          <label htmlFor="date">Date Range:</label>
          <select
            id="date"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="This Week">This Week</option>
            <option value="Next Week">Next Week</option>
          </select>
          <div>
            {format(getMonday, 'M/d/yy')} -{' '}
            {format(addDays(getMonday, 6), 'M/d/yy')}
          </div>
        </>
      )}
      <div className="meal-program-list">{renderList()}</div>
    </div>
  );
};

export default List;
