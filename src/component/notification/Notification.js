import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Mask from '../mask/index';
import './Notification.less';
import Utils from '../Resource/utils/Utils';

class Notification extends Component{
    constructor(props){
        super(props);
        this.state={
            //消息通知存放在这里 数据格式 {key,obj},eg: {key:'t1',component:<Notice message="test1" key="t1"/>}
            notices:[],
            mask:false
        }
    }

    //添加一个消息通知 Notification.add( component )
    add=(component,mask)=>{
        //如果有重复的key则删掉旧的，插入新的
        let notices=this.state.notices.filter(item=>item.key !== component.key);
        let newNotice={key:component.key,component:component};
        notices.push(newNotice);

        this.setState({
            notices,
            mask
        })

    }

    //删除一个消息通知 Notification.remove( key )
    remove=(key)=>{
        const notices=this.state.notices.filter(item=>item.key !== key);
        this.setState({
            notices
        })
    }

    //在页面上渲染消息通知
    renderMessage=()=>{

        let noticeArr=[];
        if(!Utils.isEmpty(this.state.notices)){
            for(let i=0;i<this.state.notices.length;i++){
                noticeArr.push(this.state.notices[i].component)
            }

        }

        return noticeArr;
    }

    //在页面上渲染遮罩层
    renderMask=()=>{

        if(this.state.mask){
            return <Mask transparent={false} model="full"/>
        }
    }

    render(){
        const cls=classNames({
            'swift_notification':true
        });

        return(
            <div  className={cls} >
                { this.renderMask() }
                { this.renderMessage() }
            </div>
        )

    }
}

// 该方法方便Notification组件动态添加到页面中和重写
Notification.instance = function (properties) {
    const { ...props } = properties || {};

    let div;

    div = document.createElement('div');

    document.body.appendChild(div);

    const notification = ReactDOM.render(<Notification {...props} />, div);

    return {
        add(component,mask) {
            notification.add(component,mask);
        },
        remove(key) {
            notification.remove(key);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
};

export default Notification;
