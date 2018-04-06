import React from 'react';
import classNames from 'classnames';
import './TipPanel.css';

export default class TipPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootData: props.data,
            isOpen: []
        };
    }

    triggleOpen = (i, arr) => {
        const newArr = this.state.isOpen;
        if(newArr.length > 0) {
            arr[i] = !newArr[i];
        } else {
            arr[i] = true;
        }
        this.setState({
            isOpen: arr
        });
    }

    renderData = (data) => {
        let arr = [];
        if((typeof data === 'undefined') || !(data instanceof Array) || data.length < 1) {
            data = [{text: '暂无权限', detail: '暂无权限'}];
        }
        return data.map((item , i) => {
            arr[i] = false;
            return (
                <li key={i}
                    className={this.state.isOpen[i]?'open':''}
                    onClick={()=>{this.triggleOpen(i, arr)}}
                >
                    <i/>
                    <div>{item.text}</div>
                    <div>{item.detail}</div>
                </li>
            );
        });
    }

    render() {
        const {className,...others} = this.props;
        const cls = classNames({
            'innovate_tip_panel': true,

            [className]: className
        });

        return (
            <div>
                <div className="tipPanel_triangle"/>
                <div className={cls} {...others}>
                    <ul>
                        {this.renderData(this.state.rootData)}
                    </ul>
                </div>
            </div>
        );
    }
}
