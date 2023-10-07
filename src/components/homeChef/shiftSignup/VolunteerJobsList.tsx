import { useGetShiftsQuery } from '../../../state/apis/volunteerApi/homeChefApi';
import VolunteerJob from './VolunteerJob';
import Loading from '../../reusable/loading/Loading';

const VolunteerJobsList = () => {
  const { data } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const renderJobs = () => {
    if (!jobs?.length) {
      return 'No jobs could be found.';
    }
    return jobs
      .filter((job) => job.ongoing)
      .sort((a) => (a.active ? -1 : 1))
      .map((job) => {
        return <VolunteerJob job={job} key={job.id} />;
      });
  };

  return <div className="jobs-list">{jobs ? renderJobs() : <Loading />}</div>;
};

export default VolunteerJobsList;
