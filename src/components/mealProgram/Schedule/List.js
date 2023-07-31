import { connect } from 'react-redux';
import Loading from '../../reusable/Loading';
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const List = ({ schedule, accounts }) => {
  const { detailId } = useParams();
  const sortedSchedule = useMemo(() => {
    if (!schedule) {
      return;
    }
    if (detailId) {
      return [schedule.find((d) => d.id === detailId)];
    }
    return [...schedule].sort((a, b) =>
      a.date > b.date
        ? 1
        : b.date > a.date
        ? -1
        : new Date(a.time) > new Date(b.time)
        ? 1
        : -1
    );
  }, [schedule, detailId]);

  const renderList = () => {
    if (sortedSchedule && accounts) {
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

  const renderScheduleItem = (delivery) => {
    return (
      <React.Fragment key={delivery.id}>
        <div className="meal-program-list-item">
          {format(new Date(delivery.date), 'M/d/yy')}
        </div>
        <div className="meal-program-list-item">{delivery.time}</div>
        <div className="meal-program-list-item">
          {accounts[delivery.restaurant].name}
        </div>
        <div className="meal-program-list-item">
          {accounts[delivery.restaurant].address}
        </div>
        <div className="meal-program-list-item">{delivery.deliveryMethod}</div>
        <div className="meal-program-list-item">
          {accounts[delivery.cbo].address}
        </div>
        <div className="meal-program-list-item">
          {accounts[delivery.cbo].name}
        </div>
        <div className="meal-program-list-item">
          {format(new Date(delivery.date), 'eeee')}
        </div>
        <div className="meal-program-list-item">
          {delivery.numberOfMealsMeat}
        </div>

        <div className="meal-program-list-item">
          {delivery.numberOfMealsVeg}
        </div>
        <div className="meal-program-list-item">{delivery.notes}</div>
        <div className="meal-program-list-item">{delivery.price}</div>
      </React.Fragment>
    );
  };

  return <div className="meal-program-list">{renderList()}</div>;
};

const mapStateToProps = (state) => {
  return {
    schedule: state.mealProgram.schedule,
    accounts: state.mealProgram.accounts,
  };
};

export default connect(mapStateToProps)(List);
