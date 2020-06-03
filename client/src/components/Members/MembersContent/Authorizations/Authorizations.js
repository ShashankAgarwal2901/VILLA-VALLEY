import React from "react";
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import "./Authorizations.css";
import axios from "axios";

class Authorizations extends React.Component {
	state = {
		value: "",
		pendingUsers: [],
		usersToShow: [],
		searchValue: "",
	};
	fetchAuthList = async () => {
		const res = await axios.post("api/get_pending_users");
		this.setState({ pendingUsers: res.data });
	};
	addUser = async (e, user) => {
		const res = await axios.post("api/add_user", { userToAdd: user });
	};

	denyUser = async (e, user) => {
		const res = await axios.post("api/deny_user", { userToDel: user });
	};
	componentDidMount(prevProps, nextProps) {
		this.fetchAuthList();
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	};

	modifyList = () => {
		if (this.state.searchValue === "") {
			this.setState({ usersToShow: this.state.pendingUsers });
		} else {
			let list = [];
			let regex = RegExp(this.state.searchValue, "i");
			for (var i = 0; i < this.state.pendingUsers.length; i++) {
				if (regex.test(this.state.pendingUsers[i].email)) {
					list.push(this.state.pendingUsers[i]);
				}
			}

			this.setState({ usersToShow: list });
		}
	};

	updateSearch = (e) => {
		e.preventDefault();
		this.setState({ searchValue: e.target.value }, this.modifyList());
	};
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
						<h4 className="center authParent">
							{" "}
							New Users to add{" "}
						</h4>

						<div className="row">
							<div className="col s10 offset-s1 l8 offset-l2 authParent">
								<div>
									<input
										onChange={(e) => {
											e.persist();
											this.updateSearch(e);
										}}
										placeholder="Search"
										id="Searchbar"
										value={this.state.searchValue}
										type="text"
										className="validate"
									/>
									<label>
										<span className="material-icons authMaterial">
											search
										</span>
									</label>
								</div>
							</div>
						</div>
						{this.state.pendingUsers
							? this.state.pendingUsers.map((user, i) => {
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
															this.addUser(
																e,
																user._id
															);
															this.fetchAuthList();
														}}
													>
														Accept
													</a>
													<a
														href="#"
														onClick={(e) => {
															e.persist();
															this.denyUser(
																e,
																user._id
															);
															this.fetchAuthList();
														}}
													>
														Deny
													</a>
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

export default connect(mapStateToProps, actions)(Authorizations);
