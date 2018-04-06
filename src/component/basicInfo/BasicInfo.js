import React from 'react';
import classNames from 'classnames';
import './BasicInfo.css';

class BasicInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            basicInfoData: this.props.basicInfoData   
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            basicInfoData: nextProps.basicInfoData
        });  
    }

    handleEdit = (data) => {
        let curData = data;    
    }

    getListData = () => {
        let tempDada = this.state.basicInfoData;
        let num = tempDada.length;
        if (num === 0) {
            return;
        }
        let isOdd = num % 2 ? true : false;
        let arr = tempDada.map((data, index) => {
            if (isOdd) {
                var cls = index === (num - 1) ? 'no_border' : '';
            } else {
                var cls = index === (num - 1) || index === (num - 2) ? 'no_border' : '';
            }
            return (
                <li key={index} className={cls}>
                    <div className="item">{data.item}</div>
                    <div className="text">{data.text}</div>
                </li>
            )           
        });
        return arr;
    }

    render(){
        const {className,children,basicInfoData,...others} = this.props;
        const cls=classNames({
            'basic_info': true,
            'clearfix2': true,
            [className]: className
        });

        return (
            <ul className={cls} {...others}>
                {this.getListData()}
            </ul>
        )
    }
}

export default BasicInfo;