const router={
    path:'/',
    //定义 网站根目录 指向的是 登录页
    getComponent(nextState,callback){
        require.ensure([],require=>{
            callback(null,require('../pages/pages'));
        }, 'pages');
    },
    indexRoute:{
        getComponent(nextState,callback){
            require.ensure([],require=>{
                callback(null,require('../pages/home/home'));
            },'pages');
        }
    },
    childRoutes:[
        //pages 各业务页面入口文件
        {
            path: '/home',
            title: '首页',
            getComponent(nextState,callback){
                require.ensure([],require=>{
                    callback(null,require('../pages/home/home'));
                },'index');
            }
        },

        //404页面
        {
            path: '/error',
            title: 'error',
            getComponent(nextState,callback){
                require.ensure([],require=>{
                    callback(null,require('../pages/error/error'));
                },'error');
            }
        },
        {
            path:'*',
            onEnter: (_, replace) => replace("/error")
        },

        //pages 各业务页面入口文件 end
    ],
};

export default router;
