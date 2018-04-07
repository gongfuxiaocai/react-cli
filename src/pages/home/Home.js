import React, { Component, Fragment } from 'react';
import { SearchPop } from 'SwiftPassUI';
import { HomeContext } from 'Contexts/home_context';

class Home extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            listData: 1,
        }
    }

    componentDidMount() {}

    getBodyData = ( listData ) => {
        this.setState( {
            listData
        } );

        //请求数据

    };

    handleClickTitle = () => {
        this.props.history.replace("/");
    };
    
    render() {
        const { listData } = this.state;

        return(
            <div className="index_page" style={{minHeight: 'calc(100vh - 60px)'}}>
                <h1 onClick={ this.handleClickTitle }>HOME</h1>
                <SearchPop
                    title="渠道查询"
                    placeholder="请输入查询内容。。。"
                />
                <HomeContext.Provider value={ { listData, getBodyData: this.getBodyData } }>

                </HomeContext.Provider>
            </div>
        )
    }
}

export default Home;