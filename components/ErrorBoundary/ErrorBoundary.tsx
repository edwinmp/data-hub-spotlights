import React, { Component, GetDerivedStateFromError, ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError: GetDerivedStateFromError<{}, {}> = () => {
    return { hasError: true };
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Error Boundary:', error, errorInfo);
  }

  render(): ReactNode {
    return this.state.hasError ? (
      <div>Something went wrong! Please contact your administrator</div>
    ) : (
      this.props.children
    );
  }
}

export { ErrorBoundary };
