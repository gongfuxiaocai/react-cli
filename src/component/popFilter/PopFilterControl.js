import React from 'react';
import classNames from 'classnames';
import './PopFilterControl.css';

const PopFilterControl=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_popfilter_control':true,
        [className]:className
    });
    return (<div className={cls} >{children}</div>)
}
export default PopFilterControl;
