import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './RankList.css';
import MultiRadio from '../multiRadio/index';
import Panel from '../panel/index';
import PanelTitle from '../panel/PanelTitle';
import PanelBody from '../panel/PanelBody';
import RankListCont from './RankListCont';

export default class RankList extends React.Component{

    static propTypes={
        title:PropTypes.string.isRequired,
        data:PropTypes.object.isRequired
    };
    constructor(){
        super();
        this.state={
            currentShow:0,//控制显示切换
            dataMultiRadio:'',//格式化后的右上按钮数组
            multiRadioName:''//按钮的name值 要有唯一性
        }
    }
    componentWillMount(){
        this.props.data.buttons?this.transfromButtonData(this.props.data.buttons):'';
    }
    componentWillReceiveProps(nextProps){
        nextProps.data.buttons?this.transfromButtonData(nextProps.data.buttons):'';
    }
    //把props.data.buttons数组转换成MultiRadio组件能读懂的数据 第一条数据默认选中效果
    transfromButtonData(buttonArray){
        let multiRadio=[];
        for(let i=0;i<buttonArray.length;i++){
            let flag = i===0?true:false;
            let data={"value":i,"label":buttonArray[i],defaultCheck:flag};
            multiRadio.push(data);
        }
        let buttonName='rank_button_'+Math.ceil(Math.random()*100);
        this.setState({
            dataMultiRadio:multiRadio,
            multiRadioName:buttonName
        });
    }
    //根据用户所选 做切换显示
    getRadioSelect=(selectedData)=>{
        let idx=selectedData.value;
        this.setState({
            currentShow:idx
        });
    }

    render(){
        const {className,data,title,...others}=this.props;
        const cls=classNames({
            'swiftBI_ranklist':true,
            [className]:className
        });

        return(

            <Panel className={cls} {...others}>
                <PanelTitle >
                    <span className="rank_top_title" title={title}>{title}</span>
                    {
                        data.buttons &&
                        <MultiRadio className="ranklist_header_radio" model="round" name={this.state.multiRadioName} onChange={this.getRadioSelect} data={this.state.dataMultiRadio}/>
                    }

                </PanelTitle>
                <PanelBody >
                    <RankListCont data={data.list[this.state.currentShow]} config={data.config} />
                </PanelBody>
            </Panel>
        )
    }
}
