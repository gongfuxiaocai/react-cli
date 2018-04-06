import React from 'react';
import classNames from 'classnames';
import './Loading.css';

const Loading=(props)=>{
    const {className,icon,...others}=props;

    const cls=classNames({
        'swiftBI_loading':true,
        [className]: className
    })

    return(
        <div className={cls} {...others}>
            Loading...
        </div>
    )
}


export default Loading;
