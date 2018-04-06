import React from 'react';
import classNames from 'classnames';
import Flex from '../flex/index';
import FlexItem from '../flex/FlexItem';
import './KanBan.css';

const KanBanList=(props)=>{
    const {className,children,height,...others}=props;
    const cls=classNames({
        'swiftBi_kanban_list':true,
        [className]:className
    });

    return(
        <Flex>
            <FlexItem className={cls} orient="vertical" {...others}>
                {children}
            </FlexItem>
        </Flex>

    )
}

export default KanBanList;
