import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import Highlight from "react-highlight";
import { useRef, useState } from "react";
import { Pagination, Tooltip } from "antd";
import AdminPagination from "components/dashkit/Pagination";

const AdminSectionPaginations = ({ children, ...rest }) => {

  const [curPage, setCurPage] = useState(1);
  
  const onDashkitPageChange = (e) => {
    console.log(e);
    setCurPage(e.current);
  }

  return (
    <Section id="paginations" padding="30px">
      <SectionHeader title="Paginations" separator={true} spaceBottom={false}></SectionHeader>

      <BlockSplitter height={25} />

      <SectionHeader title="Ant.design Component" size={2} separator={true}>
        Use `ant.design` component:{" "}
        <a href="https://ant.design/components/pagination/" target="_blank">
          https://ant.design/components/pagination/
        </a>
      </SectionHeader>

      <Card>
        <CardBody>
          <Pagination defaultCurrent={1} total={50} />
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card>
        <CardBody>
          <Pagination defaultCurrent={6} total={500} />
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card>
        <CardBody>
          <Pagination size="small" total={50} defaultPageSize={8} />
        </CardBody>
      </Card>

      <BlockSplitter />

      <SectionHeader title="Dashkit Component" size={2} separator={true}>
        Use <strong>Dashkit Component</strong>:
        <a href="https://ant.design/components/pagination/" target="_blank">
          https://ant.design/components/pagination/
        </a>
      </SectionHeader>

      <Card shadow={true}>
        <CardBody>
          <AdminPagination total={50} pageSize={20}  onChange={onDashkitPageChange}/>
          <InlineSplitter />
          Current page is: {curPage}
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card shadow={true}>
        <CardBody>
          <AdminPagination type={ButtonType.WARNING} total={55} pageSize={5} displayPages={5} />
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card shadow={true}>
        <CardBody>
          <AdminPagination type={ButtonType.DANGER} size={ButtonSize.SMALL} total={50} pageSize={10} />
          <BlockSplitter />
          <AdminPagination type={ButtonType.DANGER} size={ButtonSize.NORMAL} total={50} pageSize={10} />
          <BlockSplitter />
          <AdminPagination type={ButtonType.DANGER} size={ButtonSize.LARGE} total={50} pageSize={10} />
        </CardBody>
      </Card>

      <BlockSplitter />
    </Section>
  );
};

export default AdminSectionPaginations;
