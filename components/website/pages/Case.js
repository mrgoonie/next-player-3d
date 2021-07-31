import React, { useEffect, useState } from "react";
import LayoutPage from "@/components/admin/LayoutPage";
import PageHeader from "@/components/dashkit/PageHeader";
import { ListItem } from "./../elements/ListItem";
import { FilterBar } from "./../elements/FilterBar";
import DashkitButton from "@/components/dashkit/Buttons";
import { fetchApi } from "modules/FetchApi";
import { useRouter } from "next/router";
import { List, Button } from "antd";
import { useSession } from "next-auth/client";
import { isEmpty } from "lodash";
import AppLink from "@/components/diginext/link/AppLink";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const pageSize = 10;
const apiPath = "/api/v1/case";

export default function Case({ user, res, query, params }) {
	// const router = useRouter();
	// const { case_slug } = router.query;
	// console.log(case_slug);

	const header = (
		<PageHeader
			pretitle="list"
			title="Test cases"
			separator={true}
			button={
				<DashkitButton type="danger" href="/case/new">
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
						title={<AppLink href={`/case/${item.id}`}>{item.name}</AppLink>}
						description={
							<>
								{(item.owner && `Owner: ${item.owner.name}`) || "-"}
								<br />
								{(item.updatedAt && `Last updated: ${dayjs(item.updatedAt).fromNow()}`) || "-"}
							</>
						}
						content={dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
						loading={item.loading}
						createdAt={item.createdAt}
					/>
				)}
			/>
		</LayoutPage>
	);
}
