import React from "react";
import { connect } from "react-redux";
import classes from "./MembersContent.module.css";
import Authorizations from "./Authorizations/Authorizations.js";
import Modal from "../../HOC/Modal.js";
import LogOutConfirmation from "./LogOutConfirmation/LogOutConfirmation.js";
import RegisteredUsers from "./RegisteredUsers/RegisteredUsers.js";
import PrivNotices from "./PrivNotices/PrivNotices.js";

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
					case null:
						return <div></div>;
					case "Auth":
						return <Authorizations />;
					case "all-users":
						return <RegisteredUsers />;
					case "private-notices":
						return <PrivNotices />;
					case "log-out":
						return (
							<Modal>
								<LogOutConfirmation />
							</Modal>
						);

					default:
						return <div>{this.props.content}</div>;
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
