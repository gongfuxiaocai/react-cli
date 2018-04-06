import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './SftView.css';


export default class SftView extends Component{
    static propTypes={
        width:PropTypes.string,
        height:PropTypes.string,
        image:PropTypes.string,
        title:PropTypes.string,
        text:PropTypes.string

    }

    render(){
        const {className,title,text,image,width,height,borderRadius,btn,children,...others}=this.props;

        const cls=classNames({
            'gl_box':true,
            'title_style':true,
            'text_style':true,
            'logo_style':true,
            [className]:className
        });
        const icoStyle={
            background:`url(${image}) no-repeat`,
            width:width,
            height:height,
            borderRadius:borderRadius
        }

        return(
            <div className={cls} {...others}>
                <div className="logo_style" style={icoStyle}/>
                <p className="title_style">{this.props.title}</p>
                <p className="text_style">{this.props.text}</p>
                <div>{this.props.btn}</div>
            </div>
        )
    }

}
