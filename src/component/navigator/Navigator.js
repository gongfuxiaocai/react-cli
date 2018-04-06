import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import Icon from '../icon/index';
import { Link } from 'react-router';
import './Navigator.less';
const SubMenu = Menu.SubMenu;

export default class Navigator extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        mode:PropTypes.string,
        theme:PropTypes.string
    }
    static defaultProps = {
        data:[],
        mode:"inline",
        theme:"dark"
    }
    renderMenu = ( data ) => {
        let that = this;
        let menu = [];
        data.map( function ( item, i ){
            if( !item.subMenu ){
                let leafMenu = that.createLeafMenu( item );
                menu.push(leafMenu);
            }
            else{
                let subMenu = that.crateSubMenu( item );
                menu.push( subMenu );
            }
        })
        return menu;
    }
    //生成无子菜单的menu
    createLeafMenu=(leafData)=>{
        return(
            <Menu.Item key={ leafData.key }>
                {
                    leafData.icon &&
                    <Icon model={ leafData.icon } />
                }
                <span >{ leafData.menuName }</span>
            </Menu.Item>
        )

    }
    //生成有子菜单的subMenu
    crateSubMenu = ( subMenuData ) => {
        let that = this;
        return(
            <SubMenu
                key={ subMenuData.key }
                title={
                    <span>
                        {
                            subMenuData.icon &&
                            <Icon model={ subMenuData.icon } />
                        }
                        <span>{ subMenuData.menuName }</span>
                    </span>
                }
            >
                {
                    //递归 直到所有的子菜单都生成完毕
                    subMenuData.subMenu.map(function( item, i ){
                        if( !item.subMenu ){
                            let leafMenu = that.createLeafMenu( item );
                            return leafMenu;
                        }
                        else{
                            let subMenu = that.crateSubMenu( item );
                            return subMenu;
                        }
                    })
                }
            </SubMenu>
        )
    }

    render(){
        const { className, data, mode, theme, ...others }=this.props;
        const cls=classNames({
            'swiftpass_nav_plus':true,
            [ className ]: className
        })
        return(
            <Menu className={ cls } mode={ mode } theme={ theme }  { ...others }>
                { this.renderMenu(data) }
            </Menu>
        )
    }
}
