import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import { NumericInput } from "@/components/diginext/form/NumbericInput";
import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import StepItemWrapper from "./StepItemWrapper";

const Wait = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "" });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	return (
		<StepItemWrapper title="Wait (pause)">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					{/* <InputNumber placeholder="Seconds" min={1} max={300} /> */}
					<NumericInput
						addonAfter="seconds"
						value={data.value}
						onChange={(value) => setData({ ...data, value: value })}
					/>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default Wait;
