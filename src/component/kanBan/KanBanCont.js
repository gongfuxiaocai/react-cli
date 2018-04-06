import React from 'react';
import classNames from 'classnames';
import Flex from '../flex/index';
import PanelBody from '../panel/PanelBody';
import './KanBan.css';

const KanBanCont=(props)=>{
    const {className,children,size,...others}=props;
    const cls=classNames({
        'swiftBi_kanban_cont':true,
        [className]:className
    });
    let contHeight='';
    switch(size){
        case 'small':contHeight='140px';break;
        case 'medium':contHeight='160px';break;
        case 'large':contHeight='180px';break;
        default:contHeight='140px';
    }

    let styleHeight={
        height:contHeight
    }
    return(
        <PanelBody className={cls} {...others} >
            <Flex className="swiftBi_kanban_cont_inner" style={styleHeight} equal={true}>
                {children}
            </Flex>
        </PanelBody>
    )
}

export default KanBanCont;
