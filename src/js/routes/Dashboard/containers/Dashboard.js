import React, { PureComponent } from 'react'; 
import './Dashboard.scss';

export default class Dashboard extends PureComponent {
    state = {
        bodyHeight: 900
    };
    componentDidMount () {
        this.resizeComponent();
    }

    resizeComponent = () => {
        const bodyH = document.getElementsByTagName('body')[0].clientHeight - 61;
        this.setState({
            bodyHeight: bodyH
        });
    }

    render() {
        const contentStyle = { height: `${this.state.bodyHeight}px` };
        return (
            <div className="s-content-root u-fixed--center s-content__background-image" style={contentStyle} >
                <div className="s-content--welcome">
                    <div className="s-content--welcome__word">This is Dashboard</div>
                </div>
            </div>
        );
    }
}