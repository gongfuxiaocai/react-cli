import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Checkbox.less';

export default class Checkbox extends React.Component{
    static defaultProps={
        model:'primary',
        size:'small'
    };
    static propTypes={
        model:PropTypes.string,
        size:PropTypes.string
    };
    constructor(){
        super();
        this.state={
            isChecked:false
        }
    }
    componentDidMount(){

        if(this.props.checked){
            this.setState({
                isChecked:this.props.checked
            })
        }
    }
    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        if(!nextProps.disable){
            this.setState({
                isChecked:nextProps.checked
            })
        }

    }

    handleChange=(e)=>{

        if(!this.props.disable){
            let obj=e.currentTarget;
            this.setState(
                (prevState) => ({
                    isChecked:!prevState.isChecked
                }),
                function(){
                    let data={
                        text:obj.getAttribute('data-text'),
                        value:obj.getAttribute('data-value'),
                        isChecked:this.state.isChecked
                    }
                    this.props.onChange?this.props.onChange(data):null;
                }
            );
        }



    }
    render(){
        const {className,model,value,text,defaultCheck,disable,checked,size,onChange,...others}=this.props;

        const cls=classNames({
            "innovate_checkbox":true,
            "on":this.state.isChecked==true,
            "disable":disable==true,
            "primary":model=="primary",
            "size_small":size=="small",
            "size_big":size=="big",
            [className]:className
        });
        return(
            <div className={cls} {...others} data-text={text} data-value={value} onClick={this.handleChange}>
                <i></i><span>{text}</span>
            </div>
        )
    }
}
