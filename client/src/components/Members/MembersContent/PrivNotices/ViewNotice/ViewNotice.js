import React from "react";
import classes from "../NewNotice/NewNotice.module.css";
import { connect } from "react-redux";
import axios from "axios";

class ViewNotice extends React.Component {
	componentDidMount() {
		this.sawNotice();
	}
	componentWillUnmount() {}
	sawNotice = () => {
		let flag = 0;
		for (var i = 0; i < this.props.notice.seenBy.length; i++) {
			if (this.props.auth.email === this.props.notice.seenBy[i]) {
				flag = 1;
			}
		}

		if (!flag || this.props.notice.seenBy.length === 0) {
			console.log(flag);
			axios
				.post("/api/saw_notice", {
					whichNotice: this.props.notice._id,
					userThatSaw: this.props.auth.email,
				})
				.then((res) => console.log(res));
			return null;
		} else {
			return null;
		}
	};
	render() {
		return (
			<div className={classes.ModalParent}>
				<div className={"card blue-grey white " + classes.Height}>
					<div className={"card-content black-text"}>
						<div className="row">
							<p
								onClick={() => this.props.func()}
								className={classes.Xmark}
							>
								X
							</p>
							<div className="col s12 center">
								<h4>{this.props.notice.subject}</h4>
							</div>
							<div className="col s12 center">
								<i>
									<p>By {this.props.notice.authorName} </p>
									<p
										style={{
											fontSize: "0.9rem",
											marginBottom: "5em",
										}}
									>
										{this.props.notice.authorEmail}{" "}
									</p>
								</i>
								<p>
									<strong>
										{this.props.noticeType} Notice{" "}
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
										{this.props.notice.createdOn
											.substr(0, 10)
											.split("-")
											.reverse()
											.join("-")}
									</i>
								</p>
							</div>
							<div
								className={
									"col s12 center " + classes.Scrollbar
								}
							>
								<div className={classes.SummaryContent}>
									<p>{this.props.notice.content}</p>
								</div>
							</div>
							{this.props.noticeType === "Members" &&
							this.props.adminStatus === true &&
							this.props.auth ? (
								<div
									className={
										"col s12 center " + classes.SeenBy
									}
								>
									<p>
										This notice has been seen by :
										{this.props.notice.seenBy.map(
											(each) => (
												<i> {each} , </i>
											)
										)}
									</p>
								</div>
							) : null}
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

export default connect(mapStateToProps)(ViewNotice);
