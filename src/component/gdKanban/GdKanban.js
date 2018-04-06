import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Cell from '../cell/index';
import LayoutTable from '../layoutTable/index';
import './GdKanban.css';

export default class GdKanban extends React.Component {
    static propTypes = {
        data: PropTypes.array
    }
    static defaultProps = {
        data:[]
    }
    //格式化数字3个一个逗号
    transformNumber=(number)=>{
        //带小数点
        let numData = String(number);
        let re = /(-?\d+)(\d{3})/;
        while(re.test(numData)){
          numData = numData.replace(re,"$1,$2");
        }
        return numData;
    }
    renderList=(data)=>{
        let column=[];
        let that=this;
        data.map(function(item,i){
            let row=[];
            item.map(function(itemInner,k){

                let rowData=(
                    <div key={i+'-'+k}>
                        <Cell>
                            <Cell.CellLabel width={itemInner.width}>{itemInner.text}</Cell.CellLabel>
                            <Cell.CellBody>
                                {
                                    itemInner.format?that.transformNumber(itemInner.value):itemInner.value
                                }
                            </Cell.CellBody>
                        </Cell>
                    </div>
                )
                row.push(rowData);
            })
            column.push(
                <LayoutTable.LayoutTableCell key={'row-'+i}>{row}</LayoutTable.LayoutTableCell>
            )
        })
        return column;
    }
    render(){
        const {className,data,...others}=this.props;

        const cls=classNames({
            'gd_kanban_wrap':true,
            [className]: className
        })
        return(
            <div className={cls} {...others}>
                <LayoutTable equal={true}  vAlign={true}  className="gd_kanban">
                    {
                        data.length>0 &&
                        this.renderList(data)
                    }
                </LayoutTable>

            </div>
        )
    }

}
