import React from 'react';
import classNames from 'classnames';
import './Tab.less';

const Tab=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_tab':true,
        [className]:className
    });
    return(<div className={cls} {...others}>{children}</div>)
}

export default Tab;
