import React, { Component } from "react";
import classes from "./NoticeContainer.module.css";
import ContainerHeader from "./ContainerHeader/ContainerHeader.js";
import NoticesEvents from "./NoticesEvents/NoticesEvents.js";

class NoticeContainer extends Component {
	state = {
		Notices: true,
	};

	switchContent = (e, a) => {
		this.setState({ Notices: a });
		e.preventDefault();
	};

	render() {
		return (
			<div className="row">
				<div className={"col s10 offset-s1 " + classes.b}>
					<div className="row">
						<div className="col s12">
							<h4 className="left">
								Notices and Upcoming events
							</h4>
						</div>
					</div>
					<ContainerHeader
						active={this.state.Notices}
						clicked={this.switchContent}
					/>
					<NoticesEvents notices={this.state.Notices} />
				</div>
			</div>
		);
	}
}

export default NoticeContainer;
