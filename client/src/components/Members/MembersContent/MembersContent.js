import React from "react";
import { connect } from "react-redux";
import classes from "./MembersContent.module.css";
import Authorizations from "./Authorizations/Authorizations.js";

class MembersContent extends React.Component {
	renderMembersContent = () => {
		switch (this.props.auth) {
			case null:
				return <h3 className={classes.LogOutText}>Loading</h3>;

			case false:
				return (
					<div className={classes.LogOutText}>
						<h3>You must be logged in to continue</h3>,
						<a href="/">Return Home</a>
					</div>
				);

			default:
				switch (this.props.content) {
					case "Auth":
						return <Authorizations />;

					default:
						return <h4>{this.props.content}</h4>;
				}
		}
	};
	render() {
		return (
			<div className={classes.parent}>
				{" "}
				{this.renderMembersContent()}{" "}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(MembersContent);
