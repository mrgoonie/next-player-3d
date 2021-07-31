import { GridList, HorizontalList, ListItem, VerticalList } from "@/components/diginext/layout/ListLayout";
import { Select } from "antd";
import { _ } from "core-js";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const devices = [
	{
		name: "Desktop COMMON",
		userAgent: "",
		viewport: {
			width: 1400,
			height: 800,
			deviceScaleFactor: 1,
			isMobile: false,
			isLandscape: false,
			hasTouch: false,
		},
	},
	{
		name: "Desktop SMALL",
		userAgent: "",
		viewport: {
			width: 1280,
			height: 650,
			deviceScaleFactor: 1,
			isMobile: false,
			isLandscape: false,
			hasTouch: false,
		},
	},
	{
		name: "Desktop HD",
		userAgent: "",
		viewport: {
			width: 1920,
			height: 1080,
			deviceScaleFactor: 1,
			isMobile: false,
			isLandscape: false,
			hasTouch: false,
		},
	},
	{
		name: "Desktop LARGE",
		userAgent: "",
		viewport: {
			width: 2560,
			height: 1440,
			deviceScaleFactor: 1,
			isMobile: false,
			isLandscape: false,
			hasTouch: false,
		},
	},
	{
		name: "iPhone 5",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
		viewport: {
			width: 320,
			height: 568,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 5 landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
		viewport: {
			width: 568,
			height: 320,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 6",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 375,
			height: 667,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 6 landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 667,
			height: 375,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 6 Plus",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 414,
			height: 736,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 6 Plus landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 736,
			height: 414,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 7",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 375,
			height: 667,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 7 landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 667,
			height: 375,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 7 Plus",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 414,
			height: 736,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 7 Plus landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 736,
			height: 414,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 8",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 375,
			height: 667,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 8 landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 667,
			height: 375,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 8 Plus",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 414,
			height: 736,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 8 Plus landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 736,
			height: 414,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone SE",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
		viewport: {
			width: 320,
			height: 568,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone SE landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
		viewport: {
			width: 568,
			height: 320,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone X",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 375,
			height: 812,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone X landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
		viewport: {
			width: 812,
			height: 375,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone XR",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 414,
			height: 896,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone XR landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 896,
			height: 414,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 11",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 414,
			height: 828,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 11 landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 828,
			height: 414,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 11 Pro",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 375,
			height: 812,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 11 Pro landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 812,
			height: 375,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPhone 11 Pro Max",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 414,
			height: 896,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPhone 11 Pro Max landscape",
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
		viewport: {
			width: 896,
			height: 414,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPad",
		userAgent:
			"Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
		viewport: {
			width: 768,
			height: 1024,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPad landscape",
		userAgent:
			"Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
		viewport: {
			width: 1024,
			height: 768,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPad Mini",
		userAgent:
			"Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
		viewport: {
			width: 768,
			height: 1024,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPad Mini landscape",
		userAgent:
			"Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
		viewport: {
			width: 1024,
			height: 768,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "iPad Pro",
		userAgent:
			"Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
		viewport: {
			width: 1024,
			height: 1366,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "iPad Pro landscape",
		userAgent:
			"Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
		viewport: {
			width: 1366,
			height: 1024,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "Pixel 2",
		userAgent:
			"Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
		viewport: {
			width: 411,
			height: 731,
			deviceScaleFactor: 2.625,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "Pixel 2 landscape",
		userAgent:
			"Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
		viewport: {
			width: 731,
			height: 411,
			deviceScaleFactor: 2.625,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
	{
		name: "Pixel 2 XL",
		userAgent:
			"Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
		viewport: {
			width: 411,
			height: 823,
			deviceScaleFactor: 3.5,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		},
	},
	{
		name: "Pixel 2 XL landscape",
		userAgent:
			"Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
		viewport: {
			width: 823,
			height: 411,
			deviceScaleFactor: 3.5,
			isMobile: true,
			hasTouch: true,
			isLandscape: true,
		},
	},
];

const FlowConfig = ({ onChange }) => {
	const [conf, setConf] = useState(devices[0]);

	useEffect(() => {
		if (onChange) onChange(conf);
	}, [JSON.stringify(conf)]);

	return (
		<div className="flow-config-modal">
			<style jsx>{`
				.flow-config-modal {
					width: 100%;
					max-width: 400px;
				}
			`}</style>
			<GridList col={2} gutter={[0, 6]} itemType="space_between" itemAlign="center">
				<ListItem>Device</ListItem>
				<ListItem>
					<Select showSearch style={{ width: "200px" }} defaultValue={0} onChange={(index) => setConf(devices[index])}>
						{devices.map((device, index) => (
							<Option key={index} value={index}>
								{device.name}
							</Option>
						))}
						{/* <Option value="custom">Custom</Option> */}
					</Select>
				</ListItem>

				<ListItem>
					<strong>Specifications</strong>
				</ListItem>
				<ListItem></ListItem>

				<ListItem>Width:</ListItem>
				<ListItem>{conf.width} px</ListItem>

				<ListItem>Height:</ListItem>
				<ListItem>{conf.height} px</ListItem>

				<ListItem>Scale factor:</ListItem>
				<ListItem>{conf.deviceScaleFactor}</ListItem>

				<ListItem>Mobile:</ListItem>
				<ListItem>{conf.isMobile ? "YES" : "NO"}</ListItem>

				<ListItem>Landscape:</ListItem>
				<ListItem>{conf.isLandscape ? "YES" : "NO"}</ListItem>

				<ListItem>Has touch:</ListItem>
				<ListItem>{conf.hasTouch ? "YES" : "NO"}</ListItem>
			</GridList>
		</div>
	);
};

export { devices, FlowConfig };
