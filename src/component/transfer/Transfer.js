import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transfer as AntdTransfer } from 'antd';
import './Transfer.less';

class Transfer extends Component{
    constructor( props ) {
        super( props );

        this.state = {
            targetKeys: this.props.targetKeys || []
        }
    }

    handleTransferChange = ( targetKeys, direction, moveKeys ) => {
        this.setState( {
            targetKeys
        } );
        if( this.props.onChange ) {
            this.props.onChange( targetKeys, direction, moveKeys )
        }
    };

    renderItem = ( item ) => {
        const customLabel = <span>{ item.title }</span> ;

        return {
            label: customLabel,        // 列表每一行显示的内容
            value: item.description,   // 鼠标hover时会显示的内容
        };
    };

    render(){
        const { className, titles, dataSource, listStyle  } = this.props;
        const { targetKeys } = this.state;

        const cls = classNames({
            'swift_transfer': true,
            [ className ]: className
        });


        return(
            <AntdTransfer
                className={ cls }
                dataSource={ dataSource }
                titles={ titles }
                targetKeys={ targetKeys }
                onChange={ this.handleTransferChange }
                render={ this.renderItem }
                listStyle={ listStyle }
            />
        )
    }
}

Transfer.defaultProps = {
    titles: ""
};

Transfer.propTypes = {
    titles: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    listStyle: PropTypes.object,
};

export default Transfer;
