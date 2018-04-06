import React, { Component, Fragment } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

class OneDatePicker extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            queryStartTime: null,
            queryEndTime: null,
            endOpen: false,
            selectedDate: {}
        }
    }

    /* 关于日历的事件 */
    handleStartChange = ( queryStartTime, value ) => {
        const selectedDate = this.state.selectedDate;
        selectedDate.queryStartTime = value;
        this.setState( {
            queryStartTime,
            selectedDate
        } );

        if( this.props.getStartDate ) {
            this.props.getStartDate( value );
        }
    };

    handleOpenStartChange = ( open ) => {
        if ( !open ) {
            this.setState({ endOpen: true });
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
        const selectedDate = this.state.selectedDate;
        selectedDate.queryEndTime = value;

        this.setState( {
            queryEndTime,
            selectedDate
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
            </Fragment>
        );
    }
}

export default OneDatePicker;