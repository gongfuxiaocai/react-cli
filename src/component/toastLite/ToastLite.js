import React from 'react';
import Notification from '../notification/Notification';
import ToastLiteItem from './ToastLiteItem';
import TopMessage from '../topMessage/TopMessage';
import Spin from '../spin/Spin';
import './ToastLite.less';
let messageKey=0;

class ToastLite{

    constructor(){
        //储存 Notification实例
        this.notification;
        this._initNotification();
        //储存 message信息
        this.messageList=[];
    }
    //单例模式 保持页面始终只有一个Notification
    _initNotification=()=>{
        if (!this.notification) {
            this.notification = Notification.instance();
        }
    }

    show=(message,key,duration,mask)=>{
        this.notification.add(<ToastLiteItem key={key} message={message}/>,mask)
        if(duration){
            setTimeout(()=>{
                this.notification.remove(key)
            },duration)
        }
    }

    loading=(key)=>{

        this.notification.add(
            <div className="swift_toast_lite" key={key}>
                <div className="spin_toast_wrap">
                    <Spin size="large"/>
                </div>
            </div>
        )
    }

    remove=(key)=>{
        this.notification.remove(key)
    }

    destroy=()=>{
        if (this.notification) {
            this.notification.destroy();
            this.notification = null;
        }
    }

    message=(message,type='warn')=>{
        let icon;
        type=type.toLowerCase();
        switch(type){
            case 'success':icon='yes';break;
            case 'fail': icon='fail';break;
            case 'warn': icon='warn';break;
            default: icon='warn';break;
        }
        this.messageList.push(<TopMessage message={message} icon={icon} key={messageKey}/>);

        messageKey++;

        this.notification.add(
            <div className="swift_top_message_wrap" key="swift_top_message_wrap_key">
                {this.messageList}
            </div>
        )

        //3秒自动删除一个
        for(let k=0;k<this.messageList.length;k++){
            setTimeout(()=>{
                this.messageList[k]=null;
                this.notification.add(
                    <div className="swift_top_message_wrap" key="swift_top_message_wrap_key">
                        {this.messageList}
                    </div>
                )
            },3000)

        }

    }

}

export default new ToastLite
