import React from 'react';
import classNames from 'classnames';
import './CellBody.css';

const CellBody=(props)=>{
    const {className,children,...others}=props;

    const cls=classNames({
        'swiftBi_cell_body':true,
        [className]:className
    });

    return(
        <div className={cls} {...others}>{children}</div>
    )
}

export default CellBody;
