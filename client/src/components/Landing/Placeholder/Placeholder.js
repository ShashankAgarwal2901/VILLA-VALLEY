import React, { Component } from "react";
import classes from "./Placeholder.module.css";

class Placeholder extends Component {
	render() {
		return (
			<div className={classes.placeholder + " " + classes.b}>
				<div className={"container " + classes.b}>
					<div className={classes.landingContent}>
						<h4> Welcome to Villa Valley Website </h4>
						<p>
							This is a information page for general viewing , as
							well as a Members area to share info
						</p>
						<div className="row">
							<div className="col s6 l3 offset-l3">
								<a
									href="#Notices"
									className={
										"waves-effect waves-light btn-large " +
										classes.Button
									}
								>
									Notices
								</a>
							</div>
							<div className="col s6 l3">
								<a
									href="/members"
									className={
										"waves-effect waves-light btn-large " +
										classes.Button
									}
								>
									Members
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Placeholder;
