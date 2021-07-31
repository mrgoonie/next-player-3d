import { HorizontalList, ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input, Select, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { Locator } from "./Locator";
import StepItemWrapper from "./StepItemWrapper";

const { Option } = Select;

function handleChange(value) {
	console.log(`selected ${value}`);
}

const Mouse = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "", selector: { by: "", value: "" } });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	const onLocatorChange = ({ by, value }) => {
		setData({ ...data, selector: { by, value } });
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	return (
		<StepItemWrapper title="mouse gesture">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					<Locator onChange={onLocatorChange} />
				</ListItem>
				<ListItem>
					<HorizontalList gutter={5}>
						<ListItem size="stretch">
							<Select defaultValue="click" onChange={handleChange}>
								<Option value="click">Click</Option>
								<Option value="right_click">Right click</Option>
								<Option value="hover">Hover</Option>
								<Option value="scroll_down">Scroll down</Option>
								<Option value="scroll_up">Scroll up</Option>
							</Select>
						</ListItem>
						<ListItem size="stretch">
							<InputNumber placeholder="Times" min={1} max={10} />
						</ListItem>
					</HorizontalList>
				</ListItem>
				<ListItem>
					<label>Position</label>
					<HorizontalList gutter={5}>
						<ListItem size="stretch">
							<InputNumber placeholder="X" />
						</ListItem>
						<ListItem size="stretch">
							<InputNumber placeholder="Y" />
						</ListItem>
					</HorizontalList>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default Mouse;
