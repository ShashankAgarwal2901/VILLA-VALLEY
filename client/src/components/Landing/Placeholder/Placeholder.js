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
						<a
							className={
								"waves-effect waves-light btn light-blue darken-3 " +
								classes.Button
							}
						>
							button
						</a>
						<a
							className={
								"waves-effect waves-light btn light-blue darken-3 " +
								classes.Button
							}
						>
							button
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Placeholder;
