import styled from 'styled-components';

export const TabContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const TabButtonContainerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: var(--font-size-medium);
`;

export const TabButtonDiv = styled.div<{ isActive: boolean }>`
    flex: 1;
    height: 52px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dddddd;
    ${props => props.isActive && 'border-bottom: 3px solid var(--color-active-control)'};
    font-family: ${props =>
        props.isActive ? 'var(--font-family-semi-bold)' : 'var(--font-family-medium)'};
    cursor: pointer;
    box-sizing: border-box;
`;

export const TabDiv = styled.div`
    margin-top: 15px;
    max-height: calc(100vh - 150px);
    overflow: auto;
`;
