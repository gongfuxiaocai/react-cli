import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Steps.less';

export default class Steps extends Component {
    static propTypes = {
        current: PropTypes.number,
        data:PropTypes.array.isRequired,
        model:PropTypes.string
    };

    static defaultProps = {
        current:0,
         model: 'primary'
    };

    renderSteps=(data,current)=>{

        let list=[];
        let width=100/data.length;
        for (let i=0;i<data.length;i++){
            let listCls=classNames({
                'steps_item':true,
                'on':i<current
            });
            let styleWidth={width:width+'%'}
            list.push(
                <div key={i} className={listCls}  style={styleWidth}>
                    <span className="setps_num">{i+1}</span>
                    <p>{data[i]}</p>
                </div>
            )
        }
        return list;
    }
    render() {
        const {className,current,model,data,...others} = this.props;
        const cls = classNames({
            'innovate_steps': true,
            'primary':model=="primary",
            'single':model=="single",
            [className]: className
        });

        return (
            <div className={cls} {...others} >
                {
                    this.renderSteps(data,current)
                }
            </div>
        );
    }
}
