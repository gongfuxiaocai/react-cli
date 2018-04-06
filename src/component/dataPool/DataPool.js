import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/index';
import './DataPool.less';

export default class DataPool extends Component{
    static propTypes={
        title:PropTypes.string,
        onDelete:PropTypes.func,
        data:PropTypes.array
    }

    handleDel=(key)=>{
        this.props.onDelete?this.props.onDelete(key):null;
    }

    renderDataList=(data)=>{
        let that=this;
        let list=[]
        data.map(function(item,idx){
            list.push(
                <li key={item.key}>
                    <span>{item.label}</span>
                    <Icon model="delete" onClick={ ()=>{ that.handleDel(item.key) } } />
                </li>
            )
        });
        return list;
    }
    render(){
        const {className,title,data,children,onDelete,...others}=this.props;

        const cls=classNames({
            'swift_data_pool':true,
            [className]:className
        });

        return(
            <div className={cls} {...others}>
                <div className="swift_pool_title">{title}</div>
                <ul className="swift_pool_data">
                    {this.renderDataList(data)}
                </ul>
                {
                    children &&
                    <div className="swift_pool_footer">
                        {children}
                    </div>
                }
            </div>
        )
    }

}
