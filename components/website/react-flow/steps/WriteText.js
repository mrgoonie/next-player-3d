import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { Locator } from "./Locator";
import StepItemWrapper from "./StepItemWrapper";

function handleChange(value) {
	console.log(`selected ${value}`);
}

const WriteText = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "" });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	return (
		<StepItemWrapper title="write text">
			<VerticalList gutter={6}>
				<ListItem>
					<Input
						placeholder="Title"
						defaultValue={title}
						onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
					/>
				</ListItem>
				<ListItem>
					<Locator onChange={handleChange} />
				</ListItem>
				<ListItem>
					<Input
						placeholder="Your text to be written"
						onChange={(e) => setData({ ...data, value: e.currentTarget.value })}
					/>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default WriteText;
