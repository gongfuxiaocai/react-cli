import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import AsyncComponent from "./AsyncComponent";

const Home = AsyncComponent(() => import( /* webpackChunkName: "Home" */ "../pages/home/Home" ) );
const Login = AsyncComponent(() => import( /* webpackChunkName: "Login" */ "../pages/login/Login" ) );

/* 系统设置 start */
const APPManage = AsyncComponent(() => import( /* webpackChunkName: "APPManage" */ "../pages/systemSetup/APPManage" ) );
const UserManage = AsyncComponent(() => import( /* webpackChunkName: "UserManage" */ "../pages/systemSetup/UserManage" ) );
const MenuManage = AsyncComponent(() => import( /* webpackChunkName: "MenuManage" */ "../pages/systemSetup/MenuManage" ) );
const RoleManage = AsyncComponent(() => import( /* webpackChunkName: "RoleManage" */ "../pages/systemSetup/RoleManage" ) );
/* 系统设置 end */

/* 字典管理 start */
const RegionalManage = AsyncComponent(() => import( /* webpackChunkName: "RegionalManage" */ "../pages/dictionaryManage/RegionalManage" ) );
const SystemParameterManage = AsyncComponent(() => import( /* webpackChunkName: "SystemParameterManage" */ "../pages/dictionaryManage/SystemParameterManage" ) );
const SystemClassManage = AsyncComponent(() => import( /* webpackChunkName: "SystemClassManage" */ "../pages/dictionaryManage/SystemClassManage" ) );
/* 字典管理 end */

/* 错误页面 start */
const NotFound = AsyncComponent(() => import( /* webpackChunkName: "NotFound" */ "../pages/error/NotFound" ) );
/* 错误页面 end */

const Router =  ( { childProps } ) => {
    return(
        <Switch>
            {/* 登录 */}
            <Route path="/" exact component={ Login } props={ childProps }/>

            {/* 首页 */}
            <Route path="/index" exact component={ Home } props={ childProps }/>

            {/* App管理 */}
            <Route path="/system-setup/app-manage" exact component={ APPManage } props={ childProps }/>

            {/* 菜单管理 */}
            <Route path="/system-setup/menu-manage" exact component={ MenuManage } props={ childProps }/>

            {/* 角色管理 */}
            <Route path="/system-setup/role-manage" exact component={ RoleManage } props={ childProps }/>

            {/* 用户管理 */}
            <Route path="/system-setup/user-manage" exact component={ UserManage } props={ childProps }/>

            {/* 地区管理 */}
            <Route path="/dictionary-manage/regional-manage" exact component={ RegionalManage } props={ childProps }/>

            {/* 系统参数管理 */}
            <Route path="/dictionary-manage/system-parameter-manage" exact component={ SystemParameterManage } props={ childProps }/>

            {/* 系统分类管理 */}
            <Route path="/dictionary-manage/system-class-manage" exact component={ SystemClassManage } props={ childProps }/>

            {/* 404 */}
            {/*<Route component={ NotFound } />*/}
        </Switch>
    );
};

export default Router;
