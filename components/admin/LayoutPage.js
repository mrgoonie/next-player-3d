import { HorizontalList, ListItem, VerticalList } from "components/diginext/layout/ListLayout";
import AdminMasterPage from "components/admin/layout/AdminMasterPage";
import AdminTopBar from "components/admin/TopBar";
import SidebarAdmin from "components/admin/SidebarAdmin";
import LayoutContent from "./LayoutContent";
import { useToggle } from "ahooks";

const LayoutPage = ({ children, header, user, topBarContent, fitScreen = false }) => {
	const [sideBarVisible, { toggle }] = useToggle(true);

	return (
		<AdminMasterPage>
			<div className="page-layout">
				<HorizontalList type="start" style={{ position: "fixed", width: "100%", height: "100%" }}>
					{/* Sidebar */}
					<SidebarAdmin
						width={sideBarVisible ? 250 : 48}
						user={user}
						style={{ overflow: "scroll" }}
						collapsed={!sideBarVisible}
					/>

					{/* Page Content */}
					<ListItem size="stretch" style={{ height: "100%" }}>
						<VerticalList style={{ height: "100%" }}>
							<ListItem>
								<AdminTopBar onMenuClick={() => toggle()} isMobile={false} user={user}>
									{topBarContent}
								</AdminTopBar>
							</ListItem>

							<ListItem size="stretch">
								<LayoutContent fitScreen={fitScreen}>
									{header}
									{children}
								</LayoutContent>
							</ListItem>
						</VerticalList>
					</ListItem>
				</HorizontalList>
			</div>
		</AdminMasterPage>
	);
};

export default LayoutPage;
