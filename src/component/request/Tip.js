import React from 'react';
import Notification from './Notification';

class ToastLite{

    constructor(){
        //储存 Notification实例
        this.notification;
        this._initNotification();
    }
    //单例模式 保持页面始终只有一个Notification
    _initNotification = ()=> {
        if (!this.notification) {
            this.notification = Notification.instance();
        }
    };

    show = ( tipObject, duration )=>{
        this.notification.add( tipObject );
        if( duration ){
            setTimeout( () => {
                this.notification.remove( tipObject.key )
            }, duration );
        }
    };

    loading = (key) => {
        this.notification.add(
            <div className="swift_toast_lite" key={ key }>
                <div className="spin_toast_wrap">
                    <Spin size="large"/>
                </div>
            </div>
        )
    };

    remove = ( key ) => {
        this.notification.remove( key )
    };

    destroy = () => {
        if (this.notification) {
            this.notification.destroy();
            this.notification = null;
        }
    }

}

export default new ToastLite
