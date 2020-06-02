import React from "react";
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import axios from "axios";

class RegisteredUsers extends React.Component {
	state = {
		value: "",
		usersList: [],
	};
	fetchUsersList = async () => {
		const res = await axios.post("/api/users_list");
		this.setState({ usersList: res.data });
	};
	componentDidMount(prevProps, nextProps) {
		this.fetchUsersList();
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
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
						<i className="material-icons prefix">account_circle</i>
						<form
							onSubmit={(e) =>
								this.props.checkAdmin(e, this.state.value)
							}
						>
							<div className="input-field inline inputForm">
								<input
									id="password_inline"
									type="password"
									value={this.state.value}
									onChange={this.handleChange}
									className="validate"
								/>
								<h5>
									<span
										className="helper-text"
										data-error="wrong"
										data-success="right"
									>
										Enter Password
									</span>
								</h5>
								<input type="Submit" className="submitButton" />
								{this.wrongPassword()}
							</div>
						</form>
					</div>
				);
			}
			if (this.props.adminStatus === true) {
				return (
					<div className="row">
						<h4 className="center"> All Registered Users </h4>
						{this.state.usersList
							? this.state.usersList.map((user, i) => {
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
													{!user.admin ? (
														<a
															href="#"
															onClick={(e) => {
																e.persist();
																/*this.props.addUser(
																e,
																user._id
															);*/
															}}
														>
															Make Admin
														</a>
													) : (
														<div>
															Already an admin
														</div>
													)}
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
	};
}

export default connect(mapStateToProps, actions)(RegisteredUsers);
