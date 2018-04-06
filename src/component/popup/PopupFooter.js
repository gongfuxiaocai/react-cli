import React from 'react';
import classNames from 'classnames';
import './Popup.less';

const PopupFooter=(props)=>{

    const {className,children,...others}=props;

    const cls=classNames({
        'swiftBI_popup_footer':true,
        [className]:className
    });

    return(
        <div className={cls} {...others}>
            {children}
        </div>
    )
}
export default PopupFooter;
