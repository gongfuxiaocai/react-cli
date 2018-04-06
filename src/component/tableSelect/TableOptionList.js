import React from 'react';
import classNames from 'classnames';
import './TableSelect.css';

const TableOptionList=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'table_option_list':true,
        [className]:className
    });
    return(<div className={cls} {...others}>{children}</div>)
}
export default TableOptionList;
