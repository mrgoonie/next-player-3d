import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import Highlight from "react-highlight";
import { useRef, useState } from "react";
import Dropdown, { DropdownMenu, DropdownMenuItem } from "components/dashkit/Dropdown";
import { Table, Tooltip } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"],
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const SectionTables = ({ children, ...rest }) => {
  const [selectionType, setSelectionType] = useState("checkbox");

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <Section id="tables" padding="30px">
      <SectionHeader title="Tables" separator={true} spaceBottom={false}>
        Use `ant.design` component:{" "}
        <a href="https://ant.design/components/table/" target="_blank">
          https://ant.design/components/table/
        </a>
      </SectionHeader>

      <BlockSplitter height={25} />

      <Card>
        <CardHeader>Table title</CardHeader>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </Card>

      <BlockSplitter />
    </Section>
  );
};

export default SectionTables;
