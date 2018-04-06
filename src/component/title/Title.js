import React from 'react';
import classNames from 'classnames';
import './Title.css';

const Title=(props)=>{
    const {className,children,...others}=props;

    const cls=classNames({
        'swiftBI_title':true,
        [className]:className
    });

    return(
        <h1 className={cls} {...others}>{children}</h1>
    )
}

export default Title;
