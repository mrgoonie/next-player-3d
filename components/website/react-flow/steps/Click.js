import { NumericInput } from "@/components/diginext/form/NumbericInput";
import { HorizontalList, ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input, Select, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { Locator } from "./Locator";
import StepItemWrapper from "./StepItemWrapper";

const { Option } = Select;

const Click = ({ id, title, onChange }) => {
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
		<StepItemWrapper title="mouse click">
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
					{/* <InputNumber placeholder="Times" min={1} max={10} onChange={(value) => setData({ ...data, value: value })} /> */}
					<NumericInput
						placeholder="Times"
						value={data.value}
						onChange={(value) => setData({ ...data, value: value })}
					/>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default Click;
