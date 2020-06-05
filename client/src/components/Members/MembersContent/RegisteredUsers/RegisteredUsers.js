import React from "react";
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import axios from "axios";
import classes from "./RegisteredUsers.module.css";
import Modal from "../../../HOC/Modal.js";

class RegisteredUsers extends React.Component {
	state = {
		value: "",
		usersList: [],
		usersToShow: [],
		searchValue: "",
		showModal: false,
	};
	fetchUsersList = async () => {
		const res = await axios.post("/api/users_list");
		this.setState({ usersList: res.data });
		this.setState({ usersToShow: this.state.usersList });
	};
	componentDidMount(prevProps, nextProps) {
		this.fetchUsersList();
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	};

	makeAdmin = async (e, id) => {
		e.preventDefault();
		const res = await axios.post("/api/new_admin", { idOfUser: id });
		if (res.data.message != "success") {
			alert("error");
		}
		if (res.data.message === "success") {
			this.fetchUsersList();
		}
	};

	removeUser = async (e, id) => {
		e.preventDefault();
		const res = await axios.post("/api/remove_user", { idOfUser: id });
		if (res.data.message != "success") {
			alert("error");
		}
		if (res.data.message === "success") {
			this.fetchUsersList();
		}
	};

	modifyList = () => {
		if (this.state.searchValue === "") {
			this.setState({ usersToShow: this.state.usersList });
		} else {
			let list = [];
			let regex = RegExp(this.state.searchValue, "i");
			for (var i = 0; i < this.state.usersList.length; i++) {
				if (regex.test(this.state.usersList[i].email)) {
					list.push(this.state.usersList[i]);
				}
			}

			this.setState({ usersToShow: list });
		}
	};

	updateSearch = (e) => {
		e.preventDefault();
		this.setState({ searchValue: e.target.value }, this.modifyList());
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
									if (
										this.state.showModal.type ===
										"give ADMIN RIGHTS to"
									) {
										this.makeAdmin(
											e,
											this.state.showModal.id
										);
									}
									if (
										this.state.showModal.type === "remove"
									) {
										this.removeUser(
											e,
											this.state.showModal.id
										);
									}

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
					<div>
						{this.ModalGenerator()}
						<div className="row">
							<div
								className={
									"col s10 offset-s1 l8 offset-l2 " +
									classes.Parent
								}
							>
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
										<span
											className={
												"material-icons " +
												classes.Material
											}
										>
											search
										</span>
									</label>
								</div>
							</div>
						</div>
						<div className="row">
							<h4 className="center"> All Registered Users </h4>
							{this.state.usersList
								? this.state.usersToShow.map((user, i) => {
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
															<div
																className={
																	classes.actions
																}
															>
																<a
																	href="#"
																	onClick={(
																		e
																	) => {
																		e.persist();
																		this.showModalfunc(
																			e,
																			user.name,
																			user._id,
																			"give ADMIN RIGHTS to"
																		);
																	}}
																>
																	Make Admin
																</a>
																<a
																	href="#"
																	onClick={(
																		e
																	) => {
																		e.persist();
																		this.showModalfunc(
																			e,
																			user.name,
																			user._id,
																			"remove"
																		);
																	}}
																>
																	Remove User
																</a>
															</div>
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
