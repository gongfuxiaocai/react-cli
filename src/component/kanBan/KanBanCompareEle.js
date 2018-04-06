import React from 'react';
import classNames from 'classnames';
import IconTip from '../iconTip/index';
import Cell from '../cell/index';
import './KanBan.css';

const KanBanCompareEle=(props)=>{
    const {className,text,data,tip,...others}=props;
    const cls=classNames({
        'swiftBi_kanban_compare_ele':true,
        [className]:className
    });
    const compareIconCls=classNames({
        'compare_icon':true,
        'up':data>0,
        'down':data<0
    });
    const dataColor=classNames({
       'kanban_red':data>0,
       'kanban_green':data<0
    });
    return(
        <Cell className={cls} {...others}>
            <Cell.CellLabel >{text}</Cell.CellLabel>
            <Cell.CellBody>
                <span className={compareIconCls}/>
                <span className={dataColor}>{Math.abs(data)}%</span>
                {tip!==undefined &&
                    <IconTip model="tip">
                        <p>{tip}</p>
                    </IconTip>
                }
            </Cell.CellBody>
        </Cell>
    )
}

export default KanBanCompareEle;
