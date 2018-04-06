import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/index';
import './innovateKanban.css';

export default class innovateKanban extends React.Component {
    static propTypes = {
        mainData: PropTypes.number,
        title: PropTypes.string,
        compareData:PropTypes.array
    }
    static defaultProps = {

    }
    transformNumber=(number)=>{
        //带小数点
        let numData = String(number);
        const re = /(-?\d+)(\d{3})/;
        while(re.test(numData)){
          numData = numData.replace(re,"$1,$2");
        }
        return numData;
    }
    renderCompareData=(compareData)=>{

        const list=[];
        compareData.map(function(item,i){
            let cpCls=classNames({
                ['red']:item.value>0,
                ['green']:item.value<0
            })
            let num=item.value>0?'+'+item.value:item.value;
            list.push(<span key={i}>{item.text} <em className={cpCls}>{num}%</em></span>)
        });

        return list;
    }
    render(){
        const {className,title,mainData,compareData,icon,hasLine,...others}=this.props;

        const cls=classNames({
            'innovate_kanban':true,
            'hasLine':hasLine,
            [className]: className
        })
        return(
            <div className={cls} {...others}>
                <div className="innovate_kanban_title">{title}</div>
                <div className="innovate_kanban_main_data">
                    {
                        icon &&
                        <Icon model={icon}/>
                    }

                    <span>{this.transformNumber(mainData)}</span>
                </div>
                {
                    compareData &&
                    <div className="innovate_kanban_compare">
                        {this.renderCompareData(compareData)}
                    </div>

                }

            </div>
        )
    }

}
