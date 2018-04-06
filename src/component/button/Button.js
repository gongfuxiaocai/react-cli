import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.less';

export default class Button extends Component {
    static defaultProps = {
        model: 'primary',
        size: 'medium',
        width:null,
        height:null,
        plaint:false,
        disable:false
    }
    static propTypes={
        model:PropTypes.string,
        size: PropTypes.string,
        width:PropTypes.number,
        height:PropTypes.number,
        plaint:PropTypes.bool,
        disable:PropTypes.bool
    }
    constructor(){
        super();
        this.state={
            clicked:false
        }
        this.timeout;
    }

    handleClick=(e)=>{
        let model=this.props.model;
        if(!this.props.disable && model!=="a"){
            e.persist();
            this.setState(
                {
                    clicked:true
                },
                ()=>{
                    clearTimeout(this.timeout);
                    this.timeout=setTimeout(()=>{
                        this.setState(
                            {clicked:false},
                            ()=>{
                                if(this.props.onClick) this.props.onClick(e);
                            }
                        )
                    },300)

                }
            )
        }
        else if(!this.props.disable && model==="a"){
            if(this.props.onClick) this.props.onClick(e);
        }
    }

    render() {
        //console.log(this.props)
        const { children,model,disable,size,width,height,className,plaint, ...others}=this.props;
        //console.log(children+'--'+children.length);
        //不超过两个字时，按钮适用最小尺寸原则 small:48px medium:68px
        let wordLength=children.length;
        let style={
            width:width+'px',
            height:height+'px',
            lineHeight:(height-2)+'px'
        }
        const cls=classNames({
            'swiftBI_button':true,
            'btn_clicked':this.state.clicked,
            'disable':disable==true,
            'primary':model=="primary",
            'plaint':plaint==true,
            'default':model=="default",
            'a_code':model=="a",
            'size_small':size=="small" && model!="a",
            'size_medium':size=="medium" && model!="a",
            'width_protect':wordLength<=3 && model!="a",
            [className]:className
        })
        const Component = model=="a" ?  'a' : 'button';

        return (
            <Component style={style}  className={cls} {...others} disabled={disable} onClick={this.handleClick}>{ children }</Component>
        );
    }
}
