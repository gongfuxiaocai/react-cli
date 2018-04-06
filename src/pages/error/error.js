import React, { Component } from 'react';
import { Post } from 'Components/request/index';
import commonData from 'config/common';

class Error extends Component {

    handleEnsureLogout() {
        Post(commonData.baseMerchantUrl + '/application/logout')
            .then( ( res ) => {
                sessionStorage.clear();
                const url = encodeURIComponent( location.origin );
                location.href = commonData.redirect + url;
            } );
    }

    render() {
        return(
            <div>
                <div className="page_error_404">
                    <div className="page_error_content">
                        <h3>404</h3>
                        <p>访问的地址不存在，请核地址！</p>
                        <div className="error_logout" onClick={ this.handleEnsureLogout }>重新登陆</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error;