import React, { Component } from 'react';
// import { HomeContext } from 'Contexts/home_context';

class HomeTest extends Component {
    constructor( props ) {
        super( props );
    }

    handleClickTitle = ( callback, data ) => {
        if( !!callback ) {
            callback( ++data )
        }
    };

    render() {
        const { HomeContext } = require( 'Contexts/' + this.props.context );

        return(
            <HomeContext.Consumer>
                {
                    ( data ) => {
                        if( !!data ) {
                            return(
                                <div className="index_page" style={ { minHeight: 'calc(100vh - 60px)' } }>
                                    <h1 key="" onClick={ this.handleClickTitle.bind( this, data.getBodyData ,data.listData ) }>{ !!data.listData ? data.listData : "0" }</h1>
                                </div>
                            )
                        }
                    }
                }
            </HomeContext.Consumer>
        )
    }
}

export default HomeTest;