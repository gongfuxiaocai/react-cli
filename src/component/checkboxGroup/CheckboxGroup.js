import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import '../checkbox/Checkbox.less';
import Utils from '../Resource/utils/Utils';

export default class CheckboxGroup extends Component{
    static defaultProps={
        model:'primary',
        size:'small'
    };
    static propTypes={
        model:PropTypes.string,
        size:PropTypes.string,
        data:PropTypes.array.isRequired,
        defaultValue:PropTypes.array,
        value:PropTypes.array
    };
    constructor(){
        super();
        this.state={
            value:[]//已选中的数据
        }
    }

    //在组件完成加载的时候，初始化默认选中的值
    componentDidMount(){
        this.setState({
            value:this.props.value || this.props.defaultValue
        })
    }


    //受控组件模式，如果有新的 props.value进来，就要更新组件state
    componentWillReceiveProps(nextProps){
        if(nextProps.value !== undefined && nextProps.value!==this.state.value){
            this.setState({
                value:nextProps.value
            })
        }
    }

    handleChange=(index,label,value,isDisable)=>{
        //如果是禁用的按钮 不做任何改变
        if(isDisable===1) return;
        let tmpValue;

        //当前选中数据在state中是否存在，如果存在则返回对应的下标，不存在就返回-1
        let itemInStateIndex=Utils.findArray(this.state.value,value);

        //如果state能找到值，则取消选中
        if(itemInStateIndex!==-1){
            tmpValue=this.state.value.filter(item=>item !== value);
        }
        //如果找不到，则添加选中
        else{
            tmpValue=this.state.value;
            tmpValue.push(value);
        }

        this.setState(
            {
                value:tmpValue
            },
            ()=>{
                let clickedData={
                    text:label,
                    value:value,
                    index:index
                }
                if(this.props.name){
                    clickedData.name=this.props.name;
                }
                this.props.onChange && this.props.onChange(clickedData,this.state.value);
            }
        )



    }

    renderCheckList=(size,model,data)=>{
        let list=new Array();
        data.map( (item,i)=>{
            const cls=classNames({
                "innovate_checkbox":true,
                "on":this.props.value !== undefined ? Utils.findArray(this.props.value,item.value)!==-1 : Utils.findArray(this.state.value,item.value)!==-1,
                "disable":item.disable==true,
                "primary":model=="primary",
                "size_small":size=="small",
                "size_big":size=="big"
            });
            let disableVal=item.disable?1:0;
            list.push(
                <div className={cls} key={i} onClick={this.handleChange.bind(this,i,item.text,item.value,disableVal)}  >
                    <i></i><span>{item.text}</span>
                </div>
            )
        });
        return list;

    }

    render(){
        const {className,size,model,data,value,name,defaultValue,...others}=this.props;
        const cls=classNames({
            "innovate_checkbox_group":true,
            [className]:className
        });

        return(
            <div className={cls} {...others}>
                {
                    this.renderCheckList(size,model,data)
                }
            </div>

        )
    }
}
