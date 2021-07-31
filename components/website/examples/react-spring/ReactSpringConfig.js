import React, { useEffect, useState } from "react";
import SectionBlock from "../SectionBlock";
import Space from "antd/lib/space";
import { BS, LS } from "components/diginext/elements/Splitters";
import DashkitButton from "components/dashkit/Buttons";

import { Spring, animated, config } from "react-spring";
import { useBoolean } from "ahooks";
import { ListItem, VerticalList } from "components/diginext/layout/ListLayout";
import Code from "components/diginext/elements/Code";

const sampleCode = `<Spring
  config={{ duration: 1000 }}
  delay={500}
  to={{
    opacity: isShow ? 1 : 0,
    transform: isShow ? "translate(200px, 0px)" : "translate(0px, 0px)",
  }}
  >
  {(props) => <animated.div style={props} className="red-circle" />}
</Spring>`;

const sampleCode2 = `<Spring
  config={config.wobbly}
  to={{
    transform: isShow ? "translate(200px, 0px)" : "translate(0px, 0px)",
  }}
  >
  {(props) => <animated.div style={props} className="red-circle" />}
</Spring>`;

const ConfigDuration = () => {
  const [isShow, { toggle }] = useBoolean(true);

  return (
    <SectionBlock title="Animation duration & delay." sampleCode={sampleCode}>
      <Spring
        config={{ duration: 1000 }}
        delay={500}
        to={{
          opacity: isShow ? 1 : 0,
          transform: isShow ? "translate(200px, 0px)" : "translate(0px, 0px)",
        }}
      >
        {(props) => <animated.div style={props} className="red-circle" />}
      </Spring>

      <BS />

      <Space>
        <DashkitButton onClick={() => toggle()}>SHOW/HIDE</DashkitButton>
      </Space>
    </SectionBlock>
  );
};

const ConfigEasing = () => {
  const [isShow, { toggle }] = useBoolean(true);

  const [conf, setConf] = useState(config.wobbly);

  const toggleAndChangeEasing = (easing) => {
    setConf(easing);
    toggle();
  };

  return (
    <SectionBlock title="Animation easings." sampleCode={sampleCode2}>
      <Spring
        config={conf}
        to={{
          transform: isShow ? "translate(200px, 0px)" : "translate(0px, 0px)",
        }}
      >
        {(props) => <animated.div style={props} className="red-circle" />}
      </Spring>

      <BS />

      <Space>
        <DashkitButton onClick={() => toggleAndChangeEasing(config.default)}>DEFAULT</DashkitButton>
        <DashkitButton onClick={() => toggleAndChangeEasing(config.wobbly)}>WOBBY</DashkitButton>
        <DashkitButton onClick={() => toggleAndChangeEasing(config.slow)}>SLOW</DashkitButton>
        <DashkitButton onClick={() => toggleAndChangeEasing(config.stiff)}>STIFF</DashkitButton>
        <DashkitButton onClick={() => toggleAndChangeEasing(config.molasses)}>MOLASSES</DashkitButton>
      </Space>
    </SectionBlock>
  );
};

const ReactSpringConfig = () => {
  return (
    <VerticalList gutter={20}>
      <ListItem>
        <Code>{`import { Spring, animated, config } from "react-spring";`}</Code>
      </ListItem>
      <ListItem>
        <ConfigEasing />
      </ListItem>
      <ListItem>
        <ConfigDuration />
      </ListItem>
    </VerticalList>
  );
};

export default ReactSpringConfig;
