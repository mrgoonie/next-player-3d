import { Input, InputShape } from "components/diginext/form/Form";
import { Avatar, Dropdown } from "antd";
import { HorizontalList, HorizontalListAlign, ListItem, ListItemSize } from "components/diginext/layout/ListLayout";
import AdminIcon from "components/dashkit/Icon";
import DashkitButton, { ButtonType } from "../dashkit/Buttons";
import asset from "plugins/assets/asset";
import { DefaultStyles } from "components/dashkit/style/DashkitGlobalStyle";
import { DropdownMenu, DropdownMenuItem } from "components/dashkit/Dropdown";
import Card, { CardBody, CardHeader } from "components/diginext/containers/Card";
import ActivityItem from "../dashkit/ActivityItem";
import AdminLogo from "components/dashkit/Logo";
import { signIn, signOut, useSession } from "next-auth/client";
import { LS } from "../diginext/elements/Splitters";
import ButtonBlank from "../diginext/button/ButtonBlank";
import { ExportOutlined, LogoutOutlined } from "@ant-design/icons";

const TopBar = ({ children, isMobile = false, onMenuClick, user = {} }) => {
	const searchInput = <Input icon="search" shape={InputShape.FLUSH} placeholder="Search" marginBottom="0" />;

	const menu = (
		<DropdownMenu>
			<DropdownMenuItem href="/admin/profile">Profile</DropdownMenuItem>
			<DropdownMenuItem
				href="/admin/logout"
				style={{ borderTop: `1px solid ${DefaultStyles.colors.border}`, paddingTop: "10px" }}
			>
				Sign out
			</DropdownMenuItem>
		</DropdownMenu>
	);

	const notification = (
		<Card width="320px">
			<CardHeader>Thông báo</CardHeader>
			<CardBody>
				<ActivityItem desc="123" subtext="50m">
					Something here
				</ActivityItem>
				<ActivityItem desc="Lorem ipsum" subtext="50m">
					Something here
				</ActivityItem>
				<ActivityItem subtext="50m">Something here</ActivityItem>
				<ActivityItem subtext="50m">Something here</ActivityItem>
				<ActivityItem subtext="50m">Something here</ActivityItem>
			</CardBody>
		</Card>
	);

	const LayoutMobile = (
		<HorizontalList align="middle" style={{ margin: "auto", maxWidth: `${DefaultStyles.container.maxWidthLG}px` }}>
			{/* <DashkitButton type={ButtonType.TRANSPARENT}>
        <AdminIcon name="search" />
      </DashkitButton> */}

			<ListItem size="stretch">
				{/* <AdminLogo height={50} /> */}
				{children}
			</ListItem>

			{/* <Dropdown overlay={notification} placement="bottomRight">
				<DashkitButton type={ButtonType.TRANSPARENT}>
					<AdminIcon name="bell" />
				</DashkitButton>
			</Dropdown> */}
			<ListItem>{user.name}</ListItem>

			{/* <Dropdown overlay={menu} placement="bottomRight"> */}
			<Avatar src={user.profileImage || asset("/admin/images/avatar.png")} size={38} />
			{/* </Dropdown> */}

			{/* <DashkitButton onClick={() => signOut()}>Sign out</DashkitButton> */}
		</HorizontalList>
	);

	const LayoutDesktop = (
		<HorizontalList align="middle" style={{ margin: "auto" }} gutter={5}>
			<ButtonBlank onClick={onMenuClick}>
				<AdminIcon name="hamburger" />
			</ButtonBlank>

			<ListItem size="stretch">{children}</ListItem>

			{/* <Dropdown overlay={notification} placement="bottomRight">
				<DashkitButton type={ButtonType.TRANSPARENT}>
					<AdminIcon name="bell" />
				</DashkitButton>
			</Dropdown> */}
			<ListItem>Hello, {user.name}</ListItem>

			{/* <Dropdown overlay={menu} placement="bottomRight"> */}
			<Avatar src={user.profileImage || asset("/admin/images/avatar.png")} size={38} />
			{/* </Dropdown> */}

			<LS />

			{/* <DashkitButton onClick={() => signOut()}>
				<ExportOutlined />
			</DashkitButton> */}
		</HorizontalList>
	);

	return (
		<div className="topbar">
			<style jsx>{`
				.topbar {
					// position: ${isMobile ? "fixed" : "absolute"};
					z-index: 1000;
					width: 100%;
					top: 0;
					padding: 0.75rem 1.25rem;
					background: white;
					border-bottom: 1px solid ${DefaultStyles.colors.border};
				}
			`}</style>

			{isMobile ? LayoutMobile : LayoutDesktop}
		</div>
	);
};

export default TopBar;
