import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const SnackbarContainerDiv = styled.div`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    animation: fadeInAndOut 5s linear forwards;

    > div {
        min-width: 250px;
        right: 10px;
        background-color: #737986;
        color: white;
        text-align: center;
        border-radius: 2px;
        padding: 16px;
        z-index: 1;
        bottom: 30px;
        font-size: var(--font-size-small);
        font-family: var(--font-family-regular);
    }

    @keyframes fadeInAndOut {
        0%,
        100% {
            opacity: 0;
            bottom: 0px;
        }
        10%,
        90% {
            opacity: 1;
            bottom: 30px;
        }
    }
`;
