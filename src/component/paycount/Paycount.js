import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/index';
import './Paycount.css';

export default class Paycount extends Component{
    static propTypes = {
        model: PropTypes.string,
        title: PropTypes.string,
        number:PropTypes.number,
        showLine:PropTypes.bool
    }
    static defaultProps = {
        model:"primary",
        showLine:true
    }
    transformNumber=(number)=>{
        //带小数点
        let numData = String(number);
        let re = /(-?\d+)(\d{3})/;
        while(re.test(numData)){
          numData = numData.replace(re,"$1,$2");
        }
        return numData;
    }

    render(){
        const {className,model,icon,title,number,showLine,...others}=this.props;

        const cls=classNames({
            ['innovate_paycount']:true,
            ['primary']:model==='primary',
            ['line']:showLine===true,
            [className]: className
        })

        return(
            <div className={cls} {...others}>
                <div className="innovate_paycount_d1"><Icon model={icon}/><span className="innovate_paycount_title">{title}</span></div>
                <div className="innovate_paycount_d2">{this.transformNumber(number)} <span className="thisLine"/></div>
            </div>
        )
    }

}
