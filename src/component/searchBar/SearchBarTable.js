import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Panel from '../panel/index';
import PanelTitle from '../panel/PanelTitle';
import PanelBody from '../panel/PanelBody';
import PanelFooter from '../panel/PanelFooter';
import Input from '../title/index';
import Button from '../button/index';
import LayoutTable from '../layoutTable/index';
import LayoutTableCell from '../layoutTable/LayoutTableCell';
import Mask from '../mask/index';
import TablePlus from '../table/TablePlus';
import PopFiltedItem from '../popFilter/PopFiltedItem';
import Icon from 'Components/icon/index';
import Utils from '../Resource/utils/Utils';
import Spin from '../spin/Spin';
import Animate from '../animation/Animate';

import './SearchBarTable.less';

class SearchBarTable extends React.Component{
    static defaultProps={
        mask:true,
        align:"bottom_left",
        disabled:false,
        isLoading:false,
        width:200,
        innerInputWidth:212
    };
    static propTypes={
        viewKey:PropTypes.string.isRequired,
        width:PropTypes.number,
        placeholder:PropTypes.string,
        mask:PropTypes.bool,
        align:PropTypes.oneOf(['bottom_left', 'bottom_right','top_left','top_right']),
        isNextDisable:PropTypes.bool,
        selectedRowKeys:PropTypes.array,
        onCheckItemChange:PropTypes.func,
        onSearch:PropTypes.func,
        onPageChange:PropTypes.func,
        onReset:PropTypes.func,
        thData:PropTypes.array,
        bodyData:PropTypes.array,
        disabled:PropTypes.bool,
        isLoading:PropTypes.bool,
        currentPage:PropTypes.number,
        keyword:PropTypes.string,
        innerInputWidth:PropTypes.number
    };
    constructor(props){
        super(props);
        this.state={
            outerInputValue: this.props.defaultValue || '',        //外部搜索框显示的文字
            //searchListData:[],  //搜索结果
            keyword:'',         //搜索框数据
            showPop:false,      //是否显示弹窗
            currentPage:1,      //当前页
            isPrevDisable:true, //上一页禁用
            selectedItems:[]    //显示在下方的已选中数据 {key,label}
        }
    }
    componentDidMount(){
        if(this.props.keyword !== undefined ){
            this.setState({
                keyword:this.props.keyword
            })
        }

        if(this.props.currentPage !== undefined){
            this.setState({
                currentPage:this.props.currentPage,
                isPrevDisable:this.props.currentPage===1
            })
        }

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.selectedItems !== undefined){
            this.setState({
                selectedItems:nextProps.selectedItems
            })
        }

        if(nextProps.keyword !== undefined){
            this.setState({
                keyword:nextProps.keyword
            })
        }

        if(nextProps.currentPage !== undefined){
            this.setState({
                currentPage:nextProps.currentPage,
                isPrevDisable:nextProps.currentPage===1
            })
        }

    }
    closePanel=()=>{
        this.setState({
            showPop:false
        })
    }
    togglePanel=()=>{
        if(!this.props.disabled){
            this.setState((prevState) => ({
                showPop:!prevState.showPop
            }));
        }

    }

    //更新弹窗搜索input框的值
    handleChange=(e)=>{
        let inputVal=e.currentTarget.value;
        //console.log('handleChange',inputVal);
        this.setState(
            {
                keyword: inputVal
            },
            ()=>{
                this.props.onKeywordChange && this.props.onKeywordChange(inputVal,this.props.name)
            }
        );
    }
    //弹窗内点击搜索按钮时，获取input值然后执行父级传递进来的onSearch方法
    sendSearchRequest=()=>{
        let keyword=this.props.keyword !==undefined?this.props.keyword:this.state.keyword;
        this.props.onSearch? this.props.onSearch(keyword,this.props.name):null;
    }
    //用户点击上一页下一页时
    handlePageChange=(type)=>{
        let {currentPage}=this.state;

        switch(type){
            case 'prev':

                if(currentPage>1){
                    let newPage=currentPage-1;
                    this.setState(
                        {
                            currentPage:newPage,
                            isPrevDisable:newPage<=1?true:false //上一页禁用
                        },
                        ()=>{
                            this.props.onPageChange?this.props.onPageChange(this.state.currentPage,this.props.name):null;
                        }

                    );
                }
                break;

            case 'next':

                if(!this.props.isNextDisable){
                    let newPage=currentPage+1;
                    this.setState(
                        {
                            currentPage:newPage,
                            isPrevDisable:false
                        },
                        ()=>{
                            this.props.onPageChange?this.props.onPageChange(this.state.currentPage,this.props.name):null;
                        }

                    );
                }

                break;
        }
    }

    //重置
    reset=()=>{

        this.setState({
            isPrevDisable:true, //上一页禁用
            outerInputValue:'',
            keyword: ''
        })
        this.props.onReset?this.props.onReset(this.props.name):null;
    }

    //表格点击全选/全不选中时触发
    onSelectAll=(selected, selectedRows, changeRows)=>{
        let selectedRowKeys=[];
        //如果是全选中操作
        if(selected){
            let tmp=this.state.selectedItems;

            for(let i=0;i<changeRows.length;i++){
                tmp.push({key:changeRows[i].key,label:changeRows[i][this.props.viewKey]})
            }
            this.setState(
                {
                    selectedItems:tmp
                },
                ()=>{
                    for(let k=0;k<tmp.length;k++){
                        selectedRowKeys.push(tmp[k].key)
                    }
                    this.props.onCheckItemChange && this.props.onCheckItemChange(selectedRowKeys,this.props.name,this.state.selectedItems);
                }
            )
        }
        //如果是取消选中操作
        else{
            let selectedItems=this.state.selectedItems;
            //清掉selectedItems中对应的key值数据
            for(let i=0;i<changeRows.length;i++){
                let idx=Utils.findArray(selectedItems,{key:changeRows[i].key})
                if(idx!==-1){
                    selectedItems.splice(idx,1)
                }
            }
            this.setState(
                {
                    selectedItems
                },
                ()=>{
                    for(let k=0;k<selectedItems.length;k++){
                        selectedRowKeys.push(selectedItems[k].key)
                    }
                    this.props.onCheckItemChange && this.props.onCheckItemChange(selectedRowKeys,this.props.name,selectedItems);
                }
            )
        }
    }

    returnSelectedItems=(selectedItems)=>{
        let selectedRowKeys=[];

        if(selectedItems.length>0){
            for(let i=0;i<selectedItems.length;i++){
                selectedRowKeys.push(selectedItems[i].key)
            }
        }

        this.props.onCheckItemChange?this.props.onCheckItemChange(selectedRowKeys,this.props.name,selectedItems):null;
    }

    //点击表格radio/chcekbox 时触发
    onTableSelect=(record, selected, selectedRows)=>{
        //console.log('onTableSelect',record, selected, selectedRows,this.props.tableType);
        //如果true则添加
        if(selected){
            let {viewKey}=this.props;
            let item={ key:record.key, label:record[viewKey] };
            let selectedItems=[];
            //如果是radio 则直接替换
            if(this.props.tableType==='radio'){
                selectedItems.push(item);
            }
            //否则为checkbox,则push新值
            else{
                selectedItems=this.state.selectedItems;
                selectedItems.push(item);
            }
            this.setState(
                {
                    selectedItems
                },
                ()=>{
                    this.returnSelectedItems(this.state.selectedItems)
                }
            )

        }
        //如果false 则删除
        else{
            let selectedItems=this.state.selectedItems.filter(item=>item.key !== record.key);
            this.setState(
                {
                    selectedItems
                },
                ()=>{
                    this.returnSelectedItems(this.state.selectedItems)
                }
            )
        }

        //如果是radio则直接关闭弹窗
        if(this.props.tableType==="radio"){
            this.closePanel();
        }

    }

    //点击底部的已选标签时触发
    delSelectItem=(key)=>{

        let selectedItems=this.state.selectedItems.filter(item=>item.key !== key);


        this.setState(
            {
                selectedItems
            },
            ()=>{
                let {selectedItems}=this.state;
                let selectedKeys=[];
                if(selectedItems.length>0){
                    for(let i=0;i<selectedItems.length;i++){
                        selectedKeys.push(this.state.selectedItems[i].key)
                    }
                }

                this.props.onCheckItemChange && this.props.onCheckItemChange(selectedKeys,this.props.name,this.state.selectedItems);
            }
        )

    }

    //外面输入框显示的内容
    getOuterInputVal=()=>{
        let {selectedItems}=this.state;
        let selectedLabels=[];
        if(selectedItems.length>0){
            for(let i=0;i<selectedItems.length;i++){
                selectedLabels.push(this.state.selectedItems[i].label)
            }
        }
        return selectedLabels.join(',')
    }

    //点击确认按钮时触发
    doConfirm=(selectedRowKeys)=>{
        this.closePanel();
        //console.log(this.props.bodyData);
        let {bodyData,viewKey}=this.props;
        let viewArray=[];
        for(let i=0;i<selectedRowKeys.length;i++){
            let idx=Utils.findArray(bodyData,{key:selectedRowKeys[i]});
            if(idx!==-1){
                viewArray.push(bodyData[idx][viewKey])
            }

        }
        this.setState({
            outerInputValue:viewArray.join(',')
        })
        this.props.onConfirm?this.props.onConfirm(selectedRowKeys,this.props.name):null;
    }

    //输出已选项
    renderSelectItems=(selectKeys,bodyData)=>{
        let items=[];
        let selectItems=this.state.selectedItems;
        if(selectItems.length>0){
            for(let i=0;i<selectItems.length;i++){

                items.push(
                    <PopFiltedItem
                        key={selectItems[i].key}
                        onClick={ this.delSelectItem.bind(this,selectItems[i].key) }
                    >
                        { selectItems[i].label }
                    </PopFiltedItem> )
            }
        }

        return items;
    }



    render(){
        const {intl, innerInputWidth,defaultValue, className,disabled,viewKey,mask,tableType,onCheckItemChange,defaultSelectedRowKeys,selectedRowKeys,onReset,width,title,placeholder,popPlaceholder,onSearch,align,onPageChange,thData,bodyData,isNextDisable,selectedItems,isLoading,keyword,onKeywordChange,currentPage,...others}=this.props;

        let selectedKeys=[];
        if(selectedItems.length>0){
            for(let i=0;i<selectedItems.length;i++){
                selectedKeys.push(selectedItems[i].key)
            }
        }
        const rowSelection={
            selectedRowKeys:selectedKeys,//表格选中的checkbox
            onSelectAll:this.onSelectAll,
            onSelect:this.onTableSelect,
            type:tableType
        }

        const cls=classNames({
            "swiftBI_search_bar":true,
            "disabled":disabled,
            "bar_plus":true,
            [className]:className
        });

        const clsOuter=classNames({
            search_bar_outer_input_wrap:true
        })

        const clsSearchBarPanel=classNames({
            "search_bar_panel":true,
            "align_top_left":align=="top_left",
            "align_top_right":align=="top_right",
            "align_bottom_left":align=="bottom_left",
            "align_bottom_right":align=="bottom_right"
        });
        let styleWidth={
            width:width+'px'
        }
        let prevBtnStyle=classNames({
            "search_bar_pager ":true,
            "prev":true,
            "disable":this.state.isPrevDisable
        })
        let nextBtnStyle=classNames({
            "search_bar_pager ":true,
            "next":true,
            "disable":isNextDisable
        })
        let btnStyle={
            "width":"auto",
            "padding":"0 14px",
            "height":"30px",
            "lineHeight":"28px"
        }

        return(
            <div>
                {
                    mask &&
                    <Mask className="searchbar_mask" transparent={true} onClick={this.closePanel} model="full"  style={{display: this.state.showPop ? 'block' : 'none'}}/>

                }

                <div className={cls} {...others} style={styleWidth}>

                    <div className={clsOuter} onClick={this.togglePanel}>
                        <input type="text" readOnly value={this.getOuterInputVal()} placeholder={placeholder} title={this.getOuterInputVal()}/>
                        <Icon model="search" />
                    </div>

                    <Animate transitionName="swift-zoom">
                        {
                            this.state.showPop &&
                            <Panel className={clsSearchBarPanel}>
                                <PanelTitle style={{borderBottom:'0'}}>
                                    <LayoutTable>
                                        <LayoutTableCell style={{float:'left'}} >
                                            <span>{title}</span>
                                        </LayoutTableCell>

                                        <LayoutTableCell className="search_bar_input_wrap" style={{float:'right'}}>
                                            <Input model="primary" style={{width:innerInputWidth+'px'}}  placeholder={popPlaceholder} value={ this.state.keyword } type="text" onChange={this.handleChange} />
                                            <Button onClick={this.sendSearchRequest}  style={btnStyle} model="primary" size="small">
                                                {intl.messages.swift_searchbar_btn_search?intl.formatMessage( {id:"swift_searchbar_btn_search"} ):"搜索"}
                                            </Button>
                                            <Button onClick={this.reset}  style={btnStyle} model="default"  size="small">
                                                {intl.messages.swift_searchbar_btn_reset?intl.formatMessage( {id:"swift_searchbar_btn_reset"} ):"重置"}
                                            </Button>
                                        </LayoutTableCell>
                                    </LayoutTable>
                                </PanelTitle>

                                <Spin show={isLoading}>
                                    <PanelBody style={{padding:"10px 10px 10px 0"}}>
                                        <TablePlus
                                            thData={thData}
                                            bodyData={bodyData}
                                            rowSelection={rowSelection}
                                            //onRowClick={this.handleRowClick}
                                            //rowSelection={tableType==="checkbox"?rowSelection:null}
                                        />


                                    </PanelBody>
                                </Spin>

                                <PanelFooter>

                                    <div className="search_bar_pager_wrap">
                                        {
                                            tableType==="checkbox" &&
                                            <div className="search_bar_sum">
                                                {intl.messages.swift_searchbar_btn_reset?intl.formatMessage( {id:"swift_searchbar_select"} ):"已选"}
                                                <span>{selectedKeys.length}</span>
                                                {intl.messages.swift_searchbar_btn_reset?intl.formatMessage( {id:"swift_searchbar_select_unit"} ):"项"}
                                            </div>
                                        }


                                        <div className="pager_block">
                                            <span className={prevBtnStyle} onClick={ this.handlePageChange.bind(this,'prev') }></span>
                                            {/* <span style={{marginRight:'12px'}}>{this.state.currentPage}</span> */}
                                            <span style={{marginRight:'0px'}} className={nextBtnStyle} onClick={ this.handlePageChange.bind(this,'next') }></span>
                                        </div>

                                    </div>

                                    {
                                        tableType==="checkbox" &&
                                        <div className="search_bar_selected">
                                            {
                                                this.renderSelectItems()
                                            }
                                        </div>
                                    }

                                    {
                                        tableType==="checkbox" &&
                                        <div className="search_bar_btns">
                                            <Button onClick={ this.closePanel }  model="primary" >确定</Button>
                                        </div>
                                    }

                                </PanelFooter>
                            </Panel>
                        }

                    </Animate>

                </div>

            </div>
        )
    }
}

export default SearchBarTable;
