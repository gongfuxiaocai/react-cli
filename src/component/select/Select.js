import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
const Option=AntdSelect.Option;
import './Select.less';

export default class Select extends React.Component{
    static defaultProps = {
        disable:false,
        labelInValue:true,
        size:'medium',
        model:'single'
    }

    static propTypes = {
        data:PropTypes.array,
        size:PropTypes.string,
        width:PropTypes.number,
        disable:PropTypes.bool,
        labelInValue:PropTypes.bool,
        model:PropTypes.string
    }

    renderOption=(data)=>{
        let that=this;
        let options=new Array();
        data.map(function(item,i){
            options.push(<Option key={i} value={item.key} title={item.title} >{item.label}</Option>);
        });
        return options;
    }

    doChange=(value)=>{
        if(this.props.labelInValue && this.props.name){
            value.name=this.props.name
        }
        this.props.onChange?this.props.onChange(value):null;
    }
    render(){
        const {className,data,width,style,size,labelInValue,model,name,onChange,...others} = this.props;
        const cls = classNames({
            'swiftBI_select':true,
            'size_medium':size=='medium',
            [className]:className
        });

        let styleCont={
            width:width+'px'
        }

        Object.assign(styleCont,style);

        return(
            <AntdSelect
                className={cls}
                style={styleCont}
                labelInValue={labelInValue}
                mode={model}
                onChange={this.doChange}
                dropdownClassName="swiftBI_select_dropdown"
                {...others}
            >
                {
                    this.renderOption(data)
                }
            </AntdSelect>

        )
    }
}
