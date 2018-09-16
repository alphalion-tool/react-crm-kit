import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
} from 'bizcharts';
import { formatNumber } from 'jscom/utils/formatter';
import './CurrWeeklySummary.scss';

export default class CurrWeeklySummary extends React.PureComponent {

    static propTypes = {
        withdraw: PropTypes.number.isRequired,
        deposit: PropTypes.number.isRequired,
        withdraws: PropTypes.array.isRequired,
        deposits: PropTypes.array.isRequired
    };
    
    render() {
        const cols = {
            volume: {
                min: 10000
            },
            date: {
                range: [0, 1]
            }
        };
        const { withdraw, deposit, withdraws, deposits } = this.props;
        return (
            <Row className="s-dashboard__currsummary">
                <Col span={6}>
                    <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                        <h5>Daily Withdraw</h5>
                        <p>{formatNumber(withdraw)}</p>
                        <h5>Daily Deposit</h5>
                        <p>{formatNumber(deposit)}</p>
                    </div>
                </Col>
                <Col span={9}>
                    <Chart height={320} data={withdraws} scale={cols} forceFit>
                        <Axis name="date" />
                        <Axis name="volume" />
                        <Tooltip
                            crosshairs={{
                                type: 'y'
                            }}
                        />
                        <Geom type="line" position="date*volume" size={2} />
                        <Geom
                            type="point"
                            position="date*volume"
                            size={4}
                            shape={'circle'}
                            style={{
                                stroke: '#fff',
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                    <h5 className="u-text-center">Withdraw Volume Weekly</h5>
                </Col>
                <Col span={9}>
                    <Chart height={320} data={deposits} scale={cols} forceFit>
                        <Axis name="date" />
                        <Axis name="volume" />
                        <Tooltip
                            crosshairs={{
                                type: 'y'
                            }}
                        />
                        <Geom type="line" position="date*volume" size={2} />
                        <Geom
                            type="point"
                            position="date*volume"
                            size={4}
                            shape={'circle'}
                            style={{
                                stroke: '#fff',
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                    <h5 className="u-text-center">Deposit Volume Weekly</h5>
                </Col>
            </Row>
        );
    }
}
