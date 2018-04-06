import React from 'react';
import classNames from 'classnames';
import './TableSelect.css';

const TableOption=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_table_option':true,
        [className]:className
    });
    return(<div className={cls} {...others}>{children}</div>)
}
export default TableOption;
