'use strict';

import React, { PureComponent } from 'react';
import './NotAllow.scss';

export default class NotAllow extends PureComponent {

    render() {
        return (
            <div className="s-content-root u-fixed--center p-notallow">
                <div className="u-fixed--center__child">
                    <div className="s-notallow">
                        <div className="s-notallow__title">Not Allow</div>
                    </div>
                </div>
            </div>
        );
    }
}
