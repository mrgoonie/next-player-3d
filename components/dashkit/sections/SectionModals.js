import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import Highlight from "react-highlight";
import { useRef, useState } from "react";
import { Modal, Button } from "antd";

const SectionModals = ({ children, ...rest }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Section id="modals" padding="30px">
      <SectionHeader title="Modals" separator={true} spaceBottom={false}>
        Use `ant.design` component:{" "}
        <a href="https://ant.design/components/modal/" target="_blank">
          https://ant.design/components/modal/
        </a>
      </SectionHeader>

      <BlockSplitter height={25} />

      <Card>
        <CardBody>
          <DashkitButton onClick={() => setVisible(true)}>Show popup</DashkitButton>
          <Modal
            title="Modal 600px width"
            centered
            visible={visible}
            footer={<DashkitButton onClick={() => setVisible(false)}>OK</DashkitButton>}
            // onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            // width={600}
          >
            Hello
          </Modal>
        </CardBody>
      </Card>

      <BlockSplitter />
    </Section>
  );
};

export default SectionModals;
