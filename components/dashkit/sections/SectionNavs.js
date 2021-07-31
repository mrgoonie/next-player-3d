import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import Highlight from "react-highlight";
import { useRef, useState } from "react";
import Dropdown, { DropdownMenu, DropdownMenuItem } from "components/dashkit/Dropdown";
import Nav, { NavItem } from "../Nav";

const SectionNavs = ({ children, ...rest }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="navs" padding="30px">
      <SectionHeader title="Navs" separator={true} spaceBottom={false}>
        Navbar for your web app.
      </SectionHeader>

      <BlockSplitter height={25} />

      <Card>
        <CardBody>
          <Nav borderBottom={true}>
            <NavItem onClick={() => setActiveIndex(0)} active={activeIndex == 0}>
              Active
            </NavItem>
            <NavItem onClick={() => setActiveIndex(1)} active={activeIndex == 1}>
              Link
            </NavItem>
            <NavItem onClick={() => setActiveIndex(2)} active={activeIndex == 2}>
              Link
            </NavItem>
            <NavItem onClick={() => setActiveIndex(3)} active={activeIndex == 3} disabled>
              Disabled
            </NavItem>
          </Nav>
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card>
        <CardBody>
          <Nav>
            <DashkitButton size={ButtonSize.LARGE} onClick={() => setActiveIndex(0)} active={activeIndex == 0}>
              Active
            </DashkitButton>
            <DashkitButton
              size={ButtonSize.LARGE}
              type={ButtonType.TRANSPARENT}
              onClick={() => setActiveIndex(1)}
              active={activeIndex == 1}
            >
              Link
            </DashkitButton>
            <DashkitButton
              size={ButtonSize.LARGE}
              type={ButtonType.TRANSPARENT}
              onClick={() => setActiveIndex(2)}
              active={activeIndex == 2}
            >
              Link
            </DashkitButton>
            <DashkitButton size={ButtonSize.LARGE} onClick={() => setActiveIndex(3)} active={activeIndex == 3} disabled>
              Disabled
            </DashkitButton>
          </Nav>
        </CardBody>
        <CardBody>
          <Nav>
            <DashkitButton onClick={() => setActiveIndex(0)} active={activeIndex == 0}>
              Active
            </DashkitButton>
            <DashkitButton
              type={ButtonType.TRANSPARENT}
              onClick={() => setActiveIndex(1)}
              active={activeIndex == 1}
            >
              Link
            </DashkitButton>
            <DashkitButton
              type={ButtonType.TRANSPARENT}
              onClick={() => setActiveIndex(2)}
              active={activeIndex == 2}
            >
              Link
            </DashkitButton>
            <DashkitButton onClick={() => setActiveIndex(3)} active={activeIndex == 3} disabled>
              Disabled
            </DashkitButton>
          </Nav>
        </CardBody>
        <CardBody>
          <Nav>
            <DashkitButton size={ButtonSize.SMALL} onClick={() => setActiveIndex(0)} active={activeIndex == 0}>
              Active
            </DashkitButton>
            <DashkitButton
              size={ButtonSize.SMALL}
              type={ButtonType.TRANSPARENT}
              onClick={() => setActiveIndex(1)}
              active={activeIndex == 1}
            >
              Link
            </DashkitButton>
            <DashkitButton
              size={ButtonSize.SMALL}
              type={ButtonType.TRANSPARENT}
              onClick={() => setActiveIndex(2)}
              active={activeIndex == 2}
            >
              Link
            </DashkitButton>
            <DashkitButton size={ButtonSize.SMALL} onClick={() => setActiveIndex(3)} active={activeIndex == 3} disabled>
              Disabled
            </DashkitButton>
          </Nav>
        </CardBody>
      </Card>

      <BlockSplitter />
    </Section>
  );
};

export default SectionNavs;
