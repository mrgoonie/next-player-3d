// /**
//  * fix: "Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
//  * https://github.com/vercel/next.js/issues/7915
//  */

import { forwardRef } from "react";
import Link from "next/link";

const CustomComponent = forwardRef((props, ref) => (
	<a className="app-link" href={props.link} ref={ref} {...props}>
		<style jsx>{`
			.app-link {
				display: ${props.display};
			}
		`}</style>
		{props.children}
	</a>
));
CustomComponent.displayName = "AppLinkCustomComponent";

function AppLink({
	children,
	directLink = false,
	prefetch = false,
	href,
	display = "inline-block",
	ref,
	target = "",
	...props
}) {
	const useA = (
		<CustomComponent link={href} display={display} ref={ref} {...props}>
			{children}
		</CustomComponent>
	);

	const useLink = (
		<Link href={href} passHref prefetch={prefetch} {...props}>
			<CustomComponent display={display} ref={ref} target={target}>
				{children}
			</CustomComponent>
		</Link>
	);

	return directLink ? useA : useLink;
}

export default AppLink;
