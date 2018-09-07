import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Button } from 'antd';
import './loading.scss';


const propTypes = {
    error: PropTypes.object,
    pastDelay: PropTypes.number,
};

const Loading = ({ error, pastDelay }) => {
    if (error) {
        return (
            <div className="s-loading__container s-loading__container--error">
                <p>Error occurred while trying to load current page.</p>
                <Button onClick={() => window.location.reload()}>Reload</Button>
            </div>
        );
    } else if (pastDelay) {
        return (
            <div className="s-loading__container">
                <Spin />
            </div>
        );
    } else {
        return null;
    }
};

Loading.prototype.propTypes = propTypes;

export default Loading;