import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import Highlight from "react-highlight";
import { useRef } from "react";
import Dropdown, { DropdownMenu, DropdownMenuItem } from "components/dashkit/Dropdown";
import { notification, Tooltip } from "antd";
import AppLink from "components/diginext/link/AppLink";

const SectionNotifications = ({ children, ...rest }) => {
  // const tipRef = useRef();
  const showTopRight = () => {
    notification.open({
      message: "Hello my friend!",
    });
  };

  const showError = () => {
    notification.error({
      message: "Something isn't right!",
      description: "Check your code again at line [135].",
    });
  };

  return (
    <Section id="notifications" padding="30px">
      <SectionHeader title="Notifications" separator={true} spaceBottom={false}>
        Use `ant.design` component:{" "}
        <AppLink href="https://ant.design/components/notification/" target="_blank">
          https://ant.design/components/notification/
        </AppLink>
      </SectionHeader>

      <BlockSplitter height={25} />

      <Card>
        <CardBody>
          <DashkitButton onClick={showTopRight}>Show notification at top right of the screen</DashkitButton>
          <BlockSplitter />
          <DashkitButton type={ButtonType.DANGER} onClick={showError}>
            Show error notification
          </DashkitButton>
        </CardBody>
      </Card>

      <BlockSplitter />
    </Section>
  );
};

export default SectionNotifications;
