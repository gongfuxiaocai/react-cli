import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DataBox from './DataBox';
import './ShKanban.css';

class ShKanban extends React.Component{
    static defaultProps = {
        width: 'auto'
    }

    static propTypes = {
        showData: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
    }

    render(){
        const {className, children, width, showData, ...others} = this.props;

        if (Object.keys(showData).length === 0) { //判断对象是否为空，是ES6的新方法, 返回值是对象中属性名组成的数组
            return null;
        }
        const cls = classNames({
            'kanban_data': true,
            'clearfix2': true,
            [className]: className
        });

        const {background} = showData;
        const {url, icoWidth, icoHeight} = showData.icon;
        const kanbanStyle = {
            width,
            background
        }
        const iconStyle = {
            width: icoWidth,
            height: icoHeight,
            background: `url(${url}) no-repeat`
        }
        return(
            <div className={cls} {...others} style={kanbanStyle}>
                <div className="ico" style={iconStyle}></div>
                <div className="txt">
                    <div className="item_title">{showData.text}</div>
                    <DataBox data={showData.value} decimal={showData.decimal} animate={showData.animate} />
                    {
                        showData.compare &&
                        <div className="item_compare">
                            <span className="s1">{showData.compare[0].item} <b>{`${showData.compare[0].percent}%`}</b></span><span>{showData.compare[1].item} <b>{`${showData.compare[1].percent}%`}</b></span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ShKanban;
