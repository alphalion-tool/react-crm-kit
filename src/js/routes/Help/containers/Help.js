import React, { PureComponent } from 'react'; 
import './Help.scss';

export default class Help extends PureComponent {
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
                <div className="s-content--help">
                    <div className="s-content--help__word">This is Help</div>
                </div>
            </div>
        );
    }
}