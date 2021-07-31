// import CONFIG from "web.config";
import { useSession } from "next-auth/client";
// import SignIn from "@/components/website/auth/SignIn";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CenterContainer from "@/components/diginext/containers/CenterContainer";

/*
 * @param  {React.Component} Element - Next.js Page Component
 * @param  {Object} options - Authentication options
 * @param  {string} options.redirectTo - The URL you want to redirect to if the authentication is failed
 */
export const withAuthWrapper = (Element, options) => (props) => {
	const [session, loading] = useSession();
	const router = useRouter();

	let pageProps = { user: session ? session.user : {}, ...props };

	useEffect(() => {
		// console.log(session, loading);
		if (!session && !loading) {
			if (typeof window != "undefined")
				router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
			return;
		}
		if (session && session.user && !session.user.name && !session.user.team_id) {
			if (router.asPath != "/team/create") router.push("/team/create");
		}
	}, [session, loading]);

	return (
		<>
			{loading && <CenterContainer>Loading...</CenterContainer>}
			{session && !loading ? <Element {...pageProps} /> : null}
		</>
	);
};
