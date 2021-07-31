import Section from "components/diginext/containers/Section";
import { Input, InputSelect, InputSlug, Switcher, ValidationType, TextArea, TextEditor } from "components/diginext/form/Form";
import { useEffect, useRef, useState } from "react";
import CONFIG from "web.config";
import { Image, notification, Select } from "antd";
import { Upload, message } from "antd";
import asset from "plugins/assets/asset";
import AdminBadge, { BadgeSize, BadgeType } from "components/dashkit/Badges";
import _ from "lodash";

const { Dragger } = Upload;

const ContentSectionHelper = {
  getInitialValues: (config) => {
    let values = [];
    config.map((item, index) => {
      let section = {
        section: item.section,
      };
      for (const [key, value] of Object.entries(item)) {
        if (key != "section") {
          if (item[key].content) {
            if (typeof item[key].content == "string") {
              section[key] = item[key].content;
            } else if (_.isArray(item[key].content)) {
              section[key] = item[key].content[0];
            } else if (_.isObjectLike(item[key].content)) {
              // console.log(_.values(item[key].content));
              section[key] = _.values(item[key].content)[0];
            } else {
              section[key] = "";
            }
          } else {
            section[key] = "";
          }
        }
      }
      values.push(section);
    });
    return values;
  },
  parseContentValues: (contentValues) => {
    let data = {};
    if (contentValues) {
      console.log(contentValues);
      contentValues.map((section, index) => {
        for (const [key, value] of Object.entries(section)) {
          const contentKey = "content[" + index + "][" + key + "]";
          const contentValue = value;
          data[contentKey] = contentValue;
        }
      });
    }
    return data;
  },
};

const ContentSections = ({ config, defaultValue, onChange }) => {
  let defaultSectionsName = ContentSectionHelper.getInitialValues(config);

  // console.log("defaultSectionsName", defaultSectionsName);
  // console.log("defaultValue", defaultValue);

  const [contentUpdateCount, setContentUpdateCount] = useState(0);
  const [contentValues, setContentValues] = useState(defaultSectionsName);
  const [contentSections, setContentSections] = useState([]);

  // console.log("contentValues", contentValues);

  const handleChange = (newValues) => {
    if (onChange) onChange(newValues);
  };

  const initContent = () => {
    let sections = [];
    let sectionValues = [];

    config.map((sectionCfg, index) => {
      let inputs = [];
      sectionValues[index] = { section: sectionCfg["section"] };

      for (const [key, cfg] of Object.entries(sectionCfg)) {
        if (key != "section") {
          let input = <span>{key}</span>;
          let inputValue = "";
          // console.log(cfg);

          const onChange = (value) => {
            // console.log("contentValues", contentValues);
            let newContentValues = contentValues;
            // if (!newContentValues[index]) {
            //   newContentValues[index] = {};
            // }
            newContentValues[index][key] = value;

            // console.log(newContentValues);
            setContentValues(newContentValues);

            if (handleChange) handleChange(newContentValues);
          };

          const label = (
            <span style={{ display: "inline-block" }}>
              {cfg.label}{" "}
              <AdminBadge type={BadgeType.LIGHT} size={BadgeSize.SMALL}>
                {key}
              </AdminBadge>
            </span>
          );

          if (cfg.type == "select") {
            inputValue = contentValues[index] && contentValues[index][key] ? contentValues[index][key] : cfg.content[0];
          } else {
            inputValue = contentValues[index] && contentValues[index][key] ? contentValues[index][key] : "";
          }

          // console.log(inputValue);

          switch (cfg.type) {
            case "text":
              input = (
                <Input label={label} key={key + `-${inputValue}`} defaultValue={inputValue} onChange={onChange} />
              );
              break;
            case "textarea":
              input = (
                <TextArea label={label} key={key + `-${inputValue}`} defaultValue={inputValue} onChange={onChange} />
              );
              break;
            case "select":
              input = (
                <InputSelect label={label} key={key + `-${inputValue}`} defaultValue={inputValue} onChange={onChange}>
                  {cfg.content.map((opt, index) => {
                    return (
                      <Select.Option key={`opt-${key}-${index}`} value={opt}>
                        {opt}
                      </Select.Option>
                    );
                  })}
                </InputSelect>
              );
              break;
            /**
             * // TODO: Thêm các input khác:
             * - single/multi upload
             * - date
             * - time
             * - datetime
             * - date range
             * - time range
             * - switcher
             */
          }
          inputs.push(input);

          // section
          sectionValues[index][key] = inputValue;
        }
      }

      let sectionElement = (
        <Section key={sectionCfg.section} borderBottom spaceTop borderTop={index == 0}>
          <h3 style={{ marginBottom: "15px" }}>Content of {sectionCfg.section}</h3>
          {inputs}
        </Section>
      );
      sections.push(sectionElement);
    });

    setContentValues(sectionValues);
    setContentSections(sections);
  };

  // Setup các khung nhập liệu content sections:
  useEffect(() => {
    initContent();
  }, [contentUpdateCount]);

  useEffect(() => {
    // set default values
    // console.log(defaultValue);
    let defaultSectionsName = defaultValue ?? ContentSectionHelper.getInitialValues(config);

    setContentValues(defaultSectionsName);
    setContentUpdateCount(contentUpdateCount + 1);
  }, [defaultValue]);

  return <Section spaceBottom>{contentSections}</Section>;
};

export { ContentSectionHelper };

export default ContentSections;
