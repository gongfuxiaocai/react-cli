import React from 'react';
import classNames from 'classnames';
import LayoutTable from '../layoutTable/index';
import LayoutTableCell from '../layoutTable/LayoutTableCell';
import './ToastLiteItem.less';

export default class ToastItem extends React.Component{

    render(){
        const {className,message,icon,...others}=this.props;
        const cls=classNames({
            'swift_toast_lite':true,
            [className]:className
        });
        return(
            <LayoutTable className={cls} vAlign={true} hAlign={true} {...others} >
                <LayoutTableCell>
                    <div className="swift_toast_lite_item">{message}</div>
                </LayoutTableCell>

            </LayoutTable>
        )
    }

}
