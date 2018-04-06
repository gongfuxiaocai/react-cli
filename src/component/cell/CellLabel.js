import React,{Component} from 'react';
import classNames from 'classnames';
import './CellLabel.css';
import PropTypes from 'prop-types';

export default class CellLabel extends React.Component{

    static propTypes={
        width:PropTypes.number
    };
    render(){
        const {className,width,children,...others}=this.props;

        const cls=classNames({
            'swiftBI_cell_label':true,
            [className]:className
        });

        let labelStyle={
            width:width
        }

        return(
            <div className={cls} {...others} style={labelStyle}>{children}</div>
        )
    }


}
