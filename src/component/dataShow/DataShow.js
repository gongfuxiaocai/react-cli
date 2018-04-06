import React, { Component } from 'react';
import classNames from 'classnames';
import './DataShow.less';
import LayoutTable from '../layoutTable/index';
import CountUp from 'react-countup';
import Utils from '../Resource/utils/Utils';

export default class DataShow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {className,data,...others}=this.props;
        const DataBox=[];
        const that=this;

        const cls=classNames({
            ['DataShow_wrap']:true,
            [className]: className
        })
        data.map(function(item,i){
            let itemNum=item.num;
            DataBox.push(
                <LayoutTable.LayoutTableCell className="small_box" key={i}>
                    <div className="box_name">{item.name}</div>
                    <div className="box_num">
                        <CountUp start={0} end={itemNum} duration={1} decimals="2" formattingFn={itemNum => Utils.format(itemNum.toFixed(2))} />
                    </div>
                </LayoutTable.LayoutTableCell>
            )
            return DataBox;
        })
        return(
            <div className={cls} {...others}>

                <LayoutTable equal={true}  vAlign={true}  className="dataShow">
                    {
                        DataBox
                    }
                </LayoutTable>
            </div>
        )
    }

}
