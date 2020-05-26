import React from "react";
import { connect } from "react-redux";
import classes from "./MembersOptions.module.css";

class MembersOptions extends React.Component {
	ContentState = {
		Authorizations: "Auth",
		PrivateNotices: "private-notices",
		Scratchpad: "scratchpad",
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
								className={
									classes.MemberTab +
									" " +
									ClassesToAttach.authLIclass
								}
							>
								<a
									onClick={(e) => {
										e.persist();
										this.props.func(
											e,
											this.ContentState.Authorizations
										);
									}}
									className={
										classes.Link +
										" " +
										ClassesToAttach.authLinkclass
									}
									href="#"
								>
									Authorizations
								</a>
							</li>
						);
					}
					stack.push(
						<li
							key={this.ContentState.PrivateNotices}
							className={
								classes.MemberTab +
								" " +
								ClassesToAttach.privNoticeLIclass
							}
						>
							<a
								onClick={(e) => {
									e.persist();
									this.props.func(
										e,
										this.ContentState.PrivateNotices
									);
								}}
								className={
									classes.Link +
									" " +
									ClassesToAttach.privNoticeLinkclass
								}
								href="#"
							>
								Private Notices
							</a>
						</li>,
						<li
							key={this.ContentState.Scratchpad}
							className={
								classes.MemberTab +
								" " +
								ClassesToAttach.scratchLIclass
							}
						>
							<a
								onClick={(e) => {
									e.persist();
									this.props.func(
										e,
										this.ContentState.Scratchpad
									);
								}}
								className={
									classes.Link +
									" " +
									ClassesToAttach.scratchLinkclass
								}
								href="#"
							>
								Scratchpad
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
