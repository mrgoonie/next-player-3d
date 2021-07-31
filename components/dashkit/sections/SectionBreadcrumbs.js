import Card, { CardBody, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import Breadcrumb, { BreadcrumbItem } from "components/diginext/link/Breadcrumb";

const AdminSectionBreadcrumbs = ({ children, ...rest }) => {
  return (
    <Section id="breadcrumbs" padding="30px">
      <SectionHeader title="Breadcrumbs" separator={true}>
        Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.
      </SectionHeader>

      <Card shadow={true}>
        <CardBody>
          <Breadcrumb>
            <BreadcrumbItem href="/">Item 1</BreadcrumbItem>
            <BreadcrumbItem>Item 2</BreadcrumbItem>
            <BreadcrumbItem>Item 3</BreadcrumbItem>
          </Breadcrumb>
        </CardBody>
      </Card>

      <BlockSplitter height={20} />
    </Section>
  );
};

export default AdminSectionBreadcrumbs;
