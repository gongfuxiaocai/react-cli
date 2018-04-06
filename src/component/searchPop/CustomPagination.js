import React,{ Component } from 'react';
import classNames from 'classnames';
import './customPagination.css';

class CustomPagination extends Component{
    constructor( props ){
        super( props );
        this.state={
            total: this.props.total || 0,
            currentPage: this.props.currentPage || 1,
            pageSize: this.props.pageSize || 1,
            isPrevDisable: this.props.currentPage === 1 ? true : false, //上一页禁用
            isNextDisable: true,
            _pageAmount: 1,
        }
    }

    componentDidMount() {
        const { total, pageSize } = this.state;
        const _pageAmount = Math.ceil( total / pageSize );

        if( _pageAmount > 1 ) {
            this.setState( {
                isNextDisable: false,
                _pageAmount
            } );
        }
    }

    componentWillReceiveProps( nextProps ) {
        if( nextProps.currentPage !== this.state.currentPage ) {
            this.calculatePageAmount( nextProps.total, nextProps.pageSize, nextProps.currentPage );
            if( nextProps.currentPage === 1 ) {
                this.setState( {
                    isPrevDisable: true,
                    currentPage: nextProps.currentPage
                } );
            } else {
                this.setState( {
                    isPrevDisable: false,
                    currentPage: nextProps.currentPage
                } );
            }
        }

        if( nextProps.total !== this.state.total ){
            const { pageSize } = this.state;
            this.calculatePageAmount( nextProps.total, pageSize, nextProps.currentPage );
        }
    }

    calculatePageAmount = ( total, pageSize, currentPage ) => {
        const _pageAmount = Math.ceil( total / pageSize );

        if( _pageAmount > 1 && currentPage < _pageAmount ) {
            this.setState( {
                isNextDisable: false,
                _pageAmount
            } );
        } else {
            this.setState( {
                isNextDisable: true,
                _pageAmount: 1,
            } );
        }
    };

    //用户点击上一页下一页时
    handlePageChange = ( type ) => {
        let { currentPage, _pageAmount } = this.state;
        switch( type ){
            case 'prev':

                if( currentPage > 1 ){
                    const newPage = currentPage - 1;
                    let isNextDisable = false;
                    if( newPage >= _pageAmount ) {
                        isNextDisable = true
                    }
                    this.setState(
                        {
                            currentPage: newPage,
                            isPrevDisable: newPage <= 1 ? true : false, //上一页禁用
                            isNextDisable
                        },
                        () => {
                            this.props.onPageChange ? this.props.onPageChange( this.state.currentPage ) : null;
                        }
                    );
                }
                break;

            case 'next':

                if( currentPage < _pageAmount ){
                    let newPage = currentPage + 1;
                    let isNextDisable = false;
                    if( newPage >= _pageAmount ) {
                        isNextDisable = true;
                    }
                    this.setState(
                        {
                            currentPage: newPage,
                            isPrevDisable: false,
                            isNextDisable
                        },
                        () => {
                            this.props.onPageChange ? this.props.onPageChange( this.state.currentPage ) : null;
                        }
                    );
                }
                break;
        }
    };


    render(){
        const { isPrevDisable, isNextDisable }=this.state;

        let prevBtnStyle = classNames( {
            "custom_pagination ": true,
            "prev": true,
            "disable": isPrevDisable
        } );
        let nextBtnStyle = classNames( {
            "custom_pagination ": true,
            "next": true,
            "disable": isNextDisable
        } );

        return(
            <div className="custom_pagination_box">
                <div className="float_right">
                    <div className="custom_pagination">
                        <span title="上一页" className={ prevBtnStyle } onClick={ this.handlePageChange.bind( this, 'prev' ) }/>
                        <span title="下一页" className={ nextBtnStyle } onClick={ this.handlePageChange.bind( this, 'next' ) }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomPagination