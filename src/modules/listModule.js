import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'SwiftPassUI';

class ListModule extends Component {
    static PropTypes = {
        fetch: PropTypes.func
    };

    constructor( props ) {
        super( props );

        this.state = {
            canSelect: this.props.canSelect || false,
            rowSelection: {
                type: 'checkbox',//checkbox|radio
                selectedRowKeys: [],
                onChange: this.handleChangeTableRow,
                onSelect: this.handleSelectTableRow,
                onSelectAll: this.handleSelectTableAllRow,
            },
            checkData: [],  //选中的row
            total: 0,
            currentPage: 1,
            pageSize: 10,
        }
    }

    handleChangePage = ( currentPage ) => {
        this.handleSetPage( "page", currentPage )
    };

    handleChangePageSize = ( currentPage, pageSize ) => {
        this.handleSetPage( "size", pageSize );
    };

    handleSetPage = ( flag, num ) => {
        const { rowSelection, pageSize, currentPage } = this.state;
        rowSelection.selectedRowKeys = [];
        const checkData = [];
        const pageData = { currentPage, pageSize };

        switch( flag ) {
            case "page":
                pageData.currentPage = num;
                this.setState( {
                    currentPage: num,
                    checkData,
                    rowSelection
                } );
            break;
            case "size":
                pageData.pageSize = num;
                this.setState( {
                    pageSize: num,
                    checkData,
                    rowSelection
                } );
        }

        if( !!this.props.getPageData ) {
            this.props.getPageData( pageData )
        }
    };

    handleChangeTableRow = ( selectedRowKeys, selectedRows ) => {
        if( !!this.props.getCheckData ) {
            this.props.getCheckData( selectedRows );
        }
    };

    handleSelectTableRow = ( record, selected, selectedRows ) => {

    };

    handleSelectTableAllRow = ( selected, selectedRows, changeRows ) => {

    };

    render() {
        const {
            canSelect, rowSelection,
            total, currentPage, pageSize
        } = this.state;

        const _rowSelection = canSelect ? rowSelection : null;
        const { HomeContext } = require( 'Contexts/' + this.props.context );
        return(
            <div>
                <HomeContext.Consumer>
                    {
                        ( data ) => {
                            return(
                                <Fragment>
                                    <Table
                                        style={ { border:'1px solid #eaecef' } }
                                        isLoading = { data.showLoading }
                                        thData = { data.thData }
                                        bodyData = { data.bodyData }
                                        rowSelection = { _rowSelection }
                                    />

                                    <div className="pagination_box">
                                        <Pagination
                                            className="mg_btm20"
                                            showQuickJumper={ true }
                                            showSizeChanger={ true }
                                            showTotalRecords={ true }
                                            pageSizeOptions={ [ '10', '20', '30', '40', '50' ] }
                                            current={ currentPage }
                                            pageSize={ pageSize }
                                            total={ total }
                                            onPageChange={ this.handleChangePage }
                                            onPageSizeChange={ this.handleChangePageSize }
                                        />
                                    </div>
                                </Fragment>
                            )
                        }
                    }
                </HomeContext.Consumer>
            </div>
        );
    }

}

export default ListModule;