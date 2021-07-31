import React from "react";
import { FailedIcon, SuccessIcon } from "../elements/AppIcons";

/**
 * @param  {Object} props
 * @param  {String} props.title
 * @param  {String} props.subtitle
 * @param  {('default'|'success'|'failed')} [props.status="default"]
 */
export function StepCardInsideItem({ title, subtitle, status = "default" }) {
	let bgColor = "";
	if (status == "success") bgColor = "#afe0b4";
	if (status == "failed") bgColor = "#f9e5e5";

	return (
		<div className="card-step">
			<style jsx global>{`
				.card-step {
					position: relative;
					background-color: #e5f9ed;
					border-radius: 4px;
					padding: 0.4rem 0.7rem 0.25rem 0.7rem;

					h5 {
						font-weight: normal;
						font-size: 0.65rem;
					}

					p {
						color: gray;
						font-size: 0.5rem;
					}

					.result-icon {
						display: inline-block;
						position: absolute;
						right: -6px;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			`}</style>
			<h5>{title}</h5>
			{subtitle && <p>{subtitle}</p>}
			<span className="result-icon">
				{status == "failed" && <FailedIcon size={12} />}
				{status == "success" && <SuccessIcon size={12} />}
			</span>
		</div>
	);
}
