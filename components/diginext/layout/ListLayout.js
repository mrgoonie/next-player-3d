import React, { Children, forwardRef, Fragment, useEffect, useState } from "react";
import CONFIG from "web.config";

const warnDeprecated = (definition = "Biến enum", alterative = "code hint của component") =>
	console.warn(
		`"${definition}" sẽ bị loại bỏ trong tương lai, chuyển sang sử dụng trực tiếp từ ${alterative} để thay thế.`
	);

const ListItemSize = {
	get AUTO() {
		warnDeprecated("ListItemSize.AUTO");
		return "auto";
	}, // default
	get STRETCH() {
		warnDeprecated("ListItemSize.STRETCH");
		return "stretch";
	},
};

const VerticalListAlign = {
	get LEFT() {
		warnDeprecated("VerticalListAlign.LEFT");
		return "left";
	}, // default
	get CENTER() {
		warnDeprecated("VerticalListAlign.CENTER");
		return "center";
	},
	get RIGHT() {
		warnDeprecated("VerticalListAlign.RIGHT");
		return "right";
	},
};

const HorizontalListAlign = {
	get TOP() {
		warnDeprecated("HorizontalListAlign.TOP");
		return "top";
	}, // default
	get MIDDLE() {
		warnDeprecated("HorizontalListAlign.MIDDLE");
		return "middle";
	},
	get BOTTOM() {
		warnDeprecated("HorizontalListAlign.BOTTOM");
		return "bottom";
	},
};

const ListType = {
	get STRETCH() {
		warnDeprecated("ListType.STRETCH");
		return "stretch";
	}, // default
	get SPACE_BETWEEN() {
		warnDeprecated("ListType.SPACE_BETWEEN");
		return "space_between";
	},
	get SPACE_AROUND() {
		warnDeprecated("ListType.SPACE_AROUND");
		return "space_around";
	},
	get START() {
		warnDeprecated("ListType.START");
		return "start";
	},
	get CENTER() {
		warnDeprecated("ListType.CENTER");
		return "center";
	},
	get END() {
		warnDeprecated("ListType.END");
		return "end";
	},
};

/**
 * @param  {Object} props
 * @param  {String} [props.key]
 * @param  {('initial'|'auto'|'stretch')} [props.size="auto"]
 * @param  {String} props.background
 * @param  {String} props.padding
 * @param  {String} props.margin
 * @param  {String} props.border
 * @param  {String} props.borderRadius
 * @param  {React.CSSProperties} props.style
 * @param  {String} [props.className=""]
 */
const ListItem = ({
	key,
	children,
	size = "initial",
	background,
	padding,
	margin,
	border,
	borderRadius,
	style,
	className = "",
	...rest
}) => {
	let flexValue = "initial";

	if (typeof size != "undefined") {
		switch (size) {
			case "stretch":
				flexValue = "1";
				break;
			case "auto":
				flexValue = "auto";
				break;
			default:
				flexValue = size;
				break;
		}
	}

	return (
		<>
			<style jsx>{`
				.list-item {
					position: relative;
					${padding ? `padding: ${padding};` : ""}
					${margin ? `margin: ${margin};` : ""}
          			${background ? `background: ${background};` : ""}
          			${border ? `border: ${border};` : ""}
          			${borderRadius ? `border-radius: ${borderRadius};` : ""}
				}
			`}</style>
			<div
				className={`list-item ${className ? className : ""}`}
				key={key}
				style={{ flex: flexValue, ...style }}
				{...rest}
			>
				{children}
			</div>
		</>
	);
};

/**
 * @typedef  {Object} HorizontalListProps
 * @property  {String} [className=""]
 * @property  {String} [key]
 * @property  {Number} [gutter=0]
 * @property  {('start'|'center'|'end'|'space_between'|'space_around')} [type="start"]
 * @property  {('auto'|'stretch')} [itemSize]
 * @property  {String} [wrap]
 * @property  {('top'|'middle'|'bottom'|'stretch')} [align="top"]
 * @property  {Boolean} [scrollable=true]
 * @property  {Boolean} [reverse=false]
 * @property  {React.CSSProperties} [style]
 * @property  {React.ElementRef} ref
 */

/**
 * @type  {React.FC<HorizontalListProps>}
 */
const HorizontalList = forwardRef(
	(
		{
			children,
			className = "",
			type = "start",
			itemSize,
			wrap = false,
			align = "top",
			gutter = 0,
			scrollable = true,
			reverse = false,
			...rest
		},
		ref
	) => {
		const wrapContent = wrap == true ? `flex-wrap: wrap;` : `flex-wrap: nowrap;`;

		let justifyContent = "";
		switch (type) {
			case "space_between":
				justifyContent = "justify-content: space-between;";
				break;
			case "space_around":
				justifyContent = "justify-content: space-around;";
				break;
			case "center":
				justifyContent = "justify-content: center;";
				break;
			case "end":
				justifyContent = "justify-content: flex-end;";
				break;
			default:
				// START
				justifyContent = "justify-content: flex-start;";
				break;
		}

		let alignConfig = "";
		switch (align) {
			case "top":
			case "start":
			case "flex-start":
				alignConfig = "align-items: flex-start;";
				break;
			case "middle":
			case "center":
				alignConfig = "align-items: center;";
				break;
			case "bottom":
			case "end":
			case "flex-end":
				alignConfig = "align-items: flex-end;";
				break;
			case "stretch":
				alignConfig = "align-items: stretch;";
				break;
			case "baseline":
				alignConfig = "align-items: baseline;";
				break;
			default:
				console.warn(`HorizontalListAlign of "${align}" is not valid.`);
				break;
		}

		const scrollConfig = scrollable ? `overflow-x: auto;` : "";

		const orgChildren = children && children.type == Fragment ? children.props.children : children;
		const childrenWithProps = Children.map(orgChildren, (child, index) => {
			if (React.isValidElement(child)) {
				let newProps = { ...child.props };
				// console.log("orgChildren.length", orgChildren.length);
				const gutterStyle =
					orgChildren.hasOwnProperty("length") && index != orgChildren.length - 1 ? { marginRight: `${gutter}px` } : {};

				if (newProps.style) {
					newProps.style = { ...gutterStyle, ...newProps.style };
				} else {
					newProps.style = gutterStyle;
				}

				if (child.type == ListItem) {
					// console.log('newProps.size', newProps.size)
					newProps.size = itemSize ? itemSize : newProps.size;
				}

				return React.cloneElement(child, newProps);
			}
			return child;
		});

		return (
			<>
				<style jsx>{`
					.horizontal-list {
						display: flex;
						position: relative;
						flex-direction: row;
						${scrollConfig}
						${justifyContent}
          ${wrapContent}
          ${alignConfig}
          ${reverse ? "flex-flow: row-reverse;" : ""}
					}
				`}</style>
				<div className={`layout-list horizontal-list ${className}`} {...rest} ref={ref}>
					{childrenWithProps}
				</div>
			</>
		);
	}
);

/**
 * @param  {Object} props
 * @param  {('start'|'end'|'center'|'space_between'|'space_around')} [props.type="start"]
 * @param  {('auto'|'stretch'|'initial')} [props.itemSize]
 * @param  {Boolean} [props.wrap]
 * @param  {('left'|'center'|'right')} [props.align='left']
 * @param  {Number} props.gutter=0
 * @param  {Boolean} props.scrollable=true
 * @param  {React.CSSProperties} [props.style]
 * @param  {String} [props.className=""]
 */
function VerticalList({
	children,
	type = "start",
	itemSize,
	wrap = false,
	align,
	gutter = 0,
	scrollable = true,
	className = "",
	...rest
}) {
	const [newChildren, setNewChildren] = useState([]);
	const wrapContent = wrap ? `flex-wrap: wrap;` : `flex-wrap: nowrap;`;

	let alignConfig = "";
	if (typeof align !== "undefined") {
		switch (align) {
			case "left":
				alignConfig = "align-items: flex-start;";
				break;
			case "center":
				alignConfig = "align-items: center;";
				break;
			case "right":
				alignConfig = "align-items: flex-end;";
				break;
			default:
				console.warn(`<VerticalList align="${align}" ...> is not valid.`);
				break;
		}
	}

	let justifyContent = "";
	switch (type) {
		case "space_between":
			justifyContent = "justify-content: space-between;";
			break;
		case "space_around":
			justifyContent = "justify-content: space-around;";
			break;
		case "center":
			justifyContent = "justify-content: center;";
			break;
		case "end":
			justifyContent = "justify-content: flex-end;";
			break;
		default:
			// START
			justifyContent = "justify-content: flex-start;";
			break;
	}

	const scrollConfig = scrollable ? `overflow-y: scroll;` : `overflow-y: hidden;`;

	useEffect(() => {
		// console.log("rerender vertical list");
		const orgChildren = children && children.type == Fragment ? children.props.children : children;
		const childrenWithProps = Children.map(orgChildren, (child, index) => {
			if (React.isValidElement(child)) {
				let newProps = { ...child.props };

				const gutterStyle =
					orgChildren.hasOwnProperty("length") && index != orgChildren.length - 1
						? { marginBottom: `${gutter}px` }
						: {};

				if (newProps.style) {
					newProps.style = { ...gutterStyle, ...newProps.style };
				} else {
					newProps.style = { ...gutterStyle };
				}

				if (child.type == ListItem) {
					newProps.size = itemSize ? itemSize : newProps.size;
				}

				return React.cloneElement(child, newProps);
			}
			return child;
		});

		setNewChildren(childrenWithProps);
	}, [children, gutter]);

	return (
		<>
			<style jsx>{`
				.vertical-list {
					display: flex;
					flex-direction: column;
					${wrapContent}
					${alignConfig}
					${scrollConfig}
					${justifyContent}
				}
			`}</style>
			<div {...rest} className={`layout-list vertical-list ${className}`}>
				{newChildren}
			</div>
		</>
	);
}

/**
 * @param  {Object} props
 * @param  {String} [props.className=""]
 * @param  {Number} [props.col=4]
 * @param  {Number} [props.gutter=0]
 * @param  {('initial'|'flex-start'|'flex-end'|'baseline'|'center')} [props.itemAlign="initial"]
 * @param  {('start'|'center'|'end'|'space_between'|'space_around')} [props.itemType="start"]
 * @param  {('auto'|'stretch'|'initial')} [props.itemSize="initial"]
 */
function GridList({
	children,
	className = "",
	col = 4,
	gutter = 0,
	itemType = "flex-start",
	itemAlign = "start",
	itemSize = "initial",
	...rest
}) {
	const [renderChildren, setRenderChildren] = useState([]);

	useEffect(() => {
		const orgChildren = children && children.type == Fragment ? children.props.children : children;
		const childrenList =
			typeof orgChildren == "undefined" ? [] : typeof orgChildren.length == "undefined" ? [orgChildren] : orgChildren;
		const itemAmount = childrenList.length;
		const rowAmount = Math.ceil(itemAmount / col);

		let horGutter = !isNaN(gutter) ? gutter : 0;
		let verGutter = !isNaN(gutter) ? gutter : 0;

		if (gutter.length) {
			horGutter = gutter[0];
			verGutter = gutter[1];
		}

		const tmpArr = [];
		let index = 0;
		for (let i = 0; i < rowAmount; i++) {
			const rowChildren = [];
			for (let k = i * col; k < i * col + col; k++) {
				const isLastItemInRow = k == i * col + col - 1;
				const isLastItem = index == itemAmount - 1;
				const addedGutter = isLastItemInRow || isLastItem ? "0" : `${horGutter}px`;
				if (childrenList[k]) {
					rowChildren.push(
						<ListItem size={itemSize} key={`grid-item-${i}-${k}`} style={{ marginRight: addedGutter }}>
							{childrenList[k]}
						</ListItem>
					);
				}
				// else {
				// 	rowChildren.push(
				// 		<ListItem size={itemSize} key={`grid-item-${i}-${k}`} style={{ marginRight: addedGutter }} />
				// 	);
				// }
				index++;
			}

			const row = (
				<HorizontalList
					key={`grid-row-${i}`}
					// itemSize="stretch"
					align={itemAlign}
					type={itemType}
					style={{ marginBottom: `${verGutter}px` }}
				>
					{rowChildren}
				</HorizontalList>
			);
			tmpArr.push(row);
		}

		setRenderChildren(tmpArr);
	}, [col, gutter, itemAlign, children]);

	return (
		<div className={`layout-list grid-list ${className}`} {...rest}>
			{renderChildren}
		</div>
	);
}

export {
	HorizontalList,
	VerticalList,
	GridList,
	ListItem,
	ListItemSize,
	ListType,
	VerticalListAlign,
	HorizontalListAlign,
};
