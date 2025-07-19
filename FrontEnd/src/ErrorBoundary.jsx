import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error to a service like Sentry here
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Customize your fallback UI
      return (
        <div className="p-10 text-center text-red-600">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
