import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import Highlight from "react-highlight";
import { useRef } from "react";
import Dropdown, { DropdownMenu, DropdownMenuItem } from "components/dashkit/Dropdown";
import { Tooltip } from "antd";

const AdminSectionTooltips = ({ children, ...rest }) => {
  // const tipRef = useRef();
  return (
    <Section id="tooltips" padding="30px">
      <SectionHeader title="Tooltips" separator={true} spaceBottom={false}>
        Use `ant.design` component:{" "}
        <a href="https://ant.design/components/tooltip/" target="_blank">
          https://ant.design/components/tooltip/
        </a>
      </SectionHeader>

      <BlockSplitter height={25} />

      <Card>
        <CardBody>
          <Tooltip title="The text shown in the tooltip">
            <DashkitButton>Hover me</DashkitButton>
          </Tooltip>
          <BlockSplitter />
          <Tooltip title="The text shown in the tooltip">
            <span>Hover to show tip now!</span>
          </Tooltip>
        </CardBody>
      </Card>

      <BlockSplitter />
    </Section>
  );
};

export default AdminSectionTooltips;
