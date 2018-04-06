import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Mask from '../mask/index';
import './LoadingAnimation.css';

export default class LoadingAnimation extends Component{
    static defaultProps={
        model:'full',
        mask:true,
        isLoad:true
    };
    static propTypes={
        model:PropTypes.string,
        mask:PropTypes.bool,
        isLoad:PropTypes.bool
    };
    constructor(props){
        super(props);
        this.state={
            isLoad:this.props.isLoad     //是否显示弹窗
        }
    }

    componentWillReceiveProps(nextProps){

        this.setState({
            isLoad:nextProps.isLoad
        })

    }

    render(){
        const {className,icon,model,mask,isLoad,...others}=this.props;

        const cls=classNames({
            'swiftBI_loading':true,
            [className]: className
        })
        return(
            <div>
                {
                    mask &&
                    <Mask className="searchbar_mask" transparent={true} model={model} style={{display: this.state.isLoad ? 'block' : 'none'}}/>
                }
                <div className="loading-wrap">
                    <div className="spinner" style={{display: this.state.isLoad ? 'block' : 'none'}}>
                        <div className="dot1"/>
                        <div className="dot2"/>
                    </div>
                </div>
            </div>
        )
    }
}
