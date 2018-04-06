import React, { Component } from 'react';
import classNames from 'classnames';
import KanBan from './KanBan';
import KanBanCompare from './KanBanCompare';
import KanBanCompareEle from './KanBanCompareEle';
import KanBanCont from './KanBanCont';
import KanBanData from './KanBanData';
import KanBanHeader from './KanBanHeader';
import KanBanSubTitle from './KanBanSubTitle';
import KanBanList from './KanBanList';
import IconTip from '../iconTip/index';
import './KanBan.css';

export default class KanBanCom extends Component{
    static defaultProps={
        animate:false
    };
    //看板头部信息
    renderHeader(data){
        if(data!==undefined){
            let iconTip='';
            if(data.headerTip!==undefined){
                let tipList=[];
                data.headerTip.map(function(item,i){
                    tipList.push(<p key={i}>{item}</p>);
                });
                iconTip=<IconTip model="tip" >{tipList}</IconTip>
            }
            return(
                <KanBanHeader text={data.headerTxt} icon={data.headerIcon}>
                    {iconTip}
                </KanBanHeader>
            )
        }
    }
    //渲染看板内容
    renderBody(size,data,animate){

        return(
            <KanBanCont size={size}>
                {this.renderKanBanList(data,animate)}
            </KanBanCont>
        )
    }
    //子标题，看板中间数据
    renderKanBanList(data,animate){
        let list=[];
        let that=this;

        data.map(function(item,i){
            list.push(
                <KanBanList key={i}>
                    <KanBanSubTitle text={item.subTitle} icon={item.subIcon}/>
                    <KanBanData data={item.kanbanData} animate={animate}/>

                    <KanBanCompare>
                        {that.renderKanBanCompare(item.compareData)}
                    </KanBanCompare>
                </KanBanList>
            )
        });
        return list;
    }
    //各种底部环比数据
    renderKanBanCompare(data){
        let list=[];
        if(data!==undefined){
            data.map(function(item,i){
                list.push(<KanBanCompareEle key={i} text={item.text} data={item.value} tip={item.tip}/>)
            });
        }

        return list;
    }
    render(){
        const {className,theme,animate,size,...others}=this.props;

        const cls=classNames({
            [className]:className
        });

        return(
            <KanBan className={cls} {...others} theme={theme}>
                {this.renderHeader(this.props.data.header)}
                {this.renderBody(size,this.props.data.list,animate)}
            </KanBan>
        )
    }
}
