import { Input, Tooltip } from "antd";

function formatNumber(value) {
	value += "";
	const list = value.split(".");
	const prefix = list[0].charAt(0) === "-" ? "-" : "";
	let num = prefix ? list[0].slice(1) : list[0];
	let result = "";
	while (num.length > 3) {
		result = `,${num.slice(-3)}${result}`;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
}

const NumericInput = (props) => {
	const {
		tooltip = false,
		value,
		onBlur,
		onChange,
		placeholder = "Input a number",
		className = "",
		addonAfter,
		addonBefore,
	} = props;

	const handleChange = (e) => {
		if (!e.target) return;
		const { value } = e.target;
		const reg = /^-?\d*(\.\d*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
			if (onChange) onChange(value);
		}
	};

	// '.' at the end or only '-' in the input box.
	const handleBlur = () => {
		if (typeof value == "undefined") return;
		let valueTemp = value;
		if (value.charAt(value.length - 1) === "." || value === "-") {
			valueTemp = value.slice(0, -1);
		}
		handleChange(valueTemp.replace(/0*(\d+)/, "$1"));
		if (onBlur) {
			onBlur();
		}
	};

	const title = value ? (
		<span className="numeric-input-title">{value !== "-" ? formatNumber(value) : "-"}</span>
	) : (
		placeholder
	);

	const input = (
		<Input
			{...props}
			className={`${className} ${addonAfter ? "suffix" : ""} ${addonBefore ? "prefix" : ""}`}
			onChange={handleChange}
			onBlur={handleBlur}
			placeholder={placeholder}
			maxLength={25}
		/>
	);

	return tooltip ? (
		<Tooltip trigger={["focus"]} title={title} placement="topLeft" overlayClassName="numeric-input">
			{input}
		</Tooltip>
	) : (
		input
	);
};

export { NumericInput };
