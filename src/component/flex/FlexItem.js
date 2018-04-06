import React, { Component } from 'react';
import classNames from 'classnames';
import './FlexItem.css';

const FlexItem=(props)=> {
    const { children,className, ...others } = props;
    const cls=classNames('swiftBI_flex_item',{[className]: className});
    return (
        <div className={cls} {...others}>
             { children }
        </div>
    );
};
export default FlexItem;
