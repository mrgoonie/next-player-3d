import React from "react";
import { StepCardInsideItem } from "./StepCardInsideItem";
import { DeleteIcon, StartIcon } from "../elements/AppIcons";
import { LS } from "@/components/diginext/elements/Splitters";
import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Handle } from "react-flow-renderer";
import ButtonBlank from "@/components/diginext/button/ButtonBlank";
import Text from "antd/lib/typography/Text";

/**
 * @param  {Object} props
 * @param  {('default'|'input'|'output')} [props.type="input"]
 * @param  {String} props.title
 * @param  {React.ReactElement} props.icon
 * @param  {Array} props.steps
 */
export function StepCard({ data }) {
	const { type = "input", title, icon, steps } = data;

	return (
		<>
			<div className="step-card-wrapper">
				<style jsx>{`
					.step-card-wrapper {
						position: relative;
						background-color: white;
						border-radius: 10px;
						border: 1px solid lightgray;
						padding: 0.8rem;
						width: 200px;
						transition: all 0.25s;

						.card-title {
							font-size: 0.9rem;
						}

						.tools {
							position: absolute;
							top: -14px;
							right: 10px;
						}

						.hit-area {
							position: absolute;
							width: 100%;
							height: 100%;
							top: 0;
							left: 0;
						}

						&:hover {
							box-shadow: rgba(132, 146, 166, 0.2) -2px 6px 20px 0px;
						}
					}
				`}</style>

				<div className="card-title">
					{icon && (
						<>
							{icon}
							<LS />
						</>
					)}
					<Text style={{ width: 140, fontWeight: "bold" }} ellipsis={{ tooltip: title }}>
						{title}
					</Text>
				</div>
				{steps && (
					<VerticalList
						gutter={5}
						style={{
							marginTop: "8px",
							overflow: "inherit",
						}}
					>
						{steps.map(({ title, value }, index) => (
							<ListItem key={`step-card-inside-item-${index}`}>
								<StepCardInsideItem title={title} subtitle={value || "-"} />
							</ListItem>
						))}
					</VerticalList>
				)}
				<div className="hit-area" />
				{type != "input" && (
					<div className="tools">
						<ButtonBlank
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								console.log("delete card");
							}}
						>
							<DeleteIcon size={22} />
						</ButtonBlank>
					</div>
				)}
			</div>
			{(type == "output" || type == "default") && (
				<Handle
					type="target"
					position="left"
					style={{
						top: "50%",
						transform: "translate(0, -4px)",
						background: "#555",
						border: "none",
						width: "7px",
						height: "7px",
					}}
					// onConnect={(params) => console.log("handle onConnect", params)}
				/>
			)}
			{(type == "input" || type == "default") && (
				<Handle
					type="source"
					position="right"
					// id="a"
					style={{
						top: "50%",
						transform: "translate(0, -4px)",
						background: "#555",
						border: "none",
						width: "7px",
						height: "7px",
					}}
				/>
			)}
		</>
	);
}
