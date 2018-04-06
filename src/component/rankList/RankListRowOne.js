import React from 'react';
import classNames from 'classnames';
import {Flex,FlexItem} from '../flex/index';
import './RankList.css';

const RankListRowOne=(props)=>{
    const {className,text,data,tip,...others}=props;
    const cls=classNames({
        'row_title':true,
        [className]:className
    });
    const compareIconCls=classNames({
        'rank_title_ico':true,
        'up':data.lastRn-data.rn>0 & data.rn<1000 & data.lastRn!=0,
        'down':data.lastRn-data.rn<0 & data.rn<1000 & data.lastRn!=0,
        'new': data.rn>1000 || data.lastRn==0
    });

    let formatData=(data.value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return(
        <Flex className={cls} {...others}>
            <FlexItem className="row_title_label">
                <span title={data.label}>{data.rn} {data.label}</span>

            </FlexItem>
            <FlexItem className="row_icon"><span className={compareIconCls}><b></b><em>{Math.abs(data.lastRn-data.rn)}</em></span></FlexItem>
            <FlexItem className="row_title_data">{formatData}</FlexItem>
        </Flex>
    )
}

export default RankListRowOne;
