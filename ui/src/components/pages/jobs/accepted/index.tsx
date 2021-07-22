import JobCard from 'components/shared/jobCard';
import { useQuery } from 'react-query';
import { getJobs } from 'requests';
import { DataRequestName, IJob, JobStatus } from 'types';

export default function AcceptedJobsContainer() {
    const { isLoading, data, refetch } = useQuery<IJob[], Error>(
        DataRequestName.ACCEPTED_JOBS,
        getJobs(JobStatus.ACCEPTED),
    );

    return (
        <div>
            {data?.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}
