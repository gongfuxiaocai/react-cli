import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './RadioPlus.less';

export default class RadioPlus extends React.Component{
    static defaultProps={
        model:'primary',
        size:'small',
        disabled:false
    };
    static propTypes={
        model:PropTypes.string,
        size:PropTypes.string,
        data:PropTypes.array.isRequired,
        disabled:PropTypes.bool
    };
    constructor(){
        super();
        this.state={
            value:''//已选中的数据
        }
    }

    //在组件完成加载的时候，初始化默认选中的值
    componentDidMount(){
        this.setState({
            value:this.props.value || this.props.defaultValue
        })
    }

    //阻止不必要的二次渲染，性能优化
    // shouldComponentUpdate(nextProps,nextState){
    //     //props.value 优先级更高，且必须是值发生改变时才渲染
    //     if(nextProps.value !== undefined){
    //         return nextProps.value !==this.props.value;
    //     }
    //     //非受控组件模式
    //     return nextState.value !==this.state.value;
    // }

    //受控组件模式，如果有新的 props.value进来，就要更新组件state
    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        if(nextProps.value !== undefined && nextProps.value!==this.state.value){
            //console.log('nextProps')
            this.setState({
                value:nextProps.value
            })
        }
    }

    handleChange=(index,label,value,disabled)=>{
        if(value===this.state.value || disabled===true) return;
        this.setState(
            {
                value:value
            },
            ()=>{
                let clickedData={
                    text:label,
                    value:value,
                    index:index
                }
                if(this.props.name){
                    clickedData.name=this.props.name;
                }
                this.props.onChange && this.props.onChange(clickedData);
            }
        )

    }

    renderRadioList=(size,model,data,disabled)=>{
        let list=new Array();

        data.map( (item,i)=>{
            const cls=classNames({
                "swiftBI_radio_plus":true,
                "disable":disabled,
                //控制高亮，props.value 优先级大于 state.value
                "on":this.props.value !== undefined ? item.value===this.props.value : item.value===this.state.value,
                "primary":model==="primary",
                "text_only":model==="text",
                "text_line":model==="text_line",
                "button":model==="button",
                "size_small":size==="small",
                "size_big":size==="big"
            });

            list.push(
                <div className={cls} key={i} onClick={this.handleChange.bind(this,i,item.text,item.value,disabled)}>
                    <i></i><span>{item.text}</span>
                </div>
            )
        });

        return list;

    }

    render(){
        const {className,size,model,data,value,name,defaultValue,disabled,...others}=this.props;
        const cls=classNames({
            "swiftBI_radio_plus_wrap":true,
            [className]:className
        });

        return(
            <div className={cls} {...others}>
                {
                    this.renderRadioList(size,model,data,disabled)
                }
            </div>

        )
    }
}
