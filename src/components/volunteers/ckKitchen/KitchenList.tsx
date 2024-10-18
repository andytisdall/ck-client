import { utcToZonedTime } from 'date-fns-tz';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import {
  useGetKitchenShiftsQuery,
  useGetKitchenHoursQuery,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';
import { RootState } from '../../../state/store';
import JobList from '../JobList';

const KitchenList = () => {
  const { data, isLoading } = useGetKitchenShiftsQuery();
  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: user } = useGetUserQuery();

  const getKitchenHoursQuery = useGetKitchenHoursQuery(
    volunteer?.id || user?.salesforceId
  );
  const hours = getKitchenHoursQuery.data;

  const sortedShifts = useMemo(() => {
    if (shifts)
      return Object.values(shifts)
        .filter(
          (shift) =>
            utcToZonedTime(shift.startTime, 'America/Los_Angeles') > new Date()
        )
        .sort((a, b) =>
          new Date(a.startTime) > new Date(b.startTime) ? 1 : -1
        );
  }, [shifts]);

  return (
    <>
      {isLoading && <Loading />}
      {jobs && sortedShifts && hours && (
        <JobList
          shifts={sortedShifts}
          jobs={jobs}
          campaignId="ck-kitchen"
          hours={Object.values(hours)}
          contactId={volunteer?.id || user?.id}
        />
      )}
    </>
  );
};

export default KitchenList;
