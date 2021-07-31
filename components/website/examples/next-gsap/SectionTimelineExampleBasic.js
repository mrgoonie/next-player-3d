import React from "react";
import PropTypes from "prop-types";
import DashkitButton, { ButtonType } from "components/dashkit/Buttons";
import { BS, LS } from "components/diginext/elements/Splitters";
import { Gsap, GsapTimeline, useGsap, useGsapController, useGsapTarget } from "plugins/next-gsap";
import { useEffect, useRef, useState } from "react";
import SectionBlock from "../SectionBlock";
import { Space } from "antd";

const sampleCode = ``;

const SectionTimelineExampleBasic = (props) => {
  const controller = useGsapController();

  // const [totalDuration, setTotalDuration] = useState(0);

  return (
    <SectionBlock title="Using <GsapTimeline> component." sampleCode={sampleCode}>
      <GsapTimeline controller={controller}>
        <Gsap
          params={[
            { x: 200, duration: 1, ease: "sine.inOut" },
            { x: 0, duration: 1, ease: "sine.inOut" },
          ]}
        >
          <div className="red-circle" />
        </Gsap>
        <Gsap
          params={[
            { opacity: 0, ease: "power.inOut" },
            { opacity: 1, ease: "power.inOut" },
          ]}
        >
          <div className="red-circle" />
        </Gsap>
      </GsapTimeline>

      <BS />

      <Space>
        <DashkitButton onClick={controller.toggle}>PAUSE/PLAY</DashkitButton>
        <DashkitButton onClick={controller.restart}>RESET</DashkitButton>
        <DashkitButton onClick={controller.reverse}>REVERSE</DashkitButton>
        {/* <span>Total duration: {totalDuration}s</span> */}
      </Space>
    </SectionBlock>
  );
};

// SectionBasic.propTypes = {};

export default SectionTimelineExampleBasic;
