import React from 'react';
import classNames from 'classnames';
import './KanBan.css';

const KanBanSubTitle=(props)=>{
    const {className,text,icon,...others}=props;
    const cls=classNames({
        'swiftBi_kanban_sub_title':true,
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
        <div className={cls} {...others}>
        {
            icon !==undefined &&
            <img src={icon.src} style={imgStyle}/>
        }
            <span>{text}</span>
        </div>
    )
}

export default KanBanSubTitle;
