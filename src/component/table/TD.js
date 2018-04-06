import React from 'react';
import classNames from 'classnames';
import './Table.css';

const Td=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        [className]:className
    });
    return(<td className={cls} {...others}>{children}</td>)
}
export default Td;
