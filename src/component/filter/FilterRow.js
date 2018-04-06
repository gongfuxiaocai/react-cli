import React from 'react';
import classNames from 'classnames';
import './FilterRow.css';

const FilterRow=(props)=>{
    const {className,children,...others}=props;

    const cls=classNames({
        'filter_row':true,
        [className]:className
    });

    return(
        <div className={cls} {...others}>{children}</div>
    )

}

export default FilterRow;
