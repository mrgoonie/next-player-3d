import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import DashkitButton from "../Buttons";
import Nav, { NavItem } from "../Nav";
import SectionHeader from "../PageHeader";

const AdminSectionPageHeaders = ({ children, ...rest }) => {
  return (
    <Section id="page-headers" padding="30px">
      <SectionHeader title="Page headers" separator={true}>
        The page header component that can be easily used in page layout.
      </SectionHeader>

      <Card shadow={true}>
        <CardBody>
          <SectionHeader title="Largest header" size={1} spaceBottom={0}>
            Largest section header.
          </SectionHeader>
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card shadow={true}>
        <CardBody>
          <SectionHeader pretitle="some pre-title here" title="Smaller header" size={2} spaceBottom={0}>
            Smaller section header.
          </SectionHeader>
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card shadow={true}>
        <CardBody>
          <SectionHeader title="Smallest header" size={3} spaceBottom={0}>
            Smallest section header.
          </SectionHeader>
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card shadow={true}>
        <CardBody>
          <SectionHeader
            title="Header with button"
            size={2}
            spaceBottom={0}
            button={<DashkitButton>Go somewhere</DashkitButton>}
          >
            Button on the right side.
          </SectionHeader>
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card shadow={true}>
        <CardBody>
          <SectionHeader
            title="Header with nav"
            size={2}
            spaceBottom={0}
            button={
              <Nav>
                <NavItem active>Active</NavItem>
                <NavItem>Link 1</NavItem>
                <NavItem>Link 2</NavItem>
              </Nav>
            }
          >
            Button on the right side.
          </SectionHeader>
        </CardBody>
      </Card>

      <BlockSplitter />
    </Section>
  );
};

export default AdminSectionPageHeaders;
