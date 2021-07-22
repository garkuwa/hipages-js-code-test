import { SnackbarContainerDiv } from './styled';

interface ISnackbarProps {
    text?: string;
}

export default function Snackbar({ text }: ISnackbarProps) {
    return (
        <SnackbarContainerDiv>
            <div>{text}</div>
        </SnackbarContainerDiv>
    );
}
