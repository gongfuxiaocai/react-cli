import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './LayoutTable.css';

const LayoutTable = (props) => {
    const {className,model,equal,vAlign,hAlign,children,...others}=props;

    const cls=classNames({
        'swiftBI_layout_table':true,
        'equal':equal==true,
        'valign':vAlign==true,
        'halign':hAlign==true,
        [className]: className
    })

    return(
        <div className={cls} {...others}>{children}</div>
    )
}

LayoutTable.propTypes = {
    equal: PropTypes.bool,
    vAlign:PropTypes.bool,
    hAlign:PropTypes.bool
}

LayoutTable.defaultProps = {
    equal:false,
    vAlign:false,
    hAlign:false
}

export default LayoutTable;
