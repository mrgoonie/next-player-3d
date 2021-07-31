import React from "react";
import Link from "@/components/theme/utils/ActiveLink";
import * as Icon from "react-feather";
import { useSession } from "next-auth/client";
// import { useSelector } from 'react-redux'

const Navbar = () => {
	const [session, loading] = useSession();

	// const cart = useSelector((state) => state.cart)
	const [menu, setMenu] = React.useState(true);

	const toggleNavbar = () => {
		setMenu(!menu);
	};

	React.useEffect(() => {
		let elementId = document.getElementById("header");
		document.addEventListener("scroll", () => {
			if (window.scrollY > 170) {
				elementId.classList.add("is-sticky");
			} else {
				elementId.classList.remove("is-sticky");
			}
		});
		window.scrollTo(0, 0);
	});

	const classOne = menu ? "collapse navbar-collapse" : "collapse navbar-collapse show";
	const classTwo = menu ? "navbar-toggler navbar-toggler-right collapsed" : "navbar-toggler navbar-toggler-right";

	return (
		<header id="header" className="headroom">
			<div className="startp-nav">
				<div className="container">
					<nav className="navbar navbar-expand-md navbar-light">
						<Link href="/">
							<a onClick={toggleNavbar} className="navbar-brand">
								<img src="/images/gotest-logo.svg" alt="logo" style={{ width: "160px" }} />
							</a>
						</Link>

						<button
							onClick={toggleNavbar}
							className={classTwo}
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="icon-bar top-bar"></span>
							<span className="icon-bar middle-bar"></span>
							<span className="icon-bar bottom-bar"></span>
						</button>

						<div className={classOne} id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto">
								<li className="nav-item">
									<Link href="/" activeClassName="active">
										<a onClick={toggleNavbar} className="nav-link">
											Home
										</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link href="/features" activeClassName="active">
										<a onClick={toggleNavbar} className="nav-link">
											Features
										</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link href="/pricing" activeClassName="active">
										<a onClick={toggleNavbar} className="nav-link">
											Pricing
										</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link href="/news" activeClassName="active">
										<a onClick={toggleNavbar} className="nav-link">
											News
										</a>
									</Link>
								</li>

								<li className="nav-item">
									<Link href="/learn" activeClassName="active">
										<a onClick={toggleNavbar} className="nav-link">
											Learn
										</a>
									</Link>
								</li>
							</ul>
						</div>

						<div className="others-option">
							<Link href="/contact">
								<a className="btn btn-light">Support</a>
							</Link>

							{session && session.user ? (
								<Link href="/dashboard">
									<a className="btn btn-primary">Dashboard</a>
								</Link>
							) : (
								<Link href="/signin">
									<a className="btn btn-primary">Login</a>
								</Link>
							)}
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
