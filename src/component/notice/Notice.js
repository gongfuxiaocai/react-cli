import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/index';
import Button from '../button/index';

import './Notice.less';

export default class Notice extends React.Component {
    static propTypes = {
        onClickMore: PropTypes.func,
        data:PropTypes.any.isRequired
    };

    static defaultProps = {
        //transparent: false
    };

    handleMore=()=>{

        this.props.onClickMore?this.props.onClickMore():null;
    }
    renderNoticeData=(data)=>{
        return data;
    }

    render() {
        const {className,onClickMore,data,...others} = this.props;
        const cls = classNames({
            'innovate_notice': true,

            [className]: className
        });

        return (
            <div className={cls} {...others}>

                    <div className="notice_cell notice_icon"><Icon model="voice"/><span>最新系统公告 : </span></div>
                    <div className="notice_cell notice_cont" ref="noticeCont">{this.renderNoticeData(data)}</div>
                    <div className="notice_cell notice_btn"><Button model="a" onClick={this.handleMore}>更多>></Button></div>

            </div>
        );
    }
}
