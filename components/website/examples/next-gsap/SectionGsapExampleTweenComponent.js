import React from "react";
import PropTypes from "prop-types";
import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
import { BS, LS } from "components/diginext/elements/Splitters";
import { Gsap } from "plugins/next-gsap";
import { useState } from "react";
import SectionBlock from "../SectionBlock";
import ButtonGroup from "components/dashkit/ButtonGroup";
import { Space } from "antd";

const sampleCode = `import { Gsap } from "plugins/next-gsap";
import { useState } from "react";
import { Space } from "antd";
...
const SectionGsapExampleTweenComponent = (props) => {
  const [opacity, setOpacity] = useState(1);

  return (
    <SectionBlock title="Basic example of GSAP Component <Gsap>" sampleCode={sampleCode}>
      <Gsap params={{ opacity: opacity, stagger: 0.2, ease: "sine.inOut" }}>
        <div className="red-circle" />
        <div className="red-circle" />
        <div className="red-circle" />
      </Gsap>

      <BS />

      <Space>
        <DashkitButton onClick={() => setOpacity(opacity ? 0 : 1)}>FADE IN/OUT</DashkitButton>
      </Space>
    </SectionBlock>
  );
};`;

const SectionGsapExampleTweenComponent = (props) => {
  const [opacity, setOpacity] = useState(1);

  return (
    <SectionBlock title="Basic example of GSAP Component <Gsap>" sampleCode={sampleCode}>
      <Gsap params={{ opacity: opacity, stagger: 0.2, ease: "sine.inOut" }}>
        <div className="red-circle" />
        <div className="red-circle" />
        <div className="red-circle" />
      </Gsap>

      <BS />

      <Space>
        <DashkitButton onClick={() => setOpacity(opacity ? 0 : 1)}>FADE IN/OUT</DashkitButton>
      </Space>
    </SectionBlock>
  );
};

// SectionBasic.propTypes = {};

export default SectionGsapExampleTweenComponent;
