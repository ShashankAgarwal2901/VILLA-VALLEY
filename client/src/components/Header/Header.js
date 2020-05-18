import React, { Component } from "react";
import { Link } from "react-router-dom";
class Header extends Component {
	render() {
		return (
			<nav className="blue-text">
				<div className="nav-wrapper white">
					<Link to={"/"} className="brand-logo blue-text center">
						Villa Valley
					</Link>
					<ul className="right">123</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
