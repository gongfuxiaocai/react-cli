import React, { Component, Fragment } from 'react'
import Input from '../input/Input';
import Button from '../button/Button';
import TablePlus from '../table/TablePlus';
import Popup from '../popup/index';
import PopupFooter from '../popup/PopupFooter';
import CustomPagination  from './CustomPagination';
import Icon from '../icon/Icon';

import './searchPop.css';

class SearchPop extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            show: false,
            value: this.props.defaultValue || "",
            showName: "",   //显示的名字
            data: this.props.data || [],
            searchValue: "",

            pageSize: 10,
            currentPage: 1,
            total: 0,

            showLoading: false,
            thData: this.props.thData || [],
            bodyData: [],   //存储表格数据
            treeData: [],
            rowSelection: {
                onChange: this.handleCheckRow.bind( this ),
                type:'radio',
                selectedRowKeys: []
            },
            selectData: [], //存储选中数据

            checkCodeData: [],
            checkCode: "",
            overTimePopup: false, //超时
        };

        this.handleChangeSearchData = this.handleChangeSearchData.bind( this );
        this.handleOpenSearchPop = this.handleOpenSearchPop.bind( this );
        this.handleSearchData = this.handleSearchData.bind( this );
        this.handleClear = this.handleClear.bind( this );
        this.handleChangePage = this.handleChangePage.bind( this );
    }

    handleOpenSearchPop() {
        this.setState( {
            show: true,
            showLoading: true,
            pageSize: 10,
            currentPage: 1,
            total: 0,
            bodyData: [],
            selectData: [],
        } );

        this.getBodyData();
    }

    handleChangeSearchData( ev, name ) {
        this.setState( {
            searchValue: ev.target.value
        } );
    }

    handleSearchData() {
        this.setState( {
            currentPage: 1,
        }, () => {
            this.getBodyData();
        } );
    }

    handleEnsure() {
        const { selectData } = this.state;
        if( selectData[ 0 ] ) {
            const value = selectData[ 0 ].code;
            const showName = selectData[ 0 ].name;
            this.setState( {
                show: false,
                value,
                showName
            } );
            if( this.props.onClick ) {
                this.props.onClick ( selectData[ 0 ] );
            }
        } else {
            this.setState( {
                show: false
            } );
        }
    }

    handleClear() {
        const { rowSelection } = this.state;
        rowSelection.selectedRowKeys = [];
        this.setState( {
            value: "",
            showName: "",
            rowSelection
        } );
        this.props.onClick ( { code: "", name: "" } );
    }

    getBodyData() {
        const { searchValue } = this.state;
        if( this.props.getBodyData ) {
            this.props.getBodyData()
                .then( ( res ) => {
                    if( res ) {
                        const bodyData = [];
                        const { rowSelection, searchData } = this.state;
                        rowSelection.selectedRowKeys = [];
                        res.data.data.forEach((item, index) => {
                            const row = Object.assign({}, item);
                            row.taxRate = item.taxRate + '%';
                            row.key = index;
                            bodyData.push(row);
                        });
                        searchData.total = res.data.totalRows;
                        this.setState({
                            selectData: [],
                            searchData,
                            rowSelection,
                            bodyData
                        })
                    }
                } );
        }
    }

    handleCheckRow( selectedRowKeys, selectedRows ) {
        const { rowSelection } = this.state;
        rowSelection.selectedRowKeys = selectedRowKeys;
        this.setState( {
            selectData: selectedRows,
            rowSelection
        } );
    }

    handleChangePage( currentPage ) {
        const { searchData }  = this.state;
        searchData.currentPage = currentPage;
        this.getBodyData( searchData );
    }

    render() {
        const {
            show, showName, rowSelection,
            showLoading, thData, bodyData,
            searchValue,
            currentPage, total
        } = this.state;
        const { width, readOnly, title, label, placeholderWrap, placeholderInner, searchKey, maxLength } = this.props;
        const style = {
            display: 'inline-block',
            verticalAlign: 'middle',
            width,
            height: '32px',
            position: 'relative',
            border: '1px solid #D9DADC',
            backgroundColor: '#fff'
        };
        return (
            <Fragment>
                <div className="searchPop_search_box" style={ style }>
                    <Input
                        name=""
                        placeholder={ placeholderWrap }
                        size="medium"
                        width={ width - 32 }
                        value={ showName }
                        readOnly={ true }
                        onClick={ readOnly ? null : this.handleOpenSearchPop }
                    />
                    {
                        showName && !readOnly &&
                        <span onClick={ this.handleClear } className="searchPop_search_delete">×</span>
                    }
                    <span className="searchPop_search_btn" onClick={ readOnly ? null : this.handleOpenSearchPop }>
                        <Icon model="search"/>
                    </span>
                </div>
                {
                    show && <div>
                        <Popup
                            title={ title } contWidth={ 600 } mask={ true } model="full"
                            show={ true }
                            onRequestClose={ () => this.setState( { show: false } ) }
                            syncMask={ false }
                        >

                            <div className="searchPop_content_box">
                                <div className="searchPop_row">
                                    {
                                        !!label &&
                                        <span className="searchPop_content_label">{ label }</span>
                                    }
                                    <span className="searchPop_content_input margin-right_28">
                                        <Input
                                            placeholder={ placeholderInner }
                                            name={ searchKey }
                                            size="medium"
                                            width={ 200 }
                                            onChange={ this.handleChangeSearchData }
                                            value={ searchValue }
                                            maxLength={ maxLength }
                                        />
                                    </span>
                                    <span>
                                        <Button model="primary" onClick={ this.handleSearchData.bind( this ) }>搜索</Button>
                                    </span>
                                </div>
                                <div className="searchPop_content_table_box">
                                    <TablePlus
                                        style={ { border:'1px solid #eaecef' } }
                                        isLoading = { showLoading }
                                        thData = { thData }
                                        bodyData = { bodyData }
                                        rowSelection={ rowSelection }
                                    />
                                    <CustomPagination
                                        pageSize={ 10 }
                                        total={ total }
                                        currentPage={ currentPage }
                                        onPageChange={ this.handleChangePage }
                                    />
                                </div>
                            </div>

                            <PopupFooter>
                                <Button model="primary" onClick={ this.handleEnsure.bind( this ) }>确定</Button>
                                <Button model="default" onClick={ () => this.setState( { show: false } ) }>取消</Button>
                            </PopupFooter>
                        </Popup>

                    </div>
                }
            </Fragment>
        )
    }
}

SearchPop.defaultProps = {
    width: 160,
    readOnly: false,
    placeholderWrap: "请选择...",
    placeholderInner: "请输入搜索内容..."
};

export default SearchPop;