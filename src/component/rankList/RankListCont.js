import React from 'react';
import classNames from 'classnames';
import RankListRowOne from './RankListRowOne';
import RankListCompare from './RankListCompare';

import './RankList.css';

export default class RankListCont extends React.Component{
    constructor(){
        super();
    }
    renderRankList=(data,config)=>{
        if(data==undefined || data.length<1){
            return (<li><span className="rank_list_empty">暂无数据</span></li>);
        }
        let li=[];

        data.map((item,i)=>{
            let rowData={
                "label":item[config['name']],
                "value":item[config['tradeVal']],
                'lastRn':item[config['lastRn']],
                'rn':item[config['rn']]

            }

            li.push(
                <li key={i}>
                    <RankListRowOne data={rowData}/>
                    <div className="row_sub_title">{item[config['orgId']]}</div>
                    <div className="row_compare">
                        {this.renderCompare(item,config.compare)}
                    </div>
                </li>
            )


        });
        return li;
    }
    renderCompare=(data,compare)=>{

        let compareList=[];

        compare.map(function(config,i){
            compareList.push(<RankListCompare key={i} showIcon={config["showIcon"]} text={config["label"]} data={data[config["key"]]}/>);
        });

        return compareList;
    }
    render(){
        const{data,config}=this.props;

        return(
            <ul className="swiftBi_rank_ul">
                {this.renderRankList(data,config)}
            </ul>
        )
    }

}
