import React,{Component} from 'react';
import classNames from 'classnames';
import './FilterTitle.css';
import PropTypes from 'prop-types';

export default class FilterTitle extends React.Component{
    static propTypes={
        border: PropTypes.bool
    };
    static defaultProps={
        border: true
    };
    render(){
        const {className,border,children,...others}=this.props;

        const cls=classNames({
            'filter_hd':true,
            'no_border_bottom':border===false,
            [className]:className
        });

        return (
            <div className={cls} {...others}>
                {children}
            </div>
        )
    }

}
