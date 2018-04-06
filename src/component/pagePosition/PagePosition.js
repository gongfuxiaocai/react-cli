import React, { Component } from 'react';
import classNames from 'classnames';
import './PagePosition.css';

const PagePosition=(props)=> {
    const { children,className, ...others } = props;
    const cls=classNames({
        'swift_page_position':true,
        [className]: className
    });
    return (
        <div className={cls} {...others}>
             { children }
        </div>
    );
};
export default PagePosition;
