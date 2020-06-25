import React, { Component } from "react";
import Placeholder from "./Placeholder/Placeholder.js";
import Content from "./Content/Content.js";
import NoticeContainer from "./NoticeContainer/NoticeContainer.js";
import Footer from "./Footer/Footer.js";

class Landing extends Component {
	render() {
		return (
			<div className="center">
				<Placeholder />
				<Content />
				<NoticeContainer />
				<Footer />
			</div>
		);
	}
}

export default Landing;
