import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DataBox from './DataBox';
import './RealTimeData.css';

class RealTimeData extends React.Component{
    static propTypes={
        showData: PropTypes.array.isRequired
    }

    constructor(props){
        super(props);
        this.state={
            showData: this.props.showData,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            showData: nextProps.showData
        });  
    }

    getListData = () => {
        let tempDada = this.state.showData;
        return tempDada.map((data, index) => {
            return (
                <div className={`realtime_data ${data.theme}`} key={index}>
                    <div className="ico"/>
                    <div className="txt">
                        <div className="item_title">{data.text}</div>
                        <DataBox data={data.value} animate={data.animate} />
                        {
                            data.compare &&
                            <div className="item_compare">
                                <span className="s1">{data.compare[0].item} <b>{`${data.compare[0].percent}%`}</b></span><span>{data.compare[1].item} <b>{`${data.compare[1].percent}%`}</b></span>
                            </div>
                        }
                    </div>
                </div>
            )           
        });
    }

    render(){
        const {className,children,showData,intl,...others} = this.props;

        const cls=classNames({
            'realtime_body': true,
            [className]: true
        });

        return(
            <div className={cls} {...others}>
              {this.getListData()}
            </div>
        )
    }
}

export default RealTimeData;