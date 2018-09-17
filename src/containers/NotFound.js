'use strict';

import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { intlInject } from 'jscom/utils/decorators';
import './NotFound.scss';


@intlInject
export default class NotFound extends PureComponent {

    render() {
        return (
            <div className="s-content-root u-fixed--center p-404">
                <div className="u-fixed--center__child">
                    <div className="s-404">
                        <Icon type="info-circle" />
                        <span>{this.intl('common.string.notfound')}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export const NotFoundRoute = {
    name: 'Not Found',
    // exact: false,
    // strict: false,
    // path: '**',
    component: NotFound
};
