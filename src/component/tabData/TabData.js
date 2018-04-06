import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TabData.css';
import Utils from '../Resource/utils/Utils.js';

export default class TabData extends React.Component{
    static defaultProps={
        active: 0    
    };
    static propTypes={
        active: PropTypes.number,
        tabData: PropTypes.array.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            active: this.props.active
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            active: nextProps.active
        });
    }

    //给数字加上千分符
    format = (num) => {
        var num = String(num);
        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) {
            num = num.replace(re, "$1,$2")
        }     
        return num;
    }

    updateSelect = (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx);
        //只有当用户点击了不同的tab选项卡时才执行setState
        if (idx !== this.state.active) {
            this.setState({
                active: idx    
            }, () => {
                //把当前的idx传到父级组件
                if (this.props.onChange) {
                    this.props.onChange(idx);
                }
            });
        }
    }

    renderTabItems = (tabData) => {
        let tabItems = tabData.map((item, index) => {
            const liCls = classNames({
                on: this.state.active === index
            });
            return (
                <li className={liCls} key={index} data-idx={index} onClick={this.updateSelect}>
                    <p>{item.title}</p>
                    <p>{Utils.format(item.data)}</p>
                </li>
            )
        }); 
        return tabItems;   
    }

    render() {
        const {className, children, tabData, active, ...others} = this.props;
        const cls = classNames({
            'data_tab': true,
            [className]: className
        });

        return(
            <ul className={cls} {...others}>
                {this.renderTabItems(tabData)}
            </ul>
        )
    }
}