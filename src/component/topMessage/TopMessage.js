import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './TopMessage.less';

const TopMessage = (props) => {
    const {className,icon,message}=props;

    const cls=classNames({
        'swift_top_message':true,
        [className]: className
    })

    return(
        <div className={cls}>
            <div className="swift_top_message_cont">
                <Icon model={icon}/>
                <span className="swift_top_message_txt">{message}</span>
            </div>
        </div>

    )
}

export default TopMessage;
