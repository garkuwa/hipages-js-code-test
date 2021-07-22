import JobCard from 'components/shared/jobCard';
import { useMutation, useQuery } from 'react-query';
import { getJobs, updateJobStatus } from 'requests';
import { DataRequestName, IJob, JobStatus } from 'types';

export default function InvitedJobsContainer() {
    const { isLoading, data, refetch } = useQuery<IJob[], Error>(
        DataRequestName.INVITED_JOBS,
        getJobs(JobStatus.INVITED),
    );
    const { mutate } = useMutation<any, Error, { jobId: number; status: JobStatus }>(
        ({ jobId, status }) => updateJobStatus(jobId, status),
    );
    const acceptJob = (jobId: number) =>
        mutate({
            jobId,
            status: JobStatus.ACCEPTED,
        });
    const declineJob = (jobId: number) => {
        if (confirm(`Are you sure you want to decline the JOB with ID ${jobId}`)) {
            mutate({
                jobId,
                status: JobStatus.DECLINED,
            });
        }
    };

    return (
        <div>
            {data?.map(job => (
                <JobCard
                    onAccept={() => acceptJob(job.id)}
                    onDecline={() => declineJob(job.id)}
                    key={job.id}
                    job={job}
                />
            ))}
        </div>
    );
}
