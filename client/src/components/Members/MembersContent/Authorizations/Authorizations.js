import React from "react";
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import "./Authorizations.css";

class Authorizations extends React.Component {
	state = {
		value: "",
		resetter: true,
	};
	componentDidMount() {
		this.props.fetchAuthList();
	}
	componentDidUpdate() {}
	handleChange = (e) => {
		this.setState({ value: e.target.value });
	};
	resetterfunc = () => {
		const newState = !this.state.resetter;
		this.setState({ resetter: newState });
	};

	wrongPassword = () => {
		if (this.props.adminStatus === "Wrong password") {
			return <h6 className="red-text center">Wrong Password</h6>;
		} else return null;
	};

	render() {
		if (this.props.auth) {
			if (
				this.props.adminStatus === null ||
				this.props.adminStatus === "Wrong password"
			) {
				return (
					<div className="row center Password">
						<i class="material-icons prefix">account_circle</i>
						<form
							onSubmit={(e) =>
								this.props.checkAdmin(e, this.state.value)
							}
						>
							<div class="input-field inline inputForm">
								<input
									id="password_inline"
									type="password"
									value={this.state.value}
									onChange={this.handleChange}
									class="validate"
								/>
								<h5>
									<span
										class="helper-text"
										data-error="wrong"
										data-success="right"
									>
										Enter Password
									</span>
								</h5>
								<input type="Submit" class="submitButton" />
								{this.wrongPassword()}
							</div>
						</form>
					</div>
				);
			}
			if (this.props.adminStatus === true) {
				return (
					<div className="row">
						<h4 className="center"> New Users to add </h4>
						{this.props.pendingUsers
							? this.props.pendingUsers.map((user, i) => {
									return (
										<div key={i} className="col s12 m6">
											<div className="card blue-grey white">
												<div className="card-content black-text">
													<span className="card-title">
														{user.name}
													</span>
													<p>{user.email}</p>
												</div>
												<div className="card-action">
													<a
														href="#"
														onClick={(e) => {
															e.persist();
															this.props.addUser(
																e,
																user._id
															);
															this.props.fetchAuthList();
														}}
													>
														Accept
													</a>
													<a href="#">Deny</a>
												</div>
											</div>
										</div>
									);
							  })
							: null}
					</div>
				);
			}
		}
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth.admin,
		adminStatus: state.adminStatus,
		pendingUsers: state.pendingUsers,
	};
}

export default connect(mapStateToProps, actions)(Authorizations);
