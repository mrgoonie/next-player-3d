import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import { HorizontalList, ListItem } from "@/components/diginext/layout/ListLayout";
import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const options = [
	{
		name: "Query selector",
		value: "query",
	},
	{
		name: "Element ID",
		value: "id",
	},
	{
		name: "Element class",
		value: "class",
	},
	{
		name: "Text inside",
		value: "text_inside",
	},
];

/**
 * @param  {Object} props
 * @param  {function({by:String,value:String})} props.onChange - a callback function of locator
 */
export function Locator({ onChange }) {
	const [by, setBy] = useState(options[0].value);
	const [value, setValue] = useState("");

	useEffect(() => {
		if (onChange) onChange({ by, value });
	}, [by, value]);

	return (
		<>
			<label style={{color: DefaultStyles.colors.secondary}}>Locate element by</label>
			<HorizontalList gutter={5}>
				<ListItem size="stretch">
					<Select placeholder="- selector -" defaultValue={options[0].value} onChange={(value) => setBy(value)}>
						{options.map((opt, index) => (
							<Option key={`opt-${index}`} value={opt.value}>
								{opt.name}
							</Option>
						))}
					</Select>
				</ListItem>
				<ListItem size="stretch">
					<Input placeholder="" onChange={(e) => setValue(e.currentTarget.value)} />
				</ListItem>
			</HorizontalList>
		</>
	);
}
