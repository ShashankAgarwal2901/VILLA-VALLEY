import React from "react";
import classes from "./NewScratch.module.css";
import axios from "axios";

class NewScratch extends React.Component {
	state = {
		content: "",
	};
	clearContent = () => {
		this.setState({ content: "" });
	};
	onContentChange = (e) => {
		this.setState({ content: e.target.value });
	};
	submitScratch = () => {
		if (this.state.content === "") {
			alert("You must enter some content");
		} else {
			axios
				.post("/api/submit_scratch", {
					content: this.state.content.toString(),
				})
				.then((res) => {
					if (res.data.success) {
						alert("Submitted");
						this.props.fetch();
					} else {
						alert("Some error occured");
					}
				});
			this.props.closeModal();
		}
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
				<h4>Write a new Scratch </h4>
				<div className="row">
					<div className="input-field col s12 ">
						<textarea
							value={this.state.content}
							onChange={(e) => this.onContentChange(e)}
							placeholder="Write a new Scratch"
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
							onClick={() => this.submitScratch()}
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

export default NewScratch;
