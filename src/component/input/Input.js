import React,{Component} from 'react';
import classNames from 'classnames';
import './Input.less';
import PropTypes from 'prop-types';

class Input extends React.Component{

    constructor(props) {
        super(props);

        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static defaultProps={
        model: "primary",
        size: "medium",
        rules: [],
        showError: false,
        verifyType: "default"
    }
    static propTypes={
        model: PropTypes.string,
        width: PropTypes.number,
        rules: PropTypes.array,
        showError: PropTypes.bool,
        verifyType: PropTypes.string
    };

    handleFocus( ev ) {
        if( this.props.onFocus ) {
            this.props.onFocus( ev, this.props.name );
        }
    }

    handleChange(ev) {
        this.validate(ev, 'onChange');
    }

    handleBlur(ev) {
        this.validate(ev, 'onBlur');
    }

    validate(ev, type) {
        ev.persist();
        const value = ev.currentTarget.value;
        const name = ev.currentTarget.name;
        const rules = this.props.rules;
        let eventType = null;
        let errorMsg = null;
        let validate = true;
        let validateAccount = 0;
        let errorNum = 0;

        if( type === "onChange" ) {
            eventType = this.props.onChange;
        } else if( type === "onBlur" ){
            eventType = this.props.onBlur;
        }
        if(eventType) {
            if(rules.length !== 0) {
                rules.forEach( (rule, index) => {
                    validate = rule.validate(value);
                    errorMsg = rule.errorMsg;
                    if(!validate && ++errorNum === 1) {
                        eventType( ev, name, validate, errorMsg );
                        return false;
                    } else {
                        validateAccount ++;
                        if(validateAccount === rules.length) {
                            eventType(ev, name, validate, errorMsg);
                        }
                    }
                    return false;
                } );
            } else {
                eventType(ev, name);
            }
        }

    }



    render(){
        const {className,model,width,size, name, rules, onChange, onBlur, onFocus, showError,errorMsg,verifyType,tip,errorPosition,...others}=this.props;

        const clsWrap=classNames({
            'swift_input_wrap':true,
            [className]:className
        });

        const cls=classNames({
            'swiftBI_input':true,
            'primary':model=="primary",
            'error':showError===true,
            'medium':size=="medium",
            'small':size=="small",
            'big':size=="big"
        });

        const wrapCls=classNames({
            'swiftBI_input_wrap':true,
            'date_range':model=="date",
            [className]:className
        });
        let styleWidth={
            width:width+'px'
        }

        return (
            <div className={clsWrap}>
                <input name={name} onFocus={ this.handleFocus } onChange={this.handleChange} onBlur={this.handleBlur} className={cls} style={styleWidth} {...others}/>
                {
                    verifyType==="lite" && showError &&
                    <Input.Msg error={true} position={errorPosition}>{errorMsg}</Input.Msg>
                }
                {
                    verifyType==="lite" && !showError &&
                    <Input.Msg position={errorPosition}>{tip}</Input.Msg>
                }
            </div>
        )
    }

}

//用于提示信息，报错时的显示
Input.Msg=(properties)=>{
    const {className,error,position,children,...others } = properties || {};
    const msgCls=classNames({
        'swiftBI_input_msg':true,
        [position]:true,
        'error':error===true,
        [className]:className
    })
    return(
        <div className={msgCls}>{children}</div>
    )

}

Input.Msg.propTypes = {
    position: PropTypes.string,
    error: PropTypes.bool
}

Input.Msg.defaultProps = {
    position:"right",
    error: false
}

export default Input;
