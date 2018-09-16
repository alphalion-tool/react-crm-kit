import React from 'react';
import PropTypes from 'prop-types';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
} from 'bizcharts';

export default class DailyVolume extends React.PureComponent {

    static propTypes = {
        volumeList: PropTypes.array.isRequired,
    };

    render() {
        const cols = {
            sales: {
                tickInterval: 5
            }
        };
        return (
            <div>
                <Chart height={400} data={this.props.volumeList} scale={cols} forceFit>
                    <Axis name="currency" />
                    <Axis name="volume" />
                    <Tooltip
                        crosshairs={{
                            type: 'y'
                        }}
                    />
                    <Geom type="interval" position="currency*volume" />
                </Chart>
            </div>
        );
    }
}
