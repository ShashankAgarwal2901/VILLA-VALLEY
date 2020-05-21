import React, { Component } from "react";
import { Link } from "react-router-dom";
import Drawer from "./Drawer/Drawer.js";
import "./Header.css";

class Header extends Component {
	state = {
		showDrawer: false,
	};

	switchDrawer = (e, a) => {
		e.preventDefault();
		const newState = a;
		this.setState({ showDrawer: newState });
		console.log(this.state.showDrawer);
	};
	render() {
		return (
			<div>
				<Drawer
					show={this.state.showDrawer}
					showFunction={this.switchDrawer}
				/>
				<nav className="blue-text">
					<div className="nav-wrapper white b">
						<a
							href="#"
							onClick={(e) => {
								e.persist();
								this.switchDrawer(e, true);
							}}
						>
							<span class="material-icons black-text">
								reorder
							</span>{" "}
						</a>
						<Link to={"/"} className="brand-logo blue-text center">
							Villa Valley
						</Link>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;
