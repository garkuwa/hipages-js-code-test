import { JOB_DESCRIPTION_DISPLAY_LENGTH_LIMIT } from 'config';
import { useEffect, useState } from 'react';
import { IJob, JobStatus } from 'types';
import { formatDate } from 'utils';
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
    JobActionButton,
    JobGeneralInfoDiv,
    IconDiv,
    ButtonType,
    JobContactBlockDiv,
} from './styled';

interface IJobCardProps {
    job: IJob;
    onAccept?: () => void;
    onDecline?: () => void;
}

enum DescriptionBlockStatus {
    COLLAPSED,
    EXPANDED,
}

export default function JobCard({ job, onAccept, onDecline }: IJobCardProps) {
    const jobPriceDiv = (
        <JobPriceDiv isAccepted={job.status === JobStatus.ACCEPTED}>
            <div>${job.price}</div> Lead Invitation
        </JobPriceDiv>
    );
    const shouldDescriptionBeCut = job.description.length > JOB_DESCRIPTION_DISPLAY_LENGTH_LIMIT;
    const [descriptionBlockStatus, setDescriptionBlockStatus] = useState<DescriptionBlockStatus>(
        DescriptionBlockStatus.COLLAPSED,
    );
    const [jobDescriptionToShow, setJobDescriptionToShow] = useState<string>(
        job.description.substr(0, JOB_DESCRIPTION_DISPLAY_LENGTH_LIMIT),
    );

    useEffect(() => {
        if (shouldDescriptionBeCut)
            setJobDescriptionToShow(
                descriptionBlockStatus === DescriptionBlockStatus.COLLAPSED
                    ? job.description.substr(0, JOB_DESCRIPTION_DISPLAY_LENGTH_LIMIT)
                    : job.description,
            );
    }, [descriptionBlockStatus, shouldDescriptionBeCut]);

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
                    Job ID: <div>{job.id}</div>
                </JobIdDiv>
                {job.status === JobStatus.ACCEPTED && jobPriceDiv}
            </JobRowDiv>
            <JobRowDiv>
                {job.status === JobStatus.ACCEPTED && (
                    <JobContactBlockDiv>
                        <JobPhoneDiv>
                            <IconDiv icon="phone" />
                            <a href={`tel:${job.phoneNumber}`}>{job.phoneNumber}</a>
                        </JobPhoneDiv>
                        <JobEmailDiv>
                            <IconDiv icon="mail" />
                            <a href={`mailto:${job.email}`}>{job.email}</a>
                        </JobEmailDiv>
                    </JobContactBlockDiv>
                )}
                <JobDescriptionDiv>
                    {jobDescriptionToShow}
                    {shouldDescriptionBeCut && (
                        <button
                            type="button"
                            onClick={() =>
                                setDescriptionBlockStatus(curr =>
                                    curr === DescriptionBlockStatus.COLLAPSED
                                        ? DescriptionBlockStatus.EXPANDED
                                        : DescriptionBlockStatus.COLLAPSED,
                                )
                            }>
                            {descriptionBlockStatus === DescriptionBlockStatus.COLLAPSED
                                ? 'Show more'
                                : 'Show less'}
                        </button>
                    )}
                </JobDescriptionDiv>
            </JobRowDiv>
            {job.status === JobStatus.INVITED && (
                <JobRowDiv>
                    <JobActionButton className={ButtonType.PRIMARY} onClick={onAccept}>
                        ACCEPT
                    </JobActionButton>
                    <JobActionButton className={ButtonType.SECONDARY} onClick={onDecline}>
                        DECLINE
                    </JobActionButton>
                    {jobPriceDiv}
                </JobRowDiv>
            )}
        </JobContainerDiv>
    );
}
