import React from 'react';
import classNames from 'classnames';
import PanelTitle from '../panel/PanelTitle';
import './KanBan.css';

const KanBanHeader=(props)=>{
    const {className,icon,children,text,...others}=props;
    const cls=classNames({
        'swiftBi_kanban_head':true,
        [className]:className
    });
    let imgStyle='';
    if(icon !==undefined){
        imgStyle={
            width:icon.width,
            height:icon.height
        }
    }
    return(
        <PanelTitle className={cls} {...others}>
            {
                icon !==undefined &&
                <img src={icon.src} style={imgStyle}/>
            }
            <span>{text}</span>
            {children}
        </PanelTitle>
    )
}

export default KanBanHeader;
