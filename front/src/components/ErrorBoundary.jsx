import React from 'react';
import AlertContainer from "../containers/alert";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <AlertContainer
                alertMessage='Something went wrong'
                alertSeverity={'error'}
            />;
        }

        return this.props.children;
    }
}
