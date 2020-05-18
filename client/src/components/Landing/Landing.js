import React, { Component } from "react";
import Placeholder from "./Placeholder/Placeholder.js";
import Content from "./Content/Content.js";

class Landing extends Component {
	render() {
		return (
			<div className="center">
				<Placeholder />
				<Content />
			</div>
		);
	}
}

export default Landing;
