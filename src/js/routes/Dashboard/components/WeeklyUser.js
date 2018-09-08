import React from 'react';
import PropTypes from 'prop-types';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
} from 'bizcharts';

export default class WeeklyUser extends React.PureComponent {
    
    static propTypes = {
        userList: PropTypes.array.isRequired
    };

    render() {
        const cols = {
            count: {
                min: 9000
            },
            date: {
                range: [0, 1]
            }
        };
        return (
            <div>
                <Chart height={400} data={this.props.userList} scale={cols} forceFit>
                    <Axis name="date" />
                    <Axis name="count" />
                    <Tooltip
                        crosshairs={{
                            type: 'y'
                        }}
                    />
                    <Geom type="line" position="date*count" size={2} />
                    <Geom
                        type="point"
                        position="date*count"
                        size={4}
                        shape={'circle'}
                        style={{
                            stroke: '#fff',
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        );
    }
}
