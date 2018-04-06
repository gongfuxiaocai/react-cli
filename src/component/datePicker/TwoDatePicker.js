import React, { Component, Fragment } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

class TwoDatePicker extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            queryStartTime: null,
            queryEndTime: null,
            endOpen: false
        }
    }

    /* 关于日历的事件 */
    handleStartChange = ( queryStartTime, value ) => {
        this.setState( {
            queryStartTime,
        } );

        if( this.props.getStartDate ) {
            this.props.getStartDate( value );
        }
    };

    handleOpenStartChange = ( open ) => {
        if ( !open ) {
            this.setState( { endOpen: true } );
        }
    };

    disabledEndDate = ( queryEndTime ) => {
        const queryStartTime = this.state.queryStartTime;
        if ( !queryEndTime || !queryStartTime ) {
            return false;
        }
        return queryEndTime.valueOf() <= queryStartTime.valueOf();
    };

    handleEndChange = ( queryEndTime, value ) => {
        this.setState( {
            queryEndTime,
        } );

        if( this.props.getEndDate ) {
            this.props.getEndDate( value );
        }
    };

    handleOpenEndChange = ( open ) => {
        this.setState({ endOpen: open });
    };

    render() {
        const { queryStartTime, endOpen, queryEndTime } = this.state;
        return(
            <Fragment>
                <span className="antDatePicker">
                    <DatePicker
                        showTime={ { defaultValue: moment('00:00:00', 'HH:mm:ss') } }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始日期"
                        value={ queryStartTime }
                        onChange={ this.handleStartChange }
                        onOpenChange={ this.handleOpenStartChange }
                    />
                </span>

                <span style={{margin:'0 10px'}}>至</span>

                <span className="antDatePicker">
                    <DatePicker
                        disabledDate={ this.disabledEndDate }
                        showTime={ { defaultValue: moment('23:59:59', 'HH:mm:ss') } }
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择结束日期"
                        open={ endOpen }
                        value={ queryEndTime }
                        onChange={ this.handleEndChange }
                        onOpenChange={ this.handleOpenEndChange }
                    />
                </span>
            </Fragment>
        );
    }
}

export default TwoDatePicker;