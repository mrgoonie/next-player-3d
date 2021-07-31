import React, { useEffect, useState } from "react";
import SectionBlock from "../SectionBlock";
import Space from "antd/lib/space";
import { BS, LS } from "components/diginext/elements/Splitters";
import DashkitButton from "components/dashkit/Buttons";

import { Spring, animated } from "react-spring";
import { useBoolean } from "ahooks";
import { ListItem, VerticalList } from "components/diginext/layout/ListLayout";
import Code from "components/diginext/elements/Code";

const sampleCode = `<Spring
  to={{
    opacity: isShow ? 1 : 0,
    transform: isShow ? "translate(200px, 0px)" : "translate(0px, 0px)",
  }}
  >
  {(props) => <animated.div style={props} className="red-circle" />}
</Spring>`;

const ReactSpringBasic = () => {
  const [isShow, { toggle }] = useBoolean(true);

  return (
    <VerticalList gutter={20}>
      <ListItem>
        <Code>{`import { Spring, animated, config } from "react-spring";`}</Code>
      </ListItem>
      <SectionBlock title="Using React Spring component." sampleCode={sampleCode}>
        <Spring
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
    </VerticalList>
  );
};

export default ReactSpringBasic;
