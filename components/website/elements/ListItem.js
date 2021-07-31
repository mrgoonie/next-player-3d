import React from "react";
import { List, Skeleton, Tooltip } from "antd";
import AppLink from "@/components/diginext/link/AppLink";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function ListItem({ loading, thumb, title, description, content }) {
	return (
		<List.Item
			className="admin-list-item"
			actions={[
				<AppLink key="list-loadmore-edit" href="">
					<Tooltip title="Edit">
						<EditOutlined />
					</Tooltip>
				</AppLink>,
				<AppLink key="list-loadmore-more" href="">
					<Tooltip title="Delete">
						<DeleteOutlined />
					</Tooltip>
				</AppLink>,
			]}
		>
			<Skeleton avatar title={false} loading={loading} active>
				<List.Item.Meta avatar={thumb} title={title} description={description} />
				{content}
			</Skeleton>
		</List.Item>
	);
}
