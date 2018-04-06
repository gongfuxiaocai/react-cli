import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Popup from '../popup/index';
import Button from '../button/index';
import Icon from '../icon/index';
import './Toast.less';

export default class Toast extends React.Component {
    static propTypes = {
        title:PropTypes.string,
        model:PropTypes.string,
        msg:PropTypes.string,
        show:PropTypes.bool.isRequired,
        className:PropTypes.string,
        onRequestClose:PropTypes.func.isRequired,
        width:PropTypes.number
    };
    static defaultProps = {
        width:500,
        mask:false
    }

    render() {

        const {className,show,width,onRequestClose,title,model,msg,mask,...others} = this.props;

        const cls = classNames({
            'innovate_toast': true,
            [className]:className
        });

        //icon图标转化
        const iconModel=classNames({
            'tick-circle':model==='success',
            'warn':model==='warning',
            'fail':model==='fail'
        })


        return (
            <div className={cls} {...others}>
                <Popup
                    title={title} contWidth={width} mask={mask} model="partial"
                    show={show}
                    onRequestClose={onRequestClose}
                    footer={
                        <div style={{textAlign:'center'}}>
                            <Button model="primary"  size="medium" onClick={onRequestClose}>关闭</Button>
                        </div>
                    }
                >

                    <div className="toast_cont">
                        <div className="toast_cont_inner">
                            <div className="toast_icon">
                                <Icon model={iconModel}/>
                            </div>
                            <div className="toast_text">{msg}</div>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }
}
