import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import './RealTimeData.css';
import Utils from '../Resource/utils/Utils';

class DataBox extends Component{
    constructor(props){
        super(props);
        this.state={
            curData: 0,
        };
    }

    static propTypes={
        data: PropTypes.number.isRequired,
        animate: PropTypes.bool
    }

    static defaultProps={
        animate: true
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

    renderData = (prevData, curData, animate) => {
        if (animate) {
            return (
                <CountUp start={prevData} end={curData} duration={2} decimals={2} formattingFn={curData => Utils.format(curData)} />
            )
        } else {
            // let formatData = (curData || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return Utils.format(curData);
        }           
    }

    render(){
        const {className,children,data,animate,...others} = this.props;

        const cls=classNames({
            'item_data': true,
            'format_data': true,
            [className]: className
        });

        return(
            <div className={cls} {...others}>
                {this.renderData(this.state.prevData, this.state.curData, animate)}
            </div>
        )
    }
}

export default DataBox;