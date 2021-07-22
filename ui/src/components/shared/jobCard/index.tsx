import { IJob, JobStatus } from 'types';
import {
    JobPriceDiv,
    JobContainerDiv,
    JobRowDiv,
    JobPicDiv,
    JobPersonNameDiv,
    JobCreatedAtDiv,
    JobLocationDiv,
    JobCategoryDiv,
    JobIdDiv,
    JobPhoneDiv,
    JobEmailDiv,
    JobDescriptionDiv,
    JobBtnControlDiv,
    JobActionButton,
    JobGeneralInfoDiv,
    IconDiv,
    ButtonType,
} from './styled';

interface IJobCardProps {
    job: IJob;
    onAccept?: () => void;
    onDecline?: () => void;
}

const formatDate = (input: string) => {
    const date = new Date(input);
    const month = date.toLocaleString('en-au', { month: 'long', day: 'numeric' });
    const time = date.toLocaleString('en-au', { hour: 'numeric', minute: 'numeric', hour12: true });

    return `${month} @ ${time}`;
};

export default function JobCard({ job, onAccept, onDecline }: IJobCardProps) {
    const jobPriceDiv = (
        <JobPriceDiv>
            ${job.price} <div>Lead Invitation</div>
        </JobPriceDiv>
    );

    return (
        <JobContainerDiv>
            <JobRowDiv>
                <JobGeneralInfoDiv>
                    <JobPicDiv>{job.name[0].toUpperCase()}</JobPicDiv>
                    <JobPersonNameDiv>{job.name}</JobPersonNameDiv>
                    <JobCreatedAtDiv>{formatDate(job.createdAt)}</JobCreatedAtDiv>
                </JobGeneralInfoDiv>
            </JobRowDiv>
            <JobRowDiv>
                <JobLocationDiv>
                    <IconDiv icon="location" />
                    {job.suburb}
                </JobLocationDiv>
                <JobCategoryDiv>
                    <IconDiv icon="case" />
                    {job.category}
                </JobCategoryDiv>
                <JobIdDiv>
                    JOB ID: <div>{job.id}</div>
                </JobIdDiv>
                {job.status === JobStatus.ACCEPTED && jobPriceDiv}
            </JobRowDiv>
            {job.status === JobStatus.ACCEPTED && (
                <JobRowDiv>
                    <JobPhoneDiv>
                        <IconDiv icon="phone" />
                        {job.phoneNumber}
                    </JobPhoneDiv>
                    <JobEmailDiv>
                        <IconDiv icon="mail" />
                        {job.email}
                    </JobEmailDiv>
                </JobRowDiv>
            )}
            <JobRowDiv>
                <JobDescriptionDiv>{job.description}</JobDescriptionDiv>
            </JobRowDiv>
            {job.status === JobStatus.INVITED && (
                <JobRowDiv>
                    <JobBtnControlDiv>
                        <JobActionButton className={ButtonType.PRIMARY} onClick={onAccept}>
                            ACCEPT
                        </JobActionButton>
                        <JobActionButton className={ButtonType.SECONDARY} onClick={onDecline}>
                            DECLINE
                        </JobActionButton>
                    </JobBtnControlDiv>
                    {jobPriceDiv}
                </JobRowDiv>
            )}
        </JobContainerDiv>
    );
}
