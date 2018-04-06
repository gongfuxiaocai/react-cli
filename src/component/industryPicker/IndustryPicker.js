import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../button/index';
import Popup from '../popup/index';
import './IndustryPicker.css';

export default class IndustryPicker extends Component {
    static defaultProps = {
        title: '',
        contWidth: 771,
        mask: true,
        model: 'full',
        show: false
    }
    static propTypes = {
        title: PropTypes.string,
        contWidth: PropTypes.number,
        mask: PropTypes.bool,
        model: PropTypes.string,
        show: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = {
            industryData: props.data,       // 行业总数据

            level_1_Industry: '',           // 当前选择的一级行业
            level_2_Industry: '',           // 当前选择的二级行业
            level_3_Industry: '',           // 当前选择的三级行业

            level_1_IndustryID: '',         // 当前选择的一级行业 ID
            level_2_IndustryID: '',         // 当前选择的二级行业 ID
            level_3_IndustryID: '',         // 当前选择的三级行业 ID

            arr_level_1_Industry: [],       // 一级行业是否被选中 元素值为 true / false
            arr_level_2_Industry: [],       // 二级行业是否被选中 元素值为 true / false
            arr_level_3_Industry: [],       // 三级行业是否被选中 元素值为 true / false

            first_Level_Child_Data: [],     // 第一级的 children 数据，即 第二级的数据
            second_Level_Child_Data: []     // 第二级的 children 数据，即 第三级的数据
        };
    }

    render_level_1_Data = (data) => {
        let arr = [];
        let html = '';
        html = data.map((item, i) => {
            arr[i] = false;
            return (<li onClick={()=>{this.level_1_Change(item, i, arr)}} className={this.state.arr_level_1_Industry[i]?'selectedLi':''} key={i} title={item.name}>{item.name}</li>);
        });
        return html;
    }

    level_1_Change = (data, i, arr) => {
        if(this.state.arr_level_1_Industry[i]) return;
        arr[i] = true;
        this.setState({
            level_1_Industry: data.name,
            level_2_Industry: '',
            level_3_Industry: '',
            level_1_IndustryID: data.id,
            level_2_IndustryID: '',
            level_3_IndustryID: '',
            all_level_3_Industry: '',
            arr_level_1_Industry: arr,
            arr_level_2_Industry: [],
            arr_level_3_Industry: [],
            first_Level_Child_Data: data.children,
            second_Level_Child_Data: []
        });
    }

    render_level_2_Data = (data) => {
        let arr = [];
        let html = '';
        html = data.map((item, i) => {
            arr[i] = false;
            return (<li onClick={()=>{this.level_2_Change(item, i, arr)}} className={this.state.arr_level_2_Industry[i]?'selectedLi':''} key={i} title={item.name}>{item.name}</li>);
        });
        return html;
    }

    level_2_Change = (data, i, arr) => {
        if(this.state.arr_level_2_Industry[i]) return;
        arr[i] = true;
        this.setState({
            level_2_Industry: data.name,
            level_3_Industry: '',
            level_2_IndustryID: data.id,
            level_3_IndustryID: '',
            arr_level_2_Industry: arr,
            arr_level_3_Industry: [],
            second_Level_Child_Data: data.children
        });
    }

    render_level_3_Data = (data) => {
        let arr = [];
        let html = '';
        html = data.map((item, i) => {
            arr[i] = false;
            return (<li onClick={()=>{this.level_3_Change(item, i, arr)}} className={this.state.arr_level_3_Industry[i]?'selectedLi':''} key={i} title={item.name}>{item.name}</li>);
        });
        return html;
    }

    level_3_Change = (data, i, arr) => {
        if(this.state.arr_level_3_Industry[i]) return;
        arr[i] = true;
        this.setState({
            level_3_Industry: data.name,
            level_3_IndustryID: data.id,
            arr_level_3_Industry: arr
        });
    }

    closePicker = () => {
        this.props.onRequestClose?this.props.onRequestClose():null;
    }

    getAllIndustry = () => {
        const selectedIndustry = {
            level_1: {'id': this.state.level_1_IndustryID, 'text': this.state.level_1_Industry},
            level_2: {'id': this.state.level_2_IndustryID, 'text': this.state.level_2_Industry},
            level_3: {'id': this.state.level_3_IndustryID, 'text': this.state.level_3_Industry},
        };
        this.props.onSure ? this.props.onSure(selectedIndustry) : null;
    }

    componentDidMount() {
        
    }

    render() {
        return(
            <div className="industryPickerWrapper">
                <Popup
                    title={this.props.title}
                    contWidth={this.props.contWidth} 
                    mask={this.props.mask} 
                    model={this.props.model}
                    show={this.props.show}
                    onRequestClose={ this.closePicker }
                >
                    <div className="industryPicker">
                        <p className="tips">温馨提示 : 请您根据实际情况，正确选择类目及其行业类别</p>
                        <div className="allIndustry">
                            <div className="industryWrapper">
                                <ul>
                                    {this.render_level_1_Data(this.state.industryData)}
                                </ul>
                            </div>
                            <div className="industryWrapper">
                                <ul>
                                    {this.render_level_2_Data(this.state.first_Level_Child_Data)}
                                </ul>
                            </div>
                            <div className="industryWrapper">
                                <ul>
                                    {this.render_level_3_Data(this.state.second_Level_Child_Data)}
                                </ul>
                            </div>
                        </div>
                        <p className="seletedType">
                            <span>您当前的选择是 : </span>
                            <span>
                                {this.state.level_1_Industry ? `${this.state.level_1_Industry} > ` : ''}
                                {this.state.level_2_Industry ? `${this.state.level_2_Industry} > ` : ''}
                                {this.state.level_3_Industry}
                            </span>
                        </p>
                    </div>
                    <Popup.PopupFooter style={{marginTop:'30px'}}>
                        <Button model="primary" width={110}  size="medium" 
                            onClick={ ()=>{ this.getAllIndustry() } }>确定</Button>
                        <Button model="default" width={110}  size="medium" 
                            onClick={ this.closePicker }>取消</Button>
                    </Popup.PopupFooter>
                </Popup>
            </div>
        )
    }
}
