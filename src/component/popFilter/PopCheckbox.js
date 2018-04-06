import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './PopCheckbox.css';

export default class PopCheckbox extends React.Component{
    static defaultProps={
        check:false,
        showValue:true,
        model:"primary"
    };
    static propTypes={
        check:PropTypes.bool,
        text:PropTypes.string.isRequired,
        idx:PropTypes.number
    };
    constructor({check}){
        super();
        this.state={
            check:check
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            check:nextProps.check
        });
    }

    toggleCheck=(e)=>{
        let newStatus=!this.state.check;
        this.setState({
            check:newStatus
        })

        let data={check:newStatus,data:{text:e.currentTarget.dataset.text,value:e.currentTarget.dataset.value}};
        //执行父级传递进来的onChange方法
        if(this.props.onChange) this.props.onChange(data);
    }
    render(){
        const {className,model,value,text,check,showValue,...others}=this.props;

        const cls=classNames({
            "swiftBI_pop_checkbox":true,
            "primary":model=="primary",
            "check":this.state.check==true,
            [className]:className
        });
        return(
            <div className={cls} {...others} data-value={value} data-text={text} onClick={this.toggleCheck}>
                <div className="pop_checkbox_inner">
                    <span className="pop_checkbox_txt" title={text}>{text}</span>
                    {
                        showValue==true &&
                        <span className="pop_checkbox_val" title={value}>{value}</span>
                    }
                </div>
            </div>
        )
    }
}
