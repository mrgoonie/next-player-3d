import { notification } from "antd";
import React from "react";
import GotoUrl from "./steps/GotoUrl";
import Mouse from "./steps/Mouse";
import PressKey from "./steps/PressKey";
import WriteText from "./steps/WriteText";
import Verify from "./steps/Verify";
import Wait from "./steps/Wait";
import Screenshot from "./steps/Screenshot";
import Resize from "./steps/Resize";
import Scroll from "./steps/Scroll";
import { SortableItem } from "./SortableItem";
import { SortableContainer } from "react-sortable-hoc";
import UploadStep from "./steps/UploadStep";
import Click from "./steps/Click";

export const SortableList = SortableContainer(({ items, onChange, onRemove }) => {
	return (
		<div className="steps-holder">
			<style jsx>{`
				.steps-holder {
					padding: 0 2.5rem 0 1rem;
					min-height: 40px;
				}
			`}</style>

			{items.map((item, index) => {
				let stepItem;
				switch (item.action) {
					case "go_to_url":
						stepItem = <GotoUrl {...item} hideNewTab={!item.sortable} onChange={onChange} />;
						break;
					case "click":
						stepItem = <Click {...item} onChange={onChange} />;
						break;
					case "mouse":
						stepItem = <Mouse {...item} onChange={onChange} />;
						break;
					case "press_key":
						stepItem = <PressKey {...item} onChange={onChange} />;
						break;
					case "write_text":
						stepItem = <WriteText {...item} onChange={onChange} />;
						break;
					case "scroll":
						stepItem = <Scroll {...item} onChange={onChange} />;
						break;
					case "resize":
						stepItem = <Resize {...item} onChange={onChange} />;
						break;
					case "verify":
						stepItem = <Verify {...item} onChange={onChange} />;
						break;
					case "wait":
						stepItem = <Wait {...item} onChange={onChange} />;
						break;
					case "upload":
						stepItem = <UploadStep {...item} onChange={onChange} />;
						break;
					case "screenshot":
						stepItem = <Screenshot {...item} onChange={onChange} />;
						break;
					default:
						notification.error(`Action not found.`);
						break;
				}
				return (
					<SortableItem
						key={item.id}
						id={item.id}
						index={index}
						disabled={!item.sortable}
						sortable={item.sortable}
						onRemove={onRemove}
					>
						{stepItem}
					</SortableItem>
				);
			})}
		</div>
	);
});
