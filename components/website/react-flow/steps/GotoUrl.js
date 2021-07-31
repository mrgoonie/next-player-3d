import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Checkbox, Input } from "antd";
import React, { useEffect, useState } from "react";
import StepItemWrapper from "./StepItemWrapper";

const GotoUrl = ({ id, title, hideNewTab = false, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "", isNewTab: false });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	return (
		<StepItemWrapper title="Go to url">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					<Input placeholder="Your URL address" onChange={(e) => setData({ ...data, value: e.currentTarget.value })} />
				</ListItem>
				{hideNewTab == false && (
					<ListItem>
						<Checkbox onChange={(checked) => setData({ ...data, isNewTab: checked })}>New tab</Checkbox>
					</ListItem>
				)}
			</VerticalList>
		</StepItemWrapper>
	);
};

export default GotoUrl;
