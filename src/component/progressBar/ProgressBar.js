import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ProgressBar.css';

export default class Button extends React.Component {
    static defaultProps = {
        width:null
    }
    static propTypes={
        width:PropTypes.number
    }

    render() {
        const { width,className, ...others}=this.props;
        let style={
            width:width+'px'
        }
        const cls=classNames({
            'container':true,
            [className]: className
        })
        const clsw=classNames({
            'warning':true,
            [className]: className
        })

        return (
            <div style={style} className={cls} {...others}>
                <div className={clsw} {...others}>
                </div>
            </div>
        );
    }
};
