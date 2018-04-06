import React from 'react';
import classNames from 'classnames';
import './Filter.less';

const Filter=(props)=>{
    const{className,children,...others}=props;

    const cls=classNames({
        'filter_wrap':true,
        [className]:className
    });

    return (
        <div className={cls} {...others}>
            {children}
        </div>
    )
}
export default Filter;
