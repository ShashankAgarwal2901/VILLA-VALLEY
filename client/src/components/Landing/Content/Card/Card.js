import React, { Component } from "react";
import classes from "./Card.module.css";

const Card = () => {
	return (
		<div class="card">
			<div class="card-content">
				<span class="card-title">
					<i className={"material-icons md-48 " + classes.material}>
						location_on
					</i>
				</span>
				<p>
					I am a very simple card. I am good at containing small bits
					of information. I am convenient because I require little
					markup to use effectively.
				</p>
			</div>
		</div>
	);
};

export default Card;
