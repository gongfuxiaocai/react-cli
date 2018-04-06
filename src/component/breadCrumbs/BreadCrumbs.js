import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Flex from '../flex/index';
import './BreadCrumbs.less';

export default class BreadCrumbs extends Component{
    static propTypes={
        data:PropTypes.array.isRequired
    };
    renderList=(data)=>{
        let list=[];
        data.map(function(item,i){
            let listCls=classNames({
                'crumb_item':true,
                [item.status]:true
            });
            list.push(<FlexItem key={i} className={listCls}>{item.text}</FlexItem>)
        })
        return list;

    }
    render(){
        const {className,data,...others}=this.props;

        const cls=classNames({
            'swiftBI_bread_crumbs':true,
            [className]:className
        });

        return(
            <Flex className={cls} {...others} equal={true}>
                {
                    this.renderList(data)
                }
            </Flex>

        )
    }


}
