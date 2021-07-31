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
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Schedule({ user, res, query, params }) {
	const router = useRouter();

	const header = (
		<PageHeader pretitle="list" title="Schedules" separator={true}>
			All test cases of your projects.
		</PageHeader>
	);

	const toolBar = (
		<>
			<HorizontalList gutter={10}>
				<ListItem>
					<Card>
						<CardBody>
							<Statistic
								title="Active users"
								prefix={<UserOutlined />}
								// value={data.data.filter((item) => typeof item.updatedAt != "undefined").length}
								value={0}
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
								// value={data.data.length}
								value={0}
								valueStyle={{ color: "#3f8600" }}
							/>
						</CardBody>
					</Card>
				</ListItem>
			</HorizontalList>
			<BS />
		</>
	);

	return (
		<LayoutPage header={header} user={user}>
			{toolBar}
		</LayoutPage>
	);
}
