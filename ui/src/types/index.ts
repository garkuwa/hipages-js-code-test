export interface IJob {
    id: number;
    suburb: string;
    category: string;
    description: string;
    status: string;
    price: number;
    name: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
}

export enum DataRequestName {
    INVITED_JOBS = 'invitedJobs',
    ACCEPTED_JOBS = 'acceptedJobs',
}

export enum JobStatus {
    INVITED = 'new',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
}

export interface IServerErrorResponse {
    statusCode: number;
    message: string;
    timestamp: string;
    path: string;
}
