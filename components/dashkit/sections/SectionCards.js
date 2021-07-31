import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonShape, ButtonSize, ButtonType } from "../Buttons";
import Code from "components/diginext/elements/Code";

const AdminSectionCards = ({ children, ...rest }) => {
  return (
    <Section id="cards" padding="30px">
      <SectionHeader title="Cards" separator={true}>
        Cards provide a flexible and extensible content container with multiple variants and options.
      </SectionHeader>

      <Card shadow={true}>
        <CardBody>
          <h2>Card title</h2>
          <BlockSplitter />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis non dolore est fuga nobis ipsum illum
            eligendi nemo iure repellat, soluta, optio minus ut reiciendis voluptates enim impedit veritatis officiis.
          </p>
          <BlockSplitter />
          <DashkitButton>Go somewhere</DashkitButton>
        </CardBody>
        <CardFooter padding="0">
          <Code>
            {`<Card shadow={true}>
  <CardBody>
    <h2>Card title</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis non dolore est fuga nobis ipsum illum
      eligendi nemo iure repellat, soluta, optio minus ut reiciendis voluptates enim impedit veritatis officiis.
    </p>
    <DashkitButton>Go somewhere</DashkitButton>
  </CardBody>
</Card>`}
          </Code>
        </CardFooter>
      </Card>

      <BlockSplitter height={20} />

      <SectionHeader title="Card header" size={2}>
        Easily create a card header of a fixed height and populate it with text, buttons, or a navigation.
      </SectionHeader>

      <Card shadow={true}>
        <CardHeader>
          <h3>Card title</h3>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis fugiat dolorem, expedita rem. Quis
          natus officiis asperiores rem ipsum, dolore cumque voluptatum iste vel alias, recusandae culpa hic pariatur
          quos.
        </CardBody>
        <CardFooter padding="0">
          <Code>{`<Card shadow={true}>
  <CardHeader>
    <h3>Card title</h3>
  </CardHeader>
  <CardBody>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis fugiat dolorem, expedita rem. Quis
    natus officiis asperiores rem ipsum, dolore cumque voluptatum iste vel alias, recusandae culpa hic pariatur
    quos.
  </CardBody>
</Card>`}</Code>
        </CardFooter>
      </Card>
    </Section>
  );
};

export default AdminSectionCards;
