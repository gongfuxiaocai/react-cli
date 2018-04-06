import React from 'react';
import classNames from 'classnames';
import Panel from '../panel/index';
import './KanBan.css';

const KanBan=(props)=>{
    const {className,theme,children,...others}=props;
    const cls=classNames({
        'swiftBI_kanban':true,
        'theme_blue':theme=="blue",
        [className]:className
    });

    return(
        <Panel className={cls} {...others}>
            {children}
        </Panel>

    )
}

export default KanBan;
