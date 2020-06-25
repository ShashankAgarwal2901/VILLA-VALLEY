import React, { Component } from "react";
import classes from "./Content.module.css";
import Card from "./Card/Card.js";
import image1 from "../../../assets/Terrace.jpg";
import image2 from "../../../assets/Card2.jpg";
import image3 from "../../../assets/Card3.jpg";

class Content extends Component {
	render() {
		return (
			<div className="container row">
				<h5> Imgaes of our society</h5>
				<div className={classes.ContentHead}>
					<div className={"col l4 s12 m4 " + classes.Content}>
						<Card image={image1} />
					</div>
					<div className={"col l4 s12 m4 " + classes.Content}>
						<Card image={image2} />
					</div>
					<div className={"col l4 s12 m4 " + classes.Content}>
						<Card image={image3} />
					</div>
				</div>
			</div>
		);
	}
}
export default Content;
