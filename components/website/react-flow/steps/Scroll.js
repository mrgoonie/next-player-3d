import { HorizontalList, ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input, Select, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { Locator } from "./Locator";
import StepItemWrapper from "./StepItemWrapper";

const Scroll = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "0,0", selector: { by: "", value: "" } });
	const [pos, setPos] = useState({});

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	useEffect(() => {
		setData({ ...data, value: `${pos.left},${pos.top}` });
	}, [JSON.stringify(pos)]);

	return (
		<StepItemWrapper title="Scroll to">
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
					<label>Position</label>
					<HorizontalList gutter={5}>
						<ListItem size="stretch">
							<InputNumber placeholder="scrollLeft" onChange={(left) => setPos({ ...pos, left })} />
						</ListItem>
						<ListItem size="stretch">
							<InputNumber placeholder="scrollTop" onChange={(top) => setPos({ ...pos, top })} />
						</ListItem>
					</HorizontalList>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default Scroll;
