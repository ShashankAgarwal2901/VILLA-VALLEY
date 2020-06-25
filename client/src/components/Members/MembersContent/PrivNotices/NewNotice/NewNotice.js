import React from "react";
import classes from "./NewNotice.module.css";
import Modal from "../../../../HOC/Modal.js";
import { connect } from "react-redux";
import axios from "axios";

class NewNotice extends React.Component {
	state = {
		title: "",
		subject: "",
		content: "",
		visibility: "",
		viewSummary: false,
	};
	componentDidMount() {
		window.addEventListener(
			"popstate",
			(event) => {
				if (event.state) {
					if (this.state.viewSummary) {
						event.preventDefault();
						this.setModalFalse();
					}
				}
			},
			false
		);
	}
	componentWillUnmount() {
		window.removeEventListener("popstate", () => null);
	}

	finalSubmit = async () => {
		if (this.state.title === "") {
			alert("You have not set a Title");
			return null;
		}
		if (this.state.subject === "") {
			alert("You have not set a Subject");
			return null;
		}
		if (this.state.content === "") {
			alert("You have written any Content");
			return null;
		}
		if (this.state.visibility === "") {
			alert("You have not set this notice as public or Members only");
			return null;
		} else {
			if (
				this.state.title &&
				this.state.subject &&
				this.state.content &&
				this.state.visibility
			) {
				const res = await axios.post("/api/new_notice", {
					NoticeContent: {
						title: this.state.title,
						subject: this.state.subject,
						content: this.state.content,
						visibility: this.state.visibility,
					},
				});
				if (res.data.message === "success") {
					alert("Form has been submitted for viewing");
					this.setState({ viewSummary: false });
				}
				if (res.data.message === "error") {
					alert("Some error occurred , please try later");
					this.setState({ viewSummary: false });
				}
			} else {
				alert("Error");
			}
		}
	};

	setModalFalse = () => {
		this.setState({ viewSummary: false });
	};
	onTitleChange = (e) => {
		this.setState({ title: e.target.value });
	};
	onSubjectChange = (e) => {
		this.setState({ subject: e.target.value });
	};
	onContentChange = (e) => {
		this.setState({ content: e.target.value });
	};
	onVisibilityChange = (a) => {
		this.setState({ visibility: a });
	};
	clearAll = () => {
		this.setState({ title: "", subject: "", content: "", visibility: "" });
	};

	clearContent = () => {
		this.setState({ content: "" });
	};
	showSummary = () => {
		this.setState({ viewSummary: true });
	};
	newDate = new Date();
	attachedClassMembers = "";
	attachedClassPublic = "";
	render() {
		return (
			<div>
				{this.state.viewSummary ? (
					<Modal func={this.setModalFalse}>
						<div className={classes.ModalParent}>
							<div
								class={"card blue-grey white " + classes.Height}
							>
								<div class={"card-content black-text"}>
									<div class="row">
										<p
											onClick={() => this.setModalFalse()}
											className={classes.Xmark}
										>
											X
										</p>
										<div className="col s12 center">
											<h4>{this.state.subject}</h4>
										</div>
										<div className="col s12 center">
											<i>
												<p>
													By {this.props.auth.name}{" "}
												</p>
												<p
													style={{
														fontSize: "0.9rem",
														marginBottom: "5em",
													}}
												>
													{this.props.auth.email}{" "}
												</p>
											</i>
											<p>
												<strong>
													{this.state.visibility}{" "}
													Notice{" "}
												</strong>
											</p>
										</div>

										<div className="col s12 left">
											<p
												style={{
													fontSize: "0.9rem",
													marginBottom: "5em",
												}}
											>
												<i>
													Published on :
													{" " +
														this.newDate.getDate() +
														"-" +
														this.newDate.getMonth() +
														"-" +
														this.newDate.getFullYear()}
												</i>
											</p>
										</div>
										<div
											className={
												"col s12 center " +
												classes.Scrollbar
											}
										>
											<div
												className={
													classes.SummaryContent
												}
											>
												<p>{this.state.content}</p>
											</div>
										</div>
										<div className={"col s12 center"}>
											<button
												onClick={() =>
													this.finalSubmit()
												}
												className={
													classes.ConfirmSubmit
												}
											>
												Confirm Submit
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Modal>
				) : null}
				<div className={classes.Parent}>
					<div class="card blue-grey white">
						<div class="card-content black-text">
							<h4>New Notice</h4>
							<div class="row">
								<form class="col s12">
									<div class="row">
										<div class="input-field col s12">
											<input
												value={this.state.title}
												onChange={(e) =>
													this.onTitleChange(e)
												}
												placeholder="Title for reference of notice"
												id="Title"
												type="text"
												class="validate"
											/>
										</div>
										<div class="input-field col s12">
											<input
												placeholder="Subject"
												value={this.state.subject}
												onChange={(e) =>
													this.onSubjectChange(e)
												}
												id="Subject"
												type="text"
												class="validate"
											/>
										</div>
									</div>

									<div class="row">
										<div class="input-field col s12 ">
											<textarea
												value={this.state.content}
												onChange={(e) =>
													this.onContentChange(e)
												}
												placeholder="Write the Main Content for the Notice here"
												rows="5"
												id="textarea1"
												class={classes.TextArea}
											></textarea>
											<a
												href="#"
												className={classes.Button3}
												onClick={(e) => {
													e.persist();
													this.clearContent();
												}}
											>
												Clear
											</a>
										</div>
									</div>

									<div class="row">
										<div class="col s12">
											<span>
												Publish this notice for :
											</span>
											<div className={classes.Checkboxes}>
												<div
													className={classes.content}
												>
													<div
														onClick={() => {
															this.onVisibilityChange(
																"Members"
															);
															this.attachedClassMembers =
																classes.activeCheck;
															this.attachedClassPublic =
																"";
														}}
														className={
															classes.Checkbox +
															" " +
															this
																.attachedClassMembers
														}
													></div>
													<p>Members</p>
												</div>
												<div
													className={classes.content}
												>
													<div
														onClick={() => {
															this.onVisibilityChange(
																"Public"
															);
															this.attachedClassMembers =
																"";
															this.attachedClassPublic =
																classes.activeCheck;
														}}
														className={
															classes.Checkbox +
															" " +
															this
																.attachedClassPublic
														}
													></div>
													<p>Public</p>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className={classes.ButtonContainer}>
						<div>
							<a
								href="#"
								className={classes.Button}
								onClick={(e) => {
									e.persist();
									this.props.closeModal();
								}}
							>
								Exit
							</a>
						</div>
						<div>
							<a
								href="#"
								className={classes.Button2}
								onClick={(e) => {
									e.persist();
									this.clearAll();
								}}
							>
								Clear
							</a>
							<a
								href="#"
								className={classes.Button2}
								onClick={(e) => {
									e.persist();
									this.showSummary();
								}}
							>
								Submit
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth,
		adminStatus: state.adminStatus,
	};
}

export default connect(mapStateToProps)(NewNotice);
