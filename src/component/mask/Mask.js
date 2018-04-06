import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Mask.css';

export default class Mask extends React.Component {
    static propTypes = {
        transparent: PropTypes.bool
    };

    static defaultProps = {
        transparent: false
    };

    render() {
        const {transparent, className,model, ...others} = this.props;
        const cls = classNames({
            'swiftBI_mask': true,
            'full':model==='full',
            'partial':model==='partial',
            'partialFixed':model==='partialFixed',
            'transarent': transparent,
            [className]: className
        });

        return (
            <div className={ cls } { ...others } />
        );
    }
}