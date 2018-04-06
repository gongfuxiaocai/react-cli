import React from 'react';
import classNames from 'classnames';
import './Table.css';

const Th=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        [className]:className
    });
    return(<th className={cls} {...others}><span>{children}</span></th>)
}
export default Th;
