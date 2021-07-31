import React, { useEffect, useState } from "react";
import SectionBlock from "../SectionBlock";
import Space from "antd/lib/space";
import { BS, LS } from "components/diginext/elements/Splitters";
import DashkitButton from "components/dashkit/Buttons";

import { animated, useSpring } from "react-spring";
import { useBoolean } from "ahooks";

import { ListItem, VerticalList } from "components/diginext/layout/ListLayout";
import Code from "components/diginext/elements/Code";

const sampleCode = `
const ReactSpringHook = () => {
  const [isShow, { toggle }] = useBoolean(true);
  const [props, setProps, stop] = useSpring(() => ({
    // config: { duration: 2000 },
    to: { opacity: 0, x: 0 },
  }));

  useEffect(() => {
    setProps({ opacity: isShow ? 1 : 0, x: isShow ? 200 : 0 });
  }, [isShow]);

  return (
    <animated.div
      className="red-circle"
      style={{ 
        opacity: props.opacity, 
        transform: props.x.to((x) => ("translate(" + x + "px, 0px)")) 
      }}
    />
  );
};`;

const ReactSpringHook = () => {
  const [isShow, { toggle }] = useBoolean(true);
  const [props, setProps, stop] = useSpring(() => ({
    // config: { duration: 2000 },
    to: { opacity: 0, x: 0 },
  }));

  useEffect(() => {
    console.log("isShow", isShow);
    setProps({ opacity: isShow ? 1 : 0, x: isShow ? 200 : 0 });
  }, [isShow]);

  return (
    <VerticalList gutter={20}>
      <ListItem>
        <Code>{`import { Spring, animated, config } from "react-spring";`}</Code>
      </ListItem>
      <SectionBlock title="Using React Spring hook." sampleCode={sampleCode}>
        <animated.div
          style={{ opacity: props.opacity, transform: props.x.to((x) => `translate(${x}px, 0)`) }}
          className="red-circle"
        />

        <BS />

        <Space>
          <DashkitButton onClick={() => toggle()}>SHOW/HIDE</DashkitButton>
        </Space>
      </SectionBlock>
    </VerticalList>
  );
};

export default ReactSpringHook;
