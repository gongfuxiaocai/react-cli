import React, { Component } from 'react';
import { DatePicker } from 'SwiftPassUI';
const { TwoDatePicker } = DatePicker;

class Login extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <div className="page_login">
                <TwoDatePicker/>
            </div>
        )
    }
}

export default Login;