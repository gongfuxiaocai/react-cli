import React,{ Component, Fragment } from 'react';
import {
    Navigator,
    Popup, Toast,
    Button,
    Icon,
    Spin,
} from 'SwiftPassUI';
import Router from '../router/Router';
import commonData from 'Config/common';
const menuIcon = {
    "SYSTEM_ADMIN_INDEX": "shouye",
};
import innerRouter from 'Config/innerRouter';

//各业务页面入口文件
class Index extends Component{
    constructor(props){
        super(props);

        this.state = {
            menuData: [
                {
                    "menuName":"首页",
                    "key": "INDEX",
                    "icon": "shouye"
                },
                {
                    "menuName":"系统设置",
                    "key": "system-setup",
                    "icon": "xitong",
                    "subMenu":[
                        {
                            "menuName": "APP管理",
                            "key": "SYSTEM_SETUP_APP_MANAGE"
                        },
                        {
                            "menuName":"用户管理",
                            "key": "SYSTEM_SETUP_USER_MANAGE"
                        },
                        {
                            "menuName":"菜单管理",
                            "key": "SYSTEM_SETUP_MENU_MANAGE"
                        },
                        {
                            "menuName":"角色管理",
                            "key": "SYSTEM_SETUP_ROLE_MANAGE"
                        }
                    ]
                },
                {
                    "menuName": "字典管理",
                    "key": "dictionary-manage",
                    "icon": "xitong",
                    "subMenu": [
                        {
                            "menuName":"地区管理",
                            "key": "DICTIONARY_MANAGE_REGIONAL_MANAGE"
                        },
                        {
                            "menuName": "系统参数管理",
                            "key": "DICTIONARY_MANAGE_SYSTEM_PARAMETER_MANAGE"
                        },
                        {
                            "menuName": "系统类别管理",
                            "key": "DICTIONARY_MANAGE_SYSTEM_CLASS_MANAGE"
                        }
                    ]
                }
            ],    //左侧菜单栏数组
            selectedKeys: [],    //高亮的菜单栏 ['index']
            openKeys: [],    //展开的菜单栏 ['system-manage']
            login: true,
            loading: false,
            user: null,
            userName: "",
            headTitle: "",

            permissionCode: {},

            selectDatas: {},
            errorMessage: "",

            pageWindowShow: false,
            pageTipMsg: "",
            pagePopupFooter: "",

            //无权访问标志
            authFlag: false,
            errorFlag: false,
            childPageError: false, //子页面无权访问
        };

        this.handleLogout = this.handleLogout.bind( this );
    }

    componentDidMount() {
        this.initMenus();

        // this.props.history.replace("/index");
        // Post( commonData.baseMerchantUrl +  '/application/init' )
        //     .then( ( res ) => {
        //         if( !res.status && !!res.error && res.error.code === "common.not.login" ) {
        //             this.handleGoLogin();
        //             return false;
        //         }
        //
        //         if( !res.status && !!res.error && res.error.code === "common.auth.error" ) {
        //             this.setState( {
        //                 authFlag: true,
        //                 loading: false,
        //             } );
        //             return false;
        //         }
        //
        //         if( !res.status ) {
        //             this.setState( {
        //                 errorMessage: res.error.message,
        //                 errorFlag: true,
        //                 loading: false,
        //             } );
        //             return false;
        //         }
        //     } )
        //     .catch( ( error ) => {
        //         this.setState( {
        //             errorFlag: true,
        //             errorMessage: "服务繁忙，请稍后重试！",
        //             loading: false
        //         } );
        //     } );
    }

    getMenus = ( data, type ) => {
        if( !data ) {
            return false;
        }
        const menuUrl = [];
        return data.map( ( item, index ) => {
            const pathName = location.pathname;
            if( !!item.subs ){
                const subMenus = [];
                item.subs.forEach( ( sub, i ) => {
                    const subSurl = '/' + sub.url;
                    subMenus.push( {
                        "menuName": sub.name,
                        "key": sub.url,
                        "src": subSurl
                    } );
                    menuUrl.push( '/' + item.url + '/' + sub.url );
                } );

                return {
                    "menuName": item.name,
                    "key": item.url,
                    "icon": menuIcon[ item.code ],
                    "subMenu":subMenus
                }
            } else {
                const url = '/' + item.url;
                menuUrl.push( url );
                return {
                    "menuName": item.name,
                    "key": item.url,
                    "icon": menuIcon[ item.code ],
                    "src": url,
                }
            }
        } );
    };

    initMenus = () => {
        const selectedKeys = [];
        const openKeys = [];
        const pathname = location.pathname.substring( 1 );
        const pathnameArr = pathname.split( "/" );
        const _selectedKey = pathnameArr.join( "-" ).split( "-" ).join( "_" ).toUpperCase();

        selectedKeys.push( _selectedKey );
        openKeys.push( pathnameArr[ 0 ] );
        this.setState( {
            selectedKeys,
            openKeys
        } )
    };

    getPermission = ( data ) => {
        const { permissionCode } = this.state;

        data.forEach( ( item ) => {
            permissionCode[ item.funcCode + '#' + item.permissionCode ] = true;
        } );

        this.setState( {
            permissionCode
        } )
    };

    //菜单栏点击时触发
    handleMenuClick = ( { item, keyPath, key } )=> {
        let { openKeys } = this.state;
        if( innerRouter[ key ].openKeys.length === 0 ) {
            openKeys = [];
        }
        this.setState( {
            selectedKeys: [ `${ key }` ],
            openKeys
        }, () => {
            this.props.history.push( innerRouter[ key ].key );
        } );
    };

    handleMenuOpen = ( data )=>{
        const menuActive = [];
        menuActive.push( data[ data.length - 1 ] );
        this.setState( {
            openKeys: menuActive,
        } );
    };

    handleGoLogin = () => {
        const url = encodeURIComponent( location.origin );
        location.href = commonData.redirect + url;
    };

    handleLogout() {
        const pagePopupFooter = <div>
            <Button model="primary"  size="medium" onClick={ this.handleEnsureLogout }>确认</Button>
            <Button model="default"  size="medium" onClick={ ()=>{ this.setState({ pageWindowShow: false }) } }>取消</Button>
        </div>;
        const pageTipMsg = <div className="operation_tip">
            <div><Icon model="tip"/></div>
            <p>是否退出登陆</p>
        </div>;
        this.setState( {
            pageWindowShow: true,
            pageTipMsg,
            pagePopupFooter
        } )
    }

    //重新加载页面
    handleRefresh = () => {
        location.reload();
    };

    render(){
        const {
            login, headTitle, userName, menuData,
            selectedKeys, openKeys,
            errorFlag, authFlag, errorMessage, loading,
            childPageError, pageWindowShow
        } = this.state;
        return(
            <div className="init_scroll">
                {
                    login &&
                    <Fragment>
                        {/*左侧导航 start*/}
                        <Navigator
                            className="innovate_navigator"
                            style={ { width: 220 } }
                            data={ menuData }
                            onClick={ this.handleMenuClick }
                            onOpenChange={this.handleMenuOpen }
                            selectedKeys={ selectedKeys }
                            openKeys={ openKeys }
                            inlineIndent="15"
                        />
                        {/*左侧导航 end*/}
                        {/*各子页面内容 start*/}
                        <div className="innovate_content" key={this.props.location.pathname} >
                            <div className="innovate_dwTop">
                                {/*头部登录 start*/}
                                <div className="innovate_contTop">
                                    <div className="innovate_loginTop_lt">{ headTitle }</div>
                                    <div className="innovate_loginTop_rt">
                                        {
                                            userName &&
                                            <span>
                                                <span> 您好 { userName }</span>
                                                <span className="innovate_loginTop_line">|</span>
                                            </span>
                                        }
                                        <span className="innovate_loginTop_a" onClick={ this.handleLogout }>退出</span>
                                    </div>
                                    <div className="clear"/>
                                </div>
                                {/*头部登录 end*/}
                            </div>

                            {/*子页面 start*/}
                            <div style={{minHeight: 'calc(100vh - 60px)'}}>
                                {
                                    childPageError
                                        ?
                                        <div className="child_page_error">
                                            <Icon model="tip" />
                                            <h3>暂无权限</h3>
                                            <p>您当前无权使用此服务，请持续关注，感谢！</p>
                                        </div>
                                        :
                                        <Router childProps="deng"/>
                                }
                            </div>
                            {/*子页面 end*/}
                        </div>
                    </Fragment>
                }

                {/*加载中*/}
                {
                    loading && <div className="page_loading">
                        <Spin
                            size="large"
                            tip="加载中，请稍后..."
                        />
                    </div>
                }

                {
                    errorFlag &&
                        <div className="page_error_503">
                            <div className="page_error_content">
                                <p>{ errorMessage }</p>
                            </div>
                            <div className="error_operation">
                                <span className="error_refresh" onClick={ this.handleRefresh }>重新加载</span>
                                <span onClick={ this.handleGoLogin }>重新登陆</span>
                            </div>
                        </div>
                }

                {
                    pageWindowShow && <Popup
                        title="提示" contWidth={ 500 } mask={ false } model="partial"
                        show={ true }
                        onRequestClose={ ()=>this.setState({ pageWindowShow: false }) }>

                        <div>
                            { pageTipMsg }
                        </div>

                        <PopupFooter>
                            { pagePopupFooter }
                        </PopupFooter>
                    </Popup>
                }


                {/*无权访问页面*/}
                {
                    authFlag &&
                    <div className="auth_page">
                        <Icon model="tip" />
                        <h3>暂无权限</h3>
                        <p>您当前无权使用此服务，请持续关注，感谢！</p>
                        <div className="error_logout" onClick={ this.handleGoLogin }>重新登陆</div>
                    </div>
                }
            </div>
        )
    }
}

export default Index;