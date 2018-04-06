import React from 'react';
import classNames from 'classnames';
import './PopFiltedItem.css';

const PopFiltedItem=(props)=>{
    const {className,children,value,...others}=props;
    const cls=classNames({
        'swiftBI_popFilter_item':true,
        [className]:className
    });
    return(<span className={cls} data-value={value} {...others}>{children}</span>)
}
export default PopFiltedItem;
