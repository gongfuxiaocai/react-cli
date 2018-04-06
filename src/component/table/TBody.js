import React from 'react';
import classNames from 'classnames';
import './Table.css';

const TBody=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_tbody':true,
        [className]:className
    });
    return(<tbody className={cls} {...others}>{children}</tbody>)
}
export default TBody;
