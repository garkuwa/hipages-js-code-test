import { JobStatus } from 'types';
import { APP_API_ENDPOINT } from 'config';

const handleError = (response: Response) => {
    const errorMsg = (response.json() as any).message;
    throw new Error(errorMsg || 'Error getting data');
};

export const getJobs = (status: JobStatus) => async () => {
    const response = await fetch(`${APP_API_ENDPOINT}/jobs/${status}`);
    if (!response.ok) {
        handleError(response);
    }

    return response.json();
};

export const updateJobStatus = async (jobId: number, newStatus: JobStatus) => {
    const apiToCall = `${APP_API_ENDPOINT}/jobs/${
        newStatus === JobStatus.ACCEPTED ? 'accept' : 'decline'
    }/${jobId}`;

    const response = await fetch(apiToCall, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        handleError(response);
    }

    return response.json();
};
