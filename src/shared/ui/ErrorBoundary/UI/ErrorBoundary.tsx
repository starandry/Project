import React from 'react';
import type { ErrorBoundaryProps } from '../index.model';
import { ErrorFallback } from '@/shared/ui/ErrorFallback';

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Unhandled error:', error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        const { hasError } = this.state;
        const { children, fallback } = this.props;

        if (hasError) {
            return fallback ?? <ErrorFallback onAction={this.handleReload} />;
        }

        return children;
    }
}

export { ErrorBoundary };
