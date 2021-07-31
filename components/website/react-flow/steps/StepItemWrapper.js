import { DefaultStyles } from "@/components/admin/layout/AdminGlobalStyle";
import { BS } from "@/components/diginext/elements/Splitters";
import { CloseOutlined, CopyOutlined, DragOutlined } from "@ant-design/icons";
import React from "react";

const StepItemWrapper = ({ children, title }) => {
	return (
		<div className="step-item">
			<style jsx global>{`
				.step-item {
					position: relative;
					width: 100%;
					border: 1px solid ${DefaultStyles.colors.border};
					border-radius: 6px;
					transition: all 0.25s;
					padding: 0.6rem 0.8rem 0.8rem 0.8rem;
					background-color: white;

					h5 {
						color: ${DefaultStyles.colors.secondary};
						text-transform: uppercase;
						letter-spacing: 0.1em;
						font-size: 0.725rem;
						font-weight: 500;
						margin-bottom: 5px;
					}

					&:hover {
						border-color: ${DefaultStyles.colors.primary};
					}

					.step-item-handler {
						position: absolute;
                        top: 10px;
						right: -20px;
                        color: ${DefaultStyles.colors.disabled};
					}
				}
			`}</style>
			<h5>{title}</h5>
			{children}
			{/* <div className="step-item-handler">
				<CloseOutlined />
				<BS size={0} />
				<DragOutlined />
				<BS size={0} />
				<CopyOutlined />
			</div> */}
		</div>
	);
};

export default StepItemWrapper;
