const dataSource = {
    //交互接口
    list: {
        request: "",
        search: [
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
        columns: [
            { title: "", dataKey: "", width: "" },
        ],
        selectRow: true,
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