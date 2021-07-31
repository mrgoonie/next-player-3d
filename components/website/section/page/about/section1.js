import { Collapse, Select } from "antd";
import { Input, TextArea, InputSelect } from "@/diginext/form/Form";
import { HorizontalList, ListItem, ListItemSize } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize, ButtonType } from "@/dashkit/Buttons";
import { useRef, useState, useEffect } from "react";
import { getFileNameFromPath } from "@/helpers/helpers";
import ContentImage from '@/diginext/upload/contentImage'
const { Panel } = Collapse;
const { Option } = Select;

const SectionAbout1 = (props) => {

    const formInputRef = useRef({});

    //member
    const [sectionMemberComponents, setSectionMemberComponents] = useState([]);
    const [sortSectionMember, setSortSectionMember] = useState([]);
    const [countSectionMemberRef, setCountSectionMemberRef] = useState(0);

    useEffect(function() {
        // push content producer section
        if(props.content.members) {
            let components = [];
            let sort = [];
            let countRef = 0;
            props.content.members.forEach(function(section, indexRef) {
                components.push({
                    indexRef,
                    component: MemberComponent,
                    content: section
                });
                countRef++;
                sort.push(indexRef);
            });
            setCountSectionMemberRef(countRef);
            setSortSectionMember(sort);
            setSectionMemberComponents(components);
        } else {
            setCountSectionMemberRef(1);
            setSortSectionMember([0]);
            setSectionMemberComponents([
                {
                    indexRef: 0,
                    component: MemberComponent,
                    content: ""
                }
            ]);
        }
    }, []);

    const updateMemberSection = (index, isDelete = false) => {
        let components = sectionMemberComponents;
        let sort = sortSectionMember;
        let countRef = countSectionMemberRef;

        if(isDelete) {
            let contentOfDelete = components[index].content || null;
            delete components[index];
            sort.filter(function(value, key) {
                if(key != index) {
                    return value;
                }
            });
        } else {
            components.push({
                indexRef: countRef,
                component: MemberComponent,
                content: ''
            })
            sort.push(countRef);
            countRef++; 
        }

        setSectionMemberComponents([
            ...components
        ]);
        setSortSectionMember(sort)
        setCountSectionMemberRef(countRef);
    };

    const updateSection = function(isDelete = false) {
        props.updateSection(props.locale, formInputRef.current.section.value.value, props.index, isDelete);
    };

    return (
        <Collapse defaultActiveKey={[`postContent_${props.locale}${props.indexRef}`]} >
            <Panel header="Section 1" key={`postContent_${props.locale}${props.indexRef}`}>
                <ListItem style={{ marginRight: "1rem" }}>
                    <InputSelect
                        ref={el => formInputRef.current.section = el}
                        labelInValue
                        defaultValue={{value: 1}}
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
                    defaultValue={1}
                    style={{display: 'none'}}
                />
                <HorizontalList itemSize={ListItemSize.AUTO}>
                    <ContentImage
                        name={ getFileNameFromPath(props.content.banner) || `banner_${props.locale}${props.indexRef}`}
                        imageUrl={props.contentImgs[`${props.content.banner ? getFileNameFromPath(props.content.banner) : `banner_${props.locale}${props.indexRef}`}Url`] || props.content.banner}
                        imageIsRemoved={props.contentRmImgs[`${getFileNameFromPath(props.content.banner)}`]}
                        handleChange={props.handleChangeSingleUploadContent}
                    />
                    <Input
                        ref={el => props.formInputRef.current[`content_${props.locale}[${props.indexRef}][banner]`] = el}
                        defaultValue={ getFileNameFromPath(props.content.banner) || `banner_${props.locale}${props.indexRef}`}
                        style={{display: 'none'}}
                    />
                </HorizontalList>

                {
                    sectionMemberComponents 
                    ? sectionMemberComponents.map(function(MemberSection, index) {
                        if(MemberSection) {
                            let MemberSectionComponent = MemberSection.component;
                            return MemberSectionComponent ? <MemberSectionComponent
                                key={`member${index}}`}
                                locale={props.locale}
                                formInputRef={props.formInputRef}
                                indexParentRef={props.indexRef}
                                indexRef={index}
                                content={MemberSection.content}
                                onClick={updateMemberSection}
                                members={props.members}
                            /> : '';
                        }
                    }) : ''
                }
            </Panel>
        </Collapse>
    );
};

const MemberComponent = (props) => {
    const members = props.members;
    const content = props.content;
    const locale = props.locale;
    return (
        <HorizontalList itemSize={ListItemSize.AUTO}>
            <ListItem style={{ marginRight: "1rem" }}>
                <Input
                    ref={el => props.formInputRef.current[`content_${locale}[${props.indexParentRef}][members][${props.indexRef}][name]`] = el}
                    defaultValue={content['name'] || content}
                    placeholder="name"
                />
            </ListItem>
            <ListItem style={{ marginRight: "1rem" }}>
                {
                    members
                    ?  (
                        <InputSelect
                            style={{marginTop: '0px', minWidth: '180px', maxWidth: '180px'}}
                            ref={el => props.formInputRef.current[`content_${locale}[${props.indexParentRef}][members][${props.indexRef}][memberId]`] = el}
                            defaultValue={`${content['memberId'] || ''}`}
                        >
                            <Select.Option key={`ProducerLinkIdBox`}>None</Select.Option>
                            {members.map(function(member, index) {
                                return(
                                    <Select.Option key={index} value={member.id}>{member.name}</Select.Option>
                                )
                            })}                            
                        </InputSelect>
                    ) : ''
                }
            </ListItem>
            <ListItem style={{ marginRight: "1rem" }}>
                <AdminButton
                    size={ButtonSize.SMALL}
                    style={{margin: '5px', float: 'right'}}
                    onClick={() => props.onClick(props.indexRef, false)}
                >
                    +
                </AdminButton>
                <AdminButton
                    size={ButtonSize.SMALL}
                    style={{margin: '5px', float: 'right'}}
                    type={ButtonType.DANGER}
                    onClick={() => props.onClick(props.indexRef, true)}
                >
                    x
                </AdminButton>
            </ListItem>
        </HorizontalList>
    )
};

export default SectionAbout1;