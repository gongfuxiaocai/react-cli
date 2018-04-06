import React,{Component} from 'react';
import classNames from 'classnames';
import './TextArea.less';
import PropTypes from 'prop-types';

export default class TextArea extends React.Component{
    static propTypes = {
        showCounter: PropTypes.bool,
        maxLength: PropTypes.number,
        defaultValue: PropTypes.string,
        onChange:PropTypes.func,
        width:PropTypes.number
    };
    static defaultProps = {
        showCounter: true,
        value: undefined
    };
    constructor(props){
        super(props);

        this.state={
            textCounter:props.value ? props.value.length : 0,
            value:props.value
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            textCounter:nextProps.value ? nextProps.value.length : 0,
            value:nextProps.value,
        })
    }

    handleChange=(e)=>{
        this.setState({
            textCounter: e.target.value.length,
            value:e.target.value
        });
        if(this.props.onChange) this.props.onChange(e);

    }

    render(){
        const { className, showCounter, maxlength, onChange, value, width, ...others } = this.props;
        const cls=classNames( {
            'swiftBI_textarea': true,
            [className]: className
        } );
        let styleWidth={
            width:width+'px'
        }
        return (
            <div className="swiftBI_textarea_wrap"  style={styleWidth}>
                <textarea 
                    className={ cls }
                    maxLength={maxlength}
                    onChange={this.handleChange}
                    value={this.state.value}
                    {...others}
                />
                {
                    showCounter==true  &&
                    <div className="swiftBI_textarea_counter">
                        <span>{this.state.textCounter}</span>{maxlength ? '/' + maxlength : false}
                    </div>
                }

            </div>

        )
    }

}
