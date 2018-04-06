import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/index';
import PopOver from '../popOver/index';
import './IconTip.less';

export default class IconTip extends React.Component{
    static defaultProps={
        model:'tip',
        position:'bottomLeft'
    };
    static propTypes = {
        model:PropTypes.string,
        position:PropTypes.string
    };

    render(){
        const {className,model,children,width,position,...others}=this.props;

        const cls=classNames({
            'swiftBI_icon_tip':true,
            'icon_tip':model==='tip',
            [position]:true,
            [className]:className
        });

        const tipCls=classNames({
            'tip_box':true,
            [position]:true
        })

        const tipBoxStyle={
            width:width
        }

        return(
            <div className={cls} {...others}>

                <PopOver content={children} placement={position} arrowPointAtCenter={true}>
                    <Icon model="question" />
                </PopOver>
            </div>
        )
    }

}
