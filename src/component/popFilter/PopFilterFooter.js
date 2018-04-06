import React,{Component} from 'react';
import {Button} from '../button/index';
import {Flex,FlexItem} from '../flex/index';
import {PanelFooter} from '../panel/index';
import PopFiltedItem from './PopFiltedItem';
import classNames from 'classnames';
import './PopFilterFooter.css';

export default class PopFilterFooter extends React.Component{

    render(){
        const {className,children,...others}=this.props;
        return(

            <PanelFooter>
                <Flex>
                    <div className="filter_left">已选3项</div>
                    <FlexItem className="pop_filter_filted">
                        <PopFiltedItem>高陌（北京）科技有限公司1</PopFiltedItem>
                        <PopFiltedItem>高陌（北京）2</PopFiltedItem>
                        <PopFiltedItem>高陌（北京）3</PopFiltedItem>

                    </FlexItem>
                    <Button model="primary" size="small">确认</Button>
                </Flex>
            </PanelFooter>


        )
    }
}
