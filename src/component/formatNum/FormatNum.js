import React, { Component } from 'react';
import classNames from 'classnames';
import NP from 'number-precision'
export default class FormatNum extends Component{

     //格式化数字3个一个逗号
    formatNumber(_num, type, length){
        let num = _num.toString();
        if( type === "default" ) {
            if( num.length > length ) {
                num = parseFloat( num ).toFixed( length );
            }
        }
        if( !isNaN( parseFloat( num ) ) ){
            //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
            num = num.toString().replace(/\$|,/g,'');

            //如果存在小数点，则获取数字的小数部分
            let cents = num.indexOf(".")> 0 ? num.substring(num.indexOf(".")) : '';
            cents = cents.length > 0 ? cents : '' ;
            //获取数字的整数数部分
            num = num.indexOf(".") > 0 ? num.substring(0,(num.indexOf("."))) : num ;

            if( this.props.status !== "init" ) {
                if( cents.length === 0 && !isNaN( parseInt( num ) ) ) {
                    cents = cents + '.00';
                } else if( cents.length === 2 ) {
                    cents = cents + '0';
                }
            }

            let numData = String(num);
            let re = /(-?\d+)(\d{3})/;
            while(re.test(numData)){
              numData = numData.replace(re,"$1,$2");
            }
            if( type === "init" ) {
                return numData
            } else {
                return numData+cents;
            }
        }


    }

    render(){
        const {className,children,float,status,length,...others}=this.props;
        const cls=classNames({
            'FormatNum':true,
            [className]:className
        });
        return(
            <span className={cls} {...others} >
               {status==="init"&&this.formatNumber(children, "init")}
               {status==="default"&&this.formatNumber( !isNaN( parseFloat( children ) ) ? NP.divide( children, 100) : "", "default", length )}
            </span>
        )
    }

}
FormatNum.defaultProps = {
    float: true,
    status: "default",
    length: 2
};