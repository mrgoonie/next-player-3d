import { StepContentTools } from "./StepContentTools";
import { Drawer, message } from "antd";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useToggle } from "ahooks";
import arrayMove from "array-move";
import { v4 as uuidv4 } from "uuid";
import { SortableList } from "./SortableList";

const StepContent = ({ visible = false, data, onClose, onUpdate }) => {
	const [items, setItems] = useState([]);
	const [title, setTitle] = useState("");
	// const [currentData, setCurrentData] = useState();
	const [saving, savingControl] = useToggle();

	const handleUpdate = () => {
		if (!data) return;
		// console.log(nodes);
		console.log("[updated] items:", items);
		const newData = {
			...data,
			data: {
				...data.data,
				steps: items,
			},
		};
		// setCurrentData(newData);
		if (onUpdate) onUpdate(newData);
	};

	useEffect(() => {
		handleUpdate();
	}, [items]);

	useEffect(() => {
		// console.log(`data`, data);
		// setCurrentData(data);
		if (data) {
			setTitle(data.data.title);
			setItems(data.data.steps);
		} else {
			setTitle(null);
		}
	}, [data]);

	const stepTitleInput = (
		<Input
			className="step-content-title-input"
			bordered={false}
			placeholder="Name of the group"
			defaultValue={title}
			suffix={saving && <LoadingOutlined />}
		/>
	);

	const onSortEnd = ({ oldIndex, newIndex }) => {
		if (!items[newIndex].sortable) {
			message.error(`Step "Go to URL" of the starting step is not replaceable.`);
			return;
		}
		const sortedItems = arrayMove(items, oldIndex, newIndex);
		const newItems = sortedItems.map((item, index) => {
			const nextItem = sortedItems[index + 1];
			return { ...item, next: nextItem ? [nextItem.id] : [] };
		});
		setItems(newItems);
	};

	const onChange = (params) => {
		console.log("onchange:", params);
		const newItems = items.map((item) =>
			item.id == params.id ? { ...item, selector: params.selector, title: params.title, value: params.value } : item
		);
		setItems(newItems);
	};

	const removeStepItem = (id) => {
		// console.log(`remove -> id:`, id);
		const newItems = [...items];
		_.remove(newItems, (item) => item.id == id);
		console.log("newItems:", newItems);
		setItems(newItems);
	};

	const addStepItem = ({ action, title = "" }) => {
		// console.log(`lastItem`, lastItem);
		const newStepId = uuidv4();

		const lastItem = _.last(items);
		if (lastItem) lastItem.next = [newStepId];

		const newItem = {
			id: newStepId,
			sortable: true,
			title: title,
			action: action,
			selector: {
				by: "",
				value: "",
			},
			expect: {
				type: "",
				comparision: "",
			},
			value: "",
			next: [],
		};

		setItems([...items, newItem]);
	};

	return (
		<Drawer
			title={title ? stepTitleInput : null}
			placement="left"
			closable={false}
			onClose={onClose}
			visible={visible}
			getContainer={false}
			width={350}
			style={{ position: "absolute", overflow: "hidden" }}
			bodyStyle={{ padding: "10px 5px", overflowX: "hidden", overflowY: "auto" }}
		>
			<SortableList
				items={items}
				onChange={onChange}
				onSortEnd={onSortEnd}
				onRemove={(id) => removeStepItem(id)}
				useDragHandle
				lockAxis="y"
			/>

			<StepContentTools onToolClick={({ action, title }) => addStepItem({ action, title })} />
		</Drawer>
	);
};

export default StepContent;
