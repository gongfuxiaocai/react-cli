import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';

export default class AnimateQueue extends React.Component{
    static defaultProps={
        model:'horizontal',
        duration:450,
        appear:true,
        ease:['easeOutQuart', 'easeInOutQuart'],
        component:"div"
    };
    static propTypes = {
        model: PropTypes.string
    };

    render(){
        return(
            <Generator {...this.props}/>
        )
    }

}

//如果props.disable==true 则不输出动画
function Generator(props){
    const {className,model,children,duration,appear,animConfig,ease,noAnimation,component,...others}=props;
    let animationData=animConfig;

    const cls=classNames({
        'swift_animate_queue':true,
        [className]:className
    });

    if(!animationData){
        switch(model){
            case "horizontal":
                animationData=[
                    { opacity: [1, 0], translateX: [0, 50]  }, //进场时动画 Array<end, start>
                    { opacity: [1, 0], translateX: [0, -50] }  //出场时动画 Array<start, end>
                ];
                break;
            case "vertical":
                animationData=[
                    { opacity: [1,1], translateY: [0, 50] },
                    { opacity: [1,0], translateY: [0, -50] }
                ];
                break;
        }
    }

    if(noAnimation){
        const Component = component;
        return(<Component>{children}</Component>)
    }
    else{
        return(
            <QueueAnim
                className={cls}
                animConfig={animationData}
                duration={duration}
                ease={ease}
                appear={appear}
                component={component}
                {...others}>
                {children}
            </QueueAnim>
        )

    }
}
