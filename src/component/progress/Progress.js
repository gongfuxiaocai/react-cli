import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Progress.less';

export default class Progress extends React.Component{
    static propTypes={
        model:PropTypes.oneOf(['circle','line']),
        width:PropTypes.number,
        strokeWidth:PropTypes.number,
        percent:PropTypes.number
    }
    static defaultProps = {
        model: "circle"
    }

    render(){
        const {className,model,width,percent,strokeWidth,...others}=this.props;
        const cls=classNames({
            'swift_progress':true,
            [className]:className
        });

        //圆形参数计算 start
        const circleSvgStyle={
            height: width,
            width: width
        }
        const radius=(width-strokeWidth*2)/2;            //圆形半径
        const circumference=2*3.14*radius;               //圆周长
        const cirProgress=circumference*(1-percent/100); //百分比显示
        //圆形参数计算 end

        return(
            <div className={cls} {...others}>
                <div className="swift_progress_circle" style={circleSvgStyle}>
                    <svg style={circleSvgStyle}>
                        <circle
                            className="back_circle"
                            r={radius} cy={width/2} cx={width/2} strokeWidth={strokeWidth} fill="none"/>

                        <circle
                            className="front_circle"
                            r={radius} cy={width/2} cx={width/2} strokeWidth={strokeWidth} strokeLinecap="round"
                            strokeDasharray={circumference} strokeDashoffset={cirProgress}
                            fill="none"/>
                    </svg>
                    <div className="circle_indicator"><span>{percent}%</span></div>
                </div>



            </div>
        )
    }

}
