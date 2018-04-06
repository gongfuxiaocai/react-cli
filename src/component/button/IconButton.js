import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/index';
import './IconButton.less';

export default class IconButton extends Component{
    static propTypes={
        model:PropTypes.string.isRequired,
        options:PropTypes.array.isRequired,
        defaultActiveKey:PropTypes.string.isRequired
    };
    constructor(props){
        super(props);
        this.state={
            activeKey:''//当前使用的icon
        }
    }
    componentWillMount(){
        this.setState({
            activeKey:this.props.defaultActiveKey
        })
    }

    renderLabel=(options)=>{
        let activeIdx=this.findArray(options,{key:this.state.activeKey});
        return options[activeIdx].label;
    }

    findArray=(array, feature, all = true)=>{
        for(let index in array){
            let cur = array[index];
            if(feature instanceof Object){
                let allRight = true;
                for(let key in feature){
                    let value = feature[key];
                    if(cur[key] == value && !all) return index;
                    if(all && cur[key] != value){
                        allRight = false;
                        break;
                    }
                }
                if(allRight) return index;
            }else{
                if(cur == feature){
                    return index;
                }
            }
        }
        return -1;
    }

    handleClick=()=>{
        let activeIdx=this.findArray(this.props.options,{key:this.state.activeKey});
        let newActiveIdx=this.props.options.length>1 && parseInt(activeIdx)===0?1:0;
        this.setState(
            {
                activeKey:this.props.options[newActiveIdx].key
            },
            ()=>{
                this.props.onChange?this.props.onChange(this.state.activeKey):null;
            }
        )

    }
    render(){
        const {className,model,options,defaultActiveKey,onChange,...others}=this.props;

        const cls=classNames({
            'icon_button':true,
            [model]:model,
            [className]:className
        });


        return(
            <a className={cls} {...others} onClick={this.handleClick}>
                <Icon model={this.state.activeKey} iconfont/>

                <span>{this.renderLabel(options)}</span>
            </a>
        )
    }

}
