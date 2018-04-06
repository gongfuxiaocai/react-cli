import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Dropdown as AntdDropDown } from 'antd';
import Icon from '../icon/index';
import './DropDown.less';

export default class DropDown extends Component{
    static propTypes={
        title:PropTypes.string
        
    }
    render(){
        const {
            className,
            title,
            ...others
        } = this.props;

        const cls = classNames({
            'swiftBI_dropdown': true,
            [className]: className
        });


        return(
            <span className={cls}>
                <AntdDropDown  {...others}>
                    <span className="swiftBI_dropdown_title">
                        {title}
                        <Icon model="arrow-down"/>
                    </span>
                </AntdDropDown>
            </span>

        )
    }
}
