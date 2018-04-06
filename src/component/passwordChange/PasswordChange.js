import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '../button/index';
import Input from '../input/index';
import Popup from '../popup/index';
import PopupFooter from '../popup/PopupFooter';
import Cell from '../cell/index';
import './PasswordChange.css';

export default class PasswordChange extends Component {
    state={
        oldPassword:'',
        oldPassError:'',//旧密码错误提示
        newPassword:'',
        newPassError:'',//新密码错误提示
        confirmPassword:'',
        confirmError:'',//确认密码错误提示
    }
    handleChange=(type,event)=>{
        var value = this.trim(event.target.value);
        switch(type) {
            case 'oldPass':
                this.setState({
                    oldPassword: value
                });
                break;
            case 'newPass':
                this.setState({
                    newPassword: value
                });
                break;
            case 'confirmPass':
                this.setState({
                    confirmPassword: value,
                });
                break;
        }
    }
    handleBlur=(type,event)=>{

        switch(type) {
            case 'oldPass':
                var value = event.currentTarget.value;
                var error = '';
                if(!value) {
                    error = '旧密码不能为空';
                }
                this.setState({
                    //oldPassword: value,
                    oldPassError: error
                });
                break;
            case 'newPass':
                var value = event.currentTarget.value;
                var error = '';

                if(!value) {
                    error = '新密码不能为空';
                }
                if(value && value.length<8){
                    error = '长度须在8-20之间';
                }
                if(value && value.length>20){
                    error = '长度须在8-20之间';
                }

                this.setState({
                    //newPassword: this.trim(value),
                    newPassError: error
                });
                break;
            case 'confirmPass':
                var value = event.currentTarget.value;
                var error = '';
                if(!value) {
                    error = '确认密码不能为空';
                }
                if(value!=this.state.newPassword){
                    error = '确认密码不匹配';
                }
                this.setState({

                    confirmError: error
                });
                break;
        }
    }
    //去除前后空格
    trim=(str)=>{
        return str.replace(/^\s+|\s+$/g,"");
    }
    //点击修改按钮后触发
    doChangePassword=()=>{
        let noEmpty=false;
        let passMatch=false;
        if(!this.state.oldPassword){
            this.setState({
                oldPassError: '旧密码不能为空'
            });
        }
        if(!this.state.newPassword){
            this.setState({
                newPassError: '新密码不能为空'
            });
        }
        if(!this.state.confirmPassword){
            this.setState({
                confirmError: '确认密码不能为空'
            });
        }
        //判定信息不为空
        if(this.state.newPassword &&
           this.state.confirmPassword &&
           this.state.oldPassword)
        {
            noEmpty=true;
        }
        //判定确认密码是否一致
        if(this.state.confirmPassword==this.state.newPassword){
            passMatch=true
        }
        //密码一致且旧密码不为空 执行submit
        if(noEmpty && passMatch){
            let data={
                oldPassword:this.state.oldPassword,
                newPassword:this.state.newPassword,
                confirmPassword:this.state.confirmPassword
            }
            this.props.onSubmit?this.props.onSubmit(data):null;
            this.props.onRequestClose();
        }


    }

    render() {
        const {className,onClickMore,data,show,onRequestClose,onSubmit,...others} = this.props;
        const cls = classNames({
            'innovate_password_pop': true,
            [className]: className
        });

        return (
            <Popup
                className={cls} {...others}
                contWidth={600} mask={true} model="full"
                show={show} title="修改密码"
                onRequestClose={onRequestClose}>

                <div className="pasword_pot_cont" >
                    <div>
                        <Cell>
                            <CellLabel width={80} className="form_require">旧密码:</CellLabel>
                            <Cell.CellBody>
                                <Input model="primary" type="password" onChange={this.handleChange.bind(this,'oldPass')} onBlur={this.handleBlur.bind(this,'oldPass')} value={this.state.oldPassword} placeholder="请输入旧密码"/>
                                <span className="check_warn">{this.state.oldPassError}</span>
                            </Cell.CellBody>
                        </Cell>
                    </div>
                    <div>
                        <Cell>
                            <Cell.CellLabel width={80} className="form_require">新密码:</Cell.CellLabel>
                            <Cell.CellBody>
                                <Input model="primary" type="password" onChange={this.handleChange.bind(this,'newPass')} onBlur={this.handleBlur.bind(this,'newPass')} value={this.state.newPassword}  placeholder="请输入新密码"/>
                                <span className="check_warn">{this.state.newPassError}</span>
                            </Cell.CellBody>
                        </Cell>
                    </div>
                    <div>
                        <Cell>
                            <Cell.CellLabel width={80} className="form_require">确认密码:</Cell.CellLabel>
                            <Cell.CellBody>
                                <Input model="primary" type="password" onChange={this.handleChange.bind(this,'confirmPass')} onBlur={this.handleBlur.bind(this,'confirmPass')}  value={this.state.confirmPassword} placeholder="请再次确认新密码"/>
                                <span className="check_warn">{this.state.confirmError}</span>
                            </Cell.CellBody>
                        </Cell>
                    </div>
                </div>

                <PopupFooter>
                    <Button model="primary"  size="medium" onClick={this.doChangePassword}>修改</Button>
                    <Button model="default"  size="medium" onClick={onRequestClose} >关闭</Button>
                </PopupFooter>

            </Popup>
        );
    }
}
