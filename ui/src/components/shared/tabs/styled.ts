import styled from 'styled-components';

export const TabContainerDiv = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;
`;

export const TabButtonContainerDiv = styled.div`
    align-items: center;
    display: flex;
    font-size: var(--font-size-medium);
    justify-content: center;
    width: 100%;
`;

export const TabButtonDiv = styled.div<{ isActive: boolean }>`
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex: 1;
    height: 52px;
    justify-content: center;
    ${props => props.isActive && 'border-bottom: 3px solid var(--color-active-control)'};
    font-family: ${props =>
        props.isActive ? 'var(--font-family-semi-bold)' : 'var(--font-family-medium)'};
`;

export const TabDiv = styled.div`
    margin-top: 15px;
    max-height: calc(100vh - 80px);
    overflow: auto;
`;
