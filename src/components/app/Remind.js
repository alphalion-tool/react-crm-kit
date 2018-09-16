/**
 * Created by lishengyong on 2017/3/16.
 */

import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import communication from 'jscom/utils/communication';

require('./Remind.scss');

const defaultSchema = {
    show: false,
}
const COMMUNICATION_TYPE = 'notice';
const REMIND_TYPE_QUERY = 'query';
const REMIND_TYPE_CHANGE = 'change';
const REMIND_ACTION_EDIT = 'edit';

class Remind extends Component {

    static propTypes = {
        reminderStatus: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.remindContent = null;
        this.state = {
            show: false,
            notRead: 0,
            dataList: [],
            navClass: '',
            bodyClass: ''
        }
    }

    componentDidMount() {
        // 注册socket消息事件
        communication.addListener(COMMUNICATION_TYPE, this.handleListener);
        // 初始化消息， 查询最新的消息
        communication.send({ type: COMMUNICATION_TYPE, action: REMIND_TYPE_QUERY, data: {} });
    }

    componentWillReceiveProps(nextProps) {
        const show = nextProps.reminderStatus;
        this.toogleRemind(show);
    }

    componentWillUnmount() {
        // 注销socket消息事件
        communication.removeListener(COMMUNICATION_TYPE)
    }

    /**
     *  处理消息回调
     */
    handleListener = (res) => {
        let dataList = this.state.dataList;
        let data = null;
        if (res.type === COMMUNICATION_TYPE) {
            if (res.data.type === REMIND_TYPE_QUERY) {
                data = res.data.data;
                if (data && data.length > 0) {
                    dataList = dataList.concat(data);
                }
                this.handleUpdateRemindCount(data);
            }
            if (res.data.type === REMIND_TYPE_CHANGE) {
                data = res.data.data;
                dataList.push(data);
                this.handleUpdateRemindCount([data]);
            }
            this.setState({
                dataList: dataList
            });
            // 添加新数据之后让页面滚动。
            this.remindContent.scrollTop = this.remindContent.scrollTop + 35;
        }
    }

    handleUpdateRemindCount = (data) => {
        let num = this.state.notRead;
        data.forEach((item, index) => {
            // status 0 消息未读
            // status 1 消息已读
            if (item.status === 0) {
                num += 1;
            }
        });
        this.setState({
            notRead: num
        });
    }

    toogleRemind = (show) => {
        if (show) {
            this.setState({
                show: true,
                navClass: 's-remind__root__nav--show',
                bodyClass: 's-remind__root__body--show'
            });
        } else if (this.state.show !== false) {
            this.setState({
                show: false,
                navClass: 's-remind__root__nav--hide',
                bodyClass: 's-remind__root__body--hide'
            });
        }
    }

    handleItemUpDown = (index) => {
        const dataList = this.state.dataList;
        let remindCount = this.state.notRead;
        dataList[index].show = !dataList[index].show;
        // status 0 消息未读
        // status 1 消息已读
        if (dataList[index].status === 0) {
            dataList[index].status = 1;
            // 调用已经阅读接口，修改是否已读标识
            communication.send({ type: COMMUNICATION_TYPE, action: REMIND_ACTION_EDIT, data: { ids: [dataList[index].id] } });
            remindCount += -1;
        }
        // 避免出现负数的情况
        remindCount = remindCount < 0 ? 0 : remindCount;
        this.setState({
            dataList: dataList,
            notRead: remindCount
        });
    }

    renderMessage = (dataList) => {
        let content = dataList.map((item, index) => {
            const readFlag = (item.status === 1);
            return (
                <div key={`remind-${item.id}-${index}`} className={`s-remind-message__item ${readFlag ? 's-remind-message__item--gray' : ''}`}>
                    <div onClick={() => this.handleItemUpDown(index)} className="s-remind-message__item__title">
                        <div className="s-remind-message__item__title--left">{item.bref}</div>
                        <div className="s-remind-message__item__title--right">
                            <span>{item.createTime}</span>
                            <e className={`s-remind-message__item__title-icon ${item.show ? 's-remind-message__item__title-icon--up' : 's-remind-message__item__title-icon--down'} ${readFlag ? '' : 's-remind-message__item__title-icon--badge'}`} />
                        </div>
                    </div>
                    <div className={`s-remind-message__item__content ${item.show ? '' : 's-remind-message__item__content--hide'}`}>
                        <p>
                            {item.content}
                        </p>
                    </div>
                </div>
            );
        });
        return content;
    }

    render() {
        const { dataList } = this.state;
        return (
            <div className="s-remind__root">
                <div className={`s-remind__root__nav ${this.state.navClass}`} >
                    {
                        /*
                        <e />
                        <span className="s-remind__root__nav__num">{this.state.notRead}</span>
                        <span className="s-remind__root__nav__title">Click me to toggle the Reminder</span>
                        */
                    }
                </div>
                <div ref={(ref) => { this.remindContent = ref }} className={`s-remind__root__body ${this.state.bodyClass}`}>
                    {
                        this.renderMessage(dataList)
                    }
                </div>
            </div>

        );
    }
}

export default Remind;
