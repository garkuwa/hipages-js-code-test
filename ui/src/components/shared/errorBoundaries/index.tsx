import { Component, ErrorInfo } from 'react';

interface IErrorBoundaryProps {
    children?: React.ReactNode;
}

/* eslint-disable react/destructuring-assignment, no-console */
export default class ErrorBoundaries extends Component<IErrorBoundaryProps> {
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // This error should be stored somewhere for developers to trace
        console.error('Error occurred in the component tree', error, errorInfo);
    }

    render() {
        return this.props.children;
    }
}
