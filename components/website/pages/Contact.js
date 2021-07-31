import React from "react";
import MasterPage from "../master/MasterPage";
import Navbar from "@/components/theme/_App/Navbar";
import Footer from "@/components/theme/_App/Footer";
import PageBanner from "@/components/theme/Common/PageBanner";
import ContactInfo from "@/components/theme/Contact/ContactInfo";
import GoogleMap from "@/components/theme/Contact/GoogleMap";
import ContactForm from "@/components/theme/Contact/ContactForm";

const Contact = ({ user }) => {
	return (
		<MasterPage>
			<Navbar />
			<PageBanner pageTitle="Contact Us" />
			<ContactInfo />
			<GoogleMap />
			<ContactForm />
			<Footer />
		</MasterPage>
	);
};

export default Contact;
