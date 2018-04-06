import React from 'react';
import classNames from 'classnames';
import './Panel.less';

const PanelTitle=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_panel_title':true,
        [className]:className
    });
    return(<div className={cls} {...others}>{children}</div>)
}
export default PanelTitle;
