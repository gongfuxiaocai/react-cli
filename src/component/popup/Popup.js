import React from 'react';
import classNames from 'classnames';
import { Modal as AntdModal } from 'antd';

import './Popup.less';

const Popup = (props) => {
    const {className,show,children,onRequestClose,footer,center,contWidth,contHeight,contBackground,bodyStyle,wrapClassName,...others}=props;

    const cls=classNames({
        'swift_popup':true,
        ['cont_bg_'+contBackground]:true,
        //'swift_popup_center':center,
        [className]: className
    })

    const wrapCls=classNames({
        "swift_popup_center":center,
        [wrapClassName]:true
    })

    let bdStyle={
        overflow:'auto',
        height:contHeight
    }

    bodyStyle !==undefined && Object.assign(bdStyle,bodyStyle);

    return(
        <AntdModal
            className={cls}
            bodyStyle={bdStyle}
            visible={show}
            onCancel={onRequestClose}
            footer={footer}
            wrapClassName={wrapCls}
            width={contWidth}
            {...others}
        >
            {children}
        </AntdModal>
    )
}

Popup.defaultProps = {
    footer:null,
    center:true,
    contBackground:"default" //default|primary
}
export default Popup;
