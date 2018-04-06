import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './PagePanel.css';

const PagePanel = (props) => {
    const {className,children,title,...others}=props;

    const cls=classNames({
        ['innovate_page_panel']:true,
        [className]: className
    })

    return(
        <div className={cls} {...others}>
            {
                title &&
                <h1 className="page_panel_title">{title}</h1>
            }


            <div>{children}</div>
        </div>
    )
}

PagePanel.propTypes = {
    title: PropTypes.string
}

PagePanel.defaultProps = {

}

export default PagePanel;
