import React from 'react';
import classNames from 'classnames';
import './FixedBar.css';

class FixedBar extends React.Component{
    constructor(props){
        super(props);
    }

    returnTop = () => {
        this.toScroll('top', 20);
    }

    toScroll = (target, time) => {
        clearInterval(timer);
        const scrollHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight;
        let timer = setInterval(function() {
            const scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            switch (target) {
                case 'top':
                    
                    if (Math.ceil(scrolltop) <= 0) {
                        clearInterval(timer);
                    } else {
                        window.scrollBy(0, -100);   
                    }                       
                    break;
                case 'bottom':
                    
                    if (Math.ceil(scrolltop) >= scrollHeight) {
                        clearInterval(timer);
                    } else {
                        window.scrollBy(0, 100);
                    }
                    break;
            }
        }, time)
    }

    render(){
        const {className,children,fixedBarData,...others} = this.props;
        const cls=classNames({
            'fixed_bar': true,
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                <div className="item weixin">
                    <div className="info_wrap erweima">
                        <div className="info_box">
                            <img src={fixedBarData.weixin} />
                            <p className="guanzhu">关注微信公众号</p>
                        </div>
                    </div>
                </div>
                <div className="item qq">
                    <a className="a_btn" href={`http://crm2.qq.com/page/portalpage/wpa.php?uin=${fixedBarData.qq}&f=1&ty=1&ap=`} target="_blank"/>
                    <div className="info_wrap txt">
                        <div className="info_box">
                            <div className="top_info">
                                <p>企业QQ</p>
                                <p className="last"><a title="点击进行QQ交流" href={`http://crm2.qq.com/page/portalpage/wpa.php?uin=${fixedBarData.qq}&f=1&ty=1&ap=`} target="_blank">{fixedBarData.qq}</a></p> 
                            </div>
                            <div className="tips">有业务疑问请QQ交谈</div>
                        </div>
                    </div>
                </div>
                <div className="item mail">
                    <a className="a_btn" href={`mailto:${fixedBarData.mail}`}/>
                    <div className="info_wrap txt">
                        <div className="info_box">
                            <div className="top_info">
                                <p>企业邮箱</p>
                                <p className="last"><a title="点击发送邮件" href={`mailto:${fixedBarData.mail}`}>{fixedBarData.mail}</a></p> 
                            </div>
                            <div className="tips">有业务疑问请发电子邮件</div>
                        </div>
                    </div>
                </div>
                <div className="item tel">
                    <div className="info_wrap txt">
                        <div className="info_box">
                            <div className="top_info">
                                <p>客服电话</p>
                                <p className="last telephone">{fixedBarData.tel}</p> 
                            </div>
                            <div className="tips">有业务疑问请拨打客服电话</div>
                        </div>
                    </div>
                </div>
                <div className="item return_top" title="回到顶部" onClick={this.returnTop}/>
            </div>
        )
    }
}

export default FixedBar;