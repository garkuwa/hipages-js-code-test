import { JobStatus } from 'types';
import { APP_API_ENDPOINT } from 'config';

const handleError = async (response: Response) => {
    const res = await response.json();
    throw new Error(res.message || 'Error getting data');
};

export const getJobs = (status: JobStatus) => async () => {
    const response = await fetch(`${APP_API_ENDPOINT}/jobs/${status}`);
    if (!response.ok) {
        return handleError(response);
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
        return handleError(response);
    }

    return response.json();
};
