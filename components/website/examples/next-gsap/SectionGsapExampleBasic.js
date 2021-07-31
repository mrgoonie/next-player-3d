import React from "react";
import PropTypes from "prop-types";
import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
import { BS, LS } from "components/diginext/elements/Splitters";
import { Gsap, useGsap, useGsapController, useGsapTarget } from "plugins/next-gsap";
import { useEffect, useRef, useState } from "react";
import SectionBlock from "../SectionBlock";

const SectionGsapExampleBasic = (props) => {
  const sampleCode = `const SectionGsapExampleBasic = (props) => {
  const [value, { tween, play, pause, restart, stop, toggle, reverse, kill }] = useGsap({
    duration: 1,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    // delay: 2,
  });

  return (
    <SectionBlock title={'Ví dụ cơ bản về cách sử dụng "GSAP Hook"'} sampleCode={sampleCode}>
      <div className="red-circle" style={{ transform: \`translate(\${200 * value}px,0%)\` }} />
      <BS size={20} /> {/*LINE BREAK*/}
      <DashkitButton onClick={() => restart()}>RESTART</DashkitButton>
      <LS />
      <DashkitButton onClick={() => reverse()}>REVERSE</DashkitButton>
      <LS />
      <DashkitButton onClick={() => toggle()}>PLAY/PAUSE</DashkitButton>
      <LS />
      <DashkitButton onClick={() => stop()}>STOP</DashkitButton>
      <LS />
      <DashkitButton onClick={() => kill()}>KILL</DashkitButton>
    </SectionBlock>
  );
};`

  const [value, { tween, play, pause, restart, stop, toggle, reverse, kill }] = useGsap({
    duration: 1,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    // delay: 2,
  });

  return (
    <SectionBlock title={'Ví dụ cơ bản về cách sử dụng "GSAP Hook"'} sampleCode={sampleCode}>
      <div className="red-circle" style={{ transform: `translate(${200 * value}px,0%)` }} />
      <BS size={20} /> {/*LINE BREAK*/}
      <DashkitButton onClick={() => restart()}>RESTART</DashkitButton>
      <LS />
      <DashkitButton onClick={() => reverse()}>REVERSE</DashkitButton>
      <LS />
      <DashkitButton onClick={() => toggle()}>PLAY/PAUSE</DashkitButton>
      <LS />
      <DashkitButton onClick={() => stop()}>STOP</DashkitButton>
      <LS />
      <DashkitButton onClick={() => kill()}>KILL</DashkitButton>
    </SectionBlock>
  );
};

// SectionBasic.propTypes = {};

export default SectionGsapExampleBasic;
