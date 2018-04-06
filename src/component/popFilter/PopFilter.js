import React from 'react';
import classNames from 'classnames';
import './PopFilter.css';

const PopFilter=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_popfilter':true,
        [className]:className
    });
    return(<div className={cls} {...others}>{children}</div>)
}
export default PopFilter;
