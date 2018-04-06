import React from 'react';
import classNames from 'classnames';
import './Cell.css';

const Cell=(props)=>{
    const {className,children,...others}=props;

    const cls=classNames({
        'swiftBI_cell':true,
        [className]:className
    });

    return(
        <div className={cls} {...others}>{children}</div>
    )
};

export default Cell;
