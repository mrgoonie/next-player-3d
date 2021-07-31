import LayoutPage from "@/components/admin/LayoutPage";
import PageHeader from "@/components/dashkit/PageHeader";
import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Button, Space, Statistic } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import useSWR from "swr";
import CONFIG from "web.config";
import { HorizontalList, ListItem } from "@/components/diginext/layout/ListLayout";
import DashkitButton from "@/components/dashkit/Buttons";
import * as dayjs from "dayjs";
import { fetchApi } from "modules/FetchApi";
import Card, { CardBody } from "@/components/diginext/containers/Card";
import { BS } from "@/components/diginext/elements/Splitters";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Code({ user }) {
	const header = (
		<PageHeader
			pretitle="admin"
			title="Code"
			separator={true}
			button={
				<HorizontalList gutter={10}>
					<DashkitButton type="danger" href="/api/v1/code?download=1">
						Export all
					</DashkitButton>
					<DashkitButton onClick={() => handleReset()}>Reset</DashkitButton>
				</HorizontalList>
			}
		>
			Danh sách mã tham dự
		</PageHeader>
	);
	// data handle

	const [state, setState] = useState({
		searchText: "",
		searchedColumn: "",
	});
	const searchInput = useRef();

	const { data, error } = useSWR(CONFIG.getBasePath() + "/api/v1/code", fetcher);
	if (error) {
		console.log(`error`, error);
		return (
			<LayoutPage header={header} user={user}>
				<div>failed to load</div>
			</LayoutPage>
		);
	}
	if (!data)
		return (
			<LayoutPage header={header} user={user}>
				<div>loading...</div>
			</LayoutPage>
		);

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex,
							});
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current.select(), 100);
			}
		},
		render: (text) =>
			state.searchedColumn === dataIndex ? (
				<Highlighter
					key={dataIndex}
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[state.searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	// const clearFilters = () => {
	// 	setState({ filteredInfo: null });
	// };

	const handleReset = (clearFilters) => {
		// clearFilters();
		setState({ searchText: "" });
	};

	/**
	 * @type {import("antd/lib/table").ColumnsType}
	 */
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: "30%",
			...getColumnSearchProps("name"),
		},
		{
			title: "Code",
			dataIndex: "code",
			key: "code",
			width: "20%",
			...getColumnSearchProps("age"),
		},
		{
			title: "Organization",
			dataIndex: "org",
			key: "org",
			...getColumnSearchProps("org"),
			// sorter: (a, b) => a.length - b.length,
			// sortDirections: ["descend", "ascend"],
		},
		{
			title: "Created at",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (value) => {
				return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
			},
			// ...getColumnSearchProps("org"),
			// sorter: (a, b) => a.length - b.length,
			// sortDirections: ["descend", "ascend"],
		},
		{
			title: "Updated at",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (value) => {
				return value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "";
			},
			// ...getColumnSearchProps("updated"),
			// sorter: (a, b) => a.length - b.length,
			// sortDirections: ["descend", "ascend"],
		},
	];

	// statistics
	// const [totalUsers, setTotalUsers] = useState(0);
	// const [activeUsers, setActiveUsers] = useState(0);

	// useEffect(() => {
	// 	fetchApi({ path: "/api/v1/code" }).then((res) => {
	// 		const activeList = res.data.filter((item) => typeof item.updatedAt != "undefined");
	// 		setTotalUsers(res.data.length);
	// 		setActiveUsers(activeList.length);
	// 	});
	// }, []);

	return (
		<LayoutPage header={header} user={user}>
			<HorizontalList gutter={10}>
				<ListItem>
					<Card>
						<CardBody>
							<Statistic
								title="Active users"
								prefix={<UserOutlined />}
								value={data.data.filter((item) => typeof item.updatedAt != "undefined").length}
								valueStyle={{ color: "#3f8600" }}
							/>
						</CardBody>
					</Card>
				</ListItem>
				<ListItem>
					<Card>
						<CardBody>
							<Statistic
								title="Total users"
								prefix={<TeamOutlined />}
								value={data.data.length}
								valueStyle={{ color: "#3f8600" }}
							/>
						</CardBody>
					</Card>
				</ListItem>
			</HorizontalList>
			<BS />
			<Table columns={columns} dataSource={data.data} />
		</LayoutPage>
	);
}
