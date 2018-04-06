import React from 'react';
import classNames from 'classnames';
import Panel from '../panel/index';
import Icon from '../icon/index';
import './Popup.less';

const PopupHeader=(props)=>{

    const {className,title,onRequestClose,...others}=props;

    const cls=classNames({
        'swiftBI_popup_header':true,
        [className]:className
    });

    return(
        <Panel.Title className={cls} {...others} style={{borderBottom:0}}>
            <span>{title}</span>
            <Icon model="cross-1" className="popup_close" onClick={onRequestClose}/>
        </Panel.Title>
    )
}
export default PopupHeader;
