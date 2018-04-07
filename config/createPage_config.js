const dataSource = {
    //交互接口
    search: {
        list: [
            {
                label: "",
                type: "",   //input, select, date, doubleDate, upload, transfer
                key: "",
                url: "",
                data: []
            }
        ],
        searchConfig: {
            labelWidth: "",
            contentWidth: ""
        },
    },
    add: {
        request: "",
        formData: [
            {
                label: "",
                type: "",
                key: "",
                url: "",
                data: [],
                disabled: false,
                require: false,
            }
        ],
        addConfig: {
            labelWidth: "",
            contentWidth: ""
        },
    },
    modify: {
        request: "",
        formData: [
            {
                label: "",
                type: "",
                key: "",
                url: "",
                data: [],
                disabled: false,
                require: false,
            }
        ],
        modifyConfig: {
            labelWidth: "",
            contentWidth: ""
        },
    },
    detail: {
        request: "",
        formData: [
            {
                label: "",
                type: "",
                key: "",
                url: "",
                data: [],
                disabled: true,
                require: false,
            }
        ],
        detailConfig: {
            labelWidth: "",
            contentWidth: ""
        },
    },
    delete: {
        request: "",
    }
};