import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import { BS } from "@/components/diginext/elements/Splitters";
import { CloseOutlined, CopyOutlined, DragOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SortableContainer, SortableElement, sortableHandle } from "react-sortable-hoc";

const DragHandle = sortableHandle(() => (
	<span style={{ cursor: "pointer" }}>
		<DragOutlined />
	</span>
));

const SortableItem = SortableElement(({ id, children, data, index, sortable = true, onRemove, ...rest }) => {
	// const { sortable } = rest;
	// console.log(`rest`, rest);

	return (
		<div className="sortable-item" {...rest}>
			<style jsx>{`
				.sortable-item {
					position: relative;
					margin-bottom: 10px;
				}
				.step-item-handler {
					position: absolute;
					top: 10px;
					right: -20px;
					color: ${DefaultStyles.colors.disabled};
				}
			`}</style>

			{children}

			<div className="step-item-handler">
				{sortable && (
					<>
						<CloseOutlined onClick={() => onRemove(id)} />
						<BS size={0} />
						<DragHandle />
						<BS size={0} />
					</>
				)}
				<CopyOutlined style={{ cursor: "pointer" }} />
			</div>
		</div>
	);
});

export { SortableItem };

// export function SortableItem({ children, data, index, ...rest }) {
// 	return (
// 		<Draggable draggableId={data.id} index={index} {...rest}>
// 			{(provided) => (
// 				<div
// 					className="sortable-item"
// 					key={`sortable-item-${index}-${data.id}`}
// 					ref={provided.innerRef}
// 					{...provided.draggableProps}
// 				>
// 					<style jsx>{`
// 						.sortable-item {
// 							position: relative;
// 							margin-bottom: 10px;
// 						}
// 						.step-item-handler {
// 							position: absolute;
// 							top: 10px;
// 							right: -20px;
// 							color: ${DefaultStyles.colors.disabled};
// 						}
// 					`}</style>

// 					{children}

// 					<div className="step-item-handler">
// 						<CloseOutlined />
// 						<BS size={0} />
// 						<span {...provided.dragHandleProps}>
// 							<DragOutlined />
// 						</span>
// 						<BS size={0} />
// 						<CopyOutlined />
// 					</div>
// 				</div>
// 			)}
// 		</Draggable>
// 	);
// }

// export function SortableItem(props) {
// 	const { children } = props;
// 	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

// 	const style = {
// 		transform: CSS.Transform.toString(transform),
// 		transition,
// 		marginBottom: "10px",
// 		position: "relative",
// 	};

// 	return (
// 		<div ref={setNodeRef} style={style} {...attributes}>
// 			<style jsx>{`
// 				.step-item-handler {
// 					position: absolute;
// 					top: 10px;
// 					right: -20px;
// 					color: ${DefaultStyles.colors.disabled};
// 				}
// 			`}</style>

// 			{children}

// 			<div className="step-item-handler">
// 				<CloseOutlined />
// 				<BS size={0} />
// 				<span {...listeners} {...arguments}>
// 					<DragOutlined />
// 				</span>
// 				<BS size={0} />
// 				<CopyOutlined />
// 			</div>
// 		</div>
// 	);
// }
