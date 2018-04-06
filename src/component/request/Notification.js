import React from 'react';
import ReactDOM from 'react-dom';
import Toast from 'Components/toast/Toast';
import commonData from 'Config/common';

class Notification extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //消息通知存放在这里 数据格式 {}, eg: { key:'t1', type: "success", content: "操作成功！"}
            notices:[]
        }
    }

    //添加一个消息通知 Notification.add( component )
    add = ( tipObject ) => {
        //如果有重复的key则删掉旧的，插入新的
        let notices= this.state.notices.filter( item => item.key !== tipObject.key );
        notices.push( tipObject );

        this.setState({
            notices,
        })

    };

    //删除一个消息通知 Notification.remove( key )
    remove = ( key, type ) => {
        const notices=this.state.notices.filter( item => item.key !== key );
        this.setState({
            notices
        });
        if( type === "login" ) {
            const url = encodeURIComponent( location.origin );
            location.href = commonData.redirect + url;
        }
    };

    //在页面上渲染消息通知
    renderMessage = () => {

        let noticeArr=[];
        this.state.notices.forEach( ( item, index ) => {
            let model = item.type;
            if( item.type === "login" ) {
                model = "warning"
            }
            noticeArr.push(
                <Toast
                    title="提示"
                    msg={ item.content }
                    show={ true }
                    model={ model }
                    onRequestClose={ this.remove.bind( this, item.key, item.type ) }
                    key={ index }
                />
            );
        } );

        return noticeArr;
    };

    render(){
        return(
            <div>
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
        add( tipObject ) {
            notification.add( tipObject );
        },
        remove( key ) {
            notification.remove( key );
        },
        destroy() {
            ReactDOM.unmountComponentAtNode( div );
            document.body.removeChild( div );
        },
        component: notification
    }
};

export default Notification;
