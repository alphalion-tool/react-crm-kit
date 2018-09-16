
import React, { Component } from 'react';
import { Button, Spin } from 'antd';
import './ErrorBoundary.scss';

type ContainerProps = {
    children?: React$Element<any> | string,
};

export default class ErrorBoundary extends Component {

    props: ContainerProps;

    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
        this.reloading = false;
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo
        });
        // You can also log error messages to an error reporting service here
        // TODO Send the error message to the server
    }

    reload = () => {
        // window.location.reload();
        this.reloading = true;
        this.setState({ errorInfo: '' }, () => {
            setTimeout(() => {
                this.reloading = false;
                this.forceUpdate();
            }, 2000);
        })
        
    }

    render() {
        if (this.reloading) {
            // reloading
            return (
                <Spin spinning={true} size="large" tip="Reloading...">
                    <div className="s-content__error-boundary" />
                </Spin>
            );
        }
        if (this.state.errorInfo) {
            // Error path
            return (
                <div className="s-content__error-boundary">
                    <div className="s-content__error-boundary__title">
                        <h2>Something went wrong.</h2>
                    </div>
                    <div className="s-content__error-boundary__mid">
                        <Button onClick={this.reload}>Reload Page</Button>
                    </div>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary>Error Details: </summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}