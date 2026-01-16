import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    margin: '2rem auto',
                    maxWidth: '600px',
                    fontFamily: "'Montserrat', sans-serif"
                }}>
                    <h2 style={{ color: '#4A5D4F', marginBottom: '1rem' }}>Something went wrong</h2>
                    <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                        We're having trouble displaying this section. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.8rem 1.5rem',
                            backgroundColor: '#1a1a1a',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Refresh Page
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <details style={{ marginTop: '2rem', textAlign: 'left', color: 'red' }}>
                            <summary>Error Details</summary>
                            <pre>{this.state.error && this.state.error.toString()}</pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
