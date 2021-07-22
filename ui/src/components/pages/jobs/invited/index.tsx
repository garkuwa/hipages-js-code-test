import JobCard from 'components/shared/jobCard';
import { GENERIC_ERROR_MESSAGE, GENERIC_SUCCESS_MESSAGE } from 'config';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getJobs, updateJobStatus } from 'requests';
import { DataRequestName, IJob, IJobContainerProps, JobStatus } from 'types';

export default function InvitedJobsContainer({
    setIsLoadingState,
    setSnackbarMessage,
}: IJobContainerProps) {
    const {
        isLoading: isFetchingData,
        data,
        isError: hasDataFetchingFailed,
        error: dataFetchingError,
        refetch,
    } = useQuery<IJob[], Error>(DataRequestName.INVITED_JOBS, getJobs(JobStatus.INVITED), {
        refetchOnWindowFocus: false,
    });
    const {
        mutate,
        isLoading: isUpdatingData,
        isSuccess: hasUpdateSucceeded,
        isError: hasUpdateFailed,
        error: updateError,
    } = useMutation<unknown, Error, { jobId: number; status: JobStatus }>(({ jobId, status }) =>
        updateJobStatus(jobId, status),
    );
    const acceptJob = (jobId: number) =>
        mutate({
            jobId,
            status: JobStatus.ACCEPTED,
        });
    const declineJob = (jobId: number) => {
        if (globalThis.confirm(`Are you sure you want to decline the JOB with ID ${jobId}`)) {
            mutate({
                jobId,
                status: JobStatus.DECLINED,
            });
        }
    };

    useEffect(() => {
        setIsLoadingState(isFetchingData || isUpdatingData);
    }, [isFetchingData, isUpdatingData]);

    useEffect(() => {
        if (hasUpdateSucceeded) {
            setSnackbarMessage(GENERIC_SUCCESS_MESSAGE);
            refetch();
        } else if (hasDataFetchingFailed)
            setSnackbarMessage(dataFetchingError?.message || GENERIC_ERROR_MESSAGE);
        else if (hasUpdateFailed) setSnackbarMessage(updateError?.message || GENERIC_ERROR_MESSAGE);
    }, [hasDataFetchingFailed, hasUpdateSucceeded, hasUpdateFailed]);

    return (
        <>
            {data?.map(job => (
                <JobCard
                    onAccept={() => acceptJob(job.id)}
                    onDecline={() => declineJob(job.id)}
                    key={job.id}
                    job={job}
                />
            ))}
            {data?.length === 0 && <div>No data to show</div>}
        </>
    );
}
