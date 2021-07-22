export const enum JobStatus {
    NEW = 'new',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
}

export interface IErrorResponse {
    message: string;
}
