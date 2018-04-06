import React, { Component } from 'react';
import classNames from 'classnames';
import { Upload } from 'antd';
import { Post } from '../request/Requset';
import './Uploader.css';
import ToastLite from '../toastLite/ToastLite';

export default class Uploader extends Component{
    constructor( props ) {
        super( props );

        this.state = {
            imgSrc: ""
        }
    }

    nodeProps = {
        action: this.props.action,
        withCredentials:true,  //这里只在同域下有效，跨域不起作用
        showUploadList:true,
        //跨域情况下 要开启customRequest 才能顺利上传文件
        customRequest( file ){
            let formData = new FormData();
            formData.append( 'file',file.file ); //这里的名称file 要和后端接收的命名保持一致
            Post( this.props.action, formData, 2 )
                .then( ( res ) => {
                    if( !!res && !!this.props.getUpload ) {
                        this.setState( {
                            imgSrc: res.obj
                        } );
                        this.props.getUpload();
                    } else {
                        ToastLite.show( "系统繁忙，请稍后重试！", "warn" );
                    }
                } )
        },
        beforeUpload( file ) {
            //判断文件类型是否为图片
            let isTypeTrue = true;
            const { type, size } = this.props;
            for( let i = 0; i < type.length; i ++ ) {
                if( file.type !== 'image/' + type[ i ] ) {
                    isTypeTrue = false;
                    break;
                }
            }
            if ( !isTypeTrue ) {
                ToastLite.show( `只允许上传${ type.join( "、" ) }图片`, "warn" );
            }
            //判断文件尺寸
            let isSizeTrue = false;
            let isSize;
            if( size.indexOf( "M" ) ) {
                isSize = parseInt( size ) * 1024 * 1024;
            } else if( size.indexOf( "KB" ) ) {
                isSize = parseInt( size ) * 1024;
            }
            isSizeTrue = file.size / isSize <= 1;
            if ( !isSizeTrue ) {
                ToastLite.show( '文件尺寸不能大于' + size, "warn" );
            }
            return isTypeTrue && isSizeTrue;
        },
        onChange( info) {
            if ( info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if ( info.file.status === 'done') {
                console.log(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(info){
            console.log('remove file',info);
            if( !!this.props.removeUpload ) {
                this.props.removeUpload()
            }
            return true;
        }
    };

    render(){
        const { className, children, type, baseUrl } = this.props;
        const { imgSrc } = this.state;

        const cls = classNames( {
            'gd_uploader': true,
            [ className ]: className
        } );

        return(
            <Upload className={ cls } { ...this.nodeProps }>
                {
                    type === "button" &&
                    <div className="upload_box">点击上传</div>
                }
                {
                    type === "image" &&
                    <div className="upload_box_true">
                        <img src={ baseUrl + imgSrc } />
                    </div>
                }
                {
                    !type &&
                    children
                }
            </Upload>
        )
    }
}

Uploader.defaultProps = {
    baseUrl: "",
    action: "",
    imgSize: "2M",
    imgType: [],
    type: "button",
    showTip: false,
};
