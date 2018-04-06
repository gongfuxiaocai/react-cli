import React from 'react';
import classNames from 'classnames';
import './Table.css';

const Tr=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        [className]:className
    });
    return(<tr className={cls} {...others}>{children}</tr>)
}
export default Tr;
