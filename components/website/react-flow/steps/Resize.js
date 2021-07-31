import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import { NumericInput } from "@/components/diginext/form/NumbericInput";
import { HorizontalList, ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Checkbox, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import StepItemWrapper from "./StepItemWrapper";

const Resize = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "" });
	const [size, setSize] = useState({});

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	useEffect(() => {
		setData({ ...data, value: `${size.width},${size.height}` });
	}, [JSON.stringify(size)]);

	return (
		<StepItemWrapper title="Resize">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					<NumericInput
						addonBefore="Width"
						addonAfter="px"
						value={size.width}
						onChange={(value) => setSize({ ...size, width: value })}
					/>
				</ListItem>
				<ListItem>
					<NumericInput
						addonBefore="Height"
						addonAfter="px"
						value={size.height}
						onChange={(value) => setSize({ ...size, height: value })}
					/>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default Resize;
