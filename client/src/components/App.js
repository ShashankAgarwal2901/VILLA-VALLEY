import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header/Header.js";
import Landing from "./Landing/Landing.js";

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Header />
					<Landing />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
