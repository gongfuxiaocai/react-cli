import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/index';
import './IconExplain.less';

class IconExplain extends Component  {
    constructor( props ) {
        super( props );

        this.state = {
            contentShow: !this.props.hover
        }

        this.handleMouseEnter = this.handleMouseEnter.bind( this );
        this.handleMouseLeave = this.handleMouseLeave.bind( this );
    }

    handleMouseEnter() {
        this.setState( {
            contentShow: true
        } );
    }

    handleMouseLeave() {
        this.setState( {
            contentShow: false
        } );
    }

    render() {
        const { model,className, content, iconClass, hover, contentClass, ...others } = this.props;
        const { contentShow } = this.state;
        const wrapCls=classNames({
            'icon_explain_wrap':true,
            [className]:true
        })

        const iconCls=classNames({
            'icon_explain_icon':true,
            [iconClass]:true
        })
        const contCls=classNames({
            'icon_explain_cont':true,
            [contentClass]:true
        })

        return(
            <div className={wrapCls} { ...others }>
                {
                    hover
                    ?
                    <div>
                        <span style={ { cursor: "pointer" } } className={ iconCls } onMouseOver={ this.handleMouseEnter } onMouseOut={ this.handleMouseLeave }>
                            <Icon model={ model } />
                        </span>
                        {
                            contentShow && <span className={ contCls }>{ content }</span>
                        }
                    </div>
                    :
                    <div>
                        <span className={ iconCls }>
                            <Icon model={ model } />
                        </span>
                        <span className={ contCls }>{ content }</span>
                    </div>
                }
            </div>
        );
    }
}

IconExplain.propTypes = {
    model: PropTypes.string,
    content: PropTypes.string,
    iconClass: PropTypes.string,
    contentClass: PropTypes.string,
    hover: PropTypes.bool
};

IconExplain.defaultProps = {
    model: "tip",
    hover: false
}

export default IconExplain;
export { IconExplain }
