import JobCard from 'components/shared/jobCard';
import { GENERIC_ERROR_MESSAGE } from 'config';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getJobs } from 'requests';
import { DataRequestName, IJob, JobStatus, IJobContainerProps } from 'types';

export default function AcceptedJobsContainer({
    setIsLoadingState,
    setSnackbarMessage,
}: IJobContainerProps) {
    const { isLoading, data, isError, error } = useQuery<IJob[], Error>(
        DataRequestName.ACCEPTED_JOBS,
        getJobs(JobStatus.ACCEPTED),
        {
            refetchOnWindowFocus: false,
        },
    );

    useEffect(() => {
        setIsLoadingState(isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (isError) setSnackbarMessage(error?.message || GENERIC_ERROR_MESSAGE);
    }, [isError]);

    return (
        <>
            {data?.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
            {data?.length === 0 && <div>No data to show</div>}
        </>
    );
}
