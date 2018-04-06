const innerRouter = {
    /* 首页 */
    INDEX: {
        key: "/index",
        openKeys: []
    },

    /* 系统设置 */
    SYSTEM_SETUP_APP_MANAGE: {
        key: "/system-setup/app-manage",
        openKeys: [ "system-setup" ]
    },
    SYSTEM_SETUP_USER_MANAGE: {
        key: "/system-setup/user-manage",
        openKeys: [ "system-setup" ]
    },
    SYSTEM_SETUP_MENU_MANAGE: {
        key: "/system-setup/menu-manage",
        openKeys: [ "system-setup" ]
    },
    SYSTEM_SETUP_ROLE_MANAGE: {
        key: "/system-setup/role-manage",
        openKeys: [ "system-setup" ]
    },

    /* 字典管理 */
    DICTIONARY_MANAGE_REGIONAL_MANAGE: {
        key: "/dictionary-manage/regional-manage",
        openKeys: [ "dictionary-manage" ]
    },
    DICTIONARY_MANAGE_SYSTEM_PARAMETER_MANAGE: {
        key: "/dictionary-manage/system-parameter-manage",
        openKeys: [ "dictionary-manage" ]
    },
    DICTIONARY_MANAGE_SYSTEM_CLASS_MANAGE: {
        key: "/dictionary-manage/system-class-manage",
        openKeys: [ "dictionary-manage" ]
    }
};

export default innerRouter;