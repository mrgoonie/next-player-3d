import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { Locator } from "./Locator";
import StepItemWrapper from "./StepItemWrapper";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function handleChange(value) {
	console.log(`selected ${value}`);
}

const props = {
	name: "file",
	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	headers: {
		authorization: "authorization-text",
	},
	onChange(info) {
		if (info.file.status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};

const UploadStep = ({ id, title, onChange }) => {
	const [data, setData] = useState({ id: id, title: title, value: "" });

	const handleChange = (params) => {
		if (onChange) onChange(params);
	};

	useEffect(() => {
		handleChange(data);
	}, [JSON.stringify(data)]);

	return (
		<StepItemWrapper title="upload">
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
					<Upload {...props}>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
				</ListItem>
			</VerticalList>
		</StepItemWrapper>
	);
};

export default UploadStep;
