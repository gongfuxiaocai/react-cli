import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './Table.less';
import { TweenOneGroup } from 'rc-tween-one';
import Utils from '../Resource/utils/Utils';

export default class TablePlus extends React.Component{
    static defaultProps={
        pagination:false,
        isLoading:false,
        noAnimation:true
    };
    static propTypes={
        pagination:PropTypes.bool,
        isLoading:PropTypes.bool
    }
    constructor(){
        super();
        //进场动画
        this.enterAnim = [
              {
                opacity: 0, x: 30, backgroundColor: '#FFEFD9', duration: 0,
              },
              {
                height: 0,
                duration: 200,
                type: 'from',
                delay: 250,
                ease: 'easeOutQuad',
                onComplete: this.onEnd
              },
              {
                opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
              },
              { delay: 500, backgroundColor: 'inherit' },
        ];

        //出场动画
        this.leaveAnim = [
            { duration: 250, opacity: 0 },
            { height: 0, duration: 200, ease: 'easeOutQuad' }
        ];
    }


    //经常动画结束后执行
    onEnd = (e) => {
        const dom = e.target;
        dom.style.height = 'auto';
    }
    //动画wrapper
    animation = (body) => {
        if(this.props.noAnimation){
            return body
        }
        else{
            if(!Utils.isEmpty(this.props.bodyData)){
                return (
                  <TweenOneGroup
                    component="tbody"
                    enter={this.enterAnim}
                    leave={this.leaveAnim}
                    appear={false}
                  >
                    {body.props.children}
                  </TweenOneGroup>
                );
            }

        }

    }

    //如果只有dataKey 但却没有 dataIndex 表示这是老版本的数据格式，要转换成新版本的
    transformThData=(thData)=>{
        for(let i=0;i<thData.length;i++){
            if(!thData[i].dataIndex && thData[i].dataKey){
                thData[i].dataIndex=thData[i].dataKey
            }
        }
        return thData;
    }

    render(){
        const {className,bodyData,thData,pagination,isLoading,noAnimation,...others} = this.props;
        const cls=classNames({
            'swiftBI_table':true,
            'animation_enable':!noAnimation,
            [className]:className
        });
        return(

            <Table
                className={cls}
                dataSource={bodyData}
                columns={thData}
                pagination={pagination}
                loading={isLoading}
                components={this.animation}
                {...others}
            />
        )
    }

}
