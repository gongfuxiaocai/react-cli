import React, { Component } from 'react';
import { getDemo } from 'Request/dataProvider';

class APPManage extends Component{
    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        // getDemo()
        // .then( ( res ) => {
        //     console.log( res );
        // } )
    }

    render() {
        return(
            <div className="page_appManage">
                This is APPManage!
            </div>
        )
    }
}

export default APPManage;