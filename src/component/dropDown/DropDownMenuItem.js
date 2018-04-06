import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Menu} from 'antd';
import './DropDown.less';

export default class DropDownMenuItem extends React.Component{
    render(){
        const {
            className,
            children,
            ...others
        } = this.props;

        const cls = classNames({
            'swiftBI_dropdown_menu_item': true,
            [className]: className
        });


        return(
            <Menu.Item className={cls} {...others}>{children}</Menu.Item>
        )
    }
}
