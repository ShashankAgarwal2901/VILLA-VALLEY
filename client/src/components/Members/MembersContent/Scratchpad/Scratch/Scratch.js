import React from "react";
import classes from "./Scratch.module.css";
import Modal from "../../../../HOC/Modal.js";
import NewReply from "./NewReply/NewReply.js";
import axios from "axios";
import DeleteScratch from "./DeleteScratch/DeleteScratch.js";
import { connect } from "react-redux";

class Scratch extends React.Component {
	state = {
		viewReplyModal: false,
		viewDeleteModal: false,
	};

	showReplyModal = () => {
		this.setState({ viewReplyModal: true });
	};
	closeModal = () => {
		this.setState({ viewReplyModal: false });
	};
	showDeleteModal = () => {
		this.setState({ viewDeleteModal: true });
	};
	DeleteModal = () => {
		return this.state.viewDeleteModal ? (
			<Modal func={this.closeModal}>
				<DeleteScratch
					fetch={this.props.fetch}
					id={this.props.scratch._id}
				/>
			</Modal>
		) : null;
	};
	deleteReply = async (r) => {
		const res = await axios.post("/api/delete_reply", {
			reply: r,
			id: this.props.scratch._id,
		});
		if (res.data.success) {
			alert("Reply deleted");
			this.props.fetch();
		}
		if (res.data.failure) {
			alert("Error Occured");
		}
	};

	replyModal = () => {
		return this.state.viewReplyModal ? (
			<Modal func={this.closeModal}>
				<NewReply
					fetch={this.props.fetch}
					scratch={this.props.scratch}
				/>
			</Modal>
		) : null;
	};
	repliesList = () => {
		return this.props.scratch.reply.length != 0 ? (
			this.props.scratch.reply.map((reply, i) => {
				return (
					<li key={"Reply " + i.toString()}>
						<div className={classes.replyParent}>
							<div className={classes.replyTopParent}>
								<div>
									<i
										style={{
											fontSize: "0.9rem",
											marginBottom: "3px",
										}}
									>
										Reply by {reply.userEmail} on{" "}
										{reply.createdAt}
									</i>
								</div>
								{this.props.adminStatus ? (
									<a
										href="#"
										onClick={() => this.deleteReply(reply)}
										style={{ color: "#d73f3f" }}
									>
										Delete this reply
									</a>
								) : null}
							</div>
							<div>{reply.reply}</div>
						</div>
					</li>
				);
			})
		) : (
			<li key="no-reply">
				<h6>No Replies</h6>
			</li>
		);
	};
	render() {
		return (
			<div className={classes.parent}>
				{this.replyModal()}
				{this.DeleteModal()}
				<div className={classes.topBarParent}>
					<div className={classes.topParent}>
						<div className={classes.scratchID}>
							{"id: # " +
								this.props.scratch.createdOn
									.toString()
									.substr(11, 12)
									.split(":")
									.reverse()
									.join("")}
						</div>
						<div className={classes.Date}>
							<i>
								{"Published: " +
									this.props.scratch.createdOn
										.toString()
										.substr(0, 10)
										.split("-")
										.reverse()
										.join("-")}
							</i>
						</div>
					</div>
					{this.props.adminStatus === true ? (
						<button
							onClick={() => this.showDeleteModal()}
							className={classes.deleteButton}
						>
							{" "}
							Delete
						</button>
					) : null}
				</div>
				<div className={classes.Content}>
					<p>{this.props.scratch.content}</p>
				</div>
				<div className={classes.bottomParent}>
					<div className={classes.author}>
						<p>
							{"written by : " + this.props.scratch.authorEmail}
						</p>
					</div>
					<div>
						<button
							onClick={() => this.showReplyModal()}
							className={classes.Reply}
						>
							<i className="material-icons">add</i>
							<p className={classes.text}>Reply</p>
						</button>
					</div>
				</div>
				<div
					style={{ marginLeft: "5px" }}
					className={classes.ReplyList}
				>
					<p>Replies to this Scratch: </p>
					<ul className={classes.uList}>{this.repliesList()}</ul>
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

export default connect(mapStateToProps)(Scratch);
