import React,{Component} from 'react';
import classNames from 'classnames';
import './RoleItemBox.less';

export default class RoleItemBox extends Component {

  render() {
    const {className,avatar,roleName,accountNum,describe,footer,...others}=this.props;
    const cls=classNames({
        'swift_role_box':true,
        [className]:className
    });

    return (
        <div className={cls} {...others}>
            <div className="role_box_top">
                <div className="role_avatar">{avatar}</div>
                <h2>{roleName}</h2>
            </div>

            <div className="role_box_cont">
                <p>{describe}</p>
                {
                    accountNum &&
                    <p>该角色目前已配置了<span className="account_num">{accountNum}</span>个账号</p>
                }

            </div>

            <div className="role_box_footer">
                {footer}
            </div>
        </div>
    );
  }
}
