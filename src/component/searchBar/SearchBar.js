import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Panel from '../panel/index';
import PanelTitle from '../panel/PanelTitle';
import PanelBody from '../panel/PanelBody';
import PanelFooter from '../panel/PanelFooter';
import Input from '../input/index';
import Button from '../button/index';
import LayoutTable from '../layoutTable/index';
import LayoutTableCell from '../layoutTable/LayoutTableCell';
import Mask from '../mask/index';
import Icon from 'Components/icon/index';

class SearchBar extends React.Component{
    static defaultProps={
        readOnly:false,
        mask:true,
        align:"bottom_left"
    };
    static propTypes={
        width:PropTypes.number,
        value:PropTypes.string,
        placeholder:PropTypes.string,
        readOnly:PropTypes.bool,
        onSearch:PropTypes.func,
        mask:PropTypes.bool,
        align:PropTypes.oneOf(['bottom_left', 'bottom_right','top_left','top_right']),
        totalRows:PropTypes.number,
        pageSize:PropTypes.number
    };
    constructor(props){
        super(props);
        this.state={
            barValue:'',        //外部搜索框显示的文字
            searchListData:[],  //搜索结果
            keyword:'',         //搜索框数据
            showPop:false,      //是否显示弹窗
            currentPage:0,      //当前页
            maxPage:0,          //最大多少页
            isPrevDisable:true, //上一页禁用
            isNextDisable:true  //下一页禁用


        }
    }
    closePanel=()=>{
        this.setState({
            showPop:false
        })
    }
    togglePanel=()=>{
        this.setState((prevState) => ({
            showPop:!prevState.showPop
        }));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.totalRows && nextProps.pageSize && nextProps.data.length>0){
            let maxPage=Math.ceil(nextProps.totalRows/nextProps.pageSize)-1;
            //console.log(maxPage)
            let nexStatus=this.state.currentPage>=maxPage?true:false;
            this.setState({
                maxPage:maxPage,
                isNextDisable:nexStatus
            })
        }


        if(this.state.barValue=='' && nextProps.defaultValue){
            this.setState({
                barValue:nextProps.defaultValue
            })
        }

    }


    //更新弹窗搜索input框的值
    handleChange=(e)=>{
        this.setState(
            {
                keyword: e.currentTarget.value
            }
        );
    }
    //弹窗内点击搜索按钮时，获取input值然后执行父级传递进来的onSearch方法
    sendSearchRequest=()=>{
        //console.log(this.refs.innerInput)
        this.props.onSearch? this.props.onSearch(this.state.keyword):null;


    }
    //用户点击上一页下一页时
    handlePageChange=(type)=>{
        let tmpCurrentPage=this.state.currentPage;//当前页
        let newPage=0;
        switch(type){
            case 'prev':
                newPage=tmpCurrentPage-1;

                if(!this.state.isPrevDisable && this.props.onPageChange){
                    let prvStatus=newPage<=0?true:false;
                    let nextStatus=newPage>=this.state.maxPage?true:false;
                    this.setState(
                        {
                            currentPage:newPage,
                            isPrevDisable:prvStatus, //上一页禁用
                            isNextDisable:nextStatus  //下一页禁用
                        },
                        function(){
                            this.props.onPageChange(this.state.currentPage);
                        }

                    );

                }
                break;
            case 'next':
                newPage=tmpCurrentPage+1;
                if(!this.state.isNextDisable && this.props.onPageChange){
                    let prvStatus=newPage<=0?true:false;
                    let nextStatus=newPage>=this.state.maxPage?true:false;
                    this.setState(
                        {
                            currentPage:newPage,
                            isPrevDisable:prvStatus, //上一页禁用
                            isNextDisable:nextStatus  //下一页禁用
                        },
                        function(){
                            this.props.onPageChange(this.state.currentPage);
                        }
                    );

                }
                //!this.state.disableNext && this.props.onPageChange? this.props.onPageChange(1):null;
                break;
        }
    }


    //获取用户点击的搜索结果数据，更新外部输入框文字,并返回点击行的数据给父级组件
    returnClickedData=(e)=>{
        this.setState({
            barValue:e.currentTarget.getAttribute('data-text'),
            showPop:false
        })
        let data={text:e.currentTarget.getAttribute('data-text'),value:e.currentTarget.getAttribute('data-value')}
        this.props.onClickListData? this.props.onClickListData(data):null;
    }

    renderSearchRes=(data)=>{

        if(!this.isEmpty(data)){
            let that=this;
            let list=[]
            data.map(function(item,i){
                list.push(<li key={i} data-value={item.value} data-text={item.text} onClick={that.returnClickedData}>{item.text}</li>)
            })
            return list;
        }
    }
    isEmpty=(obj)=>{
        let hasOwnProperty = Object.prototype.hasOwnProperty;
        // 本身为空直接返回true
        if (obj == null) return true;

        // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        //最后通过属性长度判断。
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }
    //重置
    reset=()=>{
        ReactDOM.findDOMNode(this.refs.innerInput).value='';
        this.setState({
            barValue:'',
            keyword:'',
            isPrevDisable:true, //上一页禁用
            isNextDisable:true  //下一页禁用
        })
        this.props.onReset?this.props.onReset():null;
    }
    render(){
        //const lang=this.props.intl;
        const {intl,className,mask,onReset,defaultValue,width,title,placeholder,popPlaceholder,readOnly,onSearch,data,totalRows,pageSize,onClickListData,align,onPageChange,...others}=this.props;
        const cls=classNames({
            "swiftBI_search_bar":true,
            [className]:className
        });
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
        let nextBtnSytle=classNames({
            "search_bar_pager ":true,
            "next":true,
            "disable":this.state.isNextDisable
        })
        let btnStyle={
            "width":"initial",
            "padding":"0 7px",
            "height":"28px",
            "lineHeight":"26px"
        }
        return(
            <div>
                {
                    mask &&
                    <Mask className="searchbar_mask" transparent={true} onClick={this.closePanel} model="full"  style={{display: this.state.showPop ? 'block' : 'none'}}/>

                }

                <div className={cls} {...others} style={styleWidth}>
                    <div className="search_bar_outer_input_wrap" onClick={this.togglePanel}>
                        <input type="text" readOnly value={this.state.barValue} placeholder={placeholder} title={this.state.barValue}/>
                        <Icon model="search" />
                    </div>

                    <Panel className={clsSearchBarPanel} style={{display: this.state.showPop==true ? 'block' : 'none'}}>
                        <PanelTitle style={{borderBottom:'0'}}>
                            <LayoutTable>
                                <LayoutTableCell>
                                    <span>{title}</span>
                                </LayoutTableCell>

                                <LayoutTableCell className="search_bar_input_wrap">
                                    <Input ref="innerInput" model="primary" size="small" placeholder={popPlaceholder} type="text" onChange={this.handleChange} />
                                    <Button onClick={this.sendSearchRequest}  style={btnStyle} model="primary" size="small">
                                        {intl.messages.swift_searchbar_btn_search?intl.formatMessage( {id:"swift_searchbar_btn_search"} ):"搜索"}
                                    </Button>
                                    <Button onClick={this.reset}  style={btnStyle} model="default"  size="small">
                                        {intl.messages.swift_searchbar_btn_reset?intl.formatMessage( {id:"swift_searchbar_btn_reset"} ):"重置"}
                                    </Button>
                                </LayoutTableCell>
                            </LayoutTable>
                        </PanelTitle>


                        <PanelBody>
                            <ul className="search_bar_res">
                                {this.renderSearchRes(data)}
                            </ul>

                        </PanelBody>

                        <PanelFooter>
                            <div className="search_bar_pager_wrap">
                                <span className={prevBtnStyle} onClick={ this.handlePageChange.bind(this,'prev') }></span>
                                <span className={nextBtnSytle} onClick={ this.handlePageChange.bind(this,'next') }></span>
                            </div>
                        </PanelFooter>
                    </Panel>
                </div>

            </div>
        )
    }
}

export default SearchBar;
