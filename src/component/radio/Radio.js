import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Radio.css';


export default class Radio extends React.Component{
    static defaultProps={
        defaultCheck:false,
        model:'primary',
        size:'small'
    };
    static propTypes={
        defaultCheck:PropTypes.bool,
        size:PropTypes.string,
        name:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired,
        value:PropTypes.any.isRequired
    };
    render(){
        const {className,size,model,value,name,text,defaultCheck,...others}=this.props;

        const cls=classNames({
            "swiftBI_radio":true,
            "primary":model=="primary",
            "size_small":size=="small",
            "size_big":size=="big",

            [className]:className
        });
        return(
            <div className={cls} >
                {defaultCheck==true?<input type="radio" defaultChecked  name={name} value={value} {...others}/>:<input type="radio"  name={name} value={value} {...others}/>}
                <span>{text}</span>
            </div>
        )
    }
}
