import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button/index';
import { Upload, Icon, Modal } from 'antd';
import './UploadPicture.css';

export default class UploadPicture extends React.Component{
    static defaultProps={
        model:"default",
        uploadSize:2,
        name:'',
        accept:'image/gif,image/jpeg,image/jpg,image/png',
        src:''// 反显图片的路径
    };
    static propTypes={
        action:PropTypes.string,
        accept:PropTypes.string,
        name:PropTypes.string,
        src:PropTypes.string,
        uploadSize:PropTypes.number
    };
    constructor(props){
        super(props);
        this.state={
            name:this.props.name,   //发到后台的文件参数名
            data:this.props.data,   //上传所需参数或返回上传参数的方法 object|function(file)
            action:this.props.action,   //上传路径
            accept:this.props.accept,   //上传文件类型
            uploadSize:this.props.uploadSize,//上传的大小
            imageUrl:this.props.src,
            previewVisible: false,
            previewImage: '',
            src: this.props.src,//反显图片路径
        }
    }

    // 上传中、完成、失败都会调用这个函数。
    handleChange = (info,file) => {
        // if (info.file.status === 'done') {//图片上传成功，加载新图片
        //     this.getBase64(file, imageUrl => this.setState({ imageUrl }));
        // }
        // if (info.file.status === 'error') {
        //     if(this.state.src && this.state.src !== ""){
        //         this.setState({imageUrl:this.state.src});//图片上传失败，加载原有图片
        //     }else{
        //         this.setState({imageUrl:''});
        //     }
        // }
        this.props.onChange? this.props.onChange(info):null;
    }
    componentWillReceiveProps(nextProps){
        let tt=nextProps.src;
        this.setState({
            imageUrl:tt
        })

    }

    handleCancel = () => this.setState({ previewVisible: false })

    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload=(file)=> {
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        // console.log('You can only upload JPG file!');
        // }
        // const isLt2M = file.size / 1024 / 1024 < this.state.uploadSize;
        // if (!isLt2M) {
        //     console.log('Image must smaller than 2MB!');
        // }else{
        //     this.getBase64(file, imageUrl => this.setState({ imageUrl }));
        // }
        // return isLt2M;
        // this.getBase64(file, imageUrl => this.setState({ imageUrl }));
    }

    handlePreview = () => {
        this.setState({
            previewImage: this.state.imageUrl,
            previewVisible: true,
        });
    }

    render(){
        const {className,width,model,accept,uploadSize,action,name,data,src,onChange,children,...others}=this.props;
        const clswrap=classNames({
            "innovate_upload":true,
            [className]:className
        });
        const clsparper=classNames({
            "innovate_upload-img-wrap":true,
            "innovate_paper_img01":model==='business',
            "innovate_paper_img02":model==='IDcardFront',
            "innovate_paper_img03":model==='IDcardReverse',
            "innovate_paper_img04":model==='shop',
            "innovate_paper_img05":model==='default',
            [className]:className
        });
        const clsimgwrap=classNames({
            "innovate_upload-img-wrap":true,
            [className]:className
        });
        let styleWidth={
            width:width+'px'
        }
        const imageUrl = this.state.imageUrl;
        const { previewVisible, previewImage } = this.state;
        return(
            <div className={clswrap} {...others} style={styleWidth}>
                <div className={clsparper}>
                    {imageUrl ? <img src={imageUrl} onClick={this.handlePreview} alt="" className={clsimgwrap} style={{cursor:'pointer'}}/> :''}
                </div>
                <span>{children}</span>
                <Upload 
                    showUploadList={false}
                    name={this.state.name}
                    data={this.state.data}
                    action={this.state.action}
                    accept={this.state.accept}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    >
                    <Button className='left_10' model="default" size="medium">{imageUrl ? '重新上传':'上传'}</Button>
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="" style={{width: '100%'}} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
