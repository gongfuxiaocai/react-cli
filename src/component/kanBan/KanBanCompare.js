import React from 'react';
import classNames from 'classnames';
import './KanBan.css';

const KanBanCompare=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBi_kanban_compare':true,
        [className]:className
    });
    return(
        <div className={cls} {...others}>{children}</div>
    )
}

export default KanBanCompare;
