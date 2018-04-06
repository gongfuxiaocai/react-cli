import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import './KanBan.css';

export default class KanBanData extends React.Component{
    static defaultProps={
        animate:false
    };
    static propTypes={
        animate:PropTypes.bool,
        data:PropTypes.number
    };
    constructor(){
        super();
        this.state={
            curData:0
        }
    }
    componentWillMount(){
        this.setState({
            beforeData:0,
            curData:this.props.data
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState((prevState, nextProps) => ({
            beforeData:prevState.curData,
            curData: nextProps.data
        }));
    }
    renderData=(beforeData,data,animate)=>{
        //去小数+四舍五入
        let roundData=Math.round(data);
        let roundBeforeData=Math.round(beforeData);

        if(animate==true){
            return (
                <CountUp  start={roundBeforeData} end={roundData} duration={2}  formattingFn={(roundData)=>{
                    return (roundData || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                }}/>
            )
        }
        else{
            let formatData=(roundData || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            return formatData;
        }
    }

    render(){
        const {className,data,animate,...others}=this.props;
        const cls=classNames({
            'swiftBi_kanban_data':true,
            [className]:className
        });
        //console.log(data);

        return(
            <div className={cls} {...others}>
                {this.renderData(this.state.beforeData,this.state.curData,animate)}
            </div>
        )
    }

}
