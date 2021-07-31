import { ListItem } from "./../elements/ListItem";
import { FilterBar } from "./../elements/FilterBar";
import LayoutPage from "@/components/admin/LayoutPage";
import PageHeader from "@/components/dashkit/PageHeader";
import React, { useEffect, useState } from "react";
import DashkitButton from "@/components/dashkit/Buttons";
import { List } from "antd";
import { fetchApi } from "modules/FetchApi";
import { useSession } from "next-auth/client";
import { isEmpty } from "lodash";
import AppLink from "@/components/diginext/link/AppLink";

const pageSize = 10;
const apiPath = "/api/v1/project";

export default function Project({ user, res, query, params }) {
	const header = (
		<PageHeader
			pretitle="list"
			title="Project"
			separator={true}
			button={
				<DashkitButton type="danger" href="/team/add">
					Create
				</DashkitButton>
			}
		>
			All test cases of your projects.
		</PageHeader>
	);

	const [session] = useSession();
	// if (session) console.log(session.user);

	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	const [page, setPage] = useState(0);
	const [totalPage, setTotalPage] = useState(1);

	useEffect(() => {
		// load initial data
		if (session && session.user && page == 0) {
			loadData(1);
		}
	}, [session]);

	const loadData = (_page) => {
		setPage(_page);
		setLoading(true);
		setList(data.concat([...new Array(pageSize)].map(() => ({ loading: true, name: {} }))));

		fetchApi({ path: `${apiPath}?team=${session.user.team_id}&populate=owner&page=${_page}&size=${pageSize}` }).then(
			(res) => {
				const _data = !isEmpty(res.data) ? data.concat(res.data) : data;
				setData(_data);
				setList(_data);
				setLoading(false);
				setInitLoading(false);
				setTotalPage(res.total_pages);
				// console.log(_data);
			}
		);
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
						description={(item.owner && `Owner: ${item.owner.name}`) || "-"}
						content="Active"
						loading={item.loading}
					/>
				)}
			/>
		</LayoutPage>
	);
}
