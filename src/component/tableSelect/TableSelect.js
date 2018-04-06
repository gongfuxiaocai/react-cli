import React from 'react';
import classNames from 'classnames';
import './TableSelect.css';
import TableOption from './TableOption';
import TableOptionList from './TableOptionList';
import PropTypes from 'prop-types';

export default class TableSelect extends React.Component{
    static propTypes={
        /**
         * 模拟选择器数据,value-label必须
         * e.g:[{value:1,label:"金额"},{value:1,label:"笔数"}]
         */
        data:PropTypes.array,
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
        const{data}=this.props;
        this.setState({
            selectedData:data[0]//默认显示数组第一项
        });
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
        return data.map((item,i)=>(
            <TableOptionList key={i} data-idx={i} data-value={item.value} onClick={this.returnSelect}>{item.label}</TableOptionList>
        ));
    }

    render(){
        const{className,data,...others}=this.props;
        const cls=classNames({
            "swiftBI_table_select":true,
            [className]:className
        });
        return(
            <div className={cls} {...others} >
                <em>{this.state.selectedData.label}</em><b className="arrow_down"></b>
                <TableOption>
                    {data.length > 0 ? this.renderData(data):''}
                </TableOption>
            </div>
        )
    }
}
