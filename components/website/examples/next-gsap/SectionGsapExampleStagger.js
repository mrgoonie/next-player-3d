import React from "react";
import PropTypes from "prop-types";
import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
import { BS, LS } from "components/diginext/elements/Splitters";
import { Gsap } from "plugins/next-gsap";
import { useState } from "react";
import SectionBlock from "../SectionBlock";
import ButtonGroup from "components/dashkit/ButtonGroup";

const sampleCode = `<Gsap x={200} stagger={0.1} yoyo repeat={-1} ease="power2.inOut">
  <div className="red-circle" />
  <div className="red-circle" />
</Gsap>`;

const SectionGsapExampleStagger = (props) => {
  const [opacity, setOpacity] = useState(1);

  return (
    <SectionBlock title={'Using GSAP Component <Gsap> with "stagger" prop:'} sampleCode={sampleCode}>
      <Gsap x={200} stagger={0.1} yoyo repeat={-1} ease="power2.inOut">
        <div className="red-circle" />
        <BS />
        <div className="red-circle" />
        <BS />
      </Gsap>

      <BS />
    </SectionBlock>
  );
};

export default SectionGsapExampleStagger;
