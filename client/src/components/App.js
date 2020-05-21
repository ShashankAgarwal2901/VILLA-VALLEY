import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header/Header.js";
import Landing from "./Landing/Landing.js";
import Pending from "./Pending/Pending.js";
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/pending" component={Pending} />
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
