import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '../button/index';
import {Flex,FlexItem} from '../flex/index';
import {RadioPlus} from '../title/index';
//import {Panel,PanelTitle,PanelBody,PanelFooter} from '../index';
import {Panel,PanelTitle,PanelBody,PanelFooter} from '../panel/index';
import SearchBar from '../searchBar/index';
import Mask from '../mask/Mask';

import PopFilter from './PopFilter';
import PopFilterControl from './PopFilterControl';
import PopFiltedItem from './PopFiltedItem';
import PopCheckbox from './PopCheckbox';

export default class PopFilterCom extends React.Component{
    static defaultProps={
        size:"default",
        showTopItems:true,
        showCheckboxValue:true,
        numPerRow:3
    };
    static propTypes={
        size:PropTypes.string,
        width:PropTypes.number,
        data:PropTypes.array,
        showCheckboxValue:PropTypes.bool,
        numPerRow:PropTypes.number
    };
    constructor(){
        super();
        this.state={
            topRadioData:[{text:'总计',value:'_TOTAL'},{text:'不限',value:'_UNLIMIT'}],//顶部的radio选项栏数据
            data:[],//中间显示的数据
            selectTop:null,//顶部被选中的按钮数据
            selectPopCheck:[],//中间被选中的数据
            selectItemCount:0,//已选总数
            widthPerPopCheck:0,//中间checkbox元素的宽度
            numPerRow:null,
            display:false//组件的显示隐藏
        }

    }
    componentWillMount(){
        this.setState({
            data:this.props.data,
            numPerRow:this.props.numPerRow
        });

    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.data,
            numPerRow:nextProps.numPerRow
        });

    }
    componentDidUpdate(){
        //组件每次更新时，动态计算每个中间元素的宽度
        if(this.state.display==true && this.state.widthPerPopCheck<=0){
            this.calCheckboxWidth()
        }
    }
    show=()=>{
        this.setState({
            display:true
        })
    }
    hide=()=>{
        this.setState({
            display:false
        })
    }
    toggle=()=>{
        this.setState((prevState) => ({
            display:!prevState.display
        }));
    }
    //计算每个中间元素的宽度
    calCheckboxWidth=()=>{

        let ct=this.refs.contList;
        //减去滚动条的宽度
        let width=parseInt((ct.clientWidth-7)/this.props.numPerRow);

        this.setState({
            widthPerPopCheck:width
        })
    }

    //清空中间列表的所有选中选项
    checkTop=(e)=>{

        let tempData=this.state.data;
        for(let i=0;i<tempData.length;i++){
            tempData[i]['check']=false;
        }
        let topData={text:e.text,value:e.value};
        this.setState({
            data:tempData,
            selectTop:topData,
            selectPopCheck:[],
            selectItemCount:1
        });

    }
    //返回ele在数组array中的对应key值，如果返回-1 则表示该值在数组中不存在
    getIndex=(ele,array,compareName)=>{

        for(let i=0;i<array.length;i++){
            if(array[i][compareName]==ele){
                return i;
            }
        }
        return -1;
    }
    //更新刚点击的 PopCheckbox 数据
    updatePopCheckChange=(newStatus)=>{
        this.refs.topRadio.reset();

        this.setState({
            check:false
        })
        let tempData=this.state.data;
        let clickedItemIdx=this.getIndex(newStatus.data.value,tempData,'value');
        tempData[clickedItemIdx]['check']=newStatus.check;
        //更新check点击状态
        this.setState({
            data:tempData,
            selectTop:null
        });

        if(newStatus.check==true){//增加PopCheck
            let tempSelectPop=this.state.selectPopCheck;
            tempSelectPop.push(newStatus.data);
            this.setState({
                selectPopCheck:tempSelectPop,
                selectItemCount:tempSelectPop.length
            });

        }
        else{//删除PopCheck
            let tempSelectPop=this.state.selectPopCheck;
            let cancelItemIdx=this.getIndex(newStatus.data.value,tempSelectPop,'value');
            tempSelectPop.splice(cancelItemIdx,1);
            this.setState({
                selectPopCheck:tempSelectPop,
                selectItemCount:tempSelectPop.length
            });

        }

    }
    //删除底部对应的显示项，并更新中间列表项的高亮效果。
    delSelectFilted=(e)=>{
        if(this.state.selectTop!=null){
            this.setState({
                selectTop:null,
                selectItemCount:0
            });
            this.refs.topRadio.reset();
        }
        else{
            let tempSelectPop=this.state.selectPopCheck;
            let cancelItemIdx=this.getIndex(e.target.dataset.value,tempSelectPop,'value');

            let tempData=this.state.data;
            let cancelItemIdxData=this.getIndex(e.target.dataset.value,tempData,'value');
            tempData[cancelItemIdxData]['check']=false;
            tempSelectPop.splice(cancelItemIdx,1);
            this.setState({
                data:tempData,
                selectPopCheck:tempSelectPop,
                selectItemCount:tempSelectPop.length
            });
        }
    }
    //在底部显示用户选中的选项
    renderSelectItems=()=>{
        let that=this;
        if(this.state.selectTop!=null){
            return (<PopFiltedItem onClick={that.delSelectFilted} value={that.state.selectTop.value}>{that.state.selectTop.text}</PopFiltedItem>)
        }
        else{
            let popCheckShow=new Array();
            this.state.selectPopCheck.map(function(item,i){
                popCheckShow.push(<PopFiltedItem onClick={that.delSelectFilted} key={i}  value={item.value}>{item.text}</PopFiltedItem>)
            });
            return popCheckShow;
        }

    }
    //渲染中间的数据
    renderContList=(data,showCheckboxValue,checkWidth)=>{
        let that=this;
        let checkboxArr=new Array();
        let styleWidth={width:checkWidth+'px'}

        data.map(function(item,i){
            let remainder=(i+1)%that.state.numPerRow;//是否被整除，能被整除的加上修改class=fix
            let cls='';
            remainder==0? cls='fix':'';
            checkboxArr.push(
                <PopCheckbox className={cls} onChange={that.updatePopCheckChange} style={styleWidth}
                check={item.check} key={i} showValue={showCheckboxValue} value={item.value} text={item.text}/>
            )

        });

        return checkboxArr;
    }
    //点击确认按钮后 返回数据给父级组件调用
    returnSelect=()=>{
        let {selectTop,selectPopCheck}=this.state;
        let selectedData=selectTop==null? selectPopCheck: new Array(selectTop);
        this.props.onConfirm?this.props.onConfirm(selectedData):'';
        this.hide();
    }
    doSearch=(searcinnovatetr)=>{

        this.props.onSearch?this.props.onSearch(searcinnovatetr) :'';
    }
    render(){
        const {className,size,width,data,title,showTopItems,showCheckboxValue,numPerRow,onConfirm,onSearch,...others}=this.props;
        const cls=classNames({
            'swiftBI_popfilter':true,
            'show':this.state.display==true,
            'size_default':size=="default",
            [className]:className
        });
        let styleWidth={
            width:width+'px'
        }

        return(
            <div>
                <Mask transparent={true} onClick={this.hide} model="partial"  style={{display: this.state.display ? 'block' : 'none'}}/>
                <PopFilter className={cls} style={styleWidth} {...others}>
                    <Panel>
                        <PanelTitle>
                            <span>{title}</span>
                            <SearchBar style={{float:'right',marginRight:'15px'}}  size="medium" onSearch={this.doSearch} placeholder="请输入搜索内容" />
                        </PanelTitle>

                        <PanelBody>
                            {
                                showTopItems==true &&
                                <PopFilterControl>
                                    <RadioPlus ref="topRadio" onChange={this.checkTop}  model="primary" size="small" data={this.state.topRadioData}/>
                                </PopFilterControl>
                            }
                            <div className="pop_filter_cont" ref="contList">
                                {
                                    data!=undefined & this.state.display!=false  &&

                                    this.renderContList(this.state.data,showCheckboxValue,this.state.widthPerPopCheck)
                                }

                            </div>
                        </PanelBody>

                        <PanelFooter>
                            <Flex>
                                <div className="filter_left">已选{this.state.selectItemCount}项</div>
                                <FlexItem className="pop_filter_filted">
                                    {
                                        this.renderSelectItems()
                                    }
                                </FlexItem>
                                <div className="filter_btn_wrap"><Button model="blue" size="small" onClick={this.returnSelect}>确认</Button></div>

                            </Flex>
                        </PanelFooter>

                    </Panel>
                </PopFilter>
            </div>


        )
    }
}
