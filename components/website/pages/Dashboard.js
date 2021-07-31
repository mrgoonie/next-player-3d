import LayoutPage from "@/components/admin/LayoutPage";
import PageHeader from "@/components/dashkit/PageHeader";
import React from "react";

const Dashboard = ({ user }) => {
	console.log("Dashboard -> user:", user);
	const header = (
		<PageHeader pretitle="admin" title="Dashboard" separator={true}>
			Thông số tổng quát.
		</PageHeader>
	);

	return (
		<LayoutPage header={header} user={user}>
			Dashboard here
		</LayoutPage>
	);
};

export default Dashboard;
