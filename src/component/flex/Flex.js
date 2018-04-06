import React, { Component } from 'react';
import classNames from 'classnames';
import './Flex.css';

export default class Flex extends React.Component {
    static defaultProps = {
        orient: 'horizontal',
        equal: 'false'
    };
    render() {
        const {children,equal,orient,className,...others}=this.props;
        const cls=classNames({
            'swiftBI_flex':true,
            'equal':equal===true,
            'vertical':orient==="vertical",
            'horizontal':orient==="horizontal",
            [className]: className
        });
        return (
            <div className={cls} {...others}>
                { children }
            </div>
        );
    }
}
