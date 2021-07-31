import { ListItem } from "./../elements/ListItem";
import { FilterBar } from "./../elements/FilterBar";
import LayoutPage from "@/components/admin/LayoutPage";
import PageHeader from "@/components/dashkit/PageHeader";
import React, { useEffect, useState } from "react";
import DashkitButton from "@/components/dashkit/Buttons";
import { useRouter } from "next/router";
import { List, Avatar, Button, Skeleton, Tooltip } from "antd";
import { fetchApi } from "modules/FetchApi";
import { useSession } from "next-auth/client";
import { isEmpty } from "lodash";
import AppLink from "@/components/diginext/link/AppLink";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const pageSize = 10;

export default function Team({ user, res, query, params }) {
	const [session] = useSession();
	const router = useRouter();

	const header = (
		<PageHeader
			pretitle="list"
			title="Team"
			separator={true}
			button={
				<DashkitButton type="danger" href="/team/add">
					Add member
				</DashkitButton>
			}
		>
			Your team's members
		</PageHeader>
	);

	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	const [page, setPage] = useState(0);
	const [totalPage, setTotalPage] = useState(1);

	useEffect(() => {
		console.log(session);
		// load initial data
		if (session && session.user && page == 0) {
			loadData(1);
		}
	}, [session]);

	const loadData = (_page) => {
		setPage(_page);
		setLoading(true);
		setList(data.concat([...new Array(pageSize)].map(() => ({ loading: true, name: {} }))));

		fetchApi({ path: `/api/v1/user?team=${session.user.team_id}&page=${_page}&size=${pageSize}` }).then((res) => {
			const _data = !isEmpty(res.data) ? data.concat(res.data) : data;
			setData(_data);
			setList(_data);
			setLoading(false);
			setInitLoading(false);
			setTotalPage(res.total_pages);
		});
	};

	const onLoadMore = () => {
		loadData(page + 1);
	};

	const loadMore =
		!initLoading && !loading && page < totalPage ? (
			<div
				style={{
					textAlign: "center",
					marginTop: 12,
					// height: 32,
					// lineHeight: "32px",
				}}
			>
				<DashkitButton onClick={onLoadMore}>Load more</DashkitButton>
			</div>
		) : null;

	return (
		<LayoutPage header={header} user={user}>
			{/* TOOLBAR */}
			<FilterBar />

			{/* LIST */}
			<List
				className="demo-loadmore-list"
				loading={initLoading}
				itemLayout="horizontal"
				loadMore={loadMore}
				dataSource={list}
				renderItem={(item) => (
					<ListItem
						title={<AppLink href="/profile">{item.name}</AppLink>}
						description={item.email || "-"}
						content="Owner"
						loading={item.loading}
						thumb={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
					/>
				)}
			/>
		</LayoutPage>
	);
}
