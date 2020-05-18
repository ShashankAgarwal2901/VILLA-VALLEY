import React, { Component } from "react";
import classes from "./Content.module.css";
import Card from "./Card/Card.js";

class Content extends Component {
	render() {
		return (
			<div className={"container row " + classes.ContentHead}>
				<div className={"col l4 s12 m4 " + classes.Content}>
					<Card />
				</div>
				<div className={"col l4 s12 m4 " + classes.Content}>
					<Card />
				</div>
				<div className={"col l4 s12 m4 " + classes.Content}>
					<Card />
				</div>
			</div>
		);
	}
}
export default Content;
