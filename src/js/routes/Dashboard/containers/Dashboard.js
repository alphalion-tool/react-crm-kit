import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bind } from 'decko';
import { containerInject, connectPermission } from 'jscom/utils/decorators';
import WeeklyUser from '../components/WeeklyUser';
import DailyVolume from '../components/DailyVolume';
import PendingWithdraw from '../components/PendingWithdraw';
import CurrWeeklySummary from '../components/CurrWeeklySummary';
import PairWeeklySummary from '../components/PairWeeklySummary';
import CryptoCurrSelect from 'jscom/components/entry/CryptoCurrSelect';
import CurrPairSelect from 'jscom/components/entry/CurrPairSelect';

import Actions from '../modules/action';

import './Dashboard.scss';

export function mapStore2Props (store) {
    const summary = store.summary || {};
    const {
        withdrawList,
        dailyUSDTVolumeList,
        userCountList,

        dailyWithdraw,
        dailyDeposit,
        weeklyWithdrawList,
        weeklyDepositList,

        dailyVolumeList,
        weeklyVolumeList,

        basicStatus,
        volumeStatus,
        withdrawStatus
    } = summary;
    return {
        withdrawList,
        dailyUSDTVolumeList,
        userCountList,

        dailyWithdraw,
        dailyDeposit,
        weeklyWithdrawList,
        weeklyDepositList,

        dailyVolumeList,
        weeklyVolumeList,

        basicStatus,
        volumeStatus,
        withdrawStatus
    };
}


export class PureDashboard extends Component {

    static propTypes = {
        withdrawList: PropTypes.array.isRequired,
        dailyUSDTVolumeList: PropTypes.array.isRequired,
        userCountList: PropTypes.array.isRequired,

        dailyWithdraw: PropTypes.number.isRequired,
        dailyDeposit: PropTypes.number.isRequired,
        weeklyWithdrawList: PropTypes.array.isRequired,
        weeklyDepositList: PropTypes.array.isRequired,

        dailyVolumeList: PropTypes.array.isRequired,
        weeklyVolumeList: PropTypes.array.isRequired,

        basicStatus: PropTypes.string.isRequired,
        volumeStatus: PropTypes.string.isRequired,
        withdrawStatus: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            currency: 'btc',
            pair: 'btc-usdt',
        };
    }

    componentWillMount () {
        this.props.dispatch(Actions.summaryBasic());
        this.props.dispatch(Actions.summaryWithdraw({ currency: this.state.currency }));
        this.props.dispatch(Actions.summaryVolume({ pair: this.state.pair }));
    }

    @bind
    handleCurrencyChange (value) {
        this.setState({
            currency: value,
        }, () => {
            this.props.dispatch(Actions.summaryWithdraw({ currency: this.state.currency }));
        })
    }

    @bind
    handlePairChange (value) {
        this.setState({
            pair: value
        }, () => {
            this.props.dispatch(Actions.summaryVolume({ pair: this.state.pair }));
        })
    }

    renderBlock (span = 8, title, content) {
        return (
            <Col span={span}>
                <div className="s-dashboard__item">
                    <div className="s-dashboard__title">{title}</div>
                    {content}
                </div>
            </Col>
        );
    }

    renderCurrencySummaryTitle () {
        return [
            <CryptoCurrSelect value={this.state.currency} onChange={this.handleCurrencyChange} />,
            <span>Withdraw/Deposit Summary</span>,
            this.props.withdrawStatus === 'loading' && <Icon type="loading" />
        ];
    }

    renderPairSummaryTitle () {
        return [
            <CurrPairSelect value={this.state.pair} onChange={this.handlePairChange} />,
            <span>Volume Summary</span>,
            this.props.volumeStatus === 'loading' && <Icon type="loading" />
        ];
    }

    render() {
        const {
            withdrawList,
            dailyUSDTVolumeList,
            userCountList,

            dailyWithdraw,
            dailyDeposit,
            weeklyWithdrawList,
            weeklyDepositList,

            dailyVolumeList,
            weeklyVolumeList,

            basicStatus,
        } = this.props;

        return (
            <div className="s-content-root s-dashboard">
                <div className="s-content--dashboard">
                    <Row gutter={16}>
                        {this.renderBlock(8, ['Withdraws (Pending)', basicStatus === 'loading' && <Icon type="loading" />],
                            <PendingWithdraw withdrawList={withdrawList} />)}
                        {this.renderBlock(8, ['24 Hours Volume - USDT(m)', basicStatus === 'loading' && <Icon type="loading" />],
                            <DailyVolume volumeList={dailyUSDTVolumeList} />)}
                        {this.renderBlock(8, ['New Users Weekly', basicStatus === 'loading' && <Icon type="loading" />],
                            <WeeklyUser userList={userCountList} />)}
                    </Row>
                    <Row>
                        {this.renderBlock(24, this.renderCurrencySummaryTitle(),
                            <CurrWeeklySummary
                                withdraw={dailyWithdraw}
                                deposit={dailyDeposit}
                                withdraws={weeklyWithdrawList}
                                deposits={weeklyDepositList}
                            />
                        )}
                    </Row>
                    <Row>
                        {this.renderBlock(24, this.renderPairSummaryTitle(),
                            <PairWeeklySummary
                                dailyVolumeList={dailyVolumeList}
                                weeklyVolumeList={weeklyVolumeList}
                            />
                        )}
                    </Row>
                </div>
            </div>
        );
    }
}


export default connect(mapStore2Props)(containerInject(PureDashboard));
