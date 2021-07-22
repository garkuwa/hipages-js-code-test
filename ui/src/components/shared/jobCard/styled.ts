import styled from 'styled-components';
import { APP_PUBLIC_URL } from 'config';

export enum ButtonType {
    PRIMARY = 'primaryBtn',
    SECONDARY = 'secondaryBtn',
}

export const JobContainerDiv = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    background-color: var(--color-card);
    padding: 18px 18px 0 18px;
    box-sizing: border-box;
    font-size: var(--font-size-small);
    font-family: var(--font-family-regular);
    color: var(--color-text-secondary);

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
    padding: 10px;
    flex-wrap: wrap;

    > div {
        margin-right: 10px;
    }
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
    justify-content: center;
    align-items: center;
`;

export const JobCategoryDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const JobIdDiv = styled.div`
    display: flex;
    color: #c4c4c4;

    > div {
        color: var(--color-text-secondary);
        margin-left: 5px;
    }
`;

export const JobPriceDiv = styled.div`
    display: flex;
    color: #555555;
    font-family: var(--font-family-medium);

    > div {
        color: #5c5c5c;
        margin-left: 5px;
        font-family: var(--font-family-regular);
    }

    @media (max-width: 375px) {
        margin-top: 5px;
    }
`;

export const JobPhoneDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const JobEmailDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const JobDescriptionDiv = styled.div`
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: var(--font-size-extra-small);
`;

export const JobBtnControlDiv = styled.div`
    display: flex;
`;

export const JobActionButton = styled.button`
    width: 100px;
    height: 40px;
    border: 0;
    margin-right: 20px;
    font-family: var(--font-family-semi-bold);
    cursor: pointer;

    &:hover {
        transform: translateY(-0.1rem);
        box-shadow: 0.2rem 0.2rem 0.5rem rgb(0 0 0 / 20%);
    }

    &.${ButtonType.PRIMARY} {
        color: white;
        background-color: var(--color-active-control);
        border-bottom: #cb6422 2px solid;
    }

    &.${ButtonType.SECONDARY} {
        color: #555555;
        background-color: var(--color-secondary-control);
        border-bottom: #bebebe, 2px solid;
    }
`;

export const IconDiv = styled.div<{ icon: string }>`
    box-sizing: border-box;
    height: 20px;
    width: 25px;
    margin: auto 0;
    background-position: center;
    background: no-repeat ${props => `url(${APP_PUBLIC_URL}/icons/${props.icon}.svg)`};
`;
