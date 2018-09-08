import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
} from 'bizcharts';

export default class PairWeeklySummary extends React.PureComponent {

    static propTypes = {
        dailyVolumeList: PropTypes.array.isRequired,
        weeklyVolumeList: PropTypes.array.isRequired,
    };
    
    render() {
        const cols = {
            value: {
                min: 10000
            },
            date: {
                range: [0, 1]
            }
        };
        const { dailyVolumeList, weeklyVolumeList } = this.props; 
        return (
            <Row className="s-dashboard__pairsummary">
                <Col span={12}>
                    <Chart height={320} data={dailyVolumeList} scale={cols} forceFit>
                        <Axis name="time" />
                        <Axis name="volume" />
                        <Tooltip
                            crosshairs={{
                                type: 'y'
                            }}
                        />
                        <Geom type="line" position="time*volume" size={2} />
                        <Geom
                            type="point"
                            position="time*volume"
                            size={4}
                            shape={'circle'}
                            style={{
                                stroke: '#fff',
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                    <h5 className="u-text-center">24 Hours Volume</h5>
                </Col>
                <Col span={12}>
                    <Chart height={320} data={weeklyVolumeList} scale={cols} forceFit>
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
                    <h5 className="u-text-center">Volume Weekly</h5>
                </Col>
            </Row>
        );
    }
}
