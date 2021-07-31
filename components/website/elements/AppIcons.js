import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import {
	ArrowRightOutlined,
	BarsOutlined,
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	PartitionOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import React from "react";

const StartIcon = ({ size = 40, style }) => {
	return (
		<span className="app-icon start" style={style}>
			<style jsx>{`
				.start {
					background-color: ${DefaultStyles.colors.success};
					width: ${size}px;
					height: ${size}px;
					font-size: ${size * 0.5}px;
				}
			`}</style>
			<ArrowRightOutlined className="icon" />
		</span>
	);
};

const AddIcon = ({ size = 40, style }) => {
	return (
		<span className="app-icon add plus" style={style}>
			<style jsx>{`
				.add {
					background-color: ${DefaultStyles.colors.primary};
					width: ${size}px;
					height: ${size}px;
					font-size: ${size * 0.5}px;
				}
			`}</style>
			<PlusOutlined className="icon" />
		</span>
	);
};

const StepIcon = ({ size = 40, style }) => {
	return (
		<span className="app-icon step" style={style}>
			<style jsx>{`
				.step {
					background-color: ${DefaultStyles.colors.info};
					width: ${size}px;
					height: ${size}px;
					font-size: ${size * 0.5}px;
				}
			`}</style>
			<BarsOutlined className="icon" />
		</span>
	);
};

const ArrangeIcon = ({ size = 40, style }) => {
	return (
		<span className="app-icon arrange" style={style}>
			<style jsx>{`
				.arrange {
					background-color: white;
					color: ${DefaultStyles.colors.disabled};
					width: ${size}px;
					height: ${size}px;
					font-size: ${size * 0.5}px;
				}
			`}</style>
			<PartitionOutlined className="icon" />
		</span>
	);
};

const DeleteIcon = ({ size = 40, style }) => {
	return (
		<span className="app-icon delete" style={style}>
			<style jsx>{`
				.delete {
					border: 1px solid lightgray;
					background-color: white;
					color: ${DefaultStyles.colors.danger};
					width: ${size}px;
					height: ${size}px;
					font-size: ${size * 0.5}px;

					&:hover {
						background-color: ${DefaultStyles.colors.danger};
						color: white;
						transition: all 0.25s;
					}
				}
			`}</style>
			<DeleteOutlined className="icon" />
		</span>
	);
};

const SuccessIcon = ({ size = 40, style }) => {
	return (
		<span className="app-icon success" style={style}>
			<style jsx>{`
				.success {
					border: none;
					background-color: rgb(136, 218, 156);
					color: ${DefaultStyles.colors.brightest};
					width: ${size}px;
					height: ${size}px;
					font-size: ${size * 0.5}px;

					&:hover {
						background-color: ${DefaultStyles.colors.danger};
						color: white;
						transition: all 0.25s;
					}
				}
			`}</style>
			<CheckOutlined className="icon" />
		</span>
	);
};

const FailedIcon = ({ size = 40, style }) => {
	return (
		<span className="app-icon failed" style={style}>
			<style jsx>{`
				.failed {
					border: none;
					background-color: rgb(238, 197, 197);
					color: ${DefaultStyles.colors.danger};
					width: ${size}px;
					height: ${size}px;
					font-size: ${size * 0.5}px;

					&:hover {
						background-color: ${DefaultStyles.colors.danger};
						color: white;
						transition: all 0.25s;
					}
				}
			`}</style>
			<CloseOutlined className="icon" />
		</span>
	);
};

export { StartIcon, AddIcon, ArrangeIcon, StepIcon, DeleteIcon, SuccessIcon, FailedIcon };
