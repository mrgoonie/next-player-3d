import { Locator } from "./Locator";
import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import StepItemWrapper from "./StepItemWrapper";

const { Option } = Select;

const Verify = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "", selector: { by: "", value: "" } });
	const [val, setVal] = useState({ operator: "", value: "" });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	useEffect(() => {
		setData({ ...data, value: `${val.operator},${val.value}` });
	}, [JSON.stringify(val)]);

	return (
		<StepItemWrapper title="verify">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					<Locator onChange={(selector) => setData({ ...data, selector })} />
				</ListItem>
				<ListItem>
					<Select showSearch placeholder="- select -" onChange={(value) => setVal({ ...val, operator: value })}>
						<Option value="equal">Equal to</Option>
						<Option value="not_equal">Not equal to</Option>
						<Option value="existed">Existed</Option>
						<Option value="not_existed">Not existed</Option>
						<Option value="visible">Visible</Option>
						<Option value="not_visible">Not visible</Option>
						<Option value="contain">Contain text</Option>
						<Option value="not_contain">Not contain text</Option>
						<Option value="greater_than">Greater than</Option>
						<Option value="greater_than_equal">Greater than or equal to</Option>
						<Option value="less_than">Less than</Option>
						<Option value="less_than_equal">Less than or equal to</Option>
						<Option value="has_class">Has class</Option>
						<Option value="not_has_class">Not has class</Option>
						<Option value="id_is">ID is</Option>
						<Option value="id_is_not">ID is not</Option>
					</Select>
				</ListItem>
				<ListItem>
					<Input placeholder="Value" onChange={(e) => setVal({ ...val, value: e.currentTarget.value })} />
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default Verify;
