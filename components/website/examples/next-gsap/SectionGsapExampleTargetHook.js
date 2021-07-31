import React from "react";
import PropTypes from "prop-types";
import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
import { BS, LS } from "components/diginext/elements/Splitters";
import { useGsapTarget } from "plugins/next-gsap";
import { useEffect, useRef, useState } from "react";
import SectionBlock from "../SectionBlock";
import { Space } from "antd";

const sampleCode = `import { useGsapTarget } from "plugins/next-gsap";
import { useRef } from "react";
import { Space } from "antd";
...
const SectionGsapExampleTargetHook = (props) => {
  const circleRef = useRef();
  const tween = useGsapTarget(circleRef, {
    x: 200,
    duration: 1,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  });

  return (
    <SectionBlock title="Basic example of GSAP target hook" sampleCode={sampleCode}>
      <div className="red-circle" ref={circleRef} />
      <BS />
      <Space>
        <DashkitButton onClick={tween.toggle}>PLAY/PAUSE</DashkitButton>
        <DashkitButton onClick={tween.restart}>RESTART</DashkitButton>
        <DashkitButton onClick={tween.stop}>STOP</DashkitButton>
        <DashkitButton onClick={tween.kill}>KILL</DashkitButton>
      </Space>
    </SectionBlock>
  );
};`;

const SectionGsapExampleTargetHook = (props) => {
  const circleRef = useRef();
  const tween = useGsapTarget(circleRef, {
    x: 200,
    duration: 1,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  });

  return (
    <SectionBlock title="Basic example of GSAP target hook" sampleCode={sampleCode}>
      <div className="red-circle" ref={circleRef} />
      <BS />
      <Space>
        <DashkitButton onClick={tween.toggle}>PLAY/PAUSE</DashkitButton>
        <DashkitButton onClick={tween.restart}>RESTART</DashkitButton>
        <DashkitButton onClick={tween.stop}>STOP</DashkitButton>
        <DashkitButton onClick={tween.kill}>KILL</DashkitButton>
      </Space>
    </SectionBlock>
  );
};

// SectionBasic.propTypes = {};

export default SectionGsapExampleTargetHook;
