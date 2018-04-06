import React from 'react';
import PropTypes from 'prop-types';
import RcAnimate from 'rc-animate';
import './Animate.less';

export default class Animate extends React.Component{
    static defaultProps={
        model:'swift-zoom',
    };
    static propTypes = {
        model: PropTypes.string
    };

    render(){
        const {children,...others} = this.props;

        return(
            <RcAnimate {...others}>{children}</RcAnimate>
        )
    }

}
