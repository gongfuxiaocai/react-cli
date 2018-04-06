import React, { Component } from 'react';
import classNames from 'classnames';
import PopOver from '../popOver/index';
import Icon from '../icon/index';
import Button from '../button/index';
import './PopConfirm.less';

export default class PopConfirm extends Component{
    constructor(){
        super();
        this.state={
            visible:false
        };
    }

    handleVisibleChange = (visible) => {
        this.setState({
            visible
        })
    }
    hide = () => {
        this.setState({
          visible: false,
        });
    }
    handleCancel=()=>{
        this.hide();
        this.props.onCancel && this.props.onCancel()
    }

    handleConfirm=()=>{
        this.hide();
        this.props.onConfirm && this.props.onConfirm()
    }

    render(){
        const {children,className,title,okText,cancelText,onCancel,onConfirm,...others} = this.props;
        const cls=classNames({
            'swift_popconfirm':true,
            [className]: className
        })
        let content=<div className="swift_popconfirm_cont">
                        <div className="swift_popconfirm_message">
                            <Icon model="warn"/>
                            <span>{title}</span>
                        </div>

                        <div className="swift_popconfirm_btn">
                            <Button model="default" onClick={this.handleCancel}>
                                {
                                    cancelText?cancelText:'取消'
                                }
                            </Button>
                            <Button onClick={this.handleConfirm}>
                                {
                                    okText?okText:'确定'
                                }
                            </Button>
                        </div>
                    </div>;

        return(
            <PopOver
                className={cls}
                trigger="click"
                content={content}
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                {...others}
            >
                {children}
            </PopOver>
        )
    }
}
