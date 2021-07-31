import Card, { CardBody, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonShape, ButtonSize, ButtonType } from "../Buttons";

const AdminSectionButtons = ({ children, ...rest }) => {
  return (
    <Section id="buttons" padding="30px">
      <SectionHeader title="Buttons" separator={true}>
        Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
      </SectionHeader>

      <Card shadow={true}>
        <CardHeader>
          <h3>Sizes</h3>
        </CardHeader>
        <CardBody>
          <DashkitButton size={ButtonSize.LARGE}>Large button</DashkitButton>
          <InlineSplitter />
          <DashkitButton>Normal button</DashkitButton>
          <InlineSplitter />
          <DashkitButton size={ButtonSize.SMALL}>Small button</DashkitButton>
        </CardBody>
      </Card>

      <BlockSplitter height={20} />

      <Card shadow={true}>
        <CardHeader>
          <h3>Types</h3>
        </CardHeader>
        <CardBody>
          <DashkitButton type={ButtonType.PRIMARY}>Primary</DashkitButton>
          <InlineSplitter />
          <DashkitButton type={ButtonType.SECONDARY}>Secondary</DashkitButton>
          <InlineSplitter />
          <DashkitButton type={ButtonType.SUCCESS}>Success</DashkitButton>
          <InlineSplitter />
          <DashkitButton type={ButtonType.DANGER}>Danger</DashkitButton>
          <InlineSplitter />
          <DashkitButton type={ButtonType.WARNING}>Warning</DashkitButton>
          <InlineSplitter />
          <DashkitButton type={ButtonType.INFO}>Info</DashkitButton>
          <InlineSplitter />
          <DashkitButton type={ButtonType.LIGHT}>Light</DashkitButton>
          <InlineSplitter />
          <DashkitButton type={ButtonType.DARK}>Dark</DashkitButton>
          <InlineSplitter />
          {/* OUTLINE */}
          <DashkitButton outline={true} type={ButtonType.PRIMARY} style={{ marginBottom: "5px" }}>
            Primary
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton outline={true} type={ButtonType.SECONDARY}>
            Secondary
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton outline={true} type={ButtonType.SUCCESS}>
            Success
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton outline={true} type={ButtonType.DANGER}>
            Danger
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton outline={true} type={ButtonType.WARNING}>
            Warning
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton outline={true} type={ButtonType.INFO}>
            Info
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton outline={true} type={ButtonType.LIGHT}>
            Light
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton outline={true} type={ButtonType.DARK}>
            Dark
          </DashkitButton>
          <InlineSplitter />
        </CardBody>
      </Card>

      <BlockSplitter height={20} />

      <Card shadow={true}>
        <CardHeader>
          <h3>Rounded buttons</h3>
        </CardHeader>
        <CardBody>
          {/* ROUND */}
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.PRIMARY} style={{ marginBottom: "5px" }}>
            Primary
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.SECONDARY}>
            Secondary
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.SUCCESS}>
            Success
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.DANGER}>
            Danger
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.WARNING}>
            Warning
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.INFO}>
            Info
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.LIGHT}>
            Light
          </DashkitButton>
          <InlineSplitter />
          <DashkitButton shape={ButtonShape.ROUND} type={ButtonType.DARK}>
            Dark
          </DashkitButton>
          <InlineSplitter />
        </CardBody>
      </Card>
    </Section>
  );
};

export default AdminSectionButtons;
