import React, { Component } from "react";
import classes from "./Placeholder.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Placeholder extends Component {
	showLoginButton = () => {
		return !this.props.auth ? (
			<div className="row">
				<div className="col s12 m6 offset-m3">
					<a
						href="/auth/google"
						className={
							"waves-effect waves-light btn-large " +
							classes.Button
						}
					>
						Log in with Google
					</a>
				</div>
			</div>
		) : null;
	};
	render() {
		return (
			<div className={classes.placeholder}>
				<div className={classes.Overlay}>
					<div className={"container " + classes.b}>
						<div className={classes.landingContent}>
							<h4> Welcome to Villa Valley Website </h4>
							<p>
								This is a information page for general viewing ,
								as well as a Members area to share info
							</p>
							<div className={"row"}>
								<div className="col s6 l3 offset-l3">
									<a
										href="#Notices"
										className={
											"waves-effect waves-light btn " +
											classes.Button
										}
									>
										Notices
									</a>
								</div>
								<div className="col s6 l3">
									<Link
										to={"/members"}
										className={
											"waves-effect waves-light btn " +
											classes.Button
										}
									>
										Members
									</Link>
								</div>
							</div>
							{this.showLoginButton()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Placeholder);
