import React,{Component} from 'react';
import classNames from 'classnames';
import './CityPicker.css';
import PropTypes from 'prop-types';
import Select from '../select/index';

export default class CityPicker extends Component{
    static defaultProps = {
        width:140, //默认每个select的宽度
        showItem:3 //默认 省、市、区域都显示
    }
    static propTypes={
        value:PropTypes.object.isRequired,
        width:PropTypes.number,
        onPickerChange:PropTypes.func.isRequired,
        defaultValue:PropTypes.array,
        showItem:PropTypes.number,
        data:PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.state={
            showItem:props.showItem,
            provinceData:[],     //省份数据
            provinceSelected:'', //已选中省份key
            provinceSelectedTxt:'',//已选中省份文字
            cityData:[],         //城市数据
            citySelected:'',     //已选中城市key
            citySelectedTxt:'',  //已选中城市文字
            countyData:[],       //区域数据
            countySelected:'',   //已选中区域key
            countySelectedTxt:'',   //已选中区域文字
        }
        //默认空数据时的显示
        this.default={
            province:{label:'请选择省份',key:"-1"},
            city:{label:'请选择城市',key:"-1"},
            county:{label:'请选择区域',key:"-1"}
        }


    }
    componentWillReceiveProps(nexProps){

        this.getInitData(nexProps.value,nexProps.data,nexProps.showItem)
    }

    //初始化城市数据
    getInitData=(value,source,items)=>{

        let provinceData=this.getProvinceData(source);
        let cityData=[this.default.city];
        let countyData=[this.default.county];
        //如果存在已选省份数据则加载对应城市
        if(value.province && value.province!=='-1'){
            cityData=this.getCityData(source[value.province].city)
        }
        //如果存在已选城市数据则加载对应区域
        if(value.city && value.city!=="-1"){
            countyData=this.getCountyData(source[value.province].city[value.city].area)
        }

        this.setState({
            showItem:items,
            provinceData:provinceData,
            provinceSelected:value.province?value.province:'-1',//初始化省份已选
            cityData:cityData,
            citySelected:value.city?value.city:'-1',           //初始化城市已选
            countyData:countyData,
            countySelected:value.county?value.county:'-1'      //初始化区域已选
        })
    }

    //从总数据中提取省份数据
    getProvinceData=(source)=>{
        let province=[];
        for(let index in source){
            province.push({label:source[index]['text'],key:source[index]['value']})
        }
        province.unshift(this.default.province);
        return province;
    }

    //根据省份从总数据中提取城市数据
    getCityData=(source)=>{
        let city=[];

        for(let index in source){
            city.push({label:source[index]['text'],key:source[index]['value']})
        }
        city.unshift(this.default.city);
        return city;
    }

    getCountyData=(source)=>{
        let county=[];
        //console.log('countyData',source)
        for(let index in source){
            county.push({label:source[index]['text'],key:source[index]['value']})
        }
        county.unshift(this.default.county);
        return county;
    }

    //省份改变时触发
    getProvinceChange=(data)=>{
        this.setState(
            {
                provinceSelected:data.key,
                provinceSelectedTxt:data.label,
                citySelected:'-1',
                countySelected:'-1'
            },
            ()=>{
                let selectedData=this.getCurrentSelected();
                this.handlePickerChange(selectedData);
            }
        )

    }

    //城市改变时触发
    getCityChange=(data)=>{
        //console.log('cityChange',data)
        this.setState(
            {
                citySelected:data.key,
                citySelectedTxt:data.label,
                countySelected:'-1'
            },
            ()=>{
                let selectedData=this.getCurrentSelected();
                this.handlePickerChange(selectedData);
            }
        )
    }
    //区域改变时触发
    getCountyChange=(data)=>{
        //console.log('countyChange',data)
        this.setState(
            {
                countySelected:data.key,
                countySelectedTxt:data.label
            },
            ()=>{
                let selectedData=this.getCurrentSelected();
                this.handlePickerChange(selectedData);
            }
        )
    }
    //根据显示的select 返回对应的值
    getCurrentSelected=()=>{
        //console.log('showItem',this.state.showItem)
        let selectedData={};
        switch(parseInt(this.state.showItem)){
            case 1:
                    selectedData={
                        province:this.state.provinceSelected,
                        provinceTxt:this.state.provinceSelectedTxt
                    }
                    break;
            case 2:
                    selectedData={
                        province:this.state.provinceSelected,
                        provinceTxt:this.state.provinceSelectedTxt,
                        city:this.state.citySelected,
                        cityTxt:this.state.citySelectedTxt
                    }
                    break;
            case 3:
                    selectedData={
                        province:this.state.provinceSelected,
                        provinceTxt:this.state.provinceSelectedTxt,
                        city:this.state.citySelected,
                        cityTxt:this.state.citySelectedTxt,
                        county:this.state.countySelected,
                        countyTxt:this.state.countySelectedTxt
                    }
                    break;
            default:break;
        }

        return selectedData
    }

    //城市选择器 发生改变时触发
    handlePickerChange=(selectedData)=>{
        this.props.onPickerChange?this.props.onPickerChange(selectedData):null;
    }

    render(){
        const {className,width,onPickerChange,data,value,showItem,...others}=this.props;
        const cls=classNames({
            'innovate_citypicker':true,
            [className]:className
        });
        return(
            <div className={cls} {...others}>
                <span>
                    <Select
                        width={width}
                        onChange={this.getProvinceChange}
                        data={this.state.provinceData}
                        value={ {key:this.state.provinceSelected} }
                    />
                </span>

                {
                    this.state.showItem>1 &&
                    <span>
                        <Select
                            width={width}
                            onChange={this.getCityChange}
                            data={this.state.cityData}
                            value={ {key:this.state.citySelected} }
                        />
                    </span>
                }

                {
                    this.state.showItem>2 &&
                    <span>
                        <Select
                            width={width}
                            onChange={this.getCountyChange}
                            data={this.state.countyData}
                            value={ {key:this.state.countySelected} }
                        />
                    </span>
                }



            </div>
        )
    }

}
