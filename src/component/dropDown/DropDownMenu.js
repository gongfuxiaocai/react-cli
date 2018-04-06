import React, { Component } from 'react';
import classNames from 'classnames';
import { Menu} from 'antd';
import './DropDown.less';

export default class DropDownMenu extends Component{
    render(){
        const {
            className,
            children,
            ...others
        } = this.props;

        const cls = classNames({
            'swiftBI_dropdown_menu': true,
            [className]: className
        });


        return(
            <Menu className={cls} {...others}>{children}</Menu>
        )
    }
}
