import React from "react";
import { Spin } from "antd";
import CenterContainer from "@/diginext/containers/CenterContainer";
import BlockSplitter from "@/diginext/elements/BlockSplitter";
import InlineSplitter from "@/diginext/elements/InlineSplitter";
import { Input, InputType, ValidationType } from "@/diginext/form/Form";
import BasicLayout from "@/diginext/layout/BasicLayout";
import FullscreenLayout from "@/diginext/layout/FullscreenLayout";
import { HorizontalList, VerticalList } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize } from "components/dashkit/Buttons";
import asset from "plugins/assets/asset";
import { DefaultStyles } from "components/admin/layout/AdminGlobalStyle";
import AdminMasterPage from "components/admin/layout/AdminMasterPage";
import { signIn } from "next-auth/client";
import { useNextDevice } from "@/plugins/next-reponsive";

const SignIn = () => {
	const device = useNextDevice();

	const SignInContainer = (
		<BasicLayout className="login-container" minWidth="360px">
			<div style={{ textAlign: "center", marginBottom: "20px" }}>
				<h1>Sign in</h1>
				<p style={{ color: DefaultStyles.colors.secondary }}>Đăng nhập vào trang quản trị.</p>
			</div>
			{/* <Input
				ref={emailRef}
				label="Email Address"
				placeholder="name@address.com"
				validateConditions={[{ type: ValidationType.EMAIL, errMessage: "Không đúng định dạng email." }]}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						loginHandler();
					}
				}}
			/> */}

			<AdminButton
				size={ButtonSize.LARGE}
				onClick={() => signIn()}
				style={{ width: "100%", textAlign: "center" }}
				// disabled={myTimeout ? true : false}
			>
				Sign in
			</AdminButton>
		</BasicLayout>
	);

	const SignInVisual = (
		<BasicLayout width={device == "desktop" ? "300px" : "60%"}>
			<img alt="login" src={asset("/admin/images/login_visual.png")} />
		</BasicLayout>
	);

	const DesktopLayout = (
		<FullscreenLayout backgroundColor="#E5E5E5">
			<CenterContainer>
				<HorizontalList align="middle">
					{SignInContainer}
					<InlineSplitter width={60} />
					{SignInVisual}
				</HorizontalList>
			</CenterContainer>
		</FullscreenLayout>
	);

	const MobileLayout = (
		<VerticalList align="center">
			<CenterContainer>
				{/* <BlockSplitter height={50} /> */}
				{SignInVisual}
				<BlockSplitter height={50} />
				{SignInContainer}
			</CenterContainer>
		</VerticalList>
	);

	return <AdminMasterPage>{MobileLayout}</AdminMasterPage>;
};

export default SignIn;
