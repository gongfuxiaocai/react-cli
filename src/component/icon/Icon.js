import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Icon.less';
import './iconfont.css';

const Icon = (props) => {
    const {className,model,iconfont,...others}=props;

    const cls=classNames({
        'swiftBI_icon':true,
        ['swiftBI_icon_'+model]:!iconfont,
        ['icon-'+model]:iconfont,
        ['iconfont']:iconfont,
        [className]: className
    })

    return(
        <i className={cls} {...others}/>
    )
}

Icon.propTypes = {
    model: PropTypes.string.isRequired,
    iconfont:PropTypes.bool
}

Icon.defaultProps = {
    iconfont:true
}

export default Icon;
