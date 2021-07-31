import React from "react";
import PropTypes from "prop-types";
import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
import { BS, LS } from "components/diginext/elements/Splitters";
import { Gsap, useGsap, useGsapController, useGsapTarget } from "plugins/next-gsap";
import { useEffect, useRef, useState } from "react";
import SectionBlock from "../SectionBlock";
import { Space } from "antd";

const sampleCode = `import { useGsapController } from "plugins/next-gsap";
import SectionBlock from "../SectionBlock";
import { Space } from "antd";
...
const SectionGsapExampleControllerHook = (props) => {
  // const [opacity, setOpacity] = useState(1);
  const controller = useGsapController();

  return (
    <SectionBlock title="Using GSAP Controller Hook to control <Gsap> component." sampleCode={sampleCode}>
      <Gsap
        controller={controller}
        params={[
          { opacity: 0, ease: "sine.inOut" },
          { opacity: 1, ease: "sine.inOut" },
          { x: 100, ease: "sine.inOut", at: 0 },
          { x: 0, ease: "sine.inOut", at: ">" },
        ]}
      >
        <div className="red-circle" />
        <div className="red-circle" />
        <div className="red-circle" />
      </Gsap>

      <BS />

      <Space>
        <DashkitButton onClick={controller.toggle}>PAUSE/PLAY</DashkitButton>
        <DashkitButton onClick={controller.restart}>RESET</DashkitButton>
        <DashkitButton onClick={controller.reverse}>REVERSE</DashkitButton>
      </Space>
    </SectionBlock>
  );
};`;

const SectionGsapExampleControllerHook = (props) => {
  // const [opacity, setOpacity] = useState(1);
  const controller = useGsapController();

  return (
    <SectionBlock title="Using GSAP Controller Hook to control <Gsap> component." sampleCode={sampleCode}>
      <Gsap
        controller={controller}
        params={[
          { opacity: 0, ease: "sine.inOut" },
          { opacity: 1, ease: "sine.inOut" },
          { x: 100, ease: "sine.inOut", at: 0 },
          { x: 0, ease: "sine.inOut", at: ">" },
        ]}
      >
        <div className="red-circle" />
        <div className="red-circle" />
        <div className="red-circle" />
      </Gsap>

      <BS />

      <Space>
        <DashkitButton onClick={controller.toggle}>PAUSE/PLAY</DashkitButton>
        <DashkitButton onClick={controller.restart}>RESET</DashkitButton>
        <DashkitButton onClick={controller.reverse}>REVERSE</DashkitButton>
      </Space>
    </SectionBlock>
  );
};

// SectionBasic.propTypes = {};

export default SectionGsapExampleControllerHook;
