import {
	AppstoreOutlined,
	CodeOutlined, DollarOutlined,
	FileDoneOutlined,
	FundProjectionScreenOutlined,
	PartitionOutlined,
	ScheduleOutlined,
	TeamOutlined
} from "@ant-design/icons";
import Menu from "antd/lib/menu";
import AdminLogo from "components/dashkit/Logo";
import Sidebar from "components/diginext/containers/Sidebar";
import AppLink from "components/diginext/link/AppLink";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";

// const Menu = dynamic(() => import("antd/lib/menu"), { ssr: false });
// const { SubMenu } = Menu;

const SidebarAdmin = ({ children, width = 250, user, collapsed = false }) => {
	const router = useRouter();
	//active submenu
	// console.log(router);
	const menus = [
		{
			icon: <AppstoreOutlined />,
			href: "/dashboard",
			label: "Dashboard",
		},
		{
			icon: <TeamOutlined />,
			href: "/team",
			label: "Team",
		},
		{
			icon: <FundProjectionScreenOutlined />,
			href: "/project",
			label: "Project",
		},
		{
			icon: <PartitionOutlined />,
			href: "/case",
			label: "Test cases",
		},
		{
			icon: <FileDoneOutlined />,
			href: "/result",
			label: "Results",
		},
		{
			icon: <ScheduleOutlined />,
			href: "/schedule",
			label: "Schedule",
		},
		{
			icon: <CodeOutlined />,
			href: "/integration",
			label: "Integration",
		},
		{
			icon: <DollarOutlined />,
			href: "/billing",
			label: "Billing",
		},
	];

	const activeMenuHref =
		router.pathname == "/"
			? ["/"]
			: menus
					.filter((item) => item.href != "/")
					.filter((item) => router.pathname.includes(item.href))
					.map((item) => item.href);

	return (
		<Sidebar width={width}>
			<AdminLogo maxWidth="60%" style={{ paddingTop: "1.2rem", paddingBottom: "1.2rem" }} />
			<Menu
				style={{ width: width }}
				defaultSelectedKeys={[...activeMenuHref]}
				defaultOpenKeys={[...activeMenuHref]}
				mode="inline"
				inlineCollapsed={collapsed}
			>
				{menus.map((item) => {
					return (
						<Menu.Item key={item.href} icon={item.icon}>
							<AppLink href={item.href}>{item.label}</AppLink>
						</Menu.Item>
					);
				})}
			</Menu>
		</Sidebar>
	);
};

export default SidebarAdmin;
