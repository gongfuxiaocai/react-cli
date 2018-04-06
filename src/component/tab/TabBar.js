import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Tab.less';

export default class TabBar extends React.Component{
    static defaultProps={
        barWidth:120,
        slideTo:0
    };
    static propTypes={
        barItems:PropTypes.array.isRequired,
        barWidth:PropTypes.number,
        slideTo:PropTypes.number
    };

    constructor(props){
        super(props);
        this.state={
            tab:props.slideTo//控制高亮效果
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tab:nextProps.slideTo
        })
    }
    updateSelect=(e)=>{
        let idx=parseInt(e.currentTarget.getAttribute('data-idx'));
        //只有当用户点击了不同的tab选项卡时才触发事件
        if(idx!=this.state.tab){
            this.setState({
                tab:idx
            });
            //返回当前点击的tab页id给父级调用
            this.props.onChange?this.props.onChange(idx):null;
        }

    }
    renderTabItems=(barItems,barWidth)=>{
        let that=this;
        let liArr=[];
        let width={
            width:barWidth+'px'
        }
        barItems.map(function(item,i){
            let liCls=classNames({
                'on':that.state.tab==i
            });
            liArr.push(
                <li className={liCls}
                    style={width} key={i} data-idx={i}
                    onClick={that.updateSelect}>

                    {item}

                </li>)
        });
        return ( <ul className='swiftBI_tabbar'>{liArr}</ul> )

    }
    render(){
        const {className,children,onChange,barItems,barWidth,slideTo,...others}=this.props;

        const cls=classNames({
            'swiftBI_tabbar_wrap':true,
            [className]:className
        });

        //控制蓝色横线的移动位置
        let position=this.state.tab*barWidth;
        let indicatorStyle={
            'width':barWidth+'px',
            'left':`${position}px`
        }

        return(
            <div className={cls} {...others}>
                {
                    this.renderTabItems(barItems,barWidth)
                }
                <div className="swiftBI_tabbar_indicator" style={indicatorStyle}></div>
            </div>
        )
    }

}
