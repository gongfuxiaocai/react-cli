import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Cell from '../cell/index';
import Button from '../button/index';
import { Pagination } from 'antd';
import './Pagination.less';
import Animate from '../animation/Animate';

class PaginationPlus extends React.Component{
    static defaultProps = {
        showTotalRecords:false
    }
    static propTypes = {
        showTotalRecords:PropTypes.bool
    }
    constructor(){
        super();
        this.state={
            showNumRecords:false  //是否显示总共多少数据
        }
    }
    //总计录调速信息
    showTotal=(total)=>{
        const lang=this.props.intl;
        let sum=lang.messages.swift_pager_record_tx1?lang.formatMessage( {id:"swift_pager_record_tx1"} ):"共";
        let items=lang.messages.swift_pager_record_tx2?lang.formatMessage( {id:"swift_pager_record_tx2"} ):"条记录"
        return `${sum} ${total} ${items}`;
    }

    //查看记录总数
    handleNumRecords=()=>{
        this.setState((prevState) => ({
            showNumRecords:!prevState.showNumRecords
        }));
    }

    render(){
        const lang=this.props.intl;
        const {
            className,
            total,
            showTotalRecords,
            onPageChange,
            onPageSizeChange,
            ...others
        } = this.props;

        const cls = classNames({
            'swift_pager_plus': true,
            [className]: className
        });


        return(
            <div className="swift_pager_plus_wrap">
                <Pagination
                    className={cls}
                    total={total}
                    onChange={onPageChange}
                    onShowSizeChange={onPageSizeChange}

                    itemRender={this.itemRender}
                    {...others} />
                {
                    showTotalRecords &&
                    <div className="sum_record">
                        <Animate transitionName="swift-fade">
                            {
                                 this.state.showNumRecords===true &&
                                <Cell>
                                    <Cell.CellBody>
                                        {lang.messages.swift_pager_record_tx1?lang.formatMessage( {id:"swift_pager_record_tx1"} ):"共"}
                                        <span style={{margin:'0 5px'}}>{total}</span>
                                        {lang.messages.swift_pager_record_tx2?lang.formatMessage( {id:"swift_pager_record_tx2"} ):"条记录"}
                                    </Cell.CellBody>
                                </Cell>
                            }

                        </Animate>
                        <Cell style={{marginLeft:'20px'}}>
                            <Cell.CellBody>
                                <Button model="a" size="small" onClick={this.handleNumRecords}>
                                    {lang.messages.swift_pager_record_show?lang.formatMessage( {id:"swift_pager_record_show"} ):"查看记录总数"}
                                </Button>
                            </Cell.CellBody>
                        </Cell>
                    </div>
                }
            </div>

        )
    }
}

//国际化必须，否则 this.props 拿不到 intl
export default PaginationPlus;
