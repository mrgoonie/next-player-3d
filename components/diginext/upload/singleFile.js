import { ListItem } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "components/dashkit/Buttons";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { getBase64, isFileByStr } from "@/helpers/helpers";
import { FileOutlined } from '@ant-design/icons';
import Link from "next/link";

const { Dragger } = Upload;

const SingleFile = (props) => {
    
    const [loading, setLoading] = useState();

    const beforeUpload =  function(file) {
        const mimeType = props.mimeType || [];
        var isValidType = file.type.match(/(plain|msword|document|ms-excel|sheet|ms-powerpoint|presentation|csv)$/);
        if (!isValidType) {
            message.error(`You can only upload plain|msword|document|ms-excel|sheet|ms-powerpoint|presentation|csv file!`);
        }

        const fileSize = props.fileSize || 5;
        const validFileSize = file.size / 1024 / 1024 < fileSize;
        if (!validFileSize) {
            message.error(`File must smaller than ${fileSize}MB!`);
        }

        return isValidType && validFileSize;
    }
    
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const handleChange = function(info) {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl) => {
                let data = {};
                data[props.name] = info.file.originFileObj;
                data[`${props.name}Url`] = imageUrl;
                props.handleChange('update', data);
                setLoading(false);
            });
        }
    };

    const removeImage = function() {
        let data = {};
        data[props.name] = '';
        data[`${props.name}Url`] = '';
        props.handleChange('remove', data);
    };

    return (
        <ListItem style={{width: `${props.width || 40}%`}} >
            <AdminButton
                style={{position:"absolute" , top:"0px", right:"10px", padding:"1px 4px", zIndex:"10"}}
                size={ButtonSize.SMALL}
                type={ButtonType.DANGER}
                outline={true}
                onClick={removeImage}
            >
                X
            </AdminButton> 
            <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                accept=".csv,.doc,.docx,.ppt,.xlsx,.xls"
            >
                {props.imageUrl ? <FileOutlined /> : uploadButton}
                
            </Upload>
            {isFileByStr(props.imageUrl) ? <Link href={props.imageUrl}>Download</Link> : ''}
        </ListItem>
    );
};

export default SingleFile;