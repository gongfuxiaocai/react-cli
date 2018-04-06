import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal } from 'antd';
import './ShowPicture.css';

export default class ShowPicture extends React.Component{
    static defaultProps={
        model:"default",
        imageUrl:""
    };
    static propTypes={
        imageUrl:PropTypes.string,
    };
    constructor(props){
        super(props);
        this.state={
            imageUrl:this.props.imageUrl,   //图片路径
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = () => {
        this.setState({
            previewImage: this.props.imageUrl,
            previewVisible: true,
        });
    }

    render(){
        const {className,width,model,imageUrl,children,...others}=this.props;
        const clswrap=classNames({
            "innovate_show":true,
            [className]:className
        });
        const clsparper=classNames({
            "innovate_show-img-wrap":true,
            "innovate_paper_img01":model==='business',
            "innovate_paper_img02":model==='IDcardFront',
            "innovate_paper_img03":model==='IDcardReverse',
            "innovate_paper_img04":model==='shop',
            "innovate_paper_img05":model==='default',
            [className]:className
        });
        const clsimgwrap=classNames({
            "innovate_show-img-wrap":true,
            [className]:className
        });
        let styleWidth={
            width:width+'px'
        }
        const { previewVisible, previewImage } = this.state;
        return(
            <div className={clswrap} {...others} style={styleWidth}>
                <div className={clsparper}>
                    {imageUrl ? <img src={imageUrl} onClick={this.handlePreview} alt="" className={clsimgwrap} style={{cursor:'pointer'}}/> :''}
                </div>
                <span>{children}</span>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="" style={{width: '100%'}} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
