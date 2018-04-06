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

    handleCheckRow = ( checkedRows ) => {

    };

    render() {
        const {
            searchData,
            popShow, popTitle, popContent, popFooter, toastShow, toastContent
        } = this.state;
        const { list } = this.props.dataSource;
        const { request, bodyData } = list;
        return(
            <div>
                <div className="page_search">
                    <SearchModule

                    />
                </div>

                <div className="page_options">

                </div>

                <div className="page_content">
                    <ListModule
                        searchData={ searchData }
                        fetch={ request }
                        bodyData={ bodyData }
                        getCheckData={ this.handleCheckRow }
                    />
                </div>

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