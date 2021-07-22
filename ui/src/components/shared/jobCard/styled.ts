import styled from 'styled-components';
import { APP_PUBLIC_URL } from 'config';

export enum ButtonType {
    PRIMARY = 'primaryBtn',
    SECONDARY = 'secondaryBtn',
}

export const JobContainerDiv = styled.div`
    align-items: stretch;
    background-color: var(--color-card);
    border-radius: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.17);
    box-sizing: border-box;
    color: var(--color-text-secondary);
    display: flex;
    flex-direction: column;
    font-family: var(--font-family-regular);
    font-size: var(--font-size-small);
    justify-content: stretch;
    margin-bottom: 20px;
    max-width: 800px;
    padding: 10px 18px 0 18px;
    width: 100%;

    @media (max-width: 600px) {
        padding: 5px 5px 0 5px;
    }
`;

export const JobRowDiv = styled.div`
    border-bottom: 1px solid var(--color-secondary-control);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 15px 0;
    flex-wrap: wrap;
`;

export const JobGeneralInfoDiv = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-areas:
        'p n'
        'p d';
`;

export const JobPicDiv = styled.div`
    color: white;
    background-color: #fea04d;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: p;
`;

export const JobPersonNameDiv = styled.div`
    grid-area: n;
    font-family: var(--font-family-semi-bold);
`;

export const JobCreatedAtDiv = styled.div`
    grid-area: d;
    font-size: var(--font-size-extra-small);
`;

export const JobLocationDiv = styled.div`
    display: flex;
    margin-right: 20px;
`;

export const JobCategoryDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 20px;
`;

export const JobIdDiv = styled.div`
    color: #c4c4c4;
    display: flex;

    > div {
        color: var(--color-text-secondary);
        margin-left: 5px;
    }
`;

export const JobPriceDiv = styled.div<{ isAccepted: boolean }>`
    display: flex;
    margin-left: 20px;

    > div {
        color: var(--color-text-secondary);
        margin-right: 5px;
        ${props => !props.isAccepted && 'font-family: var(--font-family-semi-bold);'};
    }

    @media (max-width: 600px) {
        margin: 10px 0 0 0;
    }
`;

export const JobPhoneDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    color: var(--color-active-control);
`;

export const JobEmailDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const JobDescriptionDiv = styled.div`
    display: inline;
    font-size: var(--font-size-extra-small);

    button {
        border: 0;
        background: white;
        cursor: pointer;
        color: var(--color-active-control);

        &:before {
            content: '...';
        }
    }
`;

export const JobActionButton = styled.button`
    width: 100px;
    height: 40px;
    border: 0;
    margin-right: 20px;
    font-family: var(--font-family-semi-bold);
    cursor: pointer;
`;

export const IconDiv = styled.div<{ icon: string }>`
    box-sizing: border-box;
    height: 20px;
    width: 25px;
    margin: auto 0;
    background: center no-repeat ${props => `url(${APP_PUBLIC_URL}/icons/${props.icon}.svg)`};
`;

export const JobContactBlockDiv = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
`;
