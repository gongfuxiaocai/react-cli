import React,{Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/default.css';//加载公用样式
import './css/index.css';//加载模块样式
import Index from './pages/Index';


// IE不支持promise 以下代码必须有 否则按需加载文件会报错
if (!window.Promise) {
  window.Promise = Promise;
}
//IE promise兼容 end
import AsyncComponent from "./router/AsyncComponent";
const NotFound = AsyncComponent(() => import( /* webpackChunkName: "NotFound" */ "./pages/error/NotFound" ) );

render(
    <BrowserRouter>
        <Route path="/" component={ Index }/>
    </BrowserRouter>
    , document.getElementById('root')
);
