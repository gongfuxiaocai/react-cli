import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Popover as AntdPopOver} from 'antd';
import './PopOver.less';

export default class PopOver extends React.Component{
    render(){
        const {children,...others} = this.props;

        return(
            <AntdPopOver {...others} >{children}</AntdPopOver>
        )
    }
}
