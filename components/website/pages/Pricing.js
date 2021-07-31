import React from "react";
import MasterPage from "../master/MasterPage";
import Navbar from "@/components/theme/_App/Navbar";
import Footer from "@/components/theme/_App/Footer";
import PageBanner from "@/components/theme/Common/PageBanner";
import PricingStyleOne from "@/components/theme/PricingPlans/PricingStyleOne";
import PricingStyleTwo from "@/components/theme/PricingPlans/PricingStyleTwo";
import PricingStyleFour from "@/components/theme/PricingPlans/PricingStyleFour";

const Pricing = ({ user }) => {
	return (
		<MasterPage>
			<Navbar />
			<PageBanner pageTitle="Pricing" />
			<PricingStyleOne />
			<PricingStyleTwo />
			<div className="pt-80">
				<PricingStyleFour />
			</div>
			<Footer />
		</MasterPage>
	);
};

export default Pricing;
