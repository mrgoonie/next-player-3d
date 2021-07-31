import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Checkbox, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import StepItemWrapper from "./StepItemWrapper";

const Screenshot = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "" });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	return (
		<StepItemWrapper title="Screenshot">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					<Checkbox onChange={(checked) => setData({ ...data, value: checked ? "full" : "" })}>Full page</Checkbox>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default Screenshot;
