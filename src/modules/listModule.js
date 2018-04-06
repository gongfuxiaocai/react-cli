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
            searchData: this.props.searchData || {},
            url: this.props.fetch,

            showLoading: false,
            thData: this.props.thData || [],
            bodyData: this.props.bodyData || [],
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

    componentDidMound() {
        this.getBodyData();
    }

    componentWillReceiveProps( nextProps ) {
        if( nextProps.searchData !== this.state.searchData ) {
            this.setState( {
                searchData: nextProps.searchData,
                currentPage: 1,
            }, () => {
                this.getBodyData();
            } )
        }
    }

    getBodyData( callback ) {
        const { searchData, fetch, pageSize, currentPage } = this.state;
        const requestData = Object.assign( {}, searchData );
        requestData.pageSize = pageSize;
        requestData.currentPage = currentPage;

        if( !!callback ) {
            callback( searchData )
        }
    }

    handleChangePage = ( contextGetBodyData, currentPage, pageSize ) => {
        const { rowSelection } = this.state;
        rowSelection.selectedRowKeys = [];
        const checkData = [];

        this.setState( {
            currentPage,
            checkData,
            rowSelection
        }, () => {
            this.getBodyData( contextGetBodyData );
        } );
    };

    handleChangePageSize = ( contextGetBodyData, currentPage, pageSize ) => {
        const { rowSelection } = this.state;
        rowSelection.selectedRowKeys = [];
        const checkData = [];

        this.setState( {
            pageSize,
            checkData,
            rowSelection
        }, () => {
            this.getBodyData( contextGetBodyData );
        } )
    };

    handleChangeTableRow = ( selectedRowKeys, selectedRows ) => {
        if( this.props.getCheckData ) {
            this.props.getCheckData( selectedRows );
        }
    };

    handleSelectTableRow = ( record, selected, selectedRows ) => {

    };

    handleSelectTableAllRow = ( selected, selectedRows, changeRows ) => {

    };

    render() {
        const {
            showLoading, thData, bodyData, canSelect, rowSelection,
            total, currentPage, pageSize
        } = this.state;

        const _rowSelection = canSelect ? rowSelection : null;

        return(
            <div>
                <HomeContext.Consumer>
                    {
                        ( data ) => {
                            return(
                                <Fragment>
                                    <Table
                                        style={ { border:'1px solid #eaecef' } }
                                        isLoading = { showLoading }
                                        thData = { thData }
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
                                            onPageChange={ this.handleChangePage.bind( this, data.getBodyData ) }
                                            onPageSizeChange={ this.handleChangePageSize.bind( this, data.getBodyData ) }
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