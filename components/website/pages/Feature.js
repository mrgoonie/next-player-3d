import React from "react";
import Navbar from "@/components/theme/_App/Navbar";
import Footer from "@/components/theme/_App/Footer";
import PageBanner from "@/components/theme/Common/PageBanner";
import OurFeatures from "@/components/theme/Features/OurFeatures";
import SingleFeatures from "@/components/theme/Features/SingleFeatures";
import MasterPage from "../master/MasterPage";

const Feature = ({ user }) => {
	return (
		<MasterPage>
			<Navbar />
			<PageBanner pageTitle="Features" />
			<OurFeatures />
			<SingleFeatures />
			<Footer />
		</MasterPage>
	);
};

export default Feature;
