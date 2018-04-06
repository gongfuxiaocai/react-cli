import React from 'react';
import classNames from 'classnames';
import './Sticky.less';

const Sticky = (props) => {
    const {className,children,...others}=props;

    const cls=classNames({
        'swiftBI_sticky':true,
        [className]: className
    });

    return(
        <div className={cls} {...others}>
            {children}
        </div>
    )
};

export default Sticky;
