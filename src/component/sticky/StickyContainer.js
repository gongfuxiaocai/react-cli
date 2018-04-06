import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Sticky.less';

const StickyContainer = (props) => {
    const {className,distanceFromBottom,children,...others}=props;

    const cls=classNames({
        'swiftBI_sticky_container':true,
        [className]: className
    })
    const styleInner={
        paddingBottom:distanceFromBottom+'px'
    }
    return(
        <div className={cls} {...others}>
            <div className="swiftBI_sticky_inner_wrap">
                <div className="swiftBI_sticky_inner" style={styleInner}>
                    {children}
                </div>

            </div>

        </div>
    )
}

StickyContainer.propTypes = {
    distanceFromBottom:PropTypes.number.isRequired
}

StickyContainer.defaultProps = {

}

export default StickyContainer;
