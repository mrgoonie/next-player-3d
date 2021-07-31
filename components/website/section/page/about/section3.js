import { Collapse, Select, Divider } from "antd";
import { Input, TextArea, InputSelect } from "@/diginext/form/Form";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { useRef } from "react";
import { getFileNameFromPath } from "@/helpers/helpers";
import ContentImage from '@/diginext/upload/contentImage'
import Editor from '@/diginext/editor/editor';
const { Panel } = Collapse;
const { Option } = Select;

const SectionAbout3 = (props) => {

    const formInputRef = useRef({});

    const updateSection = function(isDelete = false) {
        props.updateSection(props.locale, formInputRef.current.section.value.value, props.index, isDelete);
    };

    return (
        <Collapse defaultActiveKey={[`postContent_${props.locale}${props.indexRef}`]} >
            <Panel header="Section 3" key={`postContent_${props.locale}${props.indexRef}`}>
                <ListItem style={{ marginRight: "1rem" }}>
                    <InputSelect
                        ref={el => formInputRef.current.section = el}
                        labelInValue
                        defaultValue={{value: 3}}
                    >
                        {props.sectionOptions.map(function(name, index) {
                            return(
                                <Select.Option key={`SectionBox_${props.locale}${index}`} value={index + 1}>{name}</Select.Option>
                            )
                        })}                            
                    </InputSelect>
                </ListItem>
                <AdminButton
                    size={ButtonSize.SMALL}
                    style={{margin: '5px'}}
                    onClick={e => updateSection(false)}
                >
                    Insert
                </AdminButton>
                <AdminButton
                    size={ButtonSize.SMALL}
                    style={{margin: '5px'}}
                    type={ButtonType.DANGER}
                    onClick={e => updateSection(true)}
                >
                    Remove
                </AdminButton>
                <Input
                    ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][section]`] = el}
                    defaultValue={3}
                    style={{display: 'none'}}
                />

                <HorizontalList itemSize={ListItemSize.AUTO} style={{marginTop: '10px'}}>
                    <Input
                        ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][title]`] = el}
                        defaultValue={props.content.title}
                        placeholder="Bác sĩ hoàn hảo"
                    />
                </HorizontalList>
                
                <Divider orientation="left"></Divider>
                <HorizontalList itemSize={ListItemSize.AUTO} style={{marginTop: '10px'}}>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <ContentImage
                            name={ getFileNameFromPath(props.content.drimage1) || `drimage1_${props.locale}${props.indexRef}`}
                            imageUrl={props.contentImgs[`${props.content.drimage1 ? getFileNameFromPath(props.content.drimage1) : `drimage1_${props.locale}${props.indexRef}`}Url`] || props.content.drimage1}
                            imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.drimage1)}`]}
                            handleChange={props.handleChangeSingleUploadContent}
                        />
                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drimage1]`] = el}
                            defaultValue={ getFileNameFromPath(props.content.drimage1) || `drimage1_${props.locale}${props.indexRef}`}
                            style={{display: 'none'}}
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drName1]]`] = el}
                            defaultValue={props.content.drName1}
                            placeholder="Vũ Xuân Tân"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drTitle1]]`] = el}
                            defaultValue={props.content.drTitle1}
                            placeholder="Ths.BS"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drDesc1]]]`] = el}
                            defaultValue={props.content.drDesc1}
                            placeholder="Trên 19 năm kinh nghiệm"
                        />
                    </ListItem>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <ContentImage
                            name={ getFileNameFromPath(props.content.drimage2) || `drimage2_${props.locale}${props.indexRef}`}
                            imageUrl={props.contentImgs[`${props.content.drimage2 ? getFileNameFromPath(props.content.drimage1) : `drimage2_${props.locale}${props.indexRef}`}Url`] || props.content.drimage2}
                            imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.drimage2)}`]}
                            handleChange={props.handleChangeSingleUploadContent}
                        />
                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drimage2]`] = el}
                            defaultValue={ getFileNameFromPath(props.content.drimage2) || `drimage2_${props.locale}${props.indexRef}`}
                            style={{display: 'none'}}
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drName2]]`] = el}
                            defaultValue={props.content.drName2}
                            placeholder="Nguyễn Xuân Tuyến"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drTitle2]]`] = el}
                            defaultValue={props.content.drTitle2}
                            placeholder="BS.CKII"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drDesc2]]]`] = el}
                            defaultValue={props.content.drDesc2}
                            placeholder="Trên 20 năm kinh nghiệm"
                        />
                    </ListItem>
                    <ListItem style={{ marginRight: "1rem" }}>
                        <ContentImage
                            name={ getFileNameFromPath(props.content.drimage3) || `drimage3_${props.locale}${props.indexRef}`}
                            imageUrl={props.contentImgs[`${props.content.drimage3 ? getFileNameFromPath(props.content.drimage3) : `drimage3_${props.locale}${props.indexRef}`}Url`] || props.content.drimage3}
                            imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.drimage3)}`]}
                            handleChange={props.handleChangeSingleUploadContent}
                        />
                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drimage3]`] = el}
                            defaultValue={ getFileNameFromPath(props.content.drimage3) || `drimage3_${props.locale}${props.indexRef}`}
                            style={{display: 'none'}}
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drName3]]`] = el}
                            defaultValue={props.content.drName3}
                            placeholder="Châu Thành Long"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drTitle3]]`] = el}
                            defaultValue={props.content.drTitle3}
                            placeholder="BS.CKI"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drDesc3]]]`] = el}
                            defaultValue={props.content.drDesc3}
                            placeholder="Trên 30 năm kinh nghiệm"
                        />
                    </ListItem>

                    <ListItem style={{ marginRight: "1rem" }}>
                        <ContentImage
                            name={ getFileNameFromPath(props.content.drimage4) || `drimage4_${props.locale}${props.indexRef}`}
                            imageUrl={props.contentImgs[`${props.content.drimage4 ? getFileNameFromPath(props.content.drimage4) : `drimage4_${props.locale}${props.indexRef}`}Url`] || props.content.drimage4}
                            imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.drimage4)}`]}
                            handleChange={props.handleChangeSingleUploadContent}
                        />
                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drimage4]`] = el}
                            defaultValue={ getFileNameFromPath(props.content.drimage4) || `drimage4_${props.locale}${props.indexRef}`}
                            style={{display: 'none'}}
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drName4]]`] = el}
                            defaultValue={props.content.drName4}
                            placeholder="Nguyễn Minh Đức"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drTitle4]]`] = el}
                            defaultValue={props.content.drTitle4}
                            placeholder="BS"
                        />

                        <Input
                            ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][drDesc4]]]`] = el}
                            defaultValue={props.content.drDesc4}
                            placeholder="Trên 15 năm kinh nghiệm"
                        />
                    </ListItem>
                </HorizontalList>
        
               
                    
            </Panel>
        </Collapse>
    );
};

export default SectionAbout3;