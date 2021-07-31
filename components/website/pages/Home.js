import React from "react";
import MasterPage from "../master/MasterPage";
import Navbar from "@/components/theme/_App/Navbar";
import MainBanner from "@/components/theme/MachineLearning/MainBanner";
import Partner from "@/components/theme/MachineLearning/Partner";
import WhatWeOffer from "@/components/theme/MachineLearning/WhatWeOffer";
import AboutUsContent from "@/components/theme/MachineLearning/AboutUsContent";
import OurServices from "@/components/theme/MachineLearning/OurServices";
import FunFactsArea from "@/components/theme/Common/FunFactsArea";
import Projects from "@/components/theme/MachineLearning/Projects";
import FeedbackStyleFour from "@/components/theme/Common/FeedbackStyleFour";
import BlogCard from "@/components/theme/MachineLearning/BlogCard";
import Newsletter from "@/components/theme/Common/Newsletter";
import Footer from "@/components/theme/_App/Footer";
import PricingStyleOne from "@/components/theme/PricingPlans/PricingStyleOne";

const Home = ({ user }) => {
	return (
		<MasterPage>
			<Navbar />
			<MainBanner />
			<Partner />
			<WhatWeOffer />
			<AboutUsContent />
			<OurServices />
			<FunFactsArea />
			<Projects />
			<PricingStyleOne />
			<FeedbackStyleFour />
			<BlogCard />
			<Newsletter />
			<Footer />
		</MasterPage>
	);
};

export default Home;
