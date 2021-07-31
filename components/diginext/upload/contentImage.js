import { ListItem } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { getBase64, getFileNameFromPath } from "@/helpers/helpers";

const ContentImage = (props) => {
    
    const [loading, setLoading] = useState();

    const beforeUpload =  function(file) {
        const mimeType = props.mimeType || ['image/jpeg', 'image/png', 'image/gif'];
        const isValidType = mimeType.includes(file.type);
        if (!isValidType) {
            message.error(`You can only upload ${mimeType.join(',')} file!`);
        }

        const fileSize = props.fileSize || 5;
        const validFileSize = file.size / 1024 / 1024 < fileSize;
        if (!validFileSize) {
            message.error(`Image must smaller than ${fileSize}MB!`);
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
                props.handleChange('update', data, false);
                setLoading(false);
            });
        }
    };

    const removeImage = function() {
        let data = {};
        if(props.imageUrl.includes('http')) {
            data[props.name] = getFileNameFromPath(props.imageUrl);
            data[`${props.name}Url`] = '';
        } else {
            data[props.name] = '';
            data[`${props.name}Url`] = '';
        }
        props.handleChange('remove', data, true);
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
                label="SEO Image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                accept="image/*"
            >
                {
                    (
                        props.imageUrl && 
                        ((props.imageUrl.includes('http') && !props.imageIsRemoved) 
                        || !props.imageUrl.includes('http'))
                    ) 
                    ? <img style={{maxWidth: '80%', maxHeight: '80%'}} src={props.imageUrl} alt="avatar" /> : uploadButton
                    
                }
            </Upload>
        </ListItem>
    );
};

export default ContentImage;