import React from 'react';
import classNames from 'classnames';
import './LayoutTable.css';

const LayoutTableCell = (props) => {
    const {className,children,...others}=props;

    const cls=classNames({
        'swiftBI_layout_table_cell':true,
        [className]: className
    })

    return(
        <div className={cls} {...others}>{children}</div>
    )
}


export default LayoutTableCell;
