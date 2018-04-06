import React from 'react';
import classNames from 'classnames';
import './Panel.less';

const PanelFooter=(props)=>{
    const {className,children,...others}=props;
    const cls=classNames({
        'swiftBI_panel_footer':true,
        [className]:className
    });
    return(<div className={cls} {...others}>{children}</div>)
}

export default PanelFooter;
