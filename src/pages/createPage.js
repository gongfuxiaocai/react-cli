import React, { Component } from 'react';
import {
    Spin,
    Button, Input, Select, OneDatePicker, TwoDatePicker, SearchPop,
    Uploader, Transfer,
    FromatNum,
    Popup, Toast, Icon,
} from 'SwiftPassUI';

import ListModule  from '../modules/listModule';
import SearchModule  from '../modules/searchModule';

import { getDemo } from 'Request/dataProvider';

class CreatePage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            searchData: {},
            checkData: [],

            popShow: false,
            popTitle: "",
            popContent: null,
            popFooter: null,

            toastShow: false,
            toastContent: null,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    handleChangeBodyData = ( getBodyData, data ) => {
        const { searchData } = this.state;
        const requestData = Object.assign( {}, searchData, data );

        this.setState( {
            searchData: requestData
        } );

        getBodyData( requestData );
    };


    render() {
        const {
            popShow, popTitle, popContent, popFooter, toastShow, toastContent
        } = this.state;
        const { canSelect, context, search } = this.props;

        const { Context } = require( 'Contexts/' + this.props.context );

        return(
            <div>
                <Context.Consumer>
                    <div className="page_search">
                        <SearchModule
                            searchData={ search }
                            getSearchData={ this.handleChangeBodyData.bind( this, data.getBodyData ) }
                        />
                    </div>

                    <div className="page_options">

                    </div>

                    <div className="page_content">
                        <ListModule
                            canSelect={ canSelect }
                            context={ context }
                            getPageData={ this.handleChangeBodyData.bind( this, data.getBodyData ) }
                            getCheckData={ this.handleCheckRow }
                        />
                    </div>
                </Context.Consumer>

                {
                    popShow && <Popup
                        title={ popTitle } contWidth={ 1110 } mask={ true } model="full"
                        show={ true }
                        onRequestClose={ () => this.setState( { windowShow: false } ) }
                        syncMask={ false }
                    >

                        <div style={ { padding: '12px' } } >{ popContent }</div>

                        <Popup.PopupFooter>
                            { popFooter }
                        </Popup.PopupFooter>
                    </Popup>
                }

                {
                    toastShow &&
                    <Toast
                        title="提示"
                        msg={ toastContent }
                        show={ true }
                        model="fail"
                        onRequestClose={ () => this.setState( { toastShow: false } ) }
                    />
                }
            </div>
        )
    }

}

export default CreatePage;