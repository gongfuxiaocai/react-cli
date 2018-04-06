import React from 'react';
import classNames from 'classnames';
import './Table.css';

const THead=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_thead':true,
        [className]:className
    });
    return(<thead className={cls} {...others}>{children}</thead>)
}
export default THead;
