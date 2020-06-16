import React from "react";
import axios from "axios";
import classes from "./NewReply.module.css";
import { connect } from "react-redux";

class NewReply extends React.Component {
	state = {
		content: "",
	};
	clearContent = () => {
		this.setState({ content: "" });
	};
	onContentChange = (e) => {
		this.setState({ content: e.target.value });
	};

	postReply = () => {
		this.state.content && this.props.auth != ""
			? axios
					.post("/api/scratch_reply", {
						scratch: this.props.scratch._id,
						message: this.state.content,
					})
					.then((res) => {
						if (res.data.success) {
							alert("Reply sent");
							this.props.fetch();
						} else {
							alert("error");
						}
					})
			: alert("You must write something");

		if (!this.props.auth) {
			alert("You are not logged in");
		}
		this.props.closeModal();
	};
	render() {
		return (
			<div className={classes.parent}>
				<p
					onClick={() => this.props.closeModal()}
					className={classes.Xmark}
				>
					x
				</p>
				<h6>
					Write a Reply to{" "}
					<i style={{ fontWeight: "bold" }}>
						{this.props.scratch.authorEmail}
					</i>{" "}
					for Scratch{" "}
					{"id: # " +
						this.props.scratch.createdOn
							.toString()
							.substr(11, 12)
							.split(":")
							.reverse()
							.join("")}
				</h6>
				<div className="row">
					<div className="input-field col s12 ">
						<textarea
							value={this.state.content}
							onChange={(e) => this.onContentChange(e)}
							placeholder="Write a reply"
							rows="5"
							id="textarea1"
							className={classes.TextArea}
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
				<div className="row">
					<div className={"col s12 center"}>
						<button
							onClick={() => this.postReply()}
							className={classes.ConfirmSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(NewReply);
