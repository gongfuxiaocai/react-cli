import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import './ShKanban.css';
import Utils from '../Resource/utils/Utils';

class DataBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            curData: 0,
        };
    }

    static defaultProps = {
        decimal: 0,
        animate: true
    }

    static propTypes = {
        data: PropTypes.number.isRequired,
        decimal: PropTypes.number,
        animate: PropTypes.bool
    }

    componentWillMount(){
        this.setState({
            prevData: 0,
            curData: this.props.data
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState((prevState, nextProps) => ({
            prevData: prevState.curData,
            curData: nextProps.data
        }));
    }

    renderData = (prevData, curData, decimal, animate) => {
        if (animate) {
            if (decimal === 2) {
                return (
                    <CountUp start={0} end={curData} duration={2} decimals={2} formattingFn={curData => Utils.format(curData.toFixed(2))} />
                )
            } else if (decimal === 0) {
                return (
                    <CountUp start={0} end={curData} duration={2} decimals={0} formattingFn={curData => Utils.format(curData)} />
                )
            }
        } else {
            if (decimal === 2) {
                return this.format(curData.toFixed(2));
            } else if (decimal === 0) {
                return this.format(curData);
            }
        }
    }

    render(){
        const {className, children, data, decimal, animate, intl, ...others} = this.props;

        const cls = classNames({
            'item_data': true,
            'format_data': true,
            [className]: className
        });

        return(
            <div className={cls} {...others}>
                {this.renderData(this.state.prevData, this.state.curData, decimal, animate)}
            </div>
        )
    }
}

export default DataBox;
