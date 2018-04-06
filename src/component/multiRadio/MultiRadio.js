import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Radio from '../radio/Radio';
import './MultiRadio.css';

export default class MultiRadio extends React.Component{
    static propTypes={
        /**
         * 模拟选择器数据,value-label,默认第一项高亮
         * e.g:[{value:1,label:"金额",defaultCheck:true},{value:1,label:"笔数",defaultCheck:false}]
         */
        data:PropTypes.array,
        name:PropTypes.string,
        model:PropTypes.string.isRequired,
        /**
         * 改变选项后执行的方法
         * 传递已选项 (selectedData) 与父级通信
         */
        onChange: PropTypes.func
    };
    static defaultProps = {
        data: [],
        onChange: undefined
    };
    componentWillMount(){

    }
    returnSelect=(e)=>{
        const{data}=this.props;
        let id=e.target.dataset.idx;

        this.setState({
            selectedData:data[id]
        });
        //执行父级传递进来的onChange方法
        if(this.props.onChange) this.props.onChange(data[id]);

    }
    renderData(data){
        let model=this.props.model;
        if(model==="round"){
            return data.map((item,i)=>(
                <Radio model="primary" size="small" onClick={this.returnSelect} key={i} defaultCheck={item.defaultCheck} name={this.props.name} data-idx={i} value={item.value} text={item.label} />
            ));
        }
        else if(model === "square"){
            return data.map((item,i)=>(
                <Radio model="primary" size="big" onClick={this.returnSelect} key={i} defaultCheck={item.defaultCheck} name={this.props.name} data-idx={i} value={item.value} text={item.label} />
            ));
        }


    }

    render(){
        const{className,model,data,onChange,...others}=this.props;
        const cls=classNames({
            "swiftBI_multi_radio":true,
            "round":model==="round",
            "square":model==="square",
            [className]:className
        });
        return(
            <div className={cls} {...others}>
                {data.length > 0 ? this.renderData(data):''}
            </div>
        )
    }
}
