import React from 'react';
import classNames from 'classnames';
import Cell from '../cell/index';
import './RankList.css';

const RankListCompare=(props)=>{
    const {className,text,data,showIcon,...others}=props;
    const cls=classNames({
        'row_compare_ele':true,
        [className]:className
    });
    const compareIconCls=classNames({
        'row_compare_ico':true,
        'up':data>0,
        'down':data<0
    });

    return(
        <Cell className={cls} {...others}>
            <Cell.CellLabel>{text}</Cell.CellLabel>
            <Cell.CellBody className={compareIconCls}>
                <span>{Math.abs(data)}%</span>
                {
                    showIcon==true &&
                    <b></b>
                }

            </Cell.CellBody>
        </Cell>
    )
}

export default RankListCompare;
