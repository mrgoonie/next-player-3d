import Card, { CardBody, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonShape, ButtonSize, ButtonType } from "../Buttons";
import ButtonGroup from "components/dashkit/ButtonGroup";
import Dropdown, { DropdownMenu, DropdownMenuItem } from "components/dashkit/Dropdown";

const AdminSectionButtonGroups = ({ children, ...rest }) => {
  return (
    <Section id="button-group" padding="30px">
      <SectionHeader title="Button groups" separator={true}>
        Group a series of buttons together on a single line with the button group.
      </SectionHeader>

      <Card shadow={true}>
        <CardBody>
          <ButtonGroup>
            <DashkitButton size={ButtonSize.LARGE}>1</DashkitButton>
            <DashkitButton size={ButtonSize.LARGE}>2</DashkitButton>
            <DashkitButton size={ButtonSize.LARGE}>3</DashkitButton>
          </ButtonGroup>

          <InlineSplitter />

          <ButtonGroup>
            <DashkitButton type={ButtonType.SECONDARY}>1</DashkitButton>
            <DashkitButton type={ButtonType.SECONDARY}>2</DashkitButton>
            <DashkitButton type={ButtonType.SECONDARY}>3</DashkitButton>
          </ButtonGroup>

          <InlineSplitter />

          <ButtonGroup type={ButtonType.SECONDARY}>
            <DashkitButton className="active">1</DashkitButton>
            <DashkitButton>2</DashkitButton>
            <DashkitButton type={ButtonType.DANGER}>Khác style</DashkitButton>
            <DashkitButton>3</DashkitButton>
            <DashkitButton>4</DashkitButton>
            <Dropdown label="Dropdown" shape={ButtonShape.DEFAULT}>
              <DropdownMenu>
                <DropdownMenuItem onClick={() => console.log("Item 1")}>Item 1</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Item 2")}>Item 2</DropdownMenuItem>
                <DropdownMenuItem>Item 3</DropdownMenuItem>
                <DropdownMenuItem>Item 4</DropdownMenuItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </CardBody>
      </Card>

      <BlockSplitter height={20} />
    </Section>
  );
};

export default AdminSectionButtonGroups;
