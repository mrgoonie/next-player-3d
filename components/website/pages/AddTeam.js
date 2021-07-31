import React, { useRef } from "react";
import CenterContainer from "@/diginext/containers/CenterContainer";
import BlockSplitter from "@/diginext/elements/BlockSplitter";
import { Input, ValidationType } from "@/diginext/form/Form";
import BasicLayout from "@/diginext/layout/BasicLayout";
import { VerticalList } from "@/diginext/layout/ListLayout";
import AdminButton, { ButtonSize } from "components/dashkit/Buttons";
import asset from "plugins/assets/asset";
import { DefaultStyles } from "components/admin/layout/AdminGlobalStyle";
import AdminMasterPage from "components/admin/layout/AdminMasterPage";
import { useNextDevice } from "@/plugins/next-reponsive";
import { fetchApi } from "modules/FetchApi";
import { useSession } from "next-auth/client";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useToggle } from "ahooks";

const AddTeam = ({ user }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const device = useNextDevice();
	const nameRef = useRef();
	const teamRef = useRef();
	const [isSubmitting, { toggle }] = useToggle();
	// console.log(session.user);

	const submitHandle = () => {
		if (nameRef.current.isValid && teamRef.current.isValid) {
			toggle(true);

			fetchApi({
				path: "/api/v1/team",
				method: "POST",
				data: {
					owner: session.user.id,
					owner_name: nameRef.current.value,
					name: teamRef.current.value,
				},
			})
				.then((res) => {
					if (res.status == 1) {
						router.push("/dashboard");
					} else {
						notification.error({ message: "Error", description: res.messages[0] });
					}
				})
				.catch((err) => {
					toggle(false);
					notification.error({ message: "Error", description: err });
				});
		}
	};

	const SignInVisual = (
		<BasicLayout width={device == "desktop" ? "220px" : "60%"} style={{ margin: "auto" }}>
			<img alt="login" src={asset("/admin/images/login_visual.png")} />
		</BasicLayout>
	);

	const SignInContainer = (
		<BasicLayout className="login-container" minWidth="360px">
			<div style={{ textAlign: "center", marginBottom: "20px" }}>
				<h1>Your information</h1>
				<p style={{ color: DefaultStyles.colors.secondary }}>You can change it for later.</p>
			</div>

			<Input
				ref={nameRef}
				label="Full name"
				placeholder="YOUR NAME"
				validateConditions={[{ type: ValidationType.NOT_EMPTY, errMessage: "Please enter your full name." }]}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						submitHandle();
					}
				}}
			/>

			<Input
				ref={teamRef}
				label="Team name"
				placeholder="YOUR COMPANY"
				validateConditions={[{ type: ValidationType.NOT_EMPTY, errMessage: "Please enter your team name." }]}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						submitHandle();
					}
				}}
				defaultValue={session.user.team_name}
			/>

			<AdminButton
				size={ButtonSize.LARGE}
				onClick={() => submitHandle()}
				style={{ width: "100%", textAlign: "center" }}
				disabled={isSubmitting}
			>
				{isSubmitting ? "Waiting" : "Next"}
			</AdminButton>
		</BasicLayout>
	);

	return (
		<AdminMasterPage>
			<VerticalList align="center">
				<CenterContainer>
					{SignInVisual}
					<BlockSplitter height={20} />
					{SignInContainer}
				</CenterContainer>
			</VerticalList>
		</AdminMasterPage>
	);
};

export default AddTeam;
