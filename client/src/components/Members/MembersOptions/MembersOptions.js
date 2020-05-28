import React from "react";
import { connect } from "react-redux";
import classes from "./MembersOptions.module.css";

class MembersOptions extends React.Component {
	ContentState = {
		Authorizations: "Auth",
		RegisteredUsers: "all-users",
		PrivateNotices: "private-notices",
		Scratchpad: "scratchpad",
		LogOut: "log-out",
	};

	renderMembersOptions() {
		const ClassesToAttach = {
			authLIclass:
				this.props.content === this.ContentState.Authorizations
					? classes.active
					: null,
			authLinkclass:
				this.props.content === this.ContentState.Authorizations
					? classes.LinkActive
					: null,
			RegLIclass:
				this.props.content === this.ContentState.RegisteredUsers
					? classes.active
					: null,
			RegLinkclass:
				this.props.content === this.ContentState.RegisteredUsers
					? classes.LinkActive
					: null,
			privNoticeLIclass:
				this.props.content === this.ContentState.PrivateNotices
					? classes.active
					: null,
			privNoticeLinkclass:
				this.props.content === this.ContentState.PrivateNotices
					? classes.LinkActive
					: null,
			scratchLIclass:
				this.props.content === this.ContentState.Scratchpad
					? classes.active
					: null,
			scratchLinkclass:
				this.props.content === this.ContentState.Scratchpad
					? classes.LinkActive
					: null,
			LogOutLI:
				this.props.content === this.ContentState.LogOut
					? classes.active
					: null,
			LogOutLink:
				this.props.content === this.ContentState.LogOut
					? classes.LinkActive
					: null,
		};
		switch (this.props.auth) {
			case null || false:
				return;
				break;
			default:
				let stack = [];
				if (this.props.auth) {
					if (this.props.auth.admin) {
						stack.push(
							<li
								key={this.ContentState.Authorizations}
								onClick={(e) => {
									e.persist();
									this.props.func(
										e,
										this.ContentState.Authorizations
									);
									this.props.closeDrawerfunc();
								}}
								className={
									classes.MemberTab +
									" " +
									ClassesToAttach.authLIclass
								}
							>
								<a
									className={
										classes.Link +
										" " +
										ClassesToAttach.authLinkclass
									}
								>
									Authorizations
								</a>
							</li>,
							<li
								key={this.ContentState.RegisteredUsers}
								onClick={(e) => {
									e.persist();
									this.props.func(
										e,
										this.ContentState.RegisteredUsers
									);
									this.props.closeDrawerfunc();
								}}
								className={
									classes.MemberTab +
									" " +
									ClassesToAttach.RegLIclass
								}
							>
								<a
									className={
										classes.Link +
										" " +
										ClassesToAttach.RegLinkclass
									}
								>
									Registered Users
								</a>
							</li>
						);
					}
					stack.push(
						<li
							key={this.ContentState.PrivateNotices}
							onClick={(e) => {
								e.persist();
								this.props.func(
									e,
									this.ContentState.PrivateNotices
								);
								this.props.closeDrawerfunc();
							}}
							className={
								classes.MemberTab +
								" " +
								ClassesToAttach.privNoticeLIclass
							}
						>
							<a
								className={
									classes.Link +
									" " +
									ClassesToAttach.privNoticeLinkclass
								}
							>
								Private Notices
							</a>
						</li>,
						<li
							key={this.ContentState.Scratchpad}
							onClick={(e) => {
								e.persist();
								this.props.func(
									e,
									this.ContentState.Scratchpad
								);
								this.props.closeDrawerfunc();
							}}
							className={
								classes.MemberTab +
								" " +
								ClassesToAttach.scratchLIclass
							}
						>
							<a
								className={
									classes.Link +
									" " +
									ClassesToAttach.scratchLinkclass
								}
							>
								Scratchpad
							</a>
						</li>,
						<li
							key={this.ContentState.LogOut}
							className={
								classes.MemberTab +
								" " +
								ClassesToAttach.LogOutLI
							}
							onClick={(e) => {
								e.persist();
								this.props.closeDrawerfunc();
								this.props.func(e, this.ContentState.LogOut);
							}}
						>
							<a
								className={
									classes.Link +
									" " +
									ClassesToAttach.LogOutLink
								}
								href=""
							>
								Logout
							</a>
						</li>
					);
				}
				return stack;
				break;
		}
	}
	render() {
		return (
			<div class={classes.Collection}>
				{" "}
				<ul className="col s12"> {this.renderMembersOptions()} </ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(MembersOptions);
