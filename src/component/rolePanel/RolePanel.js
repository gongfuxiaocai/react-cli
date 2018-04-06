import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/index';
import Mask from '../mask/Mask';
import './RolePanel.css';
import TipPanel from '../tipPanel/index';

export default class RolePanel extends React.Component {
    static propTypes = {
        showTipButton:PropTypes.bool,
        shoTopEdit:PropTypes.bool,
        buttons:PropTypes.object,
        icon:PropTypes.string,
        title:PropTypes.string,
        tipComponent:PropTypes.object
    };

    static defaultProps = {
        showTipButton: true,
        shoTopEdit:true,
        icon:"man"
    };
    state={
        showTip:false
    }

    //处理编辑按钮的点击事件
    handleEditClick=()=>{
        this.props.onClickEdit?this.props.onClickEdit():null;
    }
    //权限提示信息的显示/隐藏
    toggleTip=()=>{
        this.setState((prevState) => ({
            showTip:!prevState.showTip
        }));
    }

    hideTip=()=>{
        this.setState({
            showTip:false
        })
    }

    render() {
        const {className,model,icon,title,role_desc,buttons,tipData,tipComponent,showTipButton,shoTopEdit,onClickEdit,...others} = this.props;
        const cls = classNames({
            'innovate_role_panel': true,

            [className]: className
        });

        return (
            <div>
                <Mask transparent={true} onClick={this.hideTip} model="partial"  style={{display: this.state.showTip ? 'block' : 'none'}}/>
                <div className={cls} {...others}>
                    <div className="role_panel_cont_wrap">
                        {
                            shoTopEdit &&
                            <div className="role_top_edit"><Icon model="edit" onClick={this.handleEditClick}/></div>
                        }

                        <div className="role_panel_cont">
                            <div className="role_icon"><span><Icon model={icon} /></span></div>
                            <div className="role_title">{title}</div>
                            <div className="role_desc">{role_desc}</div>
                            {
                                showTipButton &&
                                <div className="role_privilage">
                                    <p className="privilage_p" onClick={this.toggleTip}>查看权限</p>
                                    {/* <div className="privilagt_tip_wrap" style={{display: this.state.showTip? 'block' : 'none'}}>权限说明{tipComponent}</div> */}
                                    <div className="privilagt_tip_wrap" style={{display: this.state.showTip? 'block' : 'none'}}>
                                        <TipPanel data={tipData}/>
                                    </div>
                                </div>
                            }

                            <div className="role_btn_wrap">
                                {buttons}
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        );
    }
}
