import { DefaultStyles } from "@/components/dashkit/style/DashkitGlobalStyle";
import { GridList } from "@/components/diginext/layout/ListLayout";
import {
	ArrowDownOutlined,
	ArrowsAltOutlined,
	CameraOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	FontSizeOutlined,
	GlobalOutlined,
	SelectOutlined,
	UploadOutlined,
	VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import React from "react";

export function StepContentTools({ onToolClick }) {
	const handleClick = ({ action, title }) => {
		if (onToolClick) onToolClick({ action, title });
	};

	return (
		<div className="step-card-tools">
			<style jsx global>{`
				.step-card-tools {
					margin-top: 10px;
					cursor: pointer;

					.step-tool-item {
						width: 80px;
						min-height: 64px;
						border: 1px dashed ${DefaultStyles.colors.disabled};
						border-radius: 8px;
						padding: 0.5rem 0.6rem 0.4rem 0.5rem;
						color: ${DefaultStyles.colors.disabled};
						font-size: 24px;
						text-align: center;
						transition: all 0.25s;

						&:hover {
							border-color: ${DefaultStyles.colors.primary};
							color: ${DefaultStyles.colors.primary};
						}

						p {
							font-size: 10px;
							margin-top: -4px;
						}
					}
				}
			`}</style>
			<GridList gutter={[6, 6]} itemAlign="center" itemType="center">
				<div className="step-tool-item " onClick={() => handleClick({ action: "go_to_url", title: "Go to URL" })}>
					<GlobalOutlined />
					<p>Go to URL</p>
				</div>
				<div className="step-tool-item " onClick={() => handleClick({ action: "click", title: "Click" })}>
					<SelectOutlined />
					<p>Click</p>
				</div>
				{/* <div className="step-tool-item " onClick={() => handleClick({ action: "mouse", title: "Mouse" })}>
					<SelectOutlined />
					<p>Mouse</p>
				</div> */}
				<div className="step-tool-item " onClick={() => handleClick({ action: "press_key", title: "Press key" })}>
					<VerticalAlignBottomOutlined />
					<p>Press key</p>
				</div>
				<div className="step-tool-item " onClick={() => handleClick({ action: "write_text", title: "Write text" })}>
					<FontSizeOutlined />
					<p>Write text</p>
				</div>
				<div className="step-tool-item " onClick={() => handleClick({ action: "scroll", title: "Scroll to" })}>
					<ArrowDownOutlined />
					<p>Scroll to</p>
				</div>
				<div className="step-tool-item " onClick={() => handleClick({ action: "resize", title: "Resize browser" })}>
					<ArrowsAltOutlined />
					<p>Resize</p>
				</div>
				<div className="step-tool-item " onClick={() => handleClick({ action: "verify", title: "Verify" })}>
					<CheckCircleOutlined />
					<p>Verify</p>
				</div>
				<div className="step-tool-item " onClick={() => handleClick({ action: "wait", title: "Wait for" })}>
					<ClockCircleOutlined />
					<p>Wait</p>
				</div>
				<div className="step-tool-item " onClick={() => handleClick({ action: "upload", title: "Upload file" })}>
					<UploadOutlined />
					<p>Upload</p>
				</div>
				<div
					className="step-tool-item "
					onClick={() => handleClick({ action: "screenshot", title: "Take a screenshot" })}
				>
					<CameraOutlined />
					<p>Screenshot</p>
				</div>
			</GridList>
		</div>
	);
}
