import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Drawer from "./Drawer/Drawer.js";
import "./Header.css";

class Header extends Component {
	state = {
		showDrawer: false,
	};
	renderHeaderContent = () => {
		if (this.props.auth)
			return [
				<li key="Log out header">
					<a
						className={"collection-item  transparent logOut"}
						href="/api/logout"
					>
						Log Out
					</a>
				</li>,
			];
		else {
			return [
				<li key="Log in header">
					<a
						className={"collection-item  transparent logOut"}
						href="/auth/google"
					>
						Log in
					</a>
				</li>,
			];
		}
	};

	switchDrawer = (e, a) => {
		e.preventDefault();
		const newState = a;
		this.setState({ showDrawer: newState });
	};
	render() {
		return (
			<div>
				<Drawer
					show={this.state.showDrawer}
					showFunction={this.switchDrawer}
				/>
				<nav className="white-text">
					<div className="nav-wrapper navColor">
						<a
							href="#"
							onClick={(e) => {
								e.persist();
								this.switchDrawer(e, true);
							}}
						>
							<span className="material-icons drawerIcon">
								reorder
							</span>{" "}
						</a>
						<Link to={"/"} className="brand-logo center">
							Villa Valley
						</Link>
						<div className="listItem">
							<ul>{this.renderHeaderContent()}</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
