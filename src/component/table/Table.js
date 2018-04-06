import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
//import {TBody,THead,TD,TH,TR} from './index';
import TBody from './TBody';
import THead from './THead';
import Tr from './TR';
import Td from './TD';
import Th from './TH';
import {Flex} from '../flex/index';
import Loading from '../loading/index';
import AnimateQueue from '../animation/AnimateQueue';
import { TweenOneGroup } from 'rc-tween-one';

//import './Table.css';
//可控组件，自带状态
class Table extends React.Component{
    static defaultProps={
        noAnimation:true
        //size:'small'
    };
    static propTypes={
        /*thead 部分信息 [{title,dataKey,rank,order，format}]
        * eg:[{title:'金额',dataKey:'tradeAmount',rank:true,order:'default',format:'number'}]
        */
        thData:PropTypes.array.isRequired,
        /*
        * 和值/均值
        */
        sumAvgData:PropTypes.array,
        /*tbody 部分信息
        * eg:[{date:'2017-5-26',amount:200}]
        */
        bodyData:PropTypes.array.isRequired,

        noAnimation:PropTypes.bool

    };
    constructor(){
        super();
        this.state={
            thData:null,
            bodyData:null,
            sumAvgData:null,//和值/均值
            isShowSumAvg:0//0:未显示 1:当前已显示
        }
        this.enterAnim = [
          {
            opacity: 0, x: 30, backgroundColor: '#FFEFD9', duration: 0,
          },
          {
            height: 0,
            duration: 200,
            type: 'from',
            delay: 250,
            ease: 'easeOutQuad',
            onComplete: this.onEnd
          },
          {
            opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
          },
          { delay: 500, backgroundColor: 'inherit' },
        ];
        this.leaveAnim = [
            { duration: 250, opacity: 0 },
            { height: 0, duration: 200, ease: 'easeOutQuad' }
        ];

    }
    onEnd = (e) => {
        const dom = e.target;
        dom.style.height = 'auto';
    }
    componentDidMount(){
        //console.log( 'undefined', String(null) );
        this.setState({
            thData:this.props.thData,
            bodyData:this.props.bodyData,
            sumAvgData:this.handleSumAvgData(this.props.sumAvgData,this.props.thData[0])
        });

    }
    //
    handleSumAvgData(sumAvgData,thData){
        let keys=new Array();

        const firstKeyName=thData['dataKey'];

        if(sumAvgData!=undefined){
            for(let i=0;i<sumAvgData.length;i++){
                //console.log(sumAvgData[i]);
                sumAvgData[i]['isSortable']=false; //给sumAvgData加上一个识别号 用来做背景色的区别显示

                sumAvgData[i]['_TITLE']!=undefined? sumAvgData[i][firstKeyName]=sumAvgData[i]['_TITLE']:'';//让_TITLE值的内容显示在表格的第一列
            }

            return sumAvgData;
        }
    }

    componentWillReceiveProps(nextProps){
        //遍历bodyData，凡是需要排序的列 undefined null 空值 都=0
        // nextProps.bodyData.map(function(item_body,i){
        //     nextProps.thData.map(function(item_th,h){
        //         let tdName=item_th.dataKey;
        //         let tdFiled=item_body[tdName];
        //         if(item_th.format=="number"){
        //             if( tdFiled==undefined || tdFiled==null ){
        //               nextProps.bodyData[i][tdName]=NaN;
        //             }
        //         }
        //     });
        // });

        this.setState({
            thData:nextProps.thData,
            bodyData:nextProps.bodyData,
            sumAvgData:this.handleSumAvgData(nextProps.sumAvgData,nextProps.thData[0]),
            isShowSumAvg:0
        });
    }
    itemExist(arr,obj){
        let res=false;
        arr.map(function(item){
             if(item==obj){
                 res=true;
                 return;
             }
        });
        return res;
    }
    //判断升降序
    thClickHandler=(e)=>{
        let target=e.currentTarget;
        let targetClass=e.currentTarget.getAttribute("class");
        //console.log()
        let classArray=[];

        if(targetClass.length>0){
            classArray=targetClass.split(" ");
            let rankEnable=this.itemExist(classArray,'rank');
            let isRankDesc=this.itemExist(classArray,'desc');
            if(rankEnable !=false){
                switch(isRankDesc){
                    case true:this.doRank(e,'asc');break;//当前为降序，则改升序
                    case false:this.doRank(e,'desc');break;//当前为升序or没选择，则降序
                }
            }
        }


        //console.log(classArray);
    }
    /*
    *根据当前点击元素，改变对应state箭头UI的方向,并排序 asc,desc
    */
    doRank=(e,direction)=>{
        let idx=e.currentTarget.getAttribute("data-idx");
        let temp=this.state.thData;
        temp.map(function(item,i){
            temp[i].order="default";
        });
        temp[idx].order=direction;
        //更新箭头状态
        this.setState({
            thData:temp
        });
        this.mathRank(temp[idx].dataKey,direction);

    }
    /*
    * 按哪列来排序 eg:('tradeCount','asc')
    */
    mathRank(dataKey,direction){

        let tempBodyData=this.state.bodyData;
        tempBodyData.sort(function(a,b){
            let newA=a[dataKey]==undefined?-1:a[dataKey];
            let newB=b[dataKey]==undefined?-1:b[dataKey];
            if(direction=='asc'){
              return parseInt(newA)-parseInt(newB)
            }
            else{
              return parseInt(newB)-parseInt(newA)
            }



        });

        this.setState({
            bodyData:tempBodyData
        });
    }
    //格式化数字3个一个逗号
    formatNumber(num){
        if(typeof(num) !=='undefined' && num!=null){
            //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
            num = num.toString().replace(/\$|,/g,'');

            //如果存在小数点，则获取数字的小数部分
            let cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
            cents = cents.length>1 ? cents : '' ;

            //获取数字的整数数部分
            num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;

            let numData = String(num);
            let re = /(-?\d+)(\d{3})/;
            while(re.test(numData)){
              numData = numData.replace(re,"$1,$2");
            }

            return numData+cents;
        }


    }
    //隐藏和值/均值
    hideSumAvg(){
        this.setState({
            isShowSumAvg:0
        });
    }
    //处理和值/均值
    toggleSumAvg(){
        if(this.state.sumAvgData==undefined){
            return
        }
        //如果已显示则隐藏
        if(this.state.isShowSumAvg==1){
            this.hideSumAvg();
            return
        }
        else{//如果隐藏则显示
            this.setState({
                isShowSumAvg:1
            });
        }

    }

    /*
    *渲染 表格头部
    */
    renderTHead=(thData)=>{
        let th=[];
        let that=this;
        thData.map(function(item,i){
            let thClass=classNames({
                'rank asc':item.rank==true && item.order=='asc',
                'rank desc':item.rank==true && item.order=='desc',
                'rank':item.rank==true && item.order=='default'
            })
            th.push(
                <Th
                key={'th-'+item.dataKey}
                data-idx={i}
                data-key={item.dataKey}
                className={thClass}
                width={item.width}
                onClick={that.thClickHandler}
                >
                    {item.title}
                </Th>
            )
        });
        return (<Tr>{th}</Tr>)

    }

    /*
    * 渲染 表格内容
    */
    renderTBody(thData,bodyData){

        let row=[];
        let that=this;
        //遍历bodyData，同时从thData获取对应的下标值来提取对应位置的bodyData数据
        bodyData.map(function(item_body,i){
            //console.log(item_body)
            let td=[];
            thData.map(function(item_th,h){
                //console.log(item_body)
                //console.log(item_th)
                let tdName=item_th.dataKey;
                let tdFiled=item_body[tdName];
                if(item_th.format=="number"){
                    tdFiled=that.formatNumber(tdFiled);
                }
                if(that.props.noAnimation){
                    td.push(<Td key={item_body.key+'-'+item_th.dataKey}  data-idx={i+'-'+h}>{tdFiled}</Td>)
                }
                else{
                    td.push(<Td key={item_body.key+'-'+item_th.dataKey} width={item_th.width} data-idx={i+'-'+h}>{tdFiled}</Td>)
                }

            });
            const trCls=classNames({
                'tr_no_sort':item_body.isSortable==false
            });
            row.push(<Tr className={trCls} key={item_body.key} data-idx={'row-'+i}>{td}</Tr>)
        });
        let tbody=<tbody>{row}</tbody>
        return row;

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
    render(){
        const lang=this.props.intl;
        const {intl,className,thData,bodyData,sumAvgData,children,isLoading,noAnimation,...others}=this.props;
        const cls=classNames({
            'swiftBI_table':true,
            'animation_enable':!noAnimation,
            [className]:className
        });
        return(
            <div className="swiftBI_table_wraper" {...others}>
                <table className={cls} style={{overflow:'hidden'}}>
                    <THead>
                        {this.isEmpty(this.state.thData)===false ? this.renderTHead(this.state.thData):null}
                    </THead>
                    {
                        !this.isEmpty(this.state.bodyData) &&
                        <TweenOneGroup
                            component="tbody"
                            enter={this.enterAnim}
                            leave={this.leaveAnim}
                            appear={false}
                          >
                            {this.renderTBody(this.state.thData,this.state.bodyData)}
                          </TweenOneGroup>
                    }



                </table>
                {
                    this.isEmpty(this.state.bodyData)==true &&
                    <AnimateQueue
                        noAnimation={noAnimation}
                        delay={100}
                        duration={450}
                        ease="easeOutQuart"
                        animConfig={[
                            { opacity: [1, 0]},
                            { opacity: [1, 0]}
                        ]}>
                        <div className="tbody_no_data" key="table_no_data">
                            {lang.messages.swift_common_no_data?lang.formatMessage( {id:"swift_common_no_data"} ):"暂无相关数据"}
                        </div>
                    </AnimateQueue>
                }
                {
                    isLoading === true &&
                    <Flex className="swiftBI_table_loading_wrap">
                        <Loading />
                    </Flex>
                }
            </div>
        )
    }

}

export default Table;
