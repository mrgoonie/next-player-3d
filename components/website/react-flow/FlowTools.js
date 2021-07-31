import ButtonBlank from "@/components/diginext/button/ButtonBlank";
import { ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Popover, Tooltip } from "antd";
import React from "react";
import { AddIcon, ArrangeIcon } from "../elements/AppIcons";

export function FlowTools({ onAddClick, onArrangeClick }) {
	return (
		<div className="flow-tools">
			<style jsx>{`
				.flow-tools {
					position: absolute;
					bottom: 20px;
					right: 20px;
					z-index: 10;
				}
			`}</style>

			<VerticalList
				gutter={10}
				style={{
					overflow: "visible",
				}}
			>
				{/* <ListItem>
					<Tooltip placement="left" title="Auto arrange your flow">
						<ButtonBlank onClick={onArrangeClick}>
							<ArrangeIcon
								size={54}
								style={{
									boxShadow: `0 12px 24px 0px rgb(132 146 166 / 16%)`,
								}}
							/>
						</ButtonBlank>
					</Tooltip>
				</ListItem> */}
				<ListItem>
					{/* <Popover placement="leftTop" content={<div>Step thumb</div>} trigger="click"> */}
					<ButtonBlank onClick={onAddClick}>
						<AddIcon
							size={54}
							style={{
								boxShadow: `0 12px 24px 0px rgb(132 146 166 / 16%)`,
							}}
						/>
					</ButtonBlank>
					{/* </Popover> */}
				</ListItem>
			</VerticalList>
		</div>
	);
}
