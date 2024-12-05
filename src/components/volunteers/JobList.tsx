import { format, utcToZonedTime } from 'date-fns-tz';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { RootState } from '../../state/store';
import { useGetUserQuery } from '../../state/apis/authApi';
import Loading from '../reusable/loading/Loading';
import {
  VolunteerHours,
  useGetCampaignsQuery,
  useGetHoursQuery,
} from '../../state/apis/volunteerApi';

const JobList = ({ campaignIdProp }: { campaignIdProp?: string }) => {
  const { campaignId } = useParams();

  const { data, isLoading } = useGetCampaignsQuery();
  const campaigns = data;

  const campaign =
    campaigns && campaignId
      ? campaigns.find((cam) =>
          campaignIdProp ? cam.id === campaignIdProp : cam.id === campaignId
        )
      : undefined;

  const shifts = campaign?.shifts;
  const jobs = campaign?.jobs;

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: user } = useGetUserQuery();

  const { data: hours } = useGetHoursQuery({
    campaignId: campaignId || '',
    contactId: volunteer?.id || user?.salesforceId || '',
  });

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

  if (isLoading) {
    return <Loading />;
  }

  if (!sortedShifts || !hours || !jobs || !campaign) {
    return <div>Could not find info.</div>;
  }

  const bookedJobs = hours
    .filter((h) => h.status === 'Confirmed')
    .map((h) => h.shift);

  return (
    <div>
      <h3 className="volunteers-signup-btns">Positions Available</h3>

      {jobs
        .filter((j) => sortedShifts.find((sh) => sh.job === j.id))
        .map((j) => {
          return (
            <div className="volunteers-job" key={j.id}>
              <h3>{j.name}</h3>
              <p>{j.description}</p>
              {sortedShifts
                .filter((sh) => sh.job === j.id)
                .map((shift) => {
                  const jobBooked = bookedJobs?.includes(shift.id);
                  let bookedHours: VolunteerHours | undefined;

                  if (jobBooked && hours) {
                    bookedHours = hours.find(
                      (h) => h.shift === shift.id && h.status === 'Confirmed'
                    );
                  }
                  let linkUrl = '';
                  if (jobBooked) {
                    if (bookedHours) {
                      linkUrl = `../signup-confirm/${campaign.id}/${
                        bookedHours.id
                      }/${volunteer?.id || user?.salesforceId}`;
                    }
                  } else if (shift.open) {
                    linkUrl = shift.id;
                  }

                  const full =
                    shift.open || jobBooked ? '' : 'volunteers-unavailable';

                  return (
                    <Link key={shift.id} to={linkUrl}>
                      <div className={`volunteers-shift ${full}`}>
                        <div>
                          <span>&bull; </span>
                          <span>
                            {format(
                              utcToZonedTime(
                                shift.startTime,
                                'America/Los_Angeles'
                              ),
                              'eee, M/d/yy h:mm a'
                            )}
                          </span>
                        </div>

                        {shift.slots !== null && (
                          <>
                            <div className="volunteers-shift-space">-</div>
                            <div>{shift.slots} volunteers needed</div>
                          </>
                        )}
                        {jobBooked && (
                          <div className="volunteers-shift-checkmark">
                            &#x2713; Signed Up
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default JobList;
