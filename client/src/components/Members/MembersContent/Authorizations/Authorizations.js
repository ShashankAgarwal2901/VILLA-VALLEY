import React from "react";
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import "./Authorizations.css";
import Modal from "../../../HOC/Modal.js";
import axios from "axios";

class Authorizations extends React.Component {
	state = {
		value: "",
		pendingUsers: [],
		usersToShow: [],
		searchValue: "",
		showModal: false,
	};
	fetchAuthList = async () => {
		const res = await axios.post("api/get_pending_users");
		this.setState({ pendingUsers: res.data });
	};

	addUser = async (e, user) => {
		const res = await axios.post("api/add_user", { userToAdd: user });
		if (res.data.message === "success") {
			alert("User was successfully added");
		} else {
			alert("Some error occured");
		}
	};

	denyUser = async (e, user) => {
		const res = await axios.post("api/deny_user", { userToDel: user });
		if (res.data.message === "success") {
			alert("User was successfully added");
		} else {
			alert("Some error occured");
		}
	};
	componentDidMount() {
		this.fetchAuthList();
	}

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
	ModalGenerator = () => {
		if (this.state.showModal) {
			return (
				<Modal func={this.setModalFalse}>
					<div className="card white">
						<div className="card-content black-text">
							<span className="card-title">Are you Sure?</span>
							<p>
								Are you sure you want{" "}
								{this.state.showModal.type} this user?
							</p>
							<p className="center">
								{this.state.showModal.name}
							</p>
						</div>

						<div className="card-action">
							<a
								onClick={(e) => {
									if (this.state.showModal.type === "add") {
										this.addUser(
											e,
											this.state.showModal.id
										);
									}
									if (this.state.showModal.type === "deny") {
										this.denyUser(
											e,
											this.state.showModal.id
										);
									}
									this.fetchAuthList();
									this.setModalFalse();
								}}
								className="authConfirmModal"
								href="#"
							>
								Confirm{" "}
							</a>
						</div>
					</div>
				</Modal>
			);
		}
	};

	wrongPassword = () => {
		if (this.props.adminStatus === "Wrong password") {
			return <h6 className="red-text center">Wrong Password</h6>;
		} else return null;
	};
	setModalFalse = () => {
		this.setState({
			showModal: false,
		});
	};
	showModalfunc = (e, a, b, c) => {
		e.preventDefault();
		this.setState({
			showModal: { name: a, id: b, type: c },
		});
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
							onSubmit={(e) => {
								this.props.checkAdmin(e, this.state.value);
							}}
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
					<div>
						{this.ModalGenerator()}
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

																this.showModalfunc(
																	e,
																	user.name,
																	user._id,
																	"add"
																);
															}}
														>
															Accept
														</a>
														<a
															href="#"
															onClick={(e) => {
																e.persist();
																this.showModalfunc(
																	e,
																	user.name,
																	user._id,
																	"deny"
																);
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
