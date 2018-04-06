import React from 'react';
import classNames from 'classnames';
import { Spin as AntdSpin } from 'antd';
import './Spin.less';

const Spin = (props) => {
    const {className,show,...others}=props;

    const cls=classNames({
        'swift_spin':true,
        [className]: className
    })

    return(
        <AntdSpin className={cls} spinning={show} {...others}/>
    )
}

export default Spin;
