import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Locator } from "./Locator";
import StepItemWrapper from "./StepItemWrapper";

const { Option } = Select;

const availableKeys = [
	"ENTER",
	"BACKSPACE",
	"SPACE",
	"ESCAPE",
	"TAB",
	"SHIFT",
	"CONTROL",
	"ALT/OPT",
	"COMMAND",
	"FUNCTION",
	"ARROW LEFT",
	"ARROW RIGHT",
	"ARROW UP",
	"ARROW DOWN",
	"INSERT",
	"DELETE",
	"HOME",
	"END",
	"PAGE UP",
	"PAGE DOWN",
];

const PressKey = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "" });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	return (
		<StepItemWrapper title="press key">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					<Locator onChange={({ by, value }) => setData({ ...data, selector: { by, value } })} />
				</ListItem>
				<ListItem>
					<Select showSearch onChange={(value) => setData({ ...data, value })}>
						{availableKeys.map((k, i) => (
							<Option key={i} value={_.snakeCase(k)}>
								{k}
							</Option>
						))}
					</Select>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default PressKey;
