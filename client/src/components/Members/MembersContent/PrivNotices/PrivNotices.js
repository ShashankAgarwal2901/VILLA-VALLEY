import React from "react";
import NewNotice from "./NewNotice/NewNotice.js";
import ViewNotice from "./ViewNotice/ViewNotice.js";
import Modal from "../../../HOC/Modal.js";
import classes from "./PrivNotices.module.css";
import { connect } from "react-redux";
import axios from "axios";

class PrivNotices extends React.Component {
	state = {
		showModal: false,
		showNotice: "private",
		ViewTheNotice: false,
		NoticeType: "",
		PrivateNotices: [],
		PublicNotices: [],
	};
	setModalFalse = () => {
		this.setState({
			showModal: false,
			ViewTheNotice: false,
			NoticeType: "",
		});

		axios.post("/api/get_private_notices").then((res) => {
			this.setState({ PrivateNotices: res.data });
		});
		axios.post("/api/get_public_notices").then((res) => {
			this.setState({ PublicNotices: res.data });
		});
	};
	showNoticeCreator = () => {
		return (
			<Modal func={this.setModalFalse}>
				<NewNotice />
			</Modal>
		);
	};
	setViewTheNotice = (e, a, b) => {
		e.preventDefault();
		this.setState({ ViewTheNotice: a, NoticeType: b });
	};

	ViewTheNotice = () => {
		return (
			<Modal func={this.setModalFalse}>
				<ViewNotice
					noticeType={this.state.NoticeType}
					notice={this.state.ViewTheNotice}
				/>
			</Modal>
		);
	};
	componentDidMount() {
		axios.post("/api/get_private_notices").then((res) => {
			this.setState({ PrivateNotices: res.data });
		});
		axios.post("/api/get_public_notices").then((res) => {
			this.setState({ PublicNotices: res.data });
		});
	}
	showNotices = () => {
		switch (this.state.showNotice) {
			case "private":
				return (
					<div>
						<li className="collection-header">
							<h4>Members Notices</h4>
						</li>
						{this.state.PrivateNotices.map((notice, i) => {
							return (
								<li
									onClick={(e) => {
										e.persist();

										this.setViewTheNotice(
											e,
											{ ...notice },
											"Members"
										);
									}}
									key={i}
									className={
										"collection-item " + classes.Item
									}
								>
									<p>{notice.title}</p>
									<span>
										<p>
											<i>Published on: </i>
											{notice.createdOn
												.substr(0, 10)
												.split("-")
												.reverse()
												.join("-")}
										</p>
									</span>
								</li>
							);
						})}
					</div>
				);
				break;
			case "public":
				return (
					<div>
						<li className="collection-header">
							<h4>Public Notices</h4>
						</li>
						{this.state.PublicNotices.map((notice, i) => {
							return (
								<li
									onClick={(e) => {
										e.persist();

										this.setViewTheNotice(
											e,
											{ ...notice },
											"Public"
										);
									}}
									key={i}
									className={
										"collection-item " + classes.Item
									}
								>
									<p>{notice.title}</p>
									<span>
										<p>
											<i>Published on: </i>
											{notice.createdOn
												.substr(0, 10)
												.split("-")
												.reverse()
												.join("-")}
										</p>
									</span>
								</li>
							);
						})}
					</div>
				);
				break;
			default:
				return <p>Error</p>;
		}
	};
	setNoticeState = (e, a) => {
		e.preventDefault();
		this.setState({ showNotice: a });
	};
	renderNewNoticeButton = () => {
		if (this.props.adminStatus === true) {
			return (
				<a
					onClick={() => this.setState({ showModal: true })}
					href="#"
					className={"btn-floating btn-large red " + classes.Button}
				>
					<i className="large material-icons">add</i>
				</a>
			);
		} else {
			return null;
		}
	};

	render() {
		return (
			<div className={classes.PrivParent}>
				<div className="row">
					<div className="col s6 center">
						<button
							onClick={(e) => {
								e.persist();
								this.setNoticeState(e, "private");
							}}
							className={
								this.state.showNotice === "private"
									? classes.Button2 + " " + classes.active
									: classes.Button2 + " " + classes.inactive
							}
						>
							Members Notices
						</button>{" "}
					</div>
					<div className="col s6 center">
						<button
							onClick={(e) => {
								e.persist();
								this.setNoticeState(e, "public");
							}}
							className={
								this.state.showNotice === "public"
									? classes.Button2 + " " + classes.active
									: classes.Button2 + " " + classes.inactive
							}
						>
							Public Notices
						</button>{" "}
					</div>
				</div>
				<div className="row">
					<div className="col s12">
						<ul className="collection with-header">
							{this.showNotices()}
						</ul>
					</div>
				</div>
				{this.renderNewNoticeButton()}
				{this.state.ViewTheNotice ? this.ViewTheNotice() : null}
				{this.state.showModal ? this.showNoticeCreator() : null}
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

export default connect(mapStateToProps)(PrivNotices);
