import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import Highlight from "react-highlight";
import { useRef } from "react";
import Dropdown, { DropdownMenu, DropdownMenuItem } from "components/dashkit/Dropdown";

const AdminSectionDropdowns = ({ children, ...rest }) => {
  const notEmptyInputRef = useRef();
  const textEditorRef = useRef();

  return (
    <Section id="dropdowns" padding="30px">
      <SectionHeader title="Dropdowns" separator={true} spaceBottom={false}>
        Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.
      </SectionHeader>

      <BlockSplitter height={25} />

      <Card>
        <CardBody>
          <Dropdown label="Dropdown">
            <DropdownMenu>
              <DropdownMenuItem onClick={() => console.log("Item 1")}>Item 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Item 2")}>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
              <DropdownMenuItem>Item 4</DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>

          <InlineSplitter />

          <Dropdown label="Dropdown" type={ButtonType.SECONDARY}>
            <DropdownMenu>
              <DropdownMenuItem onClick={() => console.log("Item 1")}>Item 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Item 2")}>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
              <DropdownMenuItem>Item 4</DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card>
        <CardHeader>
          <h3>Dropdown with a card as content.</h3>
        </CardHeader>
        <CardBody>
          <Dropdown label="Dropdown">
            <Card width="30rem">
              <CardBody>
                <h3>Card title</h3>
                <BlockSplitter />
                <p>Lorem ipsum dolor sid amed...</p>
              </CardBody>
            </Card>
          </Dropdown>
        </CardBody>
      </Card>
    </Section>
  );
};

export default AdminSectionDropdowns;
