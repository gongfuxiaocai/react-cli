import React,{Component} from 'react';
import classNames from 'classnames';
import './FilterBody.css';

const FilterBody=(props)=>{
    const {className,children,...others}=props;

    const cls=classNames({
        'filter_bd':true,
        [className]:className
    });

    return(
        <div className={cls} {...others}>{children}</div>
    )
}
export default FilterBody;
