import ExpandContainer from "components/diginext/containers/ExpandContainer";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import { VerticalList, VerticalListAlign } from "components/diginext/layout/ListLayout";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import Browser, { BrowserEvent } from "plugins/utils/Browser";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Desktop = ({ children }) => {
	const isDesktop = useMediaQuery({ minWidth: 992 });
	return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
	return isTablet ? children : null;
};
const Mobile = ({ children }) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	return isMobile ? children : null;
};
const Default = ({ children }) => {
	const isNotMobile = useMediaQuery({ minWidth: 768 });
	return isNotMobile ? children : null;
};

const LayoutContent = ({ children, fitScreen = false }) => {
	const [maxWidth, setMaxWidth] = useState(DefaultStyles.container.maxWidthLG);
	const isDesktop = useMediaQuery({ minWidth: 1025 });
	const isDesktopSM = useMediaQuery({ minWidth: 1025, maxWidth: 1279 });
	const isDesktopMD = useMediaQuery({ minWidth: 1280, maxWidth: 1399 });
	const isDesktopHD = useMediaQuery({ minWidth: 1400 });
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isPortrait = useMediaQuery({ orientation: "portrait" });

	useEffect(() => {
		if (fitScreen) {
			setMaxWidth(5000);
			return;
		}

		if (!isPortrait) {
			// màn hình ngang
			if (isDesktopHD) {
				setMaxWidth(DefaultStyles.container.maxWidthLG);
			} else if (isDesktopMD || isDesktopSM || isTablet) {
				setMaxWidth(DefaultStyles.container.maxWidthMD);
			} else {
				setMaxWidth(DefaultStyles.container.maxWidthSM);
			}
		} else {
			// màn hình dọc
			if (isDesktop) {
				setMaxWidth(DefaultStyles.container.maxWidthMD);
			} else if (isTablet) {
				setMaxWidth(DefaultStyles.container.maxWidthSM);
			} else {
				setMaxWidth(DefaultStyles.container.maxWidthXS);
			}
		}
	}, [maxWidth, isPortrait]);

	let fitScreenStyle = {};
	if (fitScreen) {
		fitScreenStyle = { height: "100%", paddingLeft: "0px", paddingRight: "0px" };
	}

	return (
		<VerticalList align="center" style={fitScreenStyle}>
			<div
				style={{
					width: "100%",
					margin: "auto",
					maxWidth: `${maxWidth}px`,
					...fitScreenStyle,
					// paddingTop: "65px",
					// paddingBottom: fitScreen ? "0px" : "150px",
				}}
			>
				{children}
			</div>
		</VerticalList>
	);
};

export default LayoutContent;
